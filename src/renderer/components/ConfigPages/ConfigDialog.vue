<template>
  <div class="dialog" v-show="showMask">
    <div class="dialog-container">
      <div class="dialog-title">{{ title }}</div>
      <table>
        <tr>
          <td><label>地址</label></td>
          <td><input type="text" v-model="content.url" /></td>
        </tr>
        <tr>
          <td><label>用户名</label></td>
          <td><input type="text" v-model="content.username" /></td>
        </tr>
        <tr>
          <td><label>密码</label></td>
          <td><input type="password" v-model="content.password" /></td>
        </tr>
      </table>

      <br />
      <div class="btns">
        <div  class="default-btn" @click="closeBtn">
          {{ cancelText }}
        </div>
        <div class="danger-btn" @click="dangerBtn">
          {{ dangerText }}
        </div>
        <div class="confirm-btn" @click="confirmBtn">
          {{ confirmText }}
        </div>
      </div>
      <div class="close-btn" @click="closeMask">
        <i class="iconfont icon-close"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ConfigDialog",
  props: ["content","value"],
  data() {
    return {
      showMask: false,
      title: "添加看板配置",
      default: "默认 ",
      confirmText: "确认",
      dangerText: "删除",
      cancelText: "取消",
    };
  },
  methods: {
    closeMask() {
      this.showMask = false;
    },
    closeBtn() {
      this.$emit("cancel");
      this.closeMask();
    },
    dangerBtn() {
      this.$emit("danger");
      this.closeMask();
    },
    confirmBtn() {
      this.$emit("confirm",this.content);
      this.closeMask();
    },
  },
  mounted() {
    this.showMask = this.value;
  },
  watch: {
    value(newVal, oldVal) {
      this.showMask = newVal;
    },
    showMask(val) {
      this.$emit("input", val);
    },
  },
};
</script>
<style>
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
}
.dialog-container {
  width: 500px;
  height: 380px;
  background: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  position: relative;
}
.dialog-title {
  width: 100%;
  height: 60px;
  font-size: 18px;
  color: #696969;
  font-weight: 600;
  padding: 16px 50px 0 20px;
  box-sizing: border-box;
}
.content {
  color: #797979;
  line-height: 26px;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  width: 100%;
  height: 60px;

  position: absolute;
  bottom: 0;
  left: 0;
  text-align: left;
  padding: 0 16px;
  box-sizing: border-box;
}

.default-btn {
  color: #787878;
}
.danger-btn {
  background: #ef8c8c;
}

.confirm-btn {
  color: #ffffff;
  background: #509ee3;
}
.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
}
</style>