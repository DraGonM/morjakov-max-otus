const fs = require('fs')

const fsPromisify = (func, path) => {
    return new Promise((resolve, reject) => {
        func(path, (error, result) => {
            if (error) {
                const { code, path } = error
    
                switch (code){
                    case "EPERM":
                        resolve({ err: `Did not have permission to check file/directory: '${path}'` })
                    case "EBUSY":
                        resolve({ err: `File/directory is busy: '${path}'` })
                    default:
                        reject(error)
                }
            } else {
                resolve(result)
            }
        })
    })
}

exports.readdirAsync = (path) => fsPromisify(fs.readdir, path)
exports.statAsync = (path) => fsPromisify(fs.stat, path)
