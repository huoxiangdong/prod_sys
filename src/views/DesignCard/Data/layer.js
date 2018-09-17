import { TEXTFIELD } from './shared.js'

// 层配置
export default {
    sidebar: {
        items: [
            {
                title: '显示设计'
            },
            {
                title: '保存并显示设计'
            },
            {
                title: '保存'
            },
            
            {
                title: '全屏切换',
                cb: function (e) {
                    console.log(e)
                }
            },
            {
                title: '上一层'
            },
            {
                title: '删除层'
            },
            {
                title: '添加物料清单'
            },
            {
                title: '复制最后一个物料清单'
            },
            {
                title: '移除选中物料清单'
            },
            {
                title: '高级选项'
            },
            {
                title: '关闭',
                cb: function (e) {
                    console.log(e)
                }
            }
        ]
    },
    tabs: {
        '层选择': {
            header: ['属性', '单位', '属性值', '锁定', '计算值'],
            body: [{ ...[
                    'Armour Type',
                    '',
                    {
                        component: 'd-select',
                        attrs: {
                            hideDetails: true,
                            grey: true,
                            height: 5,
                            kind: 'mt-0',
                            items: [1,2,3]
                        }
                    }, 
                    {
                        component: 'd-checkbox'
                    },
                    '计算值'
                ]
            }]
        },
        '层属性': {
            tab: true,
            items: {
                '常用': [{
                        header: ['属性', '单位', '属性值', '锁定', '计算值'],
                        body: [{ ...[
                                    '层',
                                    '',
                                    TEXTFIELD,
                                    '',
                                    '计算值'

                                ]
                            },
                            { ...[
                                    '内径',
                                    'mm/inch',
                                    TEXTFIELD,
                                    {
                                        component: 'd-checkbox'
                                    },
                                    '计算值'

                                ]
                            },
                            { ...[
                                    '导线直径',
                                    'mm/inch',
                                    TEXTFIELD,
                                    {
                                        component: 'd-checkbox'
                                    },
                                    '计算值'

                                ]
                            },
                            { ...[
                                    '绞距',
                                    'mm/inch',
                                    TEXTFIELD,
                                    {
                                        component: 'd-checkbox'
                                    },
                                    '计算值'

                                ]
                            },
                            { ...[
                                    'No. Wires',
                                    '',
                                    TEXTFIELD,
                                    {
                                        component: 'd-checkbox'
                                    },
                                    '计算值'

                                ]
                            },
                            { ...[
                                    'Braid Spindles',
                                    '',
                                    TEXTFIELD,
                                    {
                                        component: 'd-checkbox'
                                    },
                                    '计算值'

                                ]
                            },
                            { ...[
                                    'Braid Ends',
                                    '',
                                    TEXTFIELD,
                                    {
                                        component: 'd-checkbox'
                                    },
                                    '计算值'

                                ]
                            }
                        ]
                    },
                    {
                        header: ['属性', '单位', '属性值', '锁定', '计算值'],
                        body: [{ ...[
                                    'Fict Diam',
                                    'mm/inch',
                                    TEXTFIELD,
                                    {
                                        component: 'd-checkbox'
                                    },
                                    '计算值'

                                ]
                            },
                            { ...[
                                    'Nominal Diameter',
                                    'mm/inch',
                                    TEXTFIELD,
                                    {
                                        component: 'd-checkbox'
                                    },
                                    '计算值'

                                ]
                            },
                            { ...[
                                    'Min Diam',
                                    '',
                                    TEXTFIELD,
                                    {
                                        component: 'd-checkbox'
                                    },
                                    '计算值'

                                ]
                            },
                            { ...[
                                    'Max Diam',
                                    '',
                                    TEXTFIELD,
                                    {
                                        component: 'd-checkbox'
                                    },
                                    '计算值'

                                ]
                            },
                            { ...[
                                    'Nominal Weight',
                                    'kg/lb',
                                    TEXTFIELD,
                                    {
                                        component: 'd-checkbox'
                                    },
                                    '计算值'

                                ]
                            },
                            { ...[
                                    'Cost',
                                    '$',
                                    TEXTFIELD,
                                    {
                                        component: 'd-checkbox'
                                    },
                                    '计算值'

                                ]
                            }
                        ]
                    },
                ]
            }
        },
        '层文本': {
            comment: true
        }
    }
}