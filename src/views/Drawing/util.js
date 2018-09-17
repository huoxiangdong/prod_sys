/* eslint-disable */

// 圆点
export function point({
    x,
    y,
    r,
    c
}, ctx) {
    if (!ctx) throw '没有传入 Context'
    ctx.save()
    ctx.globalCompositeOperation="source-over"
    ctx.beginPath()
    ctx.arc(x, y, r ? r : 1, 0, Math.PI * 2, true)
    ctx.fillStyle = c ? c : 'black'
    ctx.fill()
    ctx.restore()
    return { x,y }
}

export async function circle(opt,ctx) {
    // 生成圆
    ctx.save()

    ctx.beginPath();
    ctx.arc(opt.x, opt.y, opt.r, 0, Math.PI * 2, true);
    ctx.lineWidth = opt.w
    ctx.closePath();
    ctx.fillStyle = opt.fillColor?opt.fillColor:'black';
    ctx.strokeStyle = opt.strokeColor?opt.strokeColor:'black';
    opt.fill ? ctx.fill() : ctx.stroke();
    opt.point ? point({ x: opt.x, y: opt.y }, ctx) : '';
    ctx.restore()
    return opt;
  }


// 画线
export async function line(lines, ctx) {
    let data = []
    while(lines.length) {
     const { start: s, end: e,length:l,width:w,angle,color:c } = lines.shift()
     const p = pointCalc({ // end point
        x: s[0],
        y: s[1],
        r: l ? l : e[0] - s[0],
        ang: angle ? angle : 0
    })
    ctx.save()
    ctx.lineWidth = w ? w : 1
    ctx.lineCap = "square"
    ctx.beginPath()
    ctx.moveTo(s[0], s[1])
    ctx.lineTo(p ? p.x : e[0], p ? p.y : e[1])
    ctx.strokeStyle = c ? c : 'black'
    ctx.stroke()
    ctx.restore()
    

    // point({
    //     x: s[0],
    //     y: s[1]
    // }, ctx)
    // for(let i=s[0];i<p.x;i+=10) {
    //     ctx.beginPath()
    //     ctx.moveTo(i,p.y)
    //     ctx.lineTo(i,p.y +10)
    //     ctx.stroke()
    //     // point({ x: i, y: p.y,c:"purple" }, ctx)
    // }
    // for(let i=s[1];i<p.y;i+=10) {
    //     point({ x: p.x, y: i,c:"purple" }, ctx)
    // }
    data.push({s,p})
  
    }
   return data
}

// 任意线分割
export function pointCoo({s,p,base,x,y},ctx) {
    ctx.save()
    ctx.globalCompositeOperation="destination-over"
    if(x) {
        for(let i=s[0];i<p.x;i+=base) {
          if(i === s[0]) {
            point({ x: i, y: p.y,c:"yellow" }, ctx)
          }else {
            line([{
                start: [i,p.y],
                length: 1200,
                width: 2,
                color: '#eee',
                angle: 90
             }],ctx)
          }        
       point({ x: i, y: p.y,r:3,c:"yellow" }, ctx)
        }
    }
    if(y) {
        for(let i=s[1]+base;i<p.y;i+=base) {
         if(i ===  s[1] && !x ) {
            point({ x: p.x, y: i,c:"yellow" }, ctx)
         }else{
            line([{
                start: [p.x,i],
                length: 2200,
                width: 2,
                color: '#eee'
             }],ctx)
       point({ x: p.x, y: i,r:3,c:"yellow" }, ctx)
         }
         }
            
    }
    ctx.restore()
}



/* ----------------计算类----------------- */

// 计算圆任一点坐标
export  function pointCalc({
    x,
    y,
    r,
    ang
}) { // 计算小圆x,y,半径
    return {
        x: x + Math.cos(ang ? radian(ang) : Math.PI * 2) * r,
        y: y + Math.sin(ang ? radian(ang) : Math.PI * 2) * r,
        r: Math.sqrt(Math.pow(r, 2) * 2 * (1 - Math.cos(ang ? radian(ang) : Math.PI * 2))) / 2
    }
}


// 角度转弧度 360 = 2π
export function radian(angle) {
    return Math.PI / 180 * angle;
}

