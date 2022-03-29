(function clock() {
  const canvas = document.querySelector('#draw');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  // ctx.strokeStyle = '#BADA55';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 10;
  // ctx.globalCompositeOperation = 'multiply';

  let isDrawing = false;
  let isInCanvas = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let direction = true;

  function draw(e) {
    if (!isDrawing || !isInCanvas) return; // stop the fn from running when they are not moused down
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    console.log('lastY',lastY);
    console.log('lineTo',e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    hue++;
    if (hue >= 360) {
      hue = 0;
    }
    if (ctx.lineWidth >= 25 || ctx.lineWidth <= 5) {
      direction = !direction;
    }

    if(direction) {
      ctx.lineWidth+=0.1;
    } else {
      ctx.lineWidth-=0.1;
    }

  }

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  canvas.addEventListener('mouseover', (e) => {
    isInCanvas = true
    lastX = e.offsetX;
    lastY = e.offsetY;
    console.log('mouseover offsetX',[e.offsetX, e.offsetY]);
    console.log('mouseover lastX',[lastX, lastY]);
  });

  canvas.addEventListener('mousemove', draw);
  // canvas.addEventListener('mouseup', () => isDrawing = false);
  window.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isInCanvas = false);
  })();

