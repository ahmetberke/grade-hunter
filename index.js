const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

var server = http.createServer((req, res) => {
  res.writeHead(200, {'content-type':'text/html'});
  fs.createReadStream('./src/index.html');
});

server.listen(PORT, (err) => {
  if (err) return console.log('error on running server');
  console.log(`server started, PORT: ${PORT}`)
});