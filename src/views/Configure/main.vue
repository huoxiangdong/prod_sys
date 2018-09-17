<template lang="pug">
  v-container(fluid )
   v-layout
    v-flex(xs2)
     d-sidebar( order     
               :caption="'工序参数'"
               :items="items"
               :extra="extra")
      d-popup(slot="menuContent" 
              hideHeader
              :form="form")
</template>
<script>
export default {
    data() {
        return {
            items: [111,222,333],
            extra: {
                menu: true,
                ico: 'add',

            },
            form: [
              { label:''}
            ]
        }
    }
}
</script>
