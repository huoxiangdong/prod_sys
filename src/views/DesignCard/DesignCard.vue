<template lang="pug">
div
 v-carousel(
 hide-delimiters
 hide-controls
 :value="change"
 :cycle="false").t_h-0
  v-carousel-item( v-for="(item,i) in carousels" :key="i" )  
    v-layout(row)
     v-flex
      // 侧边栏
      d-sidebar(:items="sideBar" :width="200")
     v-flex(xs11)
      // bom
      d-table(hide-actions
            hide-rowshadow 
            header-color="grey lighten-1"
            :header-height="2"
            :header="header"
            :body="body")
 // 选项区            
 // 显示标头参数
 v-dialog(
   v-model="show_designHeader" 
   :fullscreen="d_fullscreen"
   )
  d-craft(
    :sidebar="designHeader.sidebar"
    :tabs="designHeader.tabs"
    )
  v-dialog(v-model="show_designHeaderAdvancedOptions")
    d-craft(
      :sidebar="designHeader.advancedOptions.sidebar"
      :tabs="designHeader.advancedOptions.tabs")


 v-dialog(v-model="d_history")
   d-fiche(label="设计历史" 
           :height="500")
    v-container(fluid)
      d-table(:lead="lead" hide-actions)
 // 编辑设计注释
 v-dialog(v-model="designText")
  d-fiche(label="设计注释" 
         :height="500"
         :close="designTextClose")
    v-container(fluid)
     v-layout(row wrap)
      v-flex
       v-textarea(solo hint="正在输入...")
      v-flex(offset-xs11)
       d-btn(small) 确认
 //v-dialog('为当前备选创建新设计' value='1')
   d-fiche(label="设计版本")
    v-container(fluid)
     v-toolbar.red
 // 添加层
 v-dialog(persistent v-model="show_addLayer" width="350")     
  d-popup(:close="addLayerClose"
          title="添加层"
          subTitle="请输入新层信息"
          :form="addLayerForm"
          action="确认"
          @action-click="actionClick") 
 // 层
 v-dialog(persistent v-model="show_layer")
  d-craft(:sidebar="layer.sidebar" :tabs="layer.tabs")

//v-card(tile)
    v-data-table(:headers="header"
                 :items="body"
                 hide-actions )
     // 头    
     tr(slot="headers" slot-scope="props").t_h-2.grey.lighten-2
        th(v-for="per in props.headers" 
           :key="per.id"
           v-text="per.text"
           :style="per.style").column.sortable.px-1.text-xs-right
     // 需要循环
     tr(slot="items" slot-scope="props" v-bind="getProps(props)")
       td(v-for="per in props.item" 
         :key="per.id").t_h-2.px-1.text-xs-right
        component(v-if="per.component" :is="per.component")
        span(v-else v-text="per")
     // 子
     template(slot="expand" slot-scope="props")
        v-free-table(
         :headers="childHeaders"
         :items="items.child"
          hide-actions
          ).flex.xs10.offset-xs2.elevation-1.pa-0
         // 头
         template(slot="headers" slot-scope="props")
           tr.t_h-2.grey.lighten-2
            th(
              v-for="per in props.headers" 
              :key="per.id"
              v-text="per.text"
              ).t_h-0.column.sortable.text-xs-right.pa-1  
         template(slot="items" slot-scope="props")
           td(
              v-for="per in props.item"
              :key="per.id"
              class=""
              v-text="per").t_h-1.text-xs-right.px-1
  
</template>
<script>
import data from "./Data/index.js";

export default {
  name: "DesignCard",
  data() {
    return {
      ...data,
      show_designHeader: false, // 查看标头参数显示
      show_designHeaderAdvancedOptions: true, // 标头参数高级选项
      d_fullscreen: true, // 全屏控制
      d_history: false, // 查看历史
      designText: false,

      show_addLayer: false, // 添加层
      show_layer: false,
      lead: {
        label: "测试",
        cLabel: "车市",
        btn: "显示日志"
      },
      listShow: false,

      
    };
  },
  computed: {
    carousels() {
      // 卡片
      return this.$store.state.COMMON.NEWDESIGN;
    },
    change: {
      // 切换卡片
      get: function() {
        return this.$store.state.COMMON.CHANGE;
      },
      set: function(val) {
        return this.$store.dispatch("COMMON/PASSDATA", {
          state: "CHANGE",
          payload: val
        });
      }
    }
  },
  methods: {
    getProps(props) {
      props.item = { ...props.item, ...this.item };
      // if(!props.expanded) {
      //    props.expanded = true
      // }
      //console.log(props)
    },
    designTextClose() {
      this.designText = false;
    },
    addLayerClose() {
      // 关闭添加层
      this.show_addLayer = false;
    },
    actionClick(e) {
      // 添加层确认
      console.log(e);
    }
  },
  watch: {
    carousels: {
      handler: function(val) {
        if (val) {
          this.change = val.length; // 卡片默认显示最后一个
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
   
  }
}; 
</script>

