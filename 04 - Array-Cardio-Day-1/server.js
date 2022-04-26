const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;
const PUBLIC_URL = './public'
const server = http.createServer((request, res) => {
  var filePath = PUBLIC_URL + request.url;
  if (filePath === './public/') {
    filePath = PUBLIC_URL + '/index.html';
  }

  const ext = path.parse(filePath).ext;
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword'
  };

  fs.readFile(filePath, function(error, data){
    if (error) {
      res.statusCode = 404;
      res.write('Not found');
      res.end();
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', map[ext] || 'text/plain');
      res.write(data);
      res.end();
    }
  })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
