<template lang="pug">
v-card(flat tile v-bind="$attrs")
 v-toolbar(flat v-if="!hideHeader" :height="titleHeight").grey.lighten-1
  v-toolbar-title.body-1 {{ label }}
  v-spacer
  v-toolbar-title.body-1 {{ centerLabel }}
  v-spacer 
  v-menu(v-if="extra && extra.menu"
         :close-on-content-click="false"
         :nudge-width="200"
         offset-x)
   d-icon(slot="activator" @click="extra.cb && extra.cb()") {{ extra.ico }}
   slot(name="menuContent" )
  d-icon(v-else @click="extra.cb && extra.cb()") {{ extra && extra.ico }}
 slot
</template>
<script>
export default {
    name: 'd-fiche',
    install(Vue) {
        Vue.component(this.name,this)
    },
    props: {
       label: String,
       centerLabel: String,
       extra: {
           type: Object,
        //    default: () => ({
        //      ico: 'add'
        //    })
       },
       titleHeight: {
           type: Number,
           default: 28
       },
       hideHeader: {
           type: Boolean,
           default: false
       },
       shadow: {
           type: Boolean,
           default: true
       },
       iClick: Function,
       close: [Boolean,Function]
    }
}

// v-card(flat tile).elevation-5
//      v-toolbar(flat height="30").grey
//       v-toolbar-title.body-1 工艺选项
</script>

