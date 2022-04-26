(function scripts() {
  const divs = document.querySelectorAll('div');
  const button = document.querySelector('button');

  function logText(e) {
    console.log("bubble ", this.classList.value);
    // e.stopPropagation(); // stop bubbling!
    // console.log(this);
  }

  function logTextCap(e) {
    console.log("cap ", this.classList.value);
    // e.stopPropagation(); // stop bubbling!
    // console.log(this);
  }

  divs.forEach(div => div.addEventListener('click', logText, {
    capture: false,
    once: true
  }));

  divs.forEach(div => div.addEventListener('click', logTextCap, {
    capture: true,
    once: true
  }));

  button.addEventListener('click', () => {
    console.log('Click!!!');
  }, {
    once: true
  });
})();