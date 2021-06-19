<template>
  <div id="board">
    <h1></h1>

    <div
      class="list list-wrapper"
      v-for="(boardcardlist, index) in origindata.boardcardlists"
      :key="index"
    >
      <CardListHeader v-bind:header="boardcardlist.header"></CardListHeader>
      <br>
      <CardList v-bind:cardlist="boardcardlist.cardlist"></CardList>
      <br>
      <!-- <CardComposer
        v-bind:boardcardlist_index="index"
        @add_card="add_card_to_list(arguments)"
      ></CardComposer> -->
    </div>
  </div>
</template>

<script>
import CardList from "./CardList.vue";
import CardListHeader from "./CardListHeader.vue";
import CardComposer from "./CardComposer.vue";
import axios from "axios";
export default {
  name: "Board",
  props:["boardid"],
  data() {
    return {
      origindata: [], //存储cardList的数组
      
    };
  },
  mounted: function () {
    let formdata = new FormData();
    formdata.append("boardid",this.boardid)
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
    add_card_to_list(params) {
      
      var title = params[0];
      var index = params[1];
      var cardindex=this.origindata.boardcardlists[index].cardlist.length;
      this.origindata.boardcardlists[index].cardlist.push({
        id: String(this.origindata.boardcardlists[index].cardlist.length),
        card: {
          title: title,
        },
      });
      //axios
      let formdata = new FormData();
      formdata.append("boardid",this.boardid)
      formdata.append("title",title)
      formdata.append("index",index)
      formdata.append("cardindex",cardindex)
      axios({
        method: "post",
        url: "http://localhost:4321/card/add",
        data: formdata,
      }).then((response) => {
        console.log("succeed code" + response.data.code);
        
      });
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
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  position: absolute;
  
  right: 0;
  
  left: 0;
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
  white-space: nowrap;
}
</style>