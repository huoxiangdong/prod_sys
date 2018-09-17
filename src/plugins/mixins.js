import Vue from 'vue'
// 全局混入
Vue.mixin({
    created() {
      if(this.$store) {  
        this.$store.commit('COMPONENT/COMPDATA',this)
      }
    }
})