import { draw } from './utils'
import Free  from '../../free'

export default {
    name: "d-canvas",
    install(Vue) {
        Vue.component(this.name,this)
    },
    props: {
       custom: {
           type: Object
       },
       ratio: Number
    },
    directives: {
        emitFree: {
            inserted: function(el,binding) {

                let self = binding.argument,
                    rect = el.getBoundingClientRect(),
                    ratio = binding.value,
                    pixelRatio =  window.devicePixelRatio || 1
                if(pixelRatio !== 1) {
                    el.style.width = rect.width/pixelRatio + 'px'
                    el.style.height = rect.height/pixelRatio + 'px'
                }
                
                el.height = rect.height * pixelRatio * (ratio ? ratio : 1)
                el.width = rect.width * pixelRatio * (ratio ? ratio : 1)
                let $
                window.$ =  $ = new Free({
                    context: {
                      ctx: el.getContext('2d'),
                      width: el.width ,
                      height: el.height ,
                      ratio: pixelRatio || 1
                    }
                  })
                self.$emit("free",$)
            },
            update: function(el,binding) {
                let ratio = binding.value
                el.height = el.height * (ratio ? ratio : 1)
                el.width = el.width * (ratio ? ratio : 1)
            }
        }
      },
     render(h) {
      const { custom } = this
    
      return h('canvas',{
         
         style: {
             width: "100%",
             height:"100%",
             backgroundColor: custom.bgColor,
            border: custom.border
         },
         directives: [
             {
                name: 'emit-free',
                value: this.ratio,
                argument: this
             }
         ]
      })
    },
   
    mounted() {

  
      
      //   for(let i = 0; i<3; i++) {
          
      //     console.log(Math.floor(Math.random() * i+1))
      //   }
   
     
  
   
 //  $.circle({
 //    attr:[$.center.x,$.center.y,80],
 //    style: {
 //      point : true,
 //      strokeStyle: "#ff5000",
 //      globalAlpha: .5
 //    }
 //  })
 //  .add(({x,y,r,self}) => {
  
 //   for(let i = -80; i < 80; i+=15) {
 //     // $.point(x+$.random(i),y-$.random(i),2)
 //     $.point(x+$.random(i),y,2)
 //   }
    
 // })
 
 // $.circle({
 //   attr: [$.center.x,$.center.y,10],
 //   style: {
 //     point: true
 //   }
 // }).add(({x,y,r,self}) => {
   
 //   for(let i = 0; i<6; i++) {
 //     let p = $.pointCalc(x,y,r,360/6*i)
 //     $.circle(p.x,p.y,r/2)
 //   }           
 // })
//  console.log($.height,$.width)

//  $.text(10,10,"dddd")
//  $.circle({
//    attr: [150,250,80],
//    style: {
//      angle: 30
//    }
//  })




//      .add(({x,y,r,self}) => {
//        for(let i=-100;i< 100;i++) {
//          $.point(x*Math.random()/i,y*Math.random()/i,2)
//        }
//        
//      })

 
//let i =10
//
//function step(timestamp) {
//  
//  if (i < 200) {
//    window.requestAnimationFrame(step)
//  }
//  $.point(i,10,1)
//  i+=10
//}
//
//window.requestAnimationFrame(step)


//    $.line({
//      start: [10, 10],
//      end: [120, 10]
//    })

//    for(let i = -100;i< 100; i++) {
//       $.point(1*Math.random() *i,1*Math.random() *i,3)
//    }


 // f.fillRect(25,25,100,100)
 // f.clearRect(45,45,60,60)
 // f.strokeRect(50,50,50,50)

//    f.$circle({
//      attr: [150, 200, 60],
//      style: {
//        point: 1,
//        strokeStyle: "#ff5000",
//      }
//    }).then(d => {
//      console.log(d)
//      let num = 4
//      for (let i = 0; i < num; i++) {
//        var p = f.pointCalc({
//          x: d.x,
//          y: d.y,
//          r: d.r,
//          angle: (360 / num) * i,
//          equable: 360 / num
//        })
//        f.$circle({
//          attr: [p.x, p.y, p.r - 7],
//          style: {
//            fill: true,
//
//            lineWidth: 15,
//            fillStyle: "#ff5000"
//          }
//        })
//        f.$circle({
//          attr: [d.x, d.y, d.r + p.r + 3],
//          style: {
//            lineWidth: 5,
//            strokeStyle: "#ff5000"
//          }
//        }).then(d => f.$circle({
//          attr: [d.x, d.y, d.r + 5],
//          style: {
//            lineWidth: 10
//          }
//        }))
//
//      }

//      free.$point(p.x, p.y, 2)
//
//    })
    }
}

