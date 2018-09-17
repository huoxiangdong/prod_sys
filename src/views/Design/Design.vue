<template lang="pug">
v-layout(row wrap)
 v-flex(xs3)
   // 搜索
   d-popup(:form="searchForm"
           action="搜索"
           @action-click="submit")
    
    template(slot="action")
      v-spacer
      d-btn(icon="iconfont icon-excel" :icoSize="19")
      d-btn(icon="save")
   v-dialog(v-model="newDesign" persistent max-width="360" "新增设计") 
    d-popup(
      :close="designClose"
      title="添加新设计"
      subTitle="请输入设计头部信息:"
      action="确认"
      action-to="DesignCard"
      @action-click="actionClick"
      :form="newDesignForm")
      
   //v-card(tile flat)
     v-card-text
      // 表单
      v-form(lazy-validation v-model="valid" )
       v-text-field(
         v-model="name"
         label="设计卡号")
       v-text-field(
         v-model="desc"
         label="描述")
       v-select(label="电缆种类")
       v-select(label="审批阶段")
       v-text-field(label="包含的材料")
     v-card-actions
       v-btn(small @click="submit") 搜索
       v-spacer
       v-btn(icon)
        v-icon(size="18") iconfont icon-excel
       v-btn(icon) 
        v-icon save
       
 v-flex(xs9)
   v-layout(wrap)
    v-flex
     d-table(
     select
     :headerHeight = 10
     rows-per-page-text = "每页行数"
     :loading="loading"
     :pagination.sync="pagination"
     :total-items="total"
     :header="headers"
     :body="body")
       v-alert(slot="no-data" :value="true" color="error" icon="warning") 没有可用数据 :( 
  
    //v-flex
     // search bom
     v-card(tile flat)
      // 表格
      v-data-table(
       :headers="headers"
       :items="desserts"
       :pagination.sync="pagination"
       rows-per-page-text = "每页行数"
       :total-items="totalDesserts"
       :loading="loading"  
       item-key="id"
       :search="search"
       select-all
       v-model="selected")
       template(slot="items" slot-scope="props")
         td 
          v-checkbox(v-model="props.selected" hide-details)
         td(v-for="item in tdItem(props.item)" @click="goDesignCard(props.item)") 
          component(v-if="item.component" :is="item.component")
          span(v-else v-text="item")
       template(slot="no-data")
         v-alert(:value="true" color="error" icon="warning")
           | 没有可用数据 :( 
</template>

<script>
import data from './data.js'
export default {
  name: 'Design',
  // model: {
  //   prop: 'btns',
  //   event: 'update:btns'
  // },
  data() {
    
    return {
     ...data,
    craft: false,
    btns: [ // 头部按钮
        {
          title: "新的设计备选",
          icon: "add",
          handler: () => { // 箭头函数内的this指向其宿主对象--> data 
            this.newDesign = true
          }
        },
        {
          title: "新的设计向导",
          icon: "add",
          
        },
        {
          title: "计算电缆设计",
          icon: {
            ico: "iconfont icon-jisuanqi",
            size: 19
          }
        }
      ],
    // btns: [ // 头部按钮
    //   {
    //     title: "新的设计备选",
    //     icon: "add"
    //   },
    //   {
    //     title: "新的设计向导",
    //     icon: "add",
    //     handler: () => this.newDesign = true
    //   },
    //   {
    //     title: "计算电缆设计",
    //     icon: {
    //       ico: "iconfont icon-jisuanqi",
    //       size: 19
    //     }
    //   }
    // ],
    searchForm: [ // 搜索卡片
      { label: '设计卡号', text: ''},
      { label: '描述', text: ''},
      { label: '电线种类', select: '' },
      { label: '审批阶段', select: '' },
      { label: '包含的材料', text: ''}
      ],
    newDesignForm: [ // 新增设计
     { label:'设计卡号', text: '' },
     { label: '标准', select: '', items: ['测试1','测试2','测试3'] },
    ],
    newDesign: false,
    valid: false,
    name: '',
    // nameRules: [
    //   v => !!v || '设计卡号不能为空',
    //   v => v.length <= 10 || 'Name must be less than 10 characters'
    // ],
    desc: '',
    // emailRules: [
    //   v => !!v || '不能为空',
    //   v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    // ],
    // 验证
    // search bom
    totalItems: [],
    selected: [], // 选择
    search: '', // 搜索
    total: 0, // 手动设置项目的总数，就可以禁用内置排序和分页，与分页属性一起使用，以启用服务端排序和分页
    body: [], // 表格每行数据
    loading: false, // 进度条
    pagination: {
      sortBy: 'info'
    }, // 分页
    headers: data.header
  }
  },
  computed: {

    viewSize() {
      const { $vuetify: { breakpoint: { name } } } = this;
      return name;
      //if(name) return name
    },
    // pages () {
    //     if (this.pagination.rowsPerPage == null ||
    //       this.pagination.totalItems == null
    //     ) return 0

    //     return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    //   }
  },
  methods: {
    goDesignCard(item) {
      this.$router.push('DesignCard')
    },
    // 表单提交
    submit() {
      this.loading = true
      this.$http.get('/api/data',{
        row: 10
      }).then(res => {     
        this.totalItems = res.data // 缓存
        this.getDataFromApi()
      })
    },
    // search bom
    getDataFromApi() {
        const { sortBy, descending, page, rowsPerPage } = this.pagination; // 分页
        
        let items = this.totalItems; // 表格数据
        const total = this.total = items.length;

        if (this.pagination.sortBy) { // 排序
          items = items.sort((a, b) => {
            const sortA = a[sortBy];
            const sortB = b[sortBy];

            if (descending) {
              if (sortA < sortB) return 1;
              if (sortA > sortB) return -1;
              return 0;
            } else {
              if (sortA < sortB) return -1;
              if (sortA > sortB) return 1;
              return 0;
            }
          });
        }

        if (rowsPerPage > 0) { // 每页行数
          items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage);
        }
        this.body = items
        this.loading = false
    },
    
     tdItem(item) {
       
      let obj = { ...item }
      delete obj.value
      delete obj.id
      obj.info = {
        component: this.$options.components.VInfo
      }
      return  obj   
    },
    actionClick(e) { // 新增设计卡 表单提交
      this.$store.dispatch('COMMON/PASSDATA',{
          state: 'NEWDESIGN',
          stack: true,
          payload: e
        })
    },
    designClose() {
      this.newDesign = false
    }
  },
  watch: {
    // search bom
    pagination: {
      handler(val) {   
        this.getDataFromApi()    
      },
      deep: true
    },
    // btns: {
    //   handler: function(val) {
    //     this.$emit('update:btns',val)
    //   },
    //   immediate: true
    // }
  },
  mounted() {
     
    this.$store.dispatch('COMMON/PASSDATA',this.btns)
  }
};
</script>
<style lang="stylus">
.v-label 
  font-size 14px

</style>
