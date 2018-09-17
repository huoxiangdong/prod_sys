<template lang="pug">
v-card(flat tile width="25" color="transparent")
 v-checkbox(v-bind="$attrs" v-on="$listeners" hide-details  ) 
 
</template>
<script>
export default {
    name: 'd-checkbox',
    install(Vue) {
        Vue.component(this.name,this)
    }
}
</script>
