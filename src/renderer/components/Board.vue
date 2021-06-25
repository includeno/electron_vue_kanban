<template>
  <div id="board" >
    <div
      class="list list-wrapper"
      v-for="(boardcardlist, index) in origindata.boardcardlists"
      :key="index"
    >
      <CardListHeader v-bind:header="boardcardlist.header"></CardListHeader>

      <CardList v-bind:cardlist="boardcardlist.cardList"></CardList>
      
      <CardComposer
        v-bind:boardcardlist_index="index"
        @add_card="createCard(arguments)"
      ></CardComposer>
    </div>
  </div>
</template>

<script>
import ConfigAPI from "@/api/ConfigAPI";
import CardRestAPI from "@/api/CardRestAPI";
import CardList from "@/components/CardList";
import CardListHeader from "@/components/CardListHeader";
import CardComposer from "@/components/CardComposer";
import axios from "axios";
export default {
  name: "Board",
  props: ["boardid"],
  data() {
    return {
      origindata: [], //存储cardList的数组
    };
  },
  mounted: function () {
    let formdata = new FormData();
    formdata.append("boardid", this.boardid);
    console.log("this.boardid" + this.boardid);
    axios({
      method: "post",
      url: "http://localhost:4321/board",
      data: formdata,
    }).then((response) => {
      console.log("board succeed" + response.data);
      this.origindata = response.data;
    });
  },
  methods: {
    async createCard(params) {
      let title = params[0];
      let index = params[1];
      let cardListId = this.origindata.boardcardlists[index].cardListId;

      let response = await CardRestAPI.createCard(cardListId, title);
      console.log("cardId response:" + response);
      if (response.data != null) {
        let cardId = response.data.id;
        console.log("cardId:" + cardId);
        this.origindata.boardcardlists[index].cardList.push({
          id: cardId,
          title: title,
          edit: false,
          buttonOption: false,
        });
      }
    },
  },
  components: {
    CardList,
    CardListHeader,
    CardComposer,
  },
};
</script>

<style>
#board {
  max-height: 100%;
  user-select: none;
  white-space: nowrap;
  /* margin-bottom: 30px; */
  margin-top: 75px;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-bottom: 8px;
  position: absolute;

  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}


.list {
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
}
.list-wrapper {
  width: 272px;
  margin: 0 4px;
  height: 100%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  bottom: 0;
  /* white-space: nowrap; */
}
</style>