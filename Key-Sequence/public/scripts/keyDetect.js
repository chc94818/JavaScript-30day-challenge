(function keyDetect() {
  const pressed = [];
  const secretCode = 'nicewoof';

  window.addEventListener('keyup', (e) => {
    console.log(e.key);
    pressed.push(e.key);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if (pressed.join('').includes(secretCode)) {
      console.log('BING BONG!');
      cornify_add();
    }
    console.log(pressed);
  });
})();

