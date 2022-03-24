(function panelToggle() {
  const panels = document.querySelector('.panels');
  let lastElem = null;

  function toggleOpen(elem) {
    if (lastElem) {
      lastElem.classList.remove('open');      
    }
    if (lastElem !== elem) {
      elem.classList.add('open');
      lastElem = elem;
    } else {
      lastElem = null;
    }
  }

  function toggleActive(elem) {
    elem.classList.toggle('open-active');
  }
  
  panels.addEventListener('click', (e) => {
    toggleOpen(e.target);
  })

  panels.addEventListener('transitionend', (e) => {
    if (e.propertyName.includes('flex')) {
      toggleActive(e.target);
    }
  })
})();
