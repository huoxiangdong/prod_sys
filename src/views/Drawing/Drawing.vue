<template lang="pug">
v-container
 v-layout(row wrap)
   v-flex(xs3)
    v-card(tile height="250")
     v-list
      v-list-tile( href="javascript:;").list_item
        v-list-tile-action
          v-checkbox(v-model="notifications")
        v-list-tile-content(@click="notifications = !notifications")
          v-list-tile-title TAPING
      v-list-tile( href="javascript:;").list_item
        v-list-tile-action
          v-checkbox(v-model="sound")
        v-list-tile-content(@click="sound = !sound")
          v-list-tile-title LAYUP
      v-list-tile( href="javascript:;").list_item
        v-list-tile-action
          v-checkbox(v-model="widgets")
        v-list-tile-content(@click="widgets = !widgets")
          v-list-tile-title STRANDING
      v-list-tile( href="javascript:;").list_item
        v-list-tile-action
          v-checkbox(v-model="widgets")
        v-list-tile-content(@click="widgets = !widgets")
          v-list-tile-title WIRE_DRAWING
      v-list-tile( href="javascript:;").list_item
        v-list-tile-action
          v-checkbox(v-model="widgets")
        v-list-tile-content(@click="widgets = !widgets")
          v-list-tile-title INSULATING
      v-list-tile( href="javascript:;").list_item
        v-list-tile-action
          v-checkbox(v-model="widgets")
        v-list-tile-content(@click="widgets = !widgets")
          v-list-tile-title 显示所有标签
      v-list-tile( href="javascript:;").list_item
        v-list-tile-action
          v-checkbox(v-model="widgets")
        v-list-tile-content(@click="widgets = !widgets")
          v-list-tile-title 显示所有最终产品的标签
      v-list-tile( href="javascript:;").list_item
        v-list-tile-action
          v-checkbox(v-model="widgets")
        v-list-tile-content(@click="widgets = !widgets")
          v-list-tile-title 显示编制成缆布局标签
   v-flex(xs4)
    v-card(tile height="250")
     v-list
      v-list-tile( href="javascript:;")
        v-list-tile-content(@click="notifications = !notifications")
          v-list-tile-title 标签颜色
        v-list-tile-action
          v-btn(small)
      v-list-tile( href="javascript:;")
        v-list-tile-content(@click="notifications = !notifications")
          v-list-tile-title 侧视
        v-list-tile-action
          v-checkbox(v-model="notifications")
      v-list-tile( href="javascript:;")
        v-list-tile-content(@click="notifications = !notifications")
          v-list-tile-title SVG
        v-list-tile-action
          v-checkbox(v-model="notifications")
      v-list-tile( href="javascript:;")
        v-list-tile-content(@click="notifications = !notifications")
          v-list-tile-title 手动编制成缆结果
        v-list-tile-action
          v-checkbox(v-model="notifications")
   v-flex
    v-card(tile height="250")
     v-list
      v-list-tile( href="javascript:;")
        v-list-tile-content(@click="notifications = !notifications")
          v-list-tile-title 缩放尺寸
        v-list-tile-action
          v-checkbox(v-model="notifications")
      v-list-tile( href="javascript:;")
        v-list-tile-content(@click="notifications = !notifications")
          v-list-tile-title 缩放参数
        v-list-tile-action
          v-checkbox(v-model="notifications")
      v-list-tile
           v-btn(block @click="reduce") 减
      v-list-tile
          v-btn(block @click = "increase") 加
   v-flex(xs12)
    v-card(height="100%")
     d-canvas(:custom = "custom"
              :ratio = "ratio"
               @free = "$ = arguments[0]")
    
