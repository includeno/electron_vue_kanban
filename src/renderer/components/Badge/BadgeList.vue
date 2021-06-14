
<template>
  <div class="badges">
      <Badge v-bind:checklist="checklist"></Badge>
  </div>
</template>

<script>
import Badge from "./Badge.vue";
export default {
  name: "BadgeList",
  props:["checklist"],
  data() {
    return {
      list: [], //存储cardList的数组
      msg: "Welcome to Your Vue.js App",
    };
  },
  components: {
    Badge,
    
  },
};
</script>

<style>
.badges {
  float: left;
  max-width: 100%;
  margin-left: -2px;
}
</style>