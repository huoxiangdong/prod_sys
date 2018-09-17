<template lang="pug">
v-card.grey.lighten-3
 v-container(fluid grid-list-md)
  v-layout(row )
   // 侧边栏
   v-flex
    d-sidebar(v-bind="sidebar" :width="150")
   v-flex(xs11)
    template(v-for="(tab,key,i) in tabs" )
      // 选项卡
      d-fiche(v-if="!tab.tab && !tab.comment" :key="i" :label="key")
        d-table(hide-actions
                hide-rowshadow
               :header="tab.header"
               :body="tab.body")
      
      d-fiche(v-else-if="tab.tab" :key="i" :label="key")
       
        v-tabs(align-with-title slider-color="primary" height="30" color="transparent").mt-1
         template(v-for="(value,key,i) in tab.items" )
           v-tab.grey.lighten-2 {{ key }}
           v-tab-item.grey.lighten-2
              v-layout.pa-1
               v-flex(v-for="(t,i) in value" :key="i")
                d-table(hide-actions 
                      hide-rowshadow
                     :header="t.header"
                     :body="t.body")   
                    
      d-fiche(v-else-if="tab.comment" :key="i" :label="key")
       v-card(tile flat)
        v-textarea(box hint="正在输入..." background-color="white")
  
</template>
<script>
import data from './data.js'
export default {
  name: 'd-craft',
  install(Vue) {
    Vue.component(this.name, this);
  },
  props: {
    sidebar: Object,
    tabs: Object
  },
  data() {
    return {
      tabTitle: ['常用','测试'],
      
      header_1: data.header_1,
      body_1: data.body_1,
      header_2: data.header_2,
      body_2: data.body_2,
      header_3: data.header_3,
      body_3: data.body_3
    };
  }
};
</script>