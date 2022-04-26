(function piano() {
  function playAudio(key) {
    var audio = document.querySelector(`audio[data-key="${key}"]`);
    var card = document.querySelector(`.audio-card[data-key="${key}"]`);
    if (audio && card && !card.classList.contains("playing")) {
      audio.currentTime = 0;
      audio.volume = 0.2;
      audio.play();
      card.classList.add("playing");
    }
  }
  
  function addListEvent() {
    var list = document.querySelector(".audio-list")
    list.addEventListener("click", (e) => {
      var key = e.target.getAttribute("data-key");
      if (key) {
        playAudio(key)
      }
    })

    list.addEventListener("transitionend", (e) => {
      var propertyName = e.propertyName;
      var classList = e.target.classList;
      var key = e.target.getAttribute("data-key");
      if (key && propertyName === "box-shadow" && classList.contains("playing")) {
        e.target.classList.remove("playing");
      }
    })
  }
  
  function addKeyDownEvent() {
    window.addEventListener("keydown", (e)=> {
      var key = e.key
      if (key && key.length === 1) {
        var keyCode = e.key.toUpperCase().charCodeAt(0);
        playAudio(keyCode)
      }
    })
  }

  addListEvent();
  addKeyDownEvent();
})();
