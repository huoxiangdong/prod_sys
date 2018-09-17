export default {
// table
header_1: ['参数','计算单位','参数值','锁定','参数计算值'],
body_1: [
  { 
    1: 'Colour', 
    3: { component: 'd-select',items: ['测试1', 'Bar', 'Fizz', 'Buzz'] }, 
    4: { component: 'd-checkbox' } 
  },
  { 
    1: 'Colour 2', 
    3: { component: 'd-select', items: ['测试1', 'Bar', 'Fizz', 'Buzz'] }, 
    4: { component: 'd-checkbox' } 
  }
],

header_2: ['参数','计算单位',{ text: '参数值',colspan: "2" },'锁定','参数计算值'],
body_2: [
  { 
    1: '层', 
    2: '', 
    3: { component: 'd-text-field' },
    4: '不确定功能', 
    5: { component: 'd-checkbox' }, 
    6: '' 
  },
  { 
    1: 'Material' ,
    2: 'mm', 
    3: { component: 'd-text-field' },
    4: '不确定功能',  
    5: { component: 'd-checkbox' }, 
    6: ''
  },
  { 
    1: 'Inner Diameter', 
    2: 'mm', 
    3: { component: 'd-text-field' },
    4: '不确定功能',  
    5: { component: 'd-checkbox' }, 
    6: '' 
  },
  {   
    1: 'Min Thickness',
    2: 'mm', 
    3: { component: 'd-text-field' },
    4: '不确定功能', 
    5: { component: 'd-checkbox' }, 
    6: '' 
  },
  {
    1: 'Nominal Thickness', 
    2: 'mm', 
    3: { component: 'd-text-field' }, 
    4: '不确定功能', 
    5: { component: 'd-checkbox' }, 
    6: '' 
  },
  { 
    1:'Max Thickness' ,
    2: 'mm', 
    3: { component: 'd-text-field' },
    4: '不确定功能',  
    5: { component: 'd-checkbox' }, 
    6: ''
  },
  { 
    
    1: 'Nominal Diameter' ,
    2: 'mm', 
    3: { component: 'd-text-field' },
    4: '不确定功能',  
    5: { component: 'd-checkbox' }, 
    6: ''
  }
],

header_3: ['参数','计算单位',{ text: '参数值',colspan: "2" },'锁定','参数计算值'],
body_3: [
  { 
    1: 'Min Diam', 
    2: 'mm', 
    3: { component: 'd-text-field' },
    4: '不确定功能', 
    5: { component: 'd-checkbox' }, 
    6: '' 
  },
  { 
    1: 'Max Diam' ,
    2: 'mm', 
    3: { component: 'd-text-field' },
    4: '不确定功能', 
    5: { component: 'd-checkbox' }, 
    6: ''
  },
  { 
    1: 'Fict Diam', 
    2: 'mm', 
    3: { component: 'd-text-field' },
    4: '不确定功能', 
    5: { component: 'd-checkbox' }, 
    6: '' 
  },
  {   
    1: 'Nominal Weight',
    2: 'kg', 
    3: { component: 'd-text-field' },
    4: '不确定功能', 
    5: { component: 'd-checkbox' }, 
    6: '' 
  },
  {
    1: 'Cost', 
    2: '¥', 
    3: { component: 'd-text-field' }, 
    4: '不确定功能',
    5: { component: 'd-checkbox' }, 
    6: '' 
  }
],

items: [
  { title: '查看设计' },
  { title: '保存并查看设计' },
  { title: '保存'},
  { title: '保存并继续下一步' },
  { title: 'I/O 切换' },
  { title: '下一层' },
  { title: '删除该层' },
  { title: '添加BOM' },
  { title: '复制最后一个BOM' },
  {
    title: '移除选中的原材料',
    handler(e) {
      // console.log(e)
    }
  },
  { title: '高级选项'}
]
}