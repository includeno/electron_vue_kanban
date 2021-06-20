<template>
  <div>
    <div>
      <button>
        <router-link to="/config">Go to Config</router-link>
      </button>
      查看队伍/Team
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

    
  </div>
</template>

<script>
import Board from "@/components/Board";
import axios from "axios";
export default {
  name: "Team",
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
</style>