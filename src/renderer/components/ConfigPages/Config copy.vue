<template>
  <div>
    <router-link to="/team">Go to Main</router-link>
    <table>
      <tr>
        <td>url</td>
        <td>username</td>
        <td>password</td>
      </tr>
      <tr>
        
      </tr>
      <tr v-for="(singleconfig,index) in configList" v-bind:key="index">
        <td>{{singleconfig.url}}</td>
        <td>{{singleconfig.username}}</td>
        <td>{{singleconfig.password}}</td>
      </tr>
    </table>
    

    <div class="main">
      <div @click="openMask">新建连接</div>
      <ConfigDialog
        v-bind:value="sendVal"
        v-bind:content="content"
        v-on:cancel="clickCancel()"
        @danger="clickDanger()"
        @confirm="clickConfirm"
      ></ConfigDialog>
    </div>
  </div>
</template>

// https://github.com/wwjhzc/vue-dialog/tree/master/dialog
<script>
import ConfigDialog from "./ConfigDialog";
import fs  from "fs";
import { v4 as uuidv4 } from 'uuid';

const file = "KanbanConfig.json";
export default {
  name: "Config",

  components: {
    ConfigDialog,
  },
  data() {
    return {
      activeConfig:-1,
      configList: [],
      sendVal: false,
      content: {
        url: "",
        username: "",
        password: "",
      },
    };
  },
  mounted() {
    //验证配置文件存在
    
    
    // 检查当前目录中是否存在该文件。
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file,"");
      this.configList=[];
    }
    else{
      let config=JSON.parse(fs.readFileSync(file,"utf8"));
      this.configList=config.configList;
      this.activeConfig=config.activeConfig;
    }
  },
  methods: {
    initContent(){
      this.content={
        url: "",
        username: "",
        password: "",
        id:"",
      }
    },
    openMask(index) {
      this.sendVal = true;
    },
    clickCancel() {
      console.log("点击了取消");
      this.sendVal = false;
      this.initContent()
    },
    clickDanger() {
      console.log("这里是danger回调");
      this.sendVal = false;
      this.initContent()
    },
    clickConfirm(content) {
      console.log("点击了confirm", content);
      this.sendVal = false;
      //将新配置添加至数组中
      this.configList.push(content);
      content["id"]=uuidv4();
      let config={"configList":this.configList,"activeConfig":this.configList.length-1}
      fs.writeFileSync(file,JSON.stringify(config));
      this.initContent()
    },
  },
};
</script>

<style>
</style>