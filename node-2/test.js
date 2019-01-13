const tree = require('./tree')
const ArgumentParser = require('argparse').ArgumentParser

const parser = new ArgumentParser({ addHelp: true })

parser.addArgument(
    [ '-path', '--path' ],
    {
        help: 'Set root directory of tree.'
    }
)

const args = parser.parseArgs()
const dirpath = args.path ? args.path : '.'

tree(dirpath).then(console.log)