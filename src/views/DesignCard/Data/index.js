import layer from './layer.js'
import designHeader from './header/index.js'

export default {
  designHeader, // 表头参数
  layer, // 层
  sideBar: [ // sideBar
    { title: '查看标头参数',cb: function() {
      this.show_designHeader = true
    }},
    { title: '编辑设计注释',handler: function(e) {
      this.designText = true
     }
    },
    { title: '查看工厂设计标头参数'},
    { title: '计算当前电缆设计'},
    { title: '为当前设计备选创建新版本'},
    { title: '产看设计版本列表'},
    { title: '查看已锁定参数'},
    { title: '激活设计备选'},
    { title: '批准该设计备选'},
    { title: '查看历史',handler: function(e) {
      this.d_history = true
      }
    },
    { title: '新的设计备选'},
    { title: '删除该设计备选的版本'},
    { title: '复制当前设计备选'},
    { title: '查看报表'},
    // { title: '生成ERP项目', icon: 'assignment' },
    // { title: '发送至MES(多层)', icon: 'assignment' },
    { title: '设计文档库'},
    { title: '查看原材料' },
    { title: '查看加工工艺' },
    { title: '选择所有层' },
    { title: '取消选择所有层' },
    { title: '复制选定的层' },
    { title: '删除选定的层' },
  ],


  // Bom 表格
  header: [ "新增层","层", "选择","加工工艺","厚度","直径","重量","成本","任务","默认设备","准备时间", "运行时间","设备:10","设备:20", "设备:30","设备:40"],
  body: [
    {...[
     { component: 'd-icon',attrs: {
       ico: 'add',
       cb: function() {
         this.show_addLayer = true
       }
     }}
    ]}
  ],
    
      // child
      childHeaders: [
        {
          text: '原材料位置',
          value: 'position',
        },
        {
          text: '设计',
          value: 'design'
        },
        {
          text: '说明',
          value: 'description'
        },
        {
          text: '直径',
          value: 'diameter'
        },
        {
          text: '数量',
          value: 'quantity'
        },
      ],
      childItems: [
        {
          position: '10',
          design: 'T_INSTR_CORE_YEL',
          description: '1X0.5 sQ.MM cLASS 2 pac YELLOW',
          diameter: '2.13',
          quantity: '389.34000'   
        },
        {
          position: '10',
          design: 'T_INSTR_CORE_YEL',
          description: '1X0.5 sQ.MM cLASS 2 pac YELLOW',
          diameter: '2.13',
          quantity: '389.34000'   
        }
      ],
      addLayerForm: [ // 新增设计
        {
          label: '层',
          text: ''
        },
        {
          label: '工序',
          select: '',
          items: ['测试1', '测试2', '测试3']
        },
        {
          label: 'Bom项',
          text: '',
          handle: {
            ico: 'list',
            tip: '物料列表',
            cb: function (e) {
              console.log(e)
            }
          }
        },
        {
          label: 'Bom备选',
          text: ''
        }
      ],
}