<template lang="pug">
div
 d-fiche(v-if="lead" v-bind="lead")
 v-data-table(
   ref="table"
   v-bind="$attrs"
   v-on="$listeners"
   v-model="selected"
   select-all
   item-key="id"
   :headers="headers"
   :items="body | bodyHandler").row-hover--shadow
   // 头
   template(slot="headers" slot-scope="props")
    tr(
      v-bind="getbind(props)"
       :class="[`t_h-${headerHeight}`,headerColor && headerColor]")
      // 多选
      th(v-if="select" 
         style="border-right:1px solid rgba(0,0,0,0.12);padding: 0 0 0 8px;"
         )
       v-checkbox(hide-details
                 v-model="props.all"
                 :indeterminate="props.indeterminate"
                 @click.native="selectedItem") 
      // header
      th(
         v-for="(per,index) in props.headers" 
         :colspan="per.colspan"
         :rowspan="per.rowspan"
         
         :class="['column sortable', $attrs.pagination && $attrs.pagination.descending ? 'desc' : 'asc', per.value === ($attrs.pagination && String ($attrs.pagination.sortBy)) ? 'active' : '', `text-xs-${ per.align ? per.align : 'left' }` ]"
         :style=`{ 
                  borderRight: index + 1 <   (props.headers && props.headers.length) && '1px solid rgba(0,0,0,0.12)',
                  borderBottom: '1px solid #999',
                  backgroundColor: per.color,
                  width: per.width,
                  padding: per.padding || '0 .5rem'
                 }`
         
         @click="$attrs.pagination && changeSort(per.value)"
         )
         v-icon(v-if="$attrs.pagination") {{ $attrs['sort-icon'] || 'arrow_upward'}}
         span {{ per.text }}
         
   // body   
   template(slot="items" slot-scope="props" ) 
    tr(
       v-bind="getBodyProps(props,header && header.length)" 
       :style="hideRowshadow && 'background-color:#ffffff!important'"
       )
       
      // 多选
      td(v-if="select" style="border-right:1px solid rgba(0,0,0,0.12);width: 40px;padding: 0 0 0 8px;" )
       v-checkbox(hide-details v-model="props.selected"  )
      // body content
      td(v-ripple="false" v-for="(per,key,index) in props.item" 
         :colspan="per.colspan"
         :rowspan="per.rowspan"
         :class="[`t_h-${bodyHeight}`,per.class]"
         :style=`{
                  borderLeft: (index === undefined ? key : index) !== 0 && (typeof per.border === 'undefined' ?   true : per.border) && '1px solid rgba(0,0,0,0.12)',     
                  backgroundColor: per.color,
                  width: per.width,
                  padding: per.padding || '0 .5rem'
                 }`)
         component(v-if="per.component" :is="per.component"  v-bind="per.attrs" )
         span(v-else v-text="typeof per === 'object' ? per.text : per")
   slot(slot="footer" name="footer")
   slot(slot="no-data" name="no-data")

