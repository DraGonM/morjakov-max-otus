const { Readable, Writable, Transform  } = require('stream')

const random = (max = 1000) => Math.round(Math.random() * Math.floor(max))
const maxGenCount = 50
let genCount = 0

const randomGen = new Readable({
    highWaterMark: 0,
    read() {
        if (genCount === maxGenCount) {
            this.destroy()
        } else {
            const newRandomNumber = random()
            const buf = Buffer.from(newRandomNumber.toString(), 'utf8')

            console.log(`new random number: ${newRandomNumber}`)

            this.push(buf)
            genCount++
        }
    }
})

const summator = new Transform({
    // highWaterMark: 1,
    transform: (data, _, done) => {
        const numberFromReader = Number(data)
        const numberToAdd = random()
        const sum = numberFromReader + numberToAdd

        console.log(`summator: ${numberFromReader} + ${numberToAdd} = ${sum}`)

        const buf = Buffer.from(sum.toString(), 'utf8')
        done(null, buf)
    }
})

const outputStream = new Writable({
    // highWaterMark: 1,
    write: (data, _, done) => {
        const dataStr = data.toString()
        console.log(`___sum: ${dataStr}___\r\n`)
        done()
    }
})

randomGen
    .pipe(summator)
    .pipe(outputStream)
