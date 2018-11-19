module.exports = {
    presets: [
        [
            '@vue/app',
            {
                useBuiltIns: 'entry'
            }
        ]
    ],
    plugins: [ // antd need
        // 动态引入
        // ["import", {
        //     "libraryName": "antd",
        //     "libraryDirectory": "components",
        //     "style": "css"
        // }] 
        // '@babel/plugin-proposal-object-rest-spread',
        // 'transform-vue-jsx',
        // '@babel/plugin-proposal-class-properties'
    ]
}

