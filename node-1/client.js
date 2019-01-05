const http = require('http')
const { port, hostname } = require('./server.conf')

const asyncType = 'async'
const syncType = 'sync'
const requestTypes = [asyncType, syncType]

// default settings: async and 50 requests
module.exports = async function request(numberOfReq, reqType) {
    const requestsNumber = Number.isInteger(Number(numberOfReq)) ? numberOfReq : 50
    const requestType = requestTypes.includes(reqType) ? reqType : asyncType

    if (requestType === asyncType) {
        for (let i=0; i < requestsNumber; i++) {
            htttpGet()
                .then(x => console.log(`async result (${i+1}): ${x}`))
                .catch(console.log)
        }
    } else if (requestType === syncType) {
        for (let i=0; i < requestsNumber; i++) {
            try 
            {
                const result = await htttpGet()
                console.log(`sync result (${i+1}): ${result}`)
            }
            catch (err) 
            {
                reject(err)
            }
        }
    }
}

const options = {
    host: hostname,
    port,
    method: 'GET'
}

function htttpGet() {
    return new Promise((resolve, reject) => {
        var req = http.request(options, function(res) {
            if (res.statusCode !== 200)
                return reject(new Error('statusCode=' + res.statusCode))

            var body = []
            res.on('data', function(chunk) {
                body.push(chunk)
            })

            res.on('end', function() {
                try {
                    resolve(body)
                } catch(e) {
                    reject(`Parsing error: ${e}}`)
                }
            })
        })   

        req.on('error', function(err) {
            reject(err)
        })

        req.end()
    })
}