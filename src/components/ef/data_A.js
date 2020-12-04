let dataA = {
    name: '流程A',
    nodeList: [
        {
            id: 'nodeA',
            name: '流程A-节点A',
            type: 'task1',
            left: '26px',
            top: '161px',
            ico: 'el-icon-user-solid',
            conditionData:{},
        },
        {
            id: 'nodeB',
            name: '流程A-节点B',
            type: 'task2',
            left: '340px',
            top: '161px',
            ico: 'el-icon-goods',
            conditionData:{},
        },
        {
            id: 'nodeC',
            name: '流程A-节点C',
            type: 'task2',
            left: '739px',
            top: '161px',
            ico: 'el-icon-present',
            conditionData:{},

        }
    ],
    lineList: [{
        from: 'nodeA',
        to: 'nodeB'
    }, {
        from: 'nodeB',
        to: 'nodeC'
    }]
}

export function getDataA () {
    return dataA
}
