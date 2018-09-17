const path = require('path')
const chokidar = require('chokidar')
 const pagesPath = path.resolve('src/pages')

const pagesWatcher = chokidar.watch(['**/*.vue'],{
    cwd: pagesPath,
    ignoreInitial: true
})

pagesWatcher.on('add',() => {
    console.log(1)
})
pagesWatcher.on('unlink', () => {
    console.log(1)
})
pagesWatcher.on('addDir', () => {
    console.log(1)
})
pagesWatcher.on('unlinkDir', () => {
    console.log(1)
})