<template lang="pug">
 d-fiche(:label="title" :hide-header="hideHeader") 
  v-card(tile flat )
    v-card-text
      div.mb-1
       i(v-if="typeof subTitle === 'string'" v-text="subTitle")
       v-subheader(v-else-if="typeof subTitle === 'object'" v-text="subTitle.title")
      v-form(v-for="(v,i) in form" :key="v.id")
        d-select(v-if="v.select"
                 auto   
                 :label="v.label" 
                 :items="v.items" 
                 v-model="v.select").ma-0
        d-text-field(v-else
                     auto
                     clearable
                     :label="v.label" 
                     v-model="v.text"
                     :append-outer-icon="v.handle && v.handle.ico"
                     @click:append-outer="v.handle && v.handle.cb($event)"
                     v-tip:v-input__append-outer="v.handle && v.handle.tip")
    v-card-actions(v-if="action")
      v-btn(small class="mx-auto" @click="$emit('action-click',formData)" v-text="action" :to="actionTo") 
      slot(name="action")                     
</template>
<script>
import data from './data.js'

export default {
    name: 'd-popup',
    install(Vue) {
        Vue.component(this.name,this)
    },
    props: {
        title: String,
        subTitle: {
           type: [String,Object]
        },
        form: {
           type: Array
        },
        action: String,
        actionTo: String,
        isShow: {
            type: Boolean,
             default: false
        },
        hideHeader: Boolean,
       
    },
    data() {
      return {
        select: null
      }
    },
    computed: {
      formData() { // 提交表单数据
         let res = {}
         if(this.form) {
           this.form.forEach((item,i) => {      
           res[item.label] = item.text ? item.text : (item.select ?  item.select : '')
         })
         }
         return res
      }
    },
    methods: {
       click(e) {
         console.log(111)
       }
    },
    watch: {
      formData: {
        handler: function(val) {
          console.log(val)
        },
        deep: true,
        immediate: true
      }
    }
    
}


</script>