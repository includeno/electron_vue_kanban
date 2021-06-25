<template>
  <div>
    <div class="surface">
      <button>
        <router-link to="/config">Go to Config</router-link>
      </button>

      <button
        class="_2Hkk1T39xw4RMQ _3TTqkG5muwOzqZ ZOUktZwsING7-0"
        data-test-id="header-boards-menu-button"
        type="button"
        aria-label="Open boards menu"

        v-on:click="showTeamsAndBoardsClick"
      >
        <span class="_3Ow-m_R7rIILjd ">Boards</span>
      </button>
      <select style="width:200px" v-model="selectedConfig">
        <option
          v-for="(config, index) in configList"
          v-bind:key="index"
          v-bind:value="config.id"
        >
          {{ config.url }}:{{ config.username }}
        </option>
      </select>
      <span>Config:{{ selectedConfig }}</span>

      

      <span v-if="lastSelectedConfig != ''">Team</span>
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
        >Team:{{ selectedTeam }}</span
      >
      
    </div>
    <Board v-bind:boardid="lastSelectedTeam" v-if="lastSelectedTeam != ''">
    </Board>

    <BoardNav v-if="showTeamsAndBoards == '1'"></BoardNav>
  </div>
</template>

<script>
import BoardRestAPI from "@/api/BoardRestAPI";
import ConfigAPI from "@/api/ConfigAPI";
import Board from "@/components/Board";
import BoardNav from "@/components/BoardNav";
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

      showTeamsAndBoards:"0",
      showTeamsAndBoardsCount:0,
    };
  },
  components: {
    Board,
    BoardNav,
  },
  mounted: function () {
    this.configList = ConfigAPI.getConfigList();
    this.selectedConfig=this.configList[0].id;
    this.showTeamsAndBoardsCount=0;
  },
  methods: {
    async setTeams() {
      let response = await BoardRestAPI.getBoardList();
      console.log("response:" + JSON.stringify(response));

      this.teams = response.data;
    },
    showTeamsAndBoardsClick:function(){
      if(this.showTeamsAndBoardsCount%2==0){
        this.showTeamsAndBoards="0";
      }
      else{
        this.showTeamsAndBoards="1";
      }
      this.showTeamsAndBoardsCount=this.showTeamsAndBoardsCount+1;
    }
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
  /* flex-direction: column;
  height: 100%; */
}

.button, button {
    box-sizing: border-box;
    -webkit-appearance: none;
    border-radius: 3px;
    border: none;
    display: inline-block;
    line-height: 20px;
    margin-bottom: 8px;
    padding: 6px 12px;
    text-decoration: none;
    position: relative;
}

/* button */
.M0eJD5l65zb5ci ._2Hkk1T39xw4RMQ {
    border-radius: 3px;
    border: 0;
    text-decoration: none;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: none;
    color: #FFFFFF;
    display: flex;
    font-weight: bold;
    height: 32px;
    line-height: 32px;
    margin: 0 4px 0 0;
    padding: 0;
    white-space: nowrap;
}

.ZOUktZwsING7-0 {
    /* background-color: rgba(62, 231, 243, 0.2);
    color: #FFFFFF; */
}

._3TTqkG5muwOzqZ {
    color: #172B4D;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    cursor: pointer;
    padding: 6px 12px;
    text-decoration: none;
    background-color: rgba(9, 30, 66, 0.04);
    box-shadow: none;
    border: none;
    transition-property: background-color, border-color, box-shadow;
    transition-duration: 85ms;
    transition-timing-function: ease;
}

._3TTqkG5muwOzqZ {
    color: #172B4D;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    cursor: pointer;
    padding: 6px 12px;
    text-decoration: none;
    background-color: rgba(9, 30, 66, 0.04);
    box-shadow: none;
    border: none;
    transition-property: background-color, border-color, box-shadow;
    transition-duration: 85ms;
    transition-timing-function: ease;
}

._3Ow-m_R7rIILjd {
    overflow: hidden;
    padding: 0 8px 0 2px;
    max-width: 150px;
}

._34i5whu9Cnwymg {
    padding: 0;
    max-width: 0;
}

.kBFJig {
    color: rgb(255, 255, 255);
    display: inline-block;
    fill: inherit;
    flex-shrink: 0;
    line-height: 1;
}
svg:not(:root) {
    overflow: hidden;
}
._1X1mC-Jr6D4C2k svg {
    height: 20px;
    width: 20px;
    line-height: 20px;
}
.kBFJig > svg {
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    pointer-events: none;
    vertical-align: bottom;
}


</style>