<template>
  <div>
    <div class="ef-node-form">
      <div class="ef-node-form-header">
        编辑
      </div>
      <!-- 节点 -->
      <div class="ef-node-form-body">
        <el-form
          :model="node"
          ref="dataForm"
          label-width="80px"
          v-if="type === 'node' && node.conditionData"
          label-position="top"
        >
          <div class="title">基本数据</div>
         
          <el-form-item label="名称">
            <el-input v-model="node.name"></el-input>
          </el-form-item>

          <el-form-item label="状态">
            <el-select  v-model="node.state">
              <el-option
                v-for="option in stateList"
                :key="option.state"
                :label="option.label"
                :value="option.state"
              >
              </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="类型">
           <el-select
              v-model="node.conditionData.sign"
              placeholder="请选择"
            >
              <el-option
                v-for="item in signList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
              </el-select>
          </el-form-item>
          <!-- 自定义数据 -->
          <template v-if="node.conditionData">
            <el-form-item label="执行操作">
              <el-select
                v-model="node.conditionData.operator"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in nodeTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="审核人">
                <el-select
                  multiple
                  v-model="node.conditionData.assigns"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in nodeTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                </el-option>
              </el-select>
            </el-form-item>
          </template>

          <div class="operate-wrap">
            <el-button type="primary" icon="el-icon-check" @click="save">保存</el-button>
            <el-button type="danger" icon="el-icon-close" @click="deleteX">删除</el-button>
          </div>
        </el-form>
        <!-- 连线 -->
        <el-form
          :model="line"
          ref="dataForm"
          label-width="80px"
          v-show="type === 'line'"
          label-position="top"
          v-if="line.conditionData && type == 'line'"
        >
          <div class="title">基本信息</div>
          <el-form-item label="连线名称">
            <el-input v-model="line.label"></el-input>
          </el-form-item>
          

          <div class="title">条件</div>
          <template v-if="line.conditionData.conditions.length">
            <div v-for=" (item, index) in line.conditionData.conditions" :key="index">
              <div class="from-item-wrap">
                <el-select v-model="item.model" placeholder="用户/部门">
                  <el-option
                    v-for="option in statusOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  >
                  </el-option>
                </el-select>
                <el-select v-if="item.model != 1"  v-model="item.symbol" placeholder="">
                  <el-option
                    v-for="option in symbolOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  >
                  </el-option>
                </el-select>
                <el-input v-model="item.value"></el-input>
                <el-select v-model="item.operator">
                  <el-option
                    v-for="option in operatorOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </template>
          <div class="add-btn-wrap">
            <el-button type="primary" icon="el-icon-plus" @click="addStatus">添加条件</el-button>
          </div>
          
          <div class="operate-wrap">
            <el-button type="primary" icon="el-icon-check" @click="saveLine">保存</el-button>
            <el-button type="danger" icon="el-icon-close"  @click="deleteX">删除</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";

export default {
  data() {
    return {
      visible: true,
      // node 或 line
      type: "node",
      nodeTypeList: [
        {
          value: "type1",
          label: "类型1"
        },
        {
          value: "type2",
          label: "类型2"
        }
      ],
      signList:[
         {
          value: "串签",
          label: "串签"
        },
        {
          value: "并签",
          label: "并签"
        },
        {
          value: "会签",
          label: "会签"
        }
      ],
      node: {},
      line: {},
      data: {},
      operatorOptions:[
        {
          value: "||",
          label: "或"
        },
        {
          value: "&",
          label: "且"
        }
      ],
      symbolOptions:[
        {
          value: "Neq",
          label: "不等于"
        },
         {
          value: "GT",
          label: "大于"
        },
         {
          value: "Egt",
          label: "大于等于"
        },
        {
          value: "Lt",
          label: "小于"
        },
        {
          value: "Elt",
          label: "小于等于"
        },
        {
          value: "Like",
          label: "小于"
        },
      ],
      statusOptions: [
        {
          value: "1",
          label: "用户"
        },
        {
          value: "2",
          label: "部门"
        }
      ],
      stateList: [
        {
          state: "success",
          label: "成功"
        },
        {
          state: "warning",
          label: "警告"
        },
        {
          state: "error",
          label: "错误"
        },
        {
          state: "running",
          label: "运行中"
        }
      ]
    };
  },
  props:{
    flowData:{
      type: Object, 
      default: null
    },
    deleteElement:{
      type: Function, 
      default: null
    }
  },
  methods: {
    deleteX(){
      this.deleteElement()
    },
    /**
     * 表单修改，这里可以根据传入的ID进行业务信息获取
     * @param data
     * @param id
     */
    nodeInit(data, id) {
      console.log(this.flowData);
      this.type = "node";
      this.flowData.nodeList.filter(node => {
        if (node.id === id) {
          this.node = { ...cloneDeep(node) };
        }
      });
    },
    lineInit(line) {
      this.type = "line";
      this.flowData.lineList.forEach(item => {
        if(item.from === line.from && item.to === line.to){
          this.line = Object.assign({
            label:'',
            conditionData:{
              conditions:[{ 
              model: '',
              symbol: '',
              values: '',
              operator: '',
              extension:''
              }]
            } 
          },{...cloneDeep(item)})
        }
      });


      console.log(111,this.line);
    },
    addStatus(){
      this.line.conditionData.conditions.push({
        model: '',
        symbol: '',
        values: '',
        operator: '',
        extension:''
      })
    },
    // 修改连线
    saveLine() {
      this.flowData.lineList.map((line) => {
        if (line.from === this.line.from && line.to === this.line.to) {
          line.conditionData = this.line.conditionData
        }
      })
      this.$emit("setLineLabel", this.line.from, this.line.to, this.line.label);
      this.$message.success("数据已暂存。");
    },
    save() {
      this.flowData.nodeList.map(node => {
        if (node.id === this.node.id) {
          node.name = this.node.name;
          node.left = this.node.left;
          node.top = this.node.top;
          node.ico = this.node.ico;
          node.state = this.node.state;       
          node.conditionData = this.node.conditionData;     
          this.$emit("repaintEverything");
        }
      });
      this.$message.success("数据已暂存。");
    }
  }
};
</script>

<style>
.el-node-form-tag {
  position: absolute;
  top: 50%;
  margin-left: -15px;
  height: 40px;
  width: 15px;
  background-color: #fbfbfb;
  border: 1px solid rgb(220, 227, 232);
  border-right: none;
  z-index: 0;
}

.el-form-item{
  margin: 10px;
}

.title {
  font-size: 16px;
  font-weight: 800;
  margin: 10px 10px;
}

.operate-wrap{
  margin-left: 0!important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-btn-wrap{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.from-item-wrap{
  padding: 10px;

  
}

.from-item-wrap .el-input{
  width: 100px;
}
</style>
