<template lang="pug">
v-btn(v-bind="attrs" v-on="$attrs.event" ).ma-0 {{ $attrs.text }}
  slot 
  v-icon(:size="$attrs.icon && $attrs.icon.size || icoSize") {{ typeof $attrs.icon === 'object' ? $attrs.icon.ico : $attrs.icon }}
</template>
<script>
import { attrs } from '../../mixins'

export default {
  name: "d-btn",
  install(Vue) {
    Vue.component(this.name, this);
  },
  props: {
    icoSize: Number
  },
  
   mixins: [attrs],
   methods: {
      special(attrs,key,value) {
         if(key === 'icon') {
              attrs[key] = true
          }
      }
   }
  //  watch: {
  //      attrs: {
  //          handler: function(val) {
  //              console.log(val)
  //          },
  //          deep: true,
  //          immediate: true
  //      }
  //  }
};
</script>