<template lang="pug">
v-dialog(v-model="dialog" max-width="350")
  d-btn(slot="activator" icon="add").size-1
  //d-popup
  //d-popup(:isShow="dialog"
         @update:isShow="dialog = $event")
  //v-dialog(v-model="dialog"
          max-width="350")
   v-card
    v-toolbar(flat height="35") 
      v-toolbar-title.body-1 添加层
    v-card-text
     i 请输入新层信息:
     v-form(lazy-validation )
        v-layout(wrap)
         v-flex
          v-text-field(
          
            label="层"
            required)
         v-flex
          v-select(
           v-model="select"
           :items="items"
           label="工序"
           required)
  
         v-flex(xs10)
          v-text-field(
            
            label="BOM 项"
            required
            )
         v-flex(xs2)
          v-bottom-sheet(inset)
           v-btn( slot="activator" flat icon).ml-3.mt-3          
            v-icon list
           v-card
            v-card-text 111
    v-card-actions
      v-btn(small).mx-auto 确认   
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
      select: ''
    };
  }
};
</script>