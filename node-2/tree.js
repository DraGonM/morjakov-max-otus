const path = require('path')
const { readdirAsync, statAsync } = require('./fsPromises')

module.exports = tree = async (dir) => {
    try {
        const files = await readdirAsync(dir)
        const dirTree = { files: [], folders: [], errors: [] }

        for (file of files) {
            const filepath = path.join(dir, file)
            await addFile(filepath, dirTree)
        }
    
        return dirTree        
    } catch (err) {
        console.log(`error: ${err}`)
    }
}

const addFile = async (filepath, dirTree) => {
    const stat = await statAsync(filepath)
    const normalizedPath = path.normalize(filepath)

    if (stat.err) {
        dirTree.errors.push(stat.err)
    } else if (stat.isDirectory()) {
        await addFolder(filepath, dirTree)
    } else {
        dirTree.files.push(normalizedPath)
    }
}

const addFolder = async (filepath, dirTree) => {
    const normalizedPath = path.normalize(filepath)
    dirTree.folders.push(normalizedPath)

    const childtree = await tree(filepath)
    dirTree.files = [ ...dirTree.files, ...childtree.files ]
    dirTree.folders = [ ...dirTree.folders, ...childtree.folders ]
    dirTree.errors = [ ...dirTree.errors, ...childtree.errors ]
}
