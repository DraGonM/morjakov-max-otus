const http = require('http')
const { port, hostname } = require('./server.conf')
const request = require('./client')

var server = http.createServer(function (req, res) {
  setTimeout(function() {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello World\n')
  }, 100)
})

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
})

//test
request(1000, 'async')
  .then(x => request(100, 'sync'))

