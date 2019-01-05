const http = require('http')
const { port, hostname } = require('./server.conf')

module.exports = function startServer() {
  var server = http.createServer(function (req, res) {
    setTimeout(function() {
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.end('Hello World\n')
    }, 100)
  })

  server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
  })
}


