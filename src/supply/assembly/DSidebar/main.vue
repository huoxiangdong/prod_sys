<template lang="pug">
v-card(flat tile :width="width")
    d-fiche(:label="caption" v-bind="$attrs")
     slot(name="menuContent" slot="menuContent" )
      
    v-navigation-drawer(permanent floating :style="shadow && 'border-left:1px solid rgba(0,0,0,0.12);border-bottom: 1px solid rgba(0,0,0,0.12)'").pa-0
       v-list(dense v-drag="items")
        template(v-for="(item, index) in items")
         v-list-tile(
           
           :key="index"
           @click="item.cb && item.cb($event)").list-hover--shadow
           v-list-tile-content()
            v-layout(align-center)
             v-flex(v-if="order")
              v-list-tile-title {{ index + '.'}}
             v-flex
              v-list-tile-title {{ item.title ? item.title : item }}
            
            //slot(:name="item.title" v-bind="{item,index}")
            //v-list-tile-action
             v-icon.mr-2 {{ item.icon }}
         v-divider(v-if="index + 1 < items.length" )
    
    //design-history
</template>
<script>
import data from './data.js'

export default {
  name: 'd-sidebar',
  install(Vue) {
    Vue.component(this.name, this);
  },
  props: {
    caption: {
      type: String,
      default:'选项'
    },

    order: {
      type: Boolean,
      default: false
    },
    width: Number,
    items: {
      type: Array,
      default: () => data.items
    },
    shadow: Boolean
  },
  data() {
    return {
      // items: data.items,
      dialog: false
    }
  },

  mounted() {
    // console.log(this)
  }
}

</script>

<style lang="stylus">
.v-list--dense .v-list__tile:not(.v-list__tile--avatar)
  height 30px
</style>
