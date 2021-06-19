

<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <h4>查看队伍/Team</h4>
    <select v-model="selected">
      <option
        v-for="(option, index) in options"
        v-bind:key="index"
        v-bind:value="option.boardid"
      >
        {{ option.boardname }}
      </option>
    </select>
    <span>Selected: {{ selected }}</span>
    <Board v-bind:boardid="lastselected" v-if="lastselected != ''"></Board>
    
  </div>
</template>

<script>
import Board from "@/components/Board.vue";
import axios from "axios";
export default {
  name: "eleapp",
  data() {
    return {
      selected: "",
      options: [],
      lastselected: "",
    };
  },
  components: {
    Board,
  },
  mounted: function () {
    axios({
      method: "get",
      url: "http://localhost:4321/boardlist",
    }).then((response) => {
      console.log("app mounted succeed" + response.data);
      this.options = response.data;
    });
  },
  methods: {},
  watch: {
    selected: function (val) {
      if (this.lastselected != this.selected) {
        let backup = this.selected;
        this.lastselected = "";
        setTimeout(() => {
          this.lastselected = backup;
          //console.log("this.selected:" + this.selected);
        }, 1);
      }
    },
  },
};
</script>

<style>
/* CSS */
</style>
