(function clock() {
  const hourHand = document.querySelector('.hour-hand');
  const minuteHand = document.querySelector('.minute-hand');
  const secondHand = document.querySelector('.second-hand');
  function setDate() {
    const now = new Date();
    // hour
    const hours = now.getHours();
    const hoursDegrees = hours/12 * 360;
    rotateTo(hourHand, hoursDegrees);
    // minute
    const minutes = now.getMinutes();
    const minutesDegrees = minutes/60 * 360; 
    rotateTo(minuteHand, minutesDegrees);
    // second
    const seconds = now.getSeconds();
    const secondsDegrees = seconds/60 * 360;
    rotateTo(secondHand, secondsDegrees);
  }

  function rotateTo (dom, degree){
    const trasformProperty = dom.style.transform;
    const currentDegree = trasformProperty.match(/\d+(?=deg)/g);
    if (currentDegree && currentDegree[0] > degree) {
      degree += 360;
      dom.addEventListener('transitionend', resetDegree);
    }

    // remove resetting class;
    if(dom.classList.contains('resetting')){
      dom.classList.remove('resetting');
    }
    
    dom.style.transform = `rotate(${degree}deg)`;
  }

  function resetDegree (event) {
    const dom = event.currentTarget;    
    const trasformProperty = dom.style.transform;
    const degree = trasformProperty.match(/\d+(?=deg)/g);
    dom.classList.add('resetting');
    if (!degree){
      return;
    }
    dom.style.transform = `rotate(${degree[0]%360}deg)`;
    dom.removeEventListener('transitionend', resetDegree);
  }
  setDate();
  setInterval(()=>setDate(), 1000);
})();
