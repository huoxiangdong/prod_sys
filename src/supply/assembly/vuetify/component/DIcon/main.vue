<template lang="pug">
div.v-chip__close
   v-icon(v-bind="$attrs" 
          v-on="$listeners" 
          @click="$attrs.cb && $attrs.cb($event)"
          v-text="$attrs.ico || $slots.default[0].text")
</template>
<script>
// import { attrs } from '../../mixins'

export default {
    name: 'd-icon',
    install(Vue) {
        Vue.component(this.name,this)
    },
    // mixins: [attrs]
}
</script>
