<template lang="pug">
v-dialog(width="800" )
  v-card
    v-toolbar(flat height="35")
     v-toolbar-title.body-1 {{ title }}
    v-table
</template>
<script>
    export default {
       props: {
           title: {
               type: String,
               default: '历史'
           }
       },
       
    }
</script>

