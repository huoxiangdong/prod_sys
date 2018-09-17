const path = require('path')
const fs = require('fs-extra')
const globby = require('globby')

const routerCache = new Map()
// util
function sort(arr) {
    return arr.sort((a, b) => { // sort 数组排序 传入一个函数-> 按函数排序
        if (a < b) return -1 // false
        if (a > b) return 1 // true
        return 0 // 不操作 === 
    })
}
const extRE = /\.(vue)$/
const lowercaseRE = /\b[a-z]/g
const initialRE = /\b()/g
function isIndexFile(file) {
    return indexRE.test(file)
}

function fileToComponentName(file) {
    let normalizedName = file
        .replace(/\/|\\/g, '-') // 斜杠替换为-
        .replace(extRE, '') // 去掉vue后缀
        .replace(lowercaseRE, (title) =>  title.toUpperCase())
 
    return `${normalizedName}`
}

const filePath = path.resolve('src/views')

async function genRouterCode() {

    const components = sort(await globby(['**/*.vue'], { // 匹配所有vue组件
        cwd: filePath
    })) || []

    function genComponentRegistrationFile() { // 注册组件code

        function genImport(file) {
            const name = fileToComponentName(file)
            const absolutePath = path.resolve(commentsPath, file)

            const code = `Vue.component(${JSON.stringify(name)}, () => import(${JSON.stringify(absolutePath)}))`
            return code
        }

        return `import Vue from 'vue'\n` + components.map(genImport).join('\n')
    }

   



   


    const routerPath = path.resolve(__dirname, '../src/router')

    fs.ensureDirSync(routerPath) // 创建router文件夹

    async function writeTemp(file, content) {

        const cached = routerCache.get(file) // 获取缓存

        if (cached !== content) {
            await fs.writeFile(path.join(routerPath, file), content) // 写入文件
            routerCache.set(file, content) // 写入缓存
        }
    }

    writeTemp('routes.js', genComponentRegistrationFile())

    
}

genRouterCode()