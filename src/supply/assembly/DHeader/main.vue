<template lang="pug">
v-toolbar(card :height="height").grey
 d-btn(small
       :icon="btn.icon"
       v-for="btn in btns"
       :key="btn.id"
       v-tip="btn.title"
       @click="btn.handler && btn.handler($event)")
 //v-btn(small  
       icon
       v-for="per in btns" 
       :key="per.id" 
       v-tip="per.title"
       v-if="$route.path === '/' ") 
    v-icon(small) {{per.icon}}
 d-info(v-if="$route.path === '/DesignCard'")
 //v-btn(small icon @click.native.stop="dialog = true") 
   v-icon add
 //v-toolbar-items
  v-icon(v-for="color in colors" :color="color") fiber_manual_record
  v-toolbar-title(style="margin-right:10rem")
  v-toolbar-title(v-for="(val,key) in info").py-2.caption.grey--text.text--darken-3 {{ key + val }}
</template>
<script>
    export default {
        name: 'd-header',
        install(Vue) {
            Vue.component(this.name,this)
        },
        props: {
           height: {
               type: Number,
               default: 38
           },
           btns: {
               type: Array
           }
        },
        data() {
            return {
                colors: ['teal','blue','red'],
               
                info: {
                    '电线种类:': '测试',
                    '说明:': '40x0.5 Sq.mm Class 2 PAC',
                    '状态:': 'Unconfirmed',
                    '最后更新日期:': '24-May-2017',
                    '最后更新者:': 'admin'
                }
            }
        }
    }
</script>