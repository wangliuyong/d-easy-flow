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
          v-show="type === 'node'"
        >
          <div class="title">基本数据</div>
          <el-form-item label="类型">
            <el-input v-model="node.type" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="node.name"></el-input>
          </el-form-item>
          <el-form-item label="left坐标">
            <el-input v-model="node.left" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="top坐标">
            <el-input v-model="node.top" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="ico图标">
            <el-input v-model="node.ico"></el-input>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="node.state" placeholder="请选择">
              <el-option
                v-for="item in stateList"
                :key="item.state"
                :label="item.label"
                :value="item.state"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 自定义数据 -->
          <template v-if="node.conditionData">
            <div class="title">自定义数据</div>
            <el-form-item label="类型">
              <el-select
                v-model="node.conditionData.type"
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
             <!-- type1 -->
            <template v-if="node.conditionData.type === 'type1'">
              <el-form-item label="执行人">
                <el-input v-model="node.conditionData.people"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="node.conditionData.note"></el-input>
              </el-form-item>
            </template>
            <!-- type2 -->
            <template v-if="node.conditionData.type === 'type2'">
              <el-form-item label="姓名">
                <el-input v-model="node.conditionData.username"></el-input>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input v-model="node.conditionData.age"></el-input>
              </el-form-item>
            </template>
          </template>

          <el-form-item>
            <el-button icon="el-icon-close">重置</el-button>
            <el-button type="primary" icon="el-icon-check" @click="save"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
        <!-- 连线 -->
        <el-form
          :model="line"
          ref="dataForm"
          label-width="80px"
          v-show="type === 'line'"
          v-if="line.conditionData"
        >
          <el-form-item label="条件">
            <el-select v-model="line.conditionData.type" placeholder="请选择">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <div class="title">自定义数据</div>
          <template v-if="line.conditionData.type === 'status1'">
            <el-form-item label="条件">
              <el-input v-model="node.name"></el-input>
            </el-form-item>
          </template>

          <el-form-item>
            <el-button icon="el-icon-close">重置</el-button>
            <el-button type="primary" icon="el-icon-check" @click="saveLine">保存</el-button>
          </el-form-item>
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
      node: {},
      line: {},
      data: {},
      statusOptions: [
        {
          value: "status1",
          label: "条件1"
        },
        {
          value: "status2",
          label: "条件2"
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
    }
  },
  methods: {
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
          this.node = { ...node };
        }
      });
    },
    lineInit(line) {
      this.type = "line";
      this.flowData.lineList.forEach(item => {
        if(item.from === line.from && item.to === line.to){
          this.line = {...item}
        }
      });
      console.log('this.line55',this.line);
    },
    // 修改连线
    saveLine() {
      this.line.label = this.statusOptions.find((item => item.value === this.line.conditionData.type)).label
      this.$emit("setLineLabel", this.line.from, this.line.to, this.line.label);
    },
    save() {
      this.flowData.nodeList.filter(node => {
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

.title {
  font-size: 16px;
  font-weight: 800;
  margin: 10px 10px;
}
</style>
