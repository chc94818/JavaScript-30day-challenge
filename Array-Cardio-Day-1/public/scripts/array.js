const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

function filterBornYear(list, year=1500) {
  const firstYear = year - year % 100;
  const lastYear = firstYear + 100;
  return list.filter((item) => {
    const { year } = item;
    if (year >= firstYear && year < lastYear) {
      return true;
    }
  });
};

function fullName(list) {
  return list.map((item) => {
    const { first, last } = item;
      return first + ' ' + last;
  });
};

function sortByBirthdate(list) {
  return list.sort((prevItem, nextItem) => {
    const { year: prevYear } = prevItem;
    const { year: nextYear } = nextItem;
    return nextYear - prevYear;
  });
};

function sumOfLiveYear(list) {
  return list.reduce((total, item) => {
    const { year, passed } = item;
    const live = passed - year;
    return total + live;
  }, 0);
};

function sortByYearsLived(list) {
  return list.sort((prevItem, nextItem) => {
    const { year: prevYear, passed: prevPassed } = prevItem;
    const { year: nextYear, passed: nextPassed } = nextItem;
    const prevYearsLived = prevPassed - prevYear;
    const nextYearsLived = nextPassed - nextYear;    
    return nextYearsLived - prevYearsLived;
  });
};

function sortByGivenName(people) {
  return people.map(person => person.split(', '))
    .sort((a, b) => a[1] > b[1] ? 1: -1)
    .map((person) => person.join(', '));
};

async function getWikiData() {
  const wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=Category:Boulevards_in_Paris&prop=categories&cllimit=max&gcmlimit=max&format=json&origin=*';
  let response = await fetch(wikiUrl);
  let JSON = await response.json();
  return JSON;
}

// Show the inventors
console.table("Inventors", inventors);

// 1. Filter the list of inventors for those who were born in the 1500's  
const yearFilterdList = filterBornYear(inventors, 1500);
console.table("Inventors born in the 1500's", yearFilterdList);

// 2. Give us an array of the inventors' first and last names
const fullNameList = fullName(inventors);
console.table("Inventors full name", fullNameList);

// 3. Sort the inventors by birthdate, oldest to youngest
const birthdateOrderedList = sortByBirthdate(inventors);
console.table("Inventors list sorted by birthdate (oldest to youngest)", birthdateOrderedList);

// 4. How many years did all the inventors live?
const totalYears = sumOfLiveYear(inventors);
console.table("Sum years of Inventors live", totalYears);

// 5. Sort the inventors by years lived (longest to shortest)
const yearsLivedOrderedList = sortByYearsLived(inventors);
console.table("Inventors list sorted by years lived", yearsLivedOrderedList);


// 6. Created a list of Boulevards in Prais that contain 'de' anywhere in the name
const wikiDataPromise = getWikiData();
wikiDataPromise.then((data)=>{
  const { query: { pages = {} }} = data;
  const pageList = Object.values(pages);
  const titles = pageList.map((page)=> {
    const { title } = page;
    return title;
  })
  return titles;
}).then((titles) => {
  const titlesHasDe = titles.filter(title => title.includes('de'));
  console.log("List of Boulevards in Prais that contain 'de' anywhere in the name", titlesHasDe)
})

// 7. Sort the people alphabetically by given name
const alphabeticallyOrderedNameList = sortByGivenName(people);
console.table("People list sorted alphabetically by given name", alphabeticallyOrderedNameList);

// 8. Reduce Exercise
// Sum up the instances of each of these
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
// using hash map
// const transportationTable = new Map();
// data.forEach((transportation) => {
//   if (transportationTable.has(transportation)){
//     const count = transportationTable.get(transportation);
//     transportationTable.set(transportation, count + 1);
//   } else {
//     transportationTable.set(transportation, 1);
//   }
// })
// transportationObject = Object.fromEntries(transportationTable);
// transportationArray = [...transportationTable]
// console.table('transportationObject',transportationObject);
// console.table('transportationArray',transportationArray);

// using reduce
const transportationTable = data.reduce((obj, cur) => {
  if(obj.hasOwnProperty(cur)) {
    obj[cur]++;
  } else {
    obj[cur] = 1;
  }
  return obj;
}, {})
console.table('Sum up the instances of each of transportation', transportationTable);
