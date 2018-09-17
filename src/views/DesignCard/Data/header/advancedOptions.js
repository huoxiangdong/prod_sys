import { TEXTFIELD, SELECT } from '../shared.js'
export default {
    sidebar: {
        items: [
            { title: '查看设计'},
            { title: '保存并查看设计'},
            { title: '保存'},
            { title: '全屏切换'},
            { title: '查看标头参数'},
            { title: '标准选项'},
            { title: '关闭'}
        ]
    },
    tabs: {
        '标头参数': {
            header: [{
                    text: '参数',
                    // rowspan: 2
                }, {
                    text: '说明',
                    // rowspan: 2
                }, {
                    text: '计量单位',
                    // rowspan: 2
                }, {
                    text: '参数值',
                    // rowspan: 2
                }, {
                    text: '锁定',
                    // rowspan: 2
                }, {
                    text: '计算参数值',
                    // rowspan: 2,
                    // // colspan: 2,
                }, {
                    text: '维护参数',
                    // colspan: 2, // 列
                    // rowspan: 2, //行
                    // align: 'center',
                    children: [
                        {text:'111111'},
                        {text: '2222'}
                    ]
                }],
                // ['值','选项']
            
             body: [
                 {...[1]},
                 {...[2]},
                 {...[3]},
                 {...[4]},
                 {...[5]},
                 {...[6]},
                 {...[7]},
                 {...[8]},
                 {...[9]},
                 {...[10]},
                 {...[11]}
             ]
            // body: [{ ...[
            //     'standard', 
            //     'standard', 
            //     '', 
            //     vm => {
            //             const _SELECT = SELECT()
            //             _SELECT.attrs.items = [3, 2, 3]
            //             return _SELECT
            //         }, 
            //     { component: 'd-checkbox' }, 
            //     '计算值', 
            //     // '编辑公式1', 
            //     // '添加新公式1',
            //     // '编辑属性',
            //     // '查看下拉菜单表格',
            //     // '添加下拉菜单表格',
            //     // '添加新公式'
            // ]
            //     },
            //     { ...[
            //         'specification', 
            //         'specification', 
            //         '', 
            //         vm => {
            //             const _SELECT = SELECT()
            //             _SELECT.attrs.items = [3, 2, 3]
            //             return _SELECT
            //         }, 
            //         { component: 'd-checkbox' }, 
            //         '计算值', 
            //         // '编辑公式', 
            //         // '添加新公式'
            //     ]
            //     },
            //     { ...[
            //         'itemType', 
            //         'itemType', 
            //         '', 
            //         vm => {
            //             const _SELECT = SELECT()
            //             _SELECT.attrs.items = [3, 2, 3]
            //             return _SELECT
            //         }, 
            //         { component: 'd-checkbox' }, 
            //         '计算值', 
            //         '1', 
            //         '1']
            //     },
            //     { ...[
            //         'itemNature', 
            //         'itemNature', 
            //         '', 
            //         vm => {
            //             const _SELECT = SELECT()
            //             _SELECT.attrs.items = [3, 2, 3]
            //             return _SELECT
            //         }, 
            //         { component: 'd-checkbox' }, 
            //         '计算值', 
            //         '1', 
            //         '1']
            //     },
            //     { ...[
            //         'material Group', 
            //         'material Group', 
            //         '', 
            //         TEXTFIELD, 
            //         { component: 'd-checkbox' }, 
            //         '计算值', 
            //         '1', 
            //         '1']
            //     },
            //     { ...[
            //         'conductorCSA', 
            //         'conductorCSA', 
            //         '', 
            //         TEXTFIELD, 
            //         { component: 'd-checkbox' }, 
            //         '计算值',
            //         '1', 
            //         '1']
            //     },
            //     { ...[
            //         'conductorClass', 
            //         'conductorClass', 
            //         '', 
            //         TEXTFIELD, 
            //         { component: 'd-checkbox' },
            //         '计算值',
            //         '1', 
            //         '1']
            //     },
            //     { ...[
            //         'conductorType', 
            //         'conductorType', 
            //         '', 
            //         TEXTFIELD, 
            //         { component: 'd-checkbox' },
            //         '计算值',
            //         '1', 
            //         '1']
            //     },
            //     { ...[
            //         'noElements', 
            //         'noElements', 
            //         '', 
            //         TEXTFIELD, 
            //         { component: 'd-checkbox' },
            //         '计算值', 
            //         '1', 
            //         '1']
            //     },
            //     { ...[
            //         'outerDiam', 
            //         'outerDiam', 
            //         'mm', 
            //         TEXTFIELD, 
            //         { component: 'd-checkbox' },
            //         '计算值',
            //         '1', 
            //         '1']
            //     },
                // { ...[
                //     'fictDiam', 
                //     'fictDiam', 
                //     'mm', 
                //     TEXTFIELD, 
                //     { component: 'd-checkbox' },
                //     '计算值', 
                //     '1', 
                //     '1']
                // },
                // { ...[
                //     'colour', 
                //     'colour', 
                //     '', 
                //     TEXTFIELD, 
                //     { component: 'd-checkbox' },
                //     '计算值', 
                //     '1', 
                //     '1']
                // },
                // { ...[
                //     'weight', 
                //     'weight', 
                //     'kg', 
                //     TEXTFIELD, 
                //     { component: 'd-checkbox' }, 
                //     '计算值',
                //     '1', 
                //     '1']
                // },
                // { ...[
                //     'comments', 
                //     'comments', 
                //     '', 
                //     TEXTFIELD, 
                //     { component: 'd-checkbox' }, 
                //     '计算值',
                //     '1', 
                //     '1']
                // },
                // { ...[
                //     'unit', 
                //     'unit', 
                //     '', 
                //     vm => {
                //         const _SELECT = SELECT()
                //         _SELECT.attrs.items = [3, 2, 3]
                //         return _SELECT
                //     }, 
                //     { component: 'd-checkbox' },
                //     '计算值', 
                //     '1', 
                //     '1']
                // },
                // { ...[
                //     'voltage', 
                //     'voltage', 
                //     'KV', 
                //     vm => {
                //         const _SELECT = SELECT()
                //         _SELECT.attrs.items = [3, 2, 3]
                //         return _SELECT
                //     }, 
                //     { component: 'd-checkbox' }, 
                //     '计算值',
                //     '1', 
                //     '1']
                // },
                // { ...[
                //     'cableGroup', 
                //     'cableGroup',
                //      {
                //         component: 'd-btn',
                //         attrs: {
                //             text: '...',
                //             class: ['size-1'],
                //             event: {
                //                 click: function () {
                //                     console.log(this)
                //                 }
                //             }
                //         }
                //     }, 
                //     TEXTFIELD, 
                //     { component: 'd-checkbox' },
                //     '计算值', 
                //     '1', 
                //     '1']
                // },

            // ]
        }
    }
}