</template>
<script>
import data from "./data.js";
// import { attrs } from '../../mixins'
export default {
  name: "d-table",
  install(Vue) {
    Vue.component(this.name, this);
  },
  props: {
    select: {
      type: Boolean,
      default: false
    },
    topBorder: {
      type: Boolean,
      default: false
    },
    lead: {
      type: Object
    },
    header: {
      type: Array
      // default: () => data.headers
    },
    headerHeight: {
      type: Number,
      default: 2
    },
    headerBorder: {
      type: Boolean,
      default: true
    },
    headerColor: {
      type: String
    },
    body: {
      type: Array
      // default: () => data.items
    },
    bodyHeight: {
      type: Number,
      default: 2
    },
    hideRowshadow: {
      // hover 样式
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mainHeaderCol: null,
      selected: [], // 存放多选的元素
    };
  },
  computed: {
     headers() {
       let header = this.header
       if (header && header.pop) {
                 header.forEach((el, i) => {
                   if (typeof el === "string") {
                     header[i] = {
                       text: el,
                       value: el
                     };
                   } else if (typeof el === "object") {
                     if (!el.value) {
                       header[i].value = i + '' // type string
                     }
                   }
                 });
             }

       return header
     },
     maxRowSpan() {
       const { rowspan } = this
       return {
            total: rowspan.length && Math.max(...rowspan),
            colspan: this.colspan
         }
     }
  },
  // mixins: [attrs],
  filters: {
    headerHandler(header) { // 表头过滤器
      if(header) {
        header.forEach(col=> {
         if(col.children) {
            this.rows ++
            console.log(col)
         }
         
      })
      }

     return header
    },
    bodyHandler(items) {
      
      // 表格内容过滤器
      //  let header = Array.from({length:length}, (v,i) => i+1+''),
      //      headers = {}
      //      header.forEach(v => headers[v] = '') // 若某一列没有传值占位

      if (items) {
        items.forEach((item, i) => {
          item.id = i; // 每行唯一索引
          //  if(!item.pop) {
          //    items[i] = item
          //  }
        });
      }
      
      return items;
    }
  },
  methods: {
    getbind(props) {
    
      
      // this.mainHeaderCol = e
    
    },
    getBodyProps(props, rows) {
     
      // 表格主体处理
      delete props.item.id;
      Object.keys(props.item).forEach(key => {
        if (props.item[key] instanceof Function) {
          props.item[key] = props.item[key].call(this, this);
        }
      }); 
    },
    // selectedItem(i) {
    //   if (this.selected.length) {
    //     this.selected = [];
    //   } else {
    //     this.selected = this.body.slice();
    //   }
    // },
    // changeSort(column) {
    //   // 排序
    //   if (this.$attrs.pagination.sortBy === column) {
    //     this.$attrs.pagination.descending = !this.$attrs.pagination.descending; // 改变class 排序
    //   } else {
    //     this.$attrs.pagination.sortBy = column;
    //     this.$attrs.pagination.descending = false;
    //   }
    // }
  },
  // watch: {
  //   selected: function(val) {
  //     console.log(val);
  //   }
  // },
  mounted() {
   
    // this.$store.commit('COMPONENT/COMPDATA',this)
    // let table = this.$refs.table.$el.children[0].children[0]
    // table.border = 1
    // table.cellpadding = 0
    // table.cellspacing = 0
    // table.style = "border: 1px solid #ff5000"
    // table.cellspacing = 0
  }
};
</script>

<style >
/* .theme--light .v-table thead tr:first-child, .application .theme--light.v-table thead tr:first-child {
    border-bottom: 0px solid rgba(0,0,0,0.12);
} */
</style>                  
              
              
                 
                                    
                 
                     
                        
      
                                                                  
        
                              
                  
                                                                                               
                                            
                                  
                                            
                  
                                             
                          
              
                                                                                                                                  
                                              
                                      
                 
                                                                                                            
                                            
                                  
                                                  
                   
                                                                              
                                      
         
           
        
                            
                                                    

                
                   
                  
                                     
      
            
                    
                        
                        
          
                 
                        
                                          
          
                       
                        
                     
          
                       
                         
                        
          
                      
                       
          
               
                        
                                        
          
                     
                         
                      
          
                        
                          
                          
         
      
               
                
                                 
                                                                                 
                       
                                             
                                     
                                                    
           
                     
        
      
              
                           

                        
                                              
                                       
                                             
                                 
                                  
                                  
                         
                                                    
                                   
                    
                    
                          
                                  
                                    
            
                       
           
         
       
      
              
                   
                             
          
                            

                                                                
                      
             
                                                 
             
                                                      
                                    
                                           
                          
                                                             
                                
                        
              
           
                                          
                                     
           
                                         
                                     
            
         
                                                    
                                                         
                                                       
                
                                                           

                 
             
              
                                          
                                   
       
       
      
               
                                                                   
                           
                                
                                
                                                    
        
                                
       
     
 
         

