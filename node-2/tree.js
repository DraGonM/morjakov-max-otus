const path = require('path')
const { readdirAsync, statAsync } = require('./fsPromises')

module.exports = tree = async (dir) => {
    try {
        const files = await readdirAsync(dir)
        const dirTree = { files: [], folders: [], errors: [] }

        for (file of files) {
            const filepath = path.join(dir, file)
            const normalizedPath = path.normalize(filepath)
            const stat = await statAsync(filepath)
    
            if (stat.err) {
                dirTree.errors.push(stat.err)
            } else if (stat.isDirectory()) {
                dirTree.folders.push(normalizedPath)
    
                const childtree = await tree(filepath)
                dirTree.files = [ ...dirTree.files, ...childtree.files ]
                dirTree.folders = [ ...dirTree.folders, ...childtree.folders ]
                dirTree.errors = [ ...dirTree.errors, ...childtree.errors ]
            } else {
                dirTree.files.push(normalizedPath)
            }
        }
    
        return dirTree        
    } catch (err) {
        console.log(`error: ${err}`)
    }
}