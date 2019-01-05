const request = require('./client')
const startServer = require('./server')

startServer()

const args = process.argv.slice(2)
const requestsCount = args[0]
const requestType = args[1]

console.log('requestsCount:', requestsCount)
console.log('requestType:', requestType)

request(requestsCount, requestType)
