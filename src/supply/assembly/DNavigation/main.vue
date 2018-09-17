<template lang="pug">
div
  //v-snackbar(value='true' top right :timeout= 0) 
   v-info
  v-toolbar(height="35"  flat :extended="extend").grey
        v-toolbar-side-icon
        v-toolbar-items
         template(v-for="menu in menus"
                )
          v-btn(flat v-if="menu.to" :to="menu.to" :key="menu.id") {{ menu.title }}
          v-menu(offset-y 
                v-else
                :key="menu.id" )
           v-btn(flat slot="activator" ) {{ menu.title }}
           v-list(dense v-if="!menu.to")
            v-list-tile(v-for="list in menu.lists" 
                        :key="list.id" 
                        :to="list.to"
                        @click="")
             v-list-tile-title {{ typeof list === 'object' ? list.title : list }}
        //v-toolbar-items
         v-btn(flat to="/") 设计
         v-btn(flat to="Drawing") 绘图
         v-btn(flat) 基础数据
         v-menu(offset-y )
          v-btn(slot="activator" flat ) 产品管理 
          v-list(dense)
           v-list-tile(v-for="item in products" :key="item" @click="")
            v-list-tile-title(v-text="item")   
         v-menu(offset-y )
          v-btn(slot="activator" flat) 物料管理 
          v-list(dense)
           v-list-tile(v-for="item in items" :key="item" @click="")
            v-list-tile-title(v-text="item")  
         v-divider(vertical)   
         v-btn(flat) 报表系统 
  v-layout('切换按钮 ' ) 
    v-flex(xs8 offset-xs2)
     v-card.card--flex-toolbar
       v-toolbar(height="30")
        v-toolbar-title.body-2 设计卡:
        v-spacer
        v-toolbar-title.body-2 版本:
        v-spacer
        v-toolbar-title.body-2 备选:
        v-spacer
       v-divider
       v-toolbar(card height="35").toolbar_scoll-x
         v-chip(small      
                v-for="(chip,i) in chips" :key="i"   
                @click="$emit('chip-click',i)" ) {{ chip['设计卡号'] }}
          div.v-chip__close.pl-3
           v-icon(@click="$emit('chip-close',$event,i)") $vuetify.icons.delete
      
  //v-card(flat)
    v-toolbar(
      color="primary"
      dark
      extended
      flat)
     v-toolbar-side-icon
    v-layout(row)
      v-flex(xs8 offset-xs2)
        v-card(class="card--flex-toolbar")
          v-toolbar(card prominent)
            v-toolbar-title(class="body-2 grey--text") Title
            v-spacer
            v-btn(icon)
              v-icon search
            v-btn(icon)
              v-icon apps
            v-btn(icon)
              v-icon more_vert    
          v-divider
          v-card-text(style="height: 200px;")
</template>
<script>
    export default {
        name: 'd-navigation',
        install(Vue) {
            Vue.component(this.name,this)
        },
        data() {
            return {
                colors: ['yellow','purple','red'],
                products: ['搜索', '设计卡'],
                routes: []
            }
        },
        props: {
            menus: {
              type: Array,
              default: () => ([
              //  {
              //     title: '产品管理', 
              //     // to: 'Drawing'
              //     lists: [{ title: '半成品',to:'Drawing' }, '成品', '工艺卡']

              //  },
               {
                 title: '设计',
                 to: "/"
               },
               {
                 title: '绘图',
                 to: "Drawing"
               },
               {
                 title: '基础数据',
                 lists: [{ title: '半成品',to:'Drawing' }, '成品', '工艺卡']
               },
              
              ])
            },
            extend: {
              type: Boolean,
              default: false
            },
            items: {
              type: Array,
              default: () => ['半成品', '成品', '工艺卡']
            },
            chips: Array,
            chipEvent: {
              type: Object
            }
            
        },
 
    }
</script>
<style lang="stylus">
  .card--flex-toolbar
    margin-top -0.3rem
  .toolbar_scoll-x 
    overflow-x auto
    &::-webkit-scrollbar 
      height 5px
    // &::-webkit-scrollbar-track 
    //   box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
    &::-webkit-scrollbar-thumb 
       background-color rgba(0,0,0,0.6)
      // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
.v-chip .v-chip__content
      padding: 0 0 0 5px
</style>