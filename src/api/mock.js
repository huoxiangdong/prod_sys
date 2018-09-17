/* eslint-disable */
const Mock = require('mockjs')

Mock.mock('/api/data', (req,res) => {
    return [ // 表格数据
        { // 行
         
            
            info: 'Draft',
            approvalStage: 159,
            design: 6.0,
            version: 24,
            color: 4.0,
            cost: '1%',
            description: '描述'
        },
        { // 行
         
           
            info: 'Draft',
            approvalStage: 1659,
            design: 66.0,
            version: 624,
            color: 64.0,
            cost: '61%',
            description: '6描述'
        },
        { // 行
          
           
            info: '6Draft',
            approvalStage: 6159,
            design: 66.0,
            version: 624,
            color: 6.0,
            cost: '16%',
            description: '6描述'
        },
        { // 行
           
           
            info: '6Draft',
            approvalStage: 6159,
            design: 6.60,
            version: 624,
            color: 46.0,
            cost: '16%',
            description: '描述6'
        },
        { // 行
           
           
            info: 'Draft',
            approvalStage: 159,
            design: 6.0,
            version: 24,
            color: 4.0,
            cost: '1%',
            description: '描述'
        },
        { // 行
           
           
            info: 'Draft',
            approvalStage: 159,
            design: 6.0,
            version: 24,
            color: 4.0,
            cost: '1%',
            description: '描述'
        },
        { // 行
          
           
            info: 'Draft',
            approvalStage: 159,
            design: 6.0,
            version: 24,
            color: 4.0,
            cost: '1%',
            description: '描述'
        },
        { // 行
         
           
            info: 'Draft',
            approvalStage: 159,
            design: 6.0,
            version: 24,
            color: 4.0,
            cost: '1%',
            description: '描述'
        },
        { // 行
           
           
            info: 'Draft',
            approvalStage: 159,
            design: 6.0,
            version: 24,
            color: 4.0,
            cost: '1%',
            description: '描述'
        },
        { // 行
          
           
            info: 'Draft',
            approvalStage: 159,
            design: 6.0,
            version: 24,
            color: 4.0,
            cost: '1%',
            description: '描述'
        }
    ];
})
// table
Mock.mock('/api/table',(req,res) => {
    return  [
            { 
                addlayer: 'ddd',
                layer: '10',
                select: 'select',
                process: 'LAYUP',
                thickness: '-',
                diameter: '16.320',
                weight: '389.340',
                cost: '387.69',
                task: 'LAYUP',
                defaultres: 'LAYA01',
                setuptime: '1',
                runtime: '2.035',
                res_1: 'Res: LAYA01',
                res_2: '添加设备',
                res_3: '添加设备',
                res_4: '添加设备',
             }
        ]
       
    
})

