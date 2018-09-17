<template lang="pug">
// .v-select__size-3.mx-auto label_top-zero .v-select__content-l-1
v-card(flat tile)
 v-select(v-bind="$attrs"
          v-on="$listeners"
          dense
          nudge-top=-25
          :class="[height && `v-input__height-${height}`,!auto && `v-input__width-${width}`, grey && `v-select__color`,$attrs.kind && $attrs.kind]").body-2.font-weight-regular
</template>
<script>
// import { attrs } from '../../mixins'
export default {
    name: 'd-select',
    install(Vue) {
        Vue.component(this.name,this)
    },
    // mixins:[attrs],
    props: {
        height: {
            type: [Number,String],
            default: 6
        },
        width: {
            type: Number,
            default: 6
        },
        auto: {
            type: Boolean,
            default: false
        },
        grey: {
            type: Boolean,
            default: false
        }
    },
    // watch: {
    //     $attrs: {
    //         handler: function(val) {
    //             console.log(val)
    //         },
    //         deep: true,
    //         immediate: true
    //     }
    // }
}
</script>


