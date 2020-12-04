let dataB = {
    name: '流程B',
    nodeList: [
        {
            id: 'nodeA',
            name: '节点A-不可拖拽',
            type: 'task',  
            left: '18px',
            top: '223px',
            ico: 'el-icon-user-solid',
            state: 'success',
            viewOnly: true,
            conditionData:{
                type:'type1',
                Assigns:{

                },
                Sign:{
    
                }
            },
            
            des:'',
            position:{
                left: '18px',
                top: '223px',
            },
            Extension:{

            },
           
            Assigns:{

            },
            Sign:{

            }

        },
        {
            id: 'nodeB',
            type: 'task',
            name: '流程B-节点B',
            left: '351px',
            top: '96px',
            ico: 'el-icon-goods',
            state: 'error',
            conditionData:{
                type:'type2'
            }
        },
        {
            id: 'nodeC',
            name: '流程B-节点C',
            type: 'task',
            left: '354px',
            top: '351px',
            ico: 'el-icon-present',        
            state: 'warning',
            conditionData:{
                type:'type2'
            }
        }, {
            id: 'nodeD',
            name: '流程B-节点D',
            type: 'task',
            left: '723px',
            top: '215px',
            ico: 'el-icon-present',
            state: 'running',
            conditionData:{
                type:'type1'
            }
        }
    ],
    lineList: [{
        from: 'nodeA',
        to: 'nodeB',
        label: '条件A',
        conditionData:{
            type:'status2'
        },


// --------------------------------
        Conditions:{

        },
    }, {
        from: 'nodeA',
        to: 'nodeC',
        label: '条件B',
        conditionData:{
            type:'status1'
        }
    }, {
        from: 'nodeB',
        to: 'nodeD',
        conditionData:{
            type:'status1'
        }
    }, {
        from: 'nodeC',
        to: 'nodeD',
        conditionData:{
            type:'status2'
        }
    }
    ]
}

export function getDataB () {
    return dataB
}
