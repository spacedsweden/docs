const url = require('url');
const http = require('http');
const server = http.createServer((req, res) =>
{
    let data = []
    req.on('data', chunk => {
      data.push(chunk)
    })
    req.on('end', () => {
        console.log(JSON.parse(data));
    })
    res.end();
  })
  server.listen(3000);