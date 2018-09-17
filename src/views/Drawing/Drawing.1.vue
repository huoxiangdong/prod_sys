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
          v-checkbox(v-model="notifications")
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
      v-list-tile( href="javascript:;")
        v-list-tile-content(@click="notifications = !notifications")
          v-list-tile-title 3D作图
        v-list-tile-action
          v-checkbox(v-model="notifications")
      v-list-tile( href="javascript:;")
        v-list-tile-content(@click="notifications = !notifications")
          v-list-tile-title 显示作图
        v-list-tile-action
          v-checkbox(v-model="notifications")
   v-flex(xs12)
    v-card
      v-canvas(:custom = "custom"
          @drawing = "canvas")
</svg>
</template>
<script>
/* eslint-disable*/
import { point, pointCalc, pointCoo, circle, line } from './util.js';
export default {
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false,
      // canvas
      main_c: {
        x: 500,
        y: 300,
        r: 150,
        strokeColor: '#ff5000',
        w: 12,
        point: true
      },
      dataLine: [
        {
          start: [0, 0],
          length: 2200,
          width: 5
        },
        {
          start: [0, 0],
          length: 1200,
          width: 5,
          angle: 90
        }
      ]
    };
  },
  async mounted() {
    console.log(this);
    const itemNum = 4;
    const ctx = document.querySelector('canvas').getContext('2d');
    // 坐标
    await line(this.dataLine, ctx).then(data =>
      data.forEach(({ s, p }) =>
        pointCoo(
          {
            s,
            p,
            base: 20,
            x: true,
            y: true
          },
          ctx
        )
      )
    );

    // function calcItem(opt, num, i) {
    //   // 计算小圆x,y,半径
    //   const item_x = opt.x + Math.cos(Math.PI * 2 / num * i) * opt.r,
    //     item_y = opt.y + Math.sin(Math.PI * 2 / num * i) * opt.r,
    //     item_r =
    //       Math.sqrt(opt.r * opt.r * 2 * (1 - Math.cos(2 * Math.PI / num))) / 2;
    //   return {
    //     x: item_x,
    //     y: item_y,
    //     r: item_r
    //   };
    // }

    // const ref = circle({
    //   x: 200,
    //   y: 200,
    //   r: 30,
    //   color: 'blue',
    //   point: true
    // },ctx);

    // let itemPara;

    // for (let i = 0; i < itemNum; i++) {
    //   itemPara = calcItem(ref, itemNum, i);
    //   circle({ ...itemPara, color: 'purple', point: true },ctx);
    // }

    // circle({ x: 200, y: 200, r: ref.r + itemPara.r },ctx);

    circle(this.main_c, ctx)
      .then(data => pointCalc({ ...data, ang: 90 }))
      .then(({ x, y }) => point({ x, y }, ctx))
      .then(({ x, y }) =>
        line(
          [
            {
              start: [x, y],
              length: 200,
              angle: 180
            }
          ],
          ctx
        )
      );

    // const { x, y } = pointCalc({...data,ang: 90 })
    // point({ x, y }, ctx)

    // const co = pointCalc({
    //   ...circle_one,
    //   ang: 3 * Math.PI / 2
    // });
    // point({ x: co.x, y: co.y}, ctx);
  }
};
</script>
<style lang="stylus" scoped>
.list_item >>> 
  a 
   height 2.1rem
   font-size 1rem

</style>
