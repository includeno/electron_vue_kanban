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
import ConfigAPI  from "@/api/ConfigAPI";
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
    let config=ConfigAPI.getConfigOrCreate();
    this.configList=config["configList"]
    this.activeConfig=config["activeConfig"]
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
      let id=uuidv4();
      this.configList.push(content);
      content["id"]=id;
      ConfigAPI.setConfig(this.configList,id);
      this.initContent()
    },
  },
};
</script>

<style>
</style>