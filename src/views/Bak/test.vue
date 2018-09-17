<template lang="pug">
v-container
 v-flex
  v-card
   d-table(
     hide-actions
     :header="h"
     :body="header"
   )
 v-flex
  v-card
   d-table(
     hide-headers
     hide-actions
    
     :body="body"
   )
    template(slot="footer")
     td(colspan="100%")
      v-toolbar(tile flat).white
       v-toolbar-title.body-1.red--text 1. 按 / 切换用户, 2. 按 * 切换设备, 3. 按 + 选择字符 4. 按 H 表示发出求助邮件
       v-spacer
       v-toolbar-title.body-1 选择:
       d-text-field
</template>
<script>
export default {
  data() {
    return {
      h: [
        { text: '222',
          colspan: 2
        },
        { text: '222'},
        { text: '222'},
        { text: '222'},
        { text: '222'},
        { text: '222'},
        { text: '222'},
      ],
      header: [
       {...[{
         text: '用户账号:',
         width: '150px',
         class: ['font-weight-bold','teal lighten-4']
       },{
         text: 'cao/曹操',
         width:'150px'
         },{
         text: '班别:',
         width: '150px',
         class: ['font-weight-bold','teal lighten-4']
       },'A',{
         text: '设备号:',
         width: '150px',
         class: ['font-weight-bold','teal lighten-4']
       },'',{
         text: '本次已完成数量:',
         class: ['font-weight-bold','teal lighten-4']
       }]},
       {...[{
         text: '生产令:',
         width: '150px',
         class: ['font-weight-bold','teal lighten-4']
       },'',{
         text: '工序号:',
         width: '150px',
         class: ['font-weight-bold','teal lighten-4']
       },'','','',{
         text: '指令累计已完成数量:',
         class: ['font-weight-bold','teal lighten-4']
       },'']},
       {...[{
         text: '制品编号:',
         width: '150px',
         class: ['font-weight-bold','teal lighten-4']
       },'',{
         text: '描述:',
         width: '150px',
         class: ['font-weight-bold','teal lighten-4']
       },'','','',{
         text: '指令数量:',
         
         class: ['font-weight-bold','teal lighten-4']
       },'']},
       {...[{
         text: '实际线速:',
         width: '150px',
         
         class: ['font-weight-bold','teal lighten-4']
       },
       '',
       '',
       '',
       '',
       '',
       {
         text: '设计卡:',
         width: '150px',
         class: ['font-weight-bold','teal lighten-4']
       }]},
      ],
      body: [
        {
          ...[
            {
             text: '可以选择以下工作:',
             
             class: ['font-weight-bold','teal lighten-4','body-1','red--text']
           },
           {
             class: ['font-weight-bold','teal lighten-4']
           },
            {
             text:'开始生产时间:',
             class: ['font-weight-bold','teal lighten-4','body-1','red--text']
           },
           {
             class: ['font-weight-bold','teal lighten-4']
           },
          
          ]
        },
        { ...[
          
          {
          text: "1. 增加本电脑的共用用户",
          class: ['font-weight-bold',]
        },
        {
          text: '11. 报废情况',
          class: ['font-weight-bold',]
        },
        {
          text: '21. 斜包要求',
          class: ['font-weight-bold',]
        },
        {
          text: '31. 显示生产排期',
          class: ['font-weight-bold',]
        }] },
        { ...[
          {
            text: "2. 增加新的操作设备",
            class: ['font-weight-bold',]
          },
          {
            text: '12. 拉丝操作要求和细拉工艺',
            class: ['font-weight-bold',]
          },
          {
            text: '22. 成品/胶粒标贴设定',
            class: ['font-weight-bold',]
          },
          {
            text: '32. 退出',
            class: ['font-weight-bold',]
          }
          ] },
        { ...[
          {
            text: "3. 开始新的生产指令",
            class: ['font-weight-bold',]
          },
          {
            text: '13. 导体绞合操作要求',
            class: ['font-weight-bold',]
          },
          {
            text: '23. 生产类别设定',
            class: ['font-weight-bold',]
          }
          ] },
        { ...[
          {
            text: "4. 选择新的型号生产(同指令)",
            class: ['font-weight-bold',]
          },
          {
            text: '14. 编制要求',
            class: ['font-weight-bold',]
          },
          {
            text: '24. 绕包要求',
            class: ['font-weight-bold',]
          }
          ] },
        { ...[
         {
           text:  "5. 投入",
           class: ['font-weight-bold',]
         },
        {
          text: '15. 成缆要求',
          class: ['font-weight-bold',]
        },
        {
          text: '25. 成品尾数标贴/带尾数投入的标贴打印',
          class: ['font-weight-bold',]
        }
        ] },
        { ...[
          {
            text:"6. 产出",
            class: ['font-weight-bold',]
          },
          {
            text: '16. 剩余物料或半成品',
            class: ['font-weight-bold',]
          },
          {
            text: '26. 异常处理',
            class: ['font-weight-bold',]
          }
          ] },
        { ...[
          {
            text: "7. 输入接头",
            class: ['font-weight-bold',]
          },
          {
            text: '17. 不良记录',
            class: ['font-weight-bold',]
          },
          {
            text: '27. 压出工序其它投入',
            class: ['font-weight-bold',]
          }
          ] },
        { ...[
          {
            text: "8. 停机",
            class: ['font-weight-bold',]
          },
          {
            text: '18. 重印标贴',
            class: ['font-weight-bold',]
          },
          {
            text: '28. 调配油墨',
            class: ['font-weight-bold',]
          }
          ] },
        { ...[
          {
            text: "9. 结束当前型号生产",
            class: ['font-weight-bold',]
          },  
          {
            text: '19. 设定当前班别',
            class: ['font-weight-bold',]
          },
          {
            text: '29. 设定/取消成品打印大轴标贴',
            class: ['font-weight-bold',]
          }
          ] },
        { ...[
          {
            text: "10. 押出机实际线速及其它",
            class: ['font-weight-bold',]
          },
          {
            text: '20. 其它',
            class: ['font-weight-bold',]
          },
          {
            text: '30. 开始生产',
            class: ['font-weight-bold',]
          },
          ] }
      ]
    };
  },
  mounted() {
    console.log(this._l)
  }
};
</script>

               
              
              
                 
                                    
                 
                     
                        
      
                                                                  
        
                              
                  
                                                                                               
                                            
                                  
                                            
                  
                                             
                          
              
                                                                                                                                  
                                              
                                      
                 
                                                                                                            
                                            
                                  
                                                  
                   
                                                                              
                                      
         
           
        
                            
                                                    

                
                   
                  
                                     
      
            
                    
                        
                        
          
                 
                        
                                          
          
                       
                        
                     
          
                       
                         
                        
          
                      
                       
          
               
                        
                                        
          
                     
                         
                      
          
                        
                          
                          
         
      
               
                
                                 
                                                                                 
                       
                                             
                                     
                                                    
           
                     
        
      
              
                           

                        
                                              
                                       
                                             
                                 
                                  
                                  
                         
                                                    
                                   
                    
                    
                          
                                  
                                    
            
                       
           
         
       
      
              
                   
                             
          
                            

                                                                
                      
             
                                                 
             
                                                      
                                    
                                           
                          
                                                             
                                
                        
              
           
                                          
                                     
           
                                         
                                     
            
         
                                                    
                                                         
                                                       
                
                                                           

                 
             
              
                                          
                                   
       
       
      
               
                                                                   
                           
                                
                                
                                                    
        
                                
       
     
 
         

