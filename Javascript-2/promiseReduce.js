var fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
}
    
var fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000)
})

var fn3 = () => new Promise(resolve => {
    console.log('fn3')
    setTimeout(() => resolve(3), 200)
})

var fnErr = () => new Promise((resolve, reject) => {
    console.log('fnErr')
    setTimeout(() => reject('some input async function failed'), 500)
})

const multiply = (val1, val2) => val1 * val2

function promiseReduce(asyncFunctions, reduceFunc, initialValue, usePromiseVersion) {
    let currentValue = initialValue

    if (usePromiseVersion) {
        console.log('Promise version')
        return new Promise((resolve, reject) => {
            (function runPromise(i) {
                if (i < asyncFunctions.length) {
                    asyncFunctions[i]().then(x => {
                        currentValue = reduceFunc(currentValue, x)
                        runPromise(i+1)
                    }).catch(err => reject(err))
                }
    
                if (i === asyncFunctions.length)
                    resolve(currentValue)
            })(0)
        })
    } else {
        return new Promise(async (resolve, reject) => {
            console.log('Async version')
            for (const asyncFunc of asyncFunctions) {
                try 
                {
                    const result = await asyncFunc()
                    currentValue = reduceFunc(currentValue, result)
                }
                catch (err) 
                {
                    reject(err)
                }
            }
    
            resolve(currentValue)        
        })
    }
}

// tests
const promiseVersion = () => promiseReduce([fn1, fn2, fn3], multiply, 4, true)
promiseVersion().then(console.log).catch(console.log)

const asyncVersion = () => promiseReduce([fn1, fn2, fn3], multiply, 4)
setTimeout(() => asyncVersion().then(console.log).catch(console.log), 2000)

const asyncVersionErr = () => promiseReduce([fn1, fn2, fn3, fnErr], multiply, 4)
setTimeout(() => asyncVersionErr().then(console.log).catch(console.log), 4000)



