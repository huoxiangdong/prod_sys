<template lang="pug">
// ,label_top-zero
div
 v-layout(row wrap )
  v-flex( v-bind="{ [`xs${width}`]: auto ? false : true }").py-0
   v-card(flat tile )
    v-text-field(
    v-bind="$attrs"
    v-on="$attrs.event || $listeners"  
    :class="[height && `v-input__height-${height}`,$attrs.kind && $attrs.kind ]").body-2.font-weight-regular
  //v-flex(v-if="btn").py-0
    d-icon create
</template>
<script>
// import { attrs } from '../../mixins'
export default {
    name: 'd-text-field',
    install(Vue) {
       Vue.component(this.name,this)
    },
    // mixins: [attrs],
    props: {
        auto: {
           type: Boolean,
           default: false
        },
        height: {
            type: Number,
            default: 7
        },
        width: {
            type: Number,
            default: 6
        }
    }
}
</script>

