<template lang="pug">
v-app.grey.lighten-1
 v-container(fluid grid-list-md)
   v-layout(row wrap)
     v-flex
      d-navigation(:menus="menus"
                   :chips="chips" 
                   @chip-click="chipClick"
                   @chip-close="chipClose")
     v-flex(xs12)
       // main
       v-card(flat tile ).grey.lighten-3
         d-header(:height="30" :btns="($route.path === '/Design') ? $store.getters['COMMON/PASSDATA'] : []")
         //d-header(:btns="btns")
         v-container(fluid).pa-2
          keep-alive
           router-view
</template>

<script>
export default {
  data: () => ({
    dialog: false, // 对话框
    valid: false,

    // 对话框
    name: "",
    desc: "",
    // 菜单
    menus: [
      {
        title: "设计",
        to: "/"
      },
      {
        title: "绘图",
        to: "Drawing"
      },
      {
        title: '配置',
        to: 'configure'
      },
      {
        title: "基础数据",
        lists: [{ title: "test", to: "Drawing" }, "成品", "工艺卡"]
      }
    ]
  }),
  computed: {
    chips() {
      
      // BOM卡片控制按钮
      return this.$store.state.COMMON.NEWDESIGN;
    },
    viewSize() {
      const { $vuetify: { breakpoint: { name } } } = this;
      return name;
      //if(name) return name
    }
  },

  methods: {
    chipClick(e) {
      // 切换卡片
      if (this.$route.path !== "DesignCard") {
        this.$router.push("DesignCard");
      }
      this.$store.dispatch("COMMON/PASSDATA", {
        state: "CHANGE",
        payload: e
      });
    },
    chipClose(e, i) {
      // 关闭卡片
      e.stopPropagation();
      //  if(i !== 0) {
      this.$store.commit("COMMON/DELSTACKDATA", {
        state: "NEWDESIGN",
        payload: i
      });
      //  }
    },
    click(e) {
      // const { $vuetify: { breakpoint: { name } } } = this;
      this.$store.dispatch("getData");
    }
  },
  
};
</script>
