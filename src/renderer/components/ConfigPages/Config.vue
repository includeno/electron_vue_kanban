<template>
  <div>
    <router-link to="/team">Go to Main</router-link>
    <input type="text" placeholder="ip" />
    <input type="text" placeholder="port" />
    <button>添加</button>
    <button>取消</button>
    <button>设为默认</button>
    

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
const fs = require('fs')

export default {
  name: "Config",

  components: {
    ConfigDialog,
  },
  data() {
    return {
      configList:[],
      sendVal: false,
      content:{
        url:"",
        username:"",
        password:"",
      }
    };
  },
  mounted(){
    //验证配置文件存在

    

    //存在就读取
    fs.readFile('config.json','utf8',function(err,data){
        content.textContent = data;
        console.log(data);
    })
  },
  methods: {
    openMask(index) {
      this.sendVal = true;
    },
    clickCancel() {
      console.log("点击了取消");
      this.sendVal=false;
    },
    clickDanger() {
      console.log("这里是danger回调");
      this.sendVal=false;
    },
    clickConfirm(content) {
      console.log("点击了confirm",content);
      this.sendVal=false;
      //将新配置添加至数组中
      this.configList.push(content);
    },
  },
};
</script>

<style>
</style>