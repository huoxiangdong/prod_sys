import advancedOptions from './advancedOptions.js'
import { TEXTFIELD, SELECT } from '../shared.js'

export default  { // 设计标题参数
    advancedOptions,
    sidebar: { // 侧边栏
      items: [
        { title: '显示设计' },
        { title: '保存并显示设计' },
        { title: '保存'},
        { title: '高级选项',cb: function(e) {
          this.show_designHeaderAdvancedOptions = true
        } },
        { title: '全屏切换',cb: function(e) {
          this.d_fullscreen = !this.d_fullscreen
         } },
        { title: '关闭',cb: function(e) {
          this.show_designHeader = false
        }}
      ]
    },
    tabs: { // 选项卡
      '电缆说明': {
        header: ['属性','属性值','锁定','计算值'],
        body: [
          { ...[
          '描述',
          vm => {
              const _TEXTFIELD =  TEXTFIELD()
              _TEXTFIELD.attrs.appendOuterIcon = 'create'
              _TEXTFIELD.attrs.event = {
                'click:append-outer': function(e) {
                  console.log(vm)
                }
              }    
            return _TEXTFIELD
          },
          { component: 'd-checkbox' },'计算值' 
         ]}
       ]
      },
      '标头选项': {
        header: ['属性','单位','属性值','锁定','计算值'],
        body: [
          { ...[
            '标准',
            '',
            vm => {
              const _SELECT = SELECT()
              _SELECT.attrs.items = [3,2,3]
              return _SELECT
            },
            { component: 'd-checkbox'},
            '计算值'
          ]},
          { ...[
            '规范',
            '',
            vm => {
              const _SELECT = SELECT()
              _SELECT.attrs.items = [3,2,3]
              return _SELECT
            },
            { component: 'd-checkbox'},
            '计算值'
          ]},
          { ...[
            '项目类型',
            '',
            vm => {
              const _SELECT = SELECT()
              _SELECT.attrs.items = [3,2,3]
              return _SELECT
            },
            { component: 'd-checkbox'},
            '计算值'
          ]},
          { ...[
            '项目性质',
            '',
            vm => {
              const _SELECT = SELECT()
              _SELECT.attrs.items = [3,2,3]
              return _SELECT
            },
            { component: 'd-checkbox'},
            '计算值'
          ]},
          { ...[
            '度量单位',
            '',
            vm => {
              const _SELECT = SELECT()
              _SELECT.attrs.items = [3,2,3]
              return _SELECT
            },
            { component: 'd-checkbox'},
            '计算值'
          ]},
          { ...[
            '电压',
            'KV',
            vm => {
              const _SELECT = SELECT()
              _SELECT.attrs.items = [3,2,3]
              return _SELECT
            },
            { component: 'd-checkbox'},
            '计算值'
          ]},
          { ...[
            '产品组',
            { 
              component: 'd-btn', 
              attrs: {
                text: '...',
                class: ['size-1'],
                event: {
                  click: function() {
                    console.log(this)
                  }
                }
              }
          },
          vm => {
            const _TEXTFIELD =  TEXTFIELD() 
            _TEXTFIELD.attrs.appendOuterIcon = 'create'  
            return _TEXTFIELD
           },
            { component: 'd-checkbox'},
            '计算值'
          ]}
        ]
      },
      '标头参数': {
        tab: true,
        items: {
          '常用': [
            {
            header:['属性','单位','属性值','锁定','计算值'],
            body: [
              {...[
                'Conductor CSA',
                '',
                vm => {
                  const _TEXTFIELD =  TEXTFIELD() 
                  _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                  return _TEXTFIELD
                 },
                { component: 'd-checkbox'},
                '计算值'
  
              ]},
              {...[
                'Conductor Class',
                '',
                vm => {
                  const _TEXTFIELD =  TEXTFIELD() 
                  _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                  return _TEXTFIELD
                 },
                vm => {
                  const _SELECT = SELECT()
                  _SELECT.attrs.items = [3,2,3]
                  return _SELECT
                },
                '计算值'
  
              ]},
              {...[
                'Conductor Type',
                '',
                vm => {
                  const _TEXTFIELD =  TEXTFIELD() 
                  _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                  return _TEXTFIELD
                 },
                vm => {
                  const _SELECT = SELECT()
                  _SELECT.attrs.items = [3,2,3]
                  return _SELECT
                },
                '计算值'
  
              ]},
              {...[
                'Number of Elements',
                '',
                vm => {
                  const _TEXTFIELD =  TEXTFIELD() 
                  _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                  return _TEXTFIELD
                 },
                vm => {
                  const _SELECT = SELECT()
                  _SELECT.attrs.items = [3,2,3]
                  return _SELECT
                },
                '计算值'
  
              ]},
              {...[
                'Outer Diameter',
                'mm/inch',
                vm => {
                  const _TEXTFIELD =  TEXTFIELD() 
                  _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                  return _TEXTFIELD
                 },
                vm => {
                  const _SELECT = SELECT()
                  _SELECT.attrs.items = [3,2,3]
                  return _SELECT
                },
                '计算值'
  
              ]},
              {...[
                'Fict. Diam.',
                'mm/inch',
                vm => {
                  const _TEXTFIELD =  TEXTFIELD() 
                  _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                  return _TEXTFIELD
                 },
                vm => {
                  const _SELECT = SELECT()
                  _SELECT.attrs.items = [3,2,3]
                  return _SELECT
                },
                '计算值'
  
              ]},
              {...[
                'Colour',
                '',
                vm => {
                  const _TEXTFIELD =  TEXTFIELD() 
                  _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                  return _TEXTFIELD
                 },
                vm => {
                  const _SELECT = SELECT()
                  _SELECT.attrs.items = [3,2,3]
                  return _SELECT
                },
                '计算值'
  
              ]},
              {...[
                'Weight',
                'kg/lb',
                vm => {
                  const _TEXTFIELD =  TEXTFIELD() 
                  _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                  return _TEXTFIELD
                 },
                vm => {
                  const _SELECT = SELECT()
                  _SELECT.attrs.items = [3,2,3]
                  return _SELECT
                },
                '计算值'
              ]},
              {...[
                'Cu Weight',
                'kg/lb',
                vm => {
                  const _TEXTFIELD =  TEXTFIELD() 
                  _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                  return _TEXTFIELD
                 },
                vm => {
                  const _SELECT = SELECT()
                  _SELECT.attrs.items = [3,2,3]
                  return _SELECT
                },
                '计算值'
              ]}
            ]},
            {
              header:['属性','单位','属性值','锁定','计算值'],
              body: [
                {...[
                  'Al Weight',
                  'kg/lb',
                  vm => {
                    const _TEXTFIELD =  TEXTFIELD() 
                    _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                    return _TEXTFIELD
                   },
                  vm => {
                    const _SELECT = SELECT()
                    _SELECT.attrs.items = [3,2,3]
                    return _SELECT
                  },
                  '计算值'
    
                ]},
                {...[
                  'mmAddRemoveTest',
                  '',
                  vm => {
                    const _TEXTFIELD =  TEXTFIELD() 
                    _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                    return _TEXTFIELD
                   },
                  vm => {
                    const _SELECT = SELECT()
                    _SELECT.attrs.items = [3,2,3]
                    return _SELECT
                  },
                  '计算值'
    
                ]},
                {...[
                  'mmVerifyOptionFormulas',
                  '',
                  vm => {
                    const _TEXTFIELD =  TEXTFIELD() 
                    _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                    return _TEXTFIELD
                   },
                  vm => {
                    const _SELECT = SELECT()
                    _SELECT.attrs.items = [3,2,3]
                    return _SELECT
                  },
                  '计算值'
    
                ]},
                {...[
                  'mmVerifyExecuteSQL',
                  '',
                  vm => {
                    const _TEXTFIELD =  TEXTFIELD() 
                    _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                    return _TEXTFIELD
                   },
                  vm => {
                    const _SELECT = SELECT()
                    _SELECT.attrs.items = [3,2,3]
                    return _SELECT
                  },
                  '计算值'
    
                ]},
                {...[
                  'mmVerifyExecuteSQLSelect',
                  '',
                  vm => {
                    const _TEXTFIELD =  TEXTFIELD() 
                    _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                    return _TEXTFIELD
                   },
                  vm => {
                    const _SELECT = SELECT()
                    _SELECT.attrs.items = [3,2,3]
                    return _SELECT
                  },
                  '计算值'
    
                ]},
                {...[
                  'mmVerifyLookupIndex',
                  '',
                  vm => {
                    const _TEXTFIELD =  TEXTFIELD() 
                    _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                    return _TEXTFIELD
                   },
                  vm => {
                    const _SELECT = SELECT()
                    _SELECT.attrs.items = [3,2,3]
                    return _SELECT
                  },
                  '计算值'
    
                ]},
                {...[
                  'mmVerifyByName',
                  '',
                  vm => {
                    const _TEXTFIELD =  TEXTFIELD() 
                    _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                    return _TEXTFIELD
                   },
                  vm => {
                    const _SELECT = SELECT()
                    _SELECT.attrs.items = [3,2,3]
                    return _SELECT
                  },
                  '计算值'
    
                ]},
                {...[
                  'mmAttsAndFormats',
                  '',
                  vm => {
                    const _TEXTFIELD =  TEXTFIELD() 
                    _TEXTFIELD.attrs.appendOuterIcon = 'create'  
                    return _TEXTFIELD
                   },
                  vm => {
                    const _SELECT = SELECT()
                    _SELECT.attrs.items = [3,2,3]
                    return _SELECT
                  },
                  '计算值'
                ]}
              ]},
          ],
          '成本': [ {
            header:['属性','属性值','锁定','计算值'],
            body: [
              { ...['原料成本','$',vm => {
                const _TEXTFIELD =  TEXTFIELD()
                _TEXTFIELD.attrs.appendOuterIcon = 'create'
                _TEXTFIELD.attrs.event = {
                  'click:append-outer': function(e) {
                    console.log(vm)
                  }
                }    
              return _TEXTFIELD
            },'计算值'] },
              { ...['原料成本(出口)','$',vm => {
                const _TEXTFIELD =  TEXTFIELD()
                _TEXTFIELD.attrs.appendOuterIcon = 'create'
                _TEXTFIELD.attrs.event = {
                  'click:append-outer': function(e) {
                    console.log(vm)
                  }
                }    
              return _TEXTFIELD
            },'计算值']}
            ]
            },
            {
              header:['属性','属性值','锁定','计算值'],
              body: [
                { ...['营业成本','$',vm => {
                  const _TEXTFIELD =  TEXTFIELD()
                  _TEXTFIELD.attrs.appendOuterIcon = 'create'
                  _TEXTFIELD.attrs.event = {
                    'click:append-outer': function(e) {
                      console.log(vm)
                    }
                  }    
                return _TEXTFIELD
              },'计算值']},
                { ...['成本','$',vm => {
                  const _TEXTFIELD =  TEXTFIELD()
                  _TEXTFIELD.attrs.appendOuterIcon = 'create'
                  _TEXTFIELD.attrs.event = {
                    'click:append-outer': function(e) {
                      console.log(vm)
                    }
                  }    
                return _TEXTFIELD
              },'计算值']}
              ]
            }]
        }
      },
      '设计标题注释': {
        comment: true
      }
    },
  }