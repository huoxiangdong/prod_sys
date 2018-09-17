const path = require('path')
const fs = require('fs-extra')
const globby = require('globby')
const { genCode } = require('./gencode')

async function prepare() {
     // 1.获取路径
     const comPath = path.resolve('src/pages');
    // 2.获取组件数组
    const comArr = await globby(['**/*.vue'], {
        cwd: comPath
    })

    const code = genCode(comArr, comPath)
    
    const routeCache = new Map()
    const routePath = path.resolve(__dirname, '../src/router')

    fs.ensureDirSync(routePath) // 创建router文件夹

    async function writeTemp(file, content) {

        const cached = routeCache.get(file) // 获取缓存

        if (cached !== content) {
            await fs.writeFile(path.join(routePath, file), content) // 写入文件
            routeCache.set(file, content) // 写入缓存
        }
    }

    writeTemp('routes.js', code)

}

prepare() 

 