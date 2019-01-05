const tree = require('./tree')

const args = process.argv.slice(2)
const dirpath = args[0] ? args[0] : '.'

tree(dirpath).then(console.log)