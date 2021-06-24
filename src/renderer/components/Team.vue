<template>
  <div>
    <div class="surface">
      <button>
        <router-link to="/config">Go to Config</router-link>
      </button>
      <select v-model="selectedConfig">
        <option
          v-for="(config, index) in configList"
          v-bind:key="index"
          v-bind:value="config.id"
        >
          {{ config.url }}:{{ config.username }}
        </option>
      </select>
      <span>selectedConfig: {{ selectedConfig }}</span>
      查看队伍/Team
      <select v-if="lastSelectedConfig != ''" v-model="selectedTeam">
        <option
          v-for="(team, index) in teams"
          v-bind:key="index"
          v-bind:value="team.boardid"
        >
          {{ team.boardname }}
        </option>
      </select>
      <span v-if="lastSelectedConfig != ''"
        >selectedTeam: {{ selectedTeam }}</span
      >
      <Board
        v-bind:boardid="lastSelectedTeam"
        v-if="lastSelectedTeam != ''"
      ></Board>
    </div>
  </div>
</template>

<script>
import BoardRestAPI from "@/api/BoardRestAPI";
import ConfigAPI from "@/api/ConfigAPI";
import Board from "@/components/Board";
import axios from "axios";
export default {
  name: "Team",
  data() {
    return {
      selectedTeam: "",
      teams: [],
      lastSelectedTeam: "",

      configList: [],
      selectedConfig: "",
      lastSelectedConfig: "",
    };
  },
  components: {
    Board,
  },
  mounted: function () {
    this.configList = ConfigAPI.getConfigList();
    
  },
  methods: {
    async setTeams() {
      let response = await BoardRestAPI.getBoardList();
      console.log("response:" + JSON.stringify(response));

      this.teams = response.data;
      
      
    },
  },
  watch: {
    //team
    selectedTeam: function (val) {
      if (this.lastSelectedTeam != this.selectedTeam) {
        let backup = this.selectedTeam;
        this.lastSelectedTeam = "";
        setTimeout(() => {
          this.lastSelectedTeam = backup;
        }, 1);
      }
    },
    //config
    selectedConfig: function (val) {
      if (this.lastSelectedConfig != this.selectedConfig) {
        let backup = this.selectedConfig;
        this.lastSelectedConfig = "";
        setTimeout(() => {
          this.lastSelectedConfig = backup;
          this.setTeams();
        }, 1);
      }
    },
  },
};
</script>

<style>
.surface {
  /* display: flex; */
  flex-direction: column;
  height: 100%;
}
</style>