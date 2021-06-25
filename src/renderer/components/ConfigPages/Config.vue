<template>
  <div>
    <router-link to="/team">Go to Main</router-link>
    <select style="width: 200px" v-model="selectedConfig">
      <option
        v-for="(config, index) in configList"
        v-bind:key="index"
        v-bind:value="config.id"
      >
        {{ config.url }}:{{ config.username }}
      </option>
    </select>
    <span>Current Config:{{ selectedConfig }}</span>

    <!--CreateDialog-->
    <a-button type="primary" @click="showCreateDialog"> 添加 </a-button>
    <a-modal
      :visible="createDialogVisible"
      :title="modelTitle"
      okText="确认"
      cancel-text="取消"
      @cancel="createDialogHandleCancel"
      @ok="createDialogHandleOk"
    >
      <!--CreateDialog表单 并将表单的值绑定到this.createform-->
      <a-form layout="vertical" :form="createform">
        <!--每一项元素-->
        <a-form-item label="Server">
          <a-input
            v-decorator="[
              'url',
              {
                rules: [
                  {
                    required: true,
                    message: '请填写Server 例如http://127.0.0.1:8080!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="用户名">
          <a-input
            v-decorator="[
              'username',
              {
                rules: [{ required: true, message: '请填写登录用户名!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="密码">
          <a-input
            type="password"
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请填写登录密码!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="状态">
          <a-radio-group
            v-decorator="[
              'status',
              {
                initialValue: '1',
              },
            ]"
          >
            <a-radio value="1">默认配置</a-radio>
            <a-radio value="0">非默认配置</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>

    <!--editDialogVisible-->
    <a-button type="primary" @click="showEditDialog"> 编辑 </a-button>
    <a-modal
      :visible="editDialogVisible"
      :title="editTitle"
      okText="确认"
      cancel-text="取消"
      @cancel="editDialogHandleCancel"
      @ok="editDialogHandleOk"
      width="700px"
    >
      
      <table id="editTable" class="">
        <tr>
          <td class="header-column">default</td>
          <td class="header-column">url</td>
          <td class="header-column">username</td>
          <td class="header-column">password</td>
          <td class="header-operation">操作</td>
        </tr>
        <tr></tr>
        <tr v-for="(singleconfig, index) in configList" v-bind:key="index">
          <td><div v-if="validActiveConfig(singleconfig.id)">*</div></td>
          <td>{{ singleconfig.url }}</td>
          <td>{{ singleconfig.username }}</td>
          <td>{{ singleconfig.password }}</td>
          <td>
            <a-button @click="showUpdateDialog(singleconfig)">编辑</a-button> <a-button>删除</a-button
            ><a-button>设为默认</a-button>
          </td>
        </tr>
      </table>
    </a-modal>

    
    <a-modal
      :visible="updateDialogVisible"
      title="更新"
      okText="确认"
      cancel-text="取消"
      @cancel="updateDialogHandleCancel"
      @ok="updateDialogHandleOk"
    >
      <!--updateDialog表单 并将表单的值绑定到this.updateform-->
      <a-form layout="vertical" :form="updateform">
        <!--每一项元素-->
        <a-form-item label="Server">
          <a-input
            v-decorator="[
              'url',
              {
                rules: [
                  {
                    required: true,
                    message: '请填写Server 例如http://127.0.0.1:8080!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="用户名">
          <a-input
            v-decorator="[
              'username',
              {
                rules: [{ required: true, message: '请填写登录用户名!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="密码">
          <a-input
            type="password"
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请填写登录密码!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="状态">
          <a-radio-group
            v-decorator="[
              'status',
              {
                initialValue: '1',
              },
            ]"
          >
            <a-radio value="1">默认配置</a-radio>
            <a-radio value="0">非默认配置</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

// https://github.com/wwjhzc/vue-dialog/tree/master/dialog
<script>
import ConfigDialog from "./ConfigDialog";
import ConfigAPI from "@/api/ConfigAPI";
import { v4 as uuidv4 } from "uuid";

const file = "KanbanConfig.json";
export default {
  name: "Config",

  components: {
    ConfigDialog,
  },
  data() {
    return {
      configList: [],
      selectedConfig: "",
      lastSelectedConfig: "",

      activeConfig: -1,
      content: {
        id:"",
        url:"",
        username:"",
        password:"",

      },

      //创建配置对话框相关
      createDialogVisible: false,
      //模态对话框标题
      modelTitle: "",

      //编辑配置对话框相关
      editDialogVisible: false,
      editTitle:"编辑",

      updateDialogVisible:false,
      
      
    };
  },
  //el 创建前
  beforeCreate() {
    //创建表单
    this.createform = this.$form.createForm(this, { name: "createform_in_modal" });
    this.updateform = this.$form.createForm(this, { name: "updateform_in_modal" });
  },
  mounted() {
    this.loadConfigAndActive();
    
  },
  methods: {
    resetContent(){
      this.content={
        id:"",
        url:"",
        username:"",
        password:"",
      }
    },
    loadConfig() {
      //读取文件中的配置
      let config = ConfigAPI.getConfigOrCreate();
      this.configList = config["configList"];
      this.activeConfig = config["activeConfig"];
      this.selectedConfig = config["activeConfig"].id;
    },
    loadConfigAndActive() {
      //读取文件中的配置
      let config = ConfigAPI.getConfigOrCreate();
      this.configList = config["configList"];
      this.activeConfig = config["activeConfig"];
      this.selectedConfig = config["activeConfig"].id;
    },
    //创建配置对话框/显示
    showCreateDialog() {
      this.createDialogVisible = true;
    },
    //创建配置对话框/关闭
    createDialogHandleCancel() {
      const form = this.createform;
      form.resetFields();
      this.createDialogVisible = false;
    },
    //创建配置对话框/点击确认
    createDialogHandleOk() {
      const form = this.createform;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("form 表单内容: ", values);
        form.resetFields();
        this.createDialogVisible = false;
      });
    },

    //编辑配置对话框/显示
    showEditDialog() {
      this.editDialogVisible = true;
    },
    //编辑配置对话框/关闭
    editDialogHandleCancel() {
      
      this.editDialogVisible = false;
    },
    //编辑配置对话框/点击确认
    editDialogHandleOk() {
      this.editDialogVisible = false;
    },
    //验证是否是默认配置
    validActiveConfig(inputId){
      if(inputId==this.activeConfig){
        return true;
      }
      else{
        return false;
      }
    },


    //更新配置对话框/显示
    showUpdateDialog(data) {
      console.log("showUpdateDialog收到数据："+data.id);
      this.content=data;
      this.updateDialogVisible = true;
      
      this.updateform.getFieldDecorator('url', { initialValue:data.url })
      this.updateform.getFieldDecorator('username', { initialValue: data.username })
      
    },
    //更新配置对话框/关闭
    updateDialogHandleCancel() {
      const form = this.updateform;
      form.resetFields();
      this.updateDialogVisible = false;
    },
    //更新配置对话框/点击确认
    updateDialogHandleOk() {
      const form = this.updateform;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("update form 表单内容: ", values);
        form.resetFields();
        this.updateDialogVisible = false;
      });
      
    },
    

  },
};
</script>

<style>
#editTable{
  text-align:left;
  border:1px solid #F00
}

.header-column{
  text-align:center;
  width: 80px;
}
.header-operation{
  text-align:center;
  width: 240px;
}
td{
  border-left:1px solid #F00;border-top:1px solid #F00
}
</style>