</svg>
</template>
<script>
export default {
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false,
      // canvas
      custom: {
        border: '1px solid #ff5000',
        bgColor: 'white'
      },
      ratio: 1.3,
      $: null,
      f: {
        radius: 300
      }
    };
  },
  methods: {
    reduce(e) {
      this.f.radius -= 10;
    },
    increase(e) {
      this.f.radius += 10;
    },
    canvas() {
      
    //  let c1= $.circle($.center.x, $.center.y, 36,{
    //    lineWidth: 5
    //  })
    //  .add(d => {

    //     $.circle(d.x,d.y,d.r+5,{
    //       lineWidth: 3,
    //       strokeStyle: '#eee'
    //     })
    //     .add(d => {
    //       $.circle(d.x,d.y,d.r+3,{
    //         lineWidth: 3
    //       }).render()
    //     })
    //     .render()

        

    //     $.circle(d.x,d.y,5,{
    //       fill: 1,
    //       fillStyle: '#ffad33'
    //     }).render()

        
    //     let num = 6,sm_r = 4.6,layer = 3
    //     for (let i = 0; i <= layer; i++) { // 控制层数
    //       for (let j = 0; j < num*i ; j++) { // 每一圈的小圆个数为 6 * 圈数
    //         let p = $.pointCalc(d.x, d.y, 1+sm_r*2*i, 360 / (num*i) * j);
    //         $.circle(p.x, p.y, sm_r,{
    //           fill: 1,
    //           fillStyle: '#ffad33'
    //         }).render();
    //       }
    //     }
    //   })
       
    //   // $.circle($.center.x,$.center.y,50)
    //   // .add(d => {
    //       $.circle($.center.x,$.center.y,99,{
    //         lineWidth: 10
    //       }).render()
    //       let color = ['blue','green','purple']
    //       for(let i=0;i<3;i++) {
    //         let p = $.pointCalc($.center.x,$.center.y,50,360/3 * i, 360/3)
    //         $.circle(p.x,p.y,p.r)
    //         .add(d => {
            
    //            c1.x = d.x
    //            c1.y = d.y
    //            c1.r = d.r-10
    //            c1.style.strokeStyle = color[i]
    //            c1.render()
    //         })
    //         .render()
    //       }
          
      // })
      // .render()
    // 麻点圆 ↑ 
    
    
 $.circle($.center.x,$.center.y,110).add(d => 
        Array.from(Array(10),(v,k) => 
           $.circle(100,50*k,10)
    )
 ).render()
 
    // $.circle($.center.x,$.center.y,100)
    // .add(() => {
    //   $.circle(10,10,10)
    // })
    // .render()

    } // canvas
  },
  watch: {
    f: {
      handler: function(val, oldVal) {
        this.$nextTick(function() {
          this.$.clearRect(0, 0, $.width, $.height);
          this.canvas();
        });
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {}
  //  watch: {
  //     radius: function(val,oldVal) {
  //       console.log(val)
  //       // this.canvas($)
  //     }
  //   }
};
</script>
<style lang="stylus" scoped>
.list_item >>> {
  a {
    height: 2.1rem;
    font-size: 1rem;
  }
}
</style>


// {
//   style: {
//     stokeStyle: 'black'
//     lineWidth: '30'
//   }
// }

// .stokeStyle('balck')
// .lineWidth(20)

//       let vm = this
//       //   console.log('cnavas')
//       //   console.log(this.ratio)
//       // //  $.ratio = 1
// // $.$circle(100,100,180).render()
//     function drawing(){
//                window.requestAnimationFrame(drawing,$,vm);
//               $.clearRect(0, 0, $.width, $.height) // 清空，否则会有重影
               
//                $.$circle(100,100,vm.radius).render()
//               //  .radius(this.radius)
//               //  .render()
//            }
//      drawing()
   
      // let c = $.$circle(100,100,180)
      //          .radius(this.radius)
      //          .render()

      

      //  .add((d) => {
      //    for(let i = 0; i<d.r*2; i++) {
      //      let dx = d.x-d.r+ (i * Math.random()+1),
      //          dy = d.y-d.r + (i * Math.random()+1)
      //      if(d.x - dx < (d.r - 2)) {
      //           $.point(dx,dy,2)
      //      }
      //    }
      //  })