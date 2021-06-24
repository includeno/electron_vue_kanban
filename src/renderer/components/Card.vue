<template>
  <div class="list-card list-card-details" aria-hidden="true">
    <p
      v-if="cardinfo.buttonOption == true"
      v-on:mouseout="cardinfo.buttonOption = false"
      class="list-card-operation"
      v-on:click="cardinfo.edit = true"
    >
      修改
    </p>
    <p
      v-if="cardinfo.buttonOption == false"
      v-on:mouseover="cardinfo.buttonOption = true"
      class="list-card-operation"
    ></p>
    <span class="list-card-title js-card-name" dir="auto">
      <span class="card-short-id" hidden>#2</span>
      <p v-if="cardinfo.edit == false" style="word-break: break-all">
        {{ cardinfo.title }}
      </p>
      <!-- https://blog.csdn.net/longlc123/article/details/81171956 -->
      <div
        v-if="cardinfo.edit == true"
        @focus="getFocus"
        @blur="getBlur"
        @input="changeVal"
        class="list-card-editor"
        contenteditable="true"
      ></div>
    </span>

    <BadgeList
      v-if="cardinfo.checklist != null"
      v-bind:checklist="cardinfo.checklist"
    ></BadgeList>
  </div>
</template>

<script>
import CardRestAPI from "@/api/CardRestAPI";
import BadgeList from "@/components/Badge/BadgeList";
import CardDetail from "@/components/CardDetail";
export default {
  name: "Card",
  props: ["cardinfo"],
  components: {
    CardDetail,
    BadgeList,
  },
  data() {
    return {
      card_info: [],
    };
  },
  mounted: function () {
    //
  },
  methods: {
    getFocus(val) {
      if (!this.cardinfo.title) {
        val.target.innerText = this.cardinfo.title;
      }
      val.target.innerText = this.cardinfo.title;
      console.log("getFocus")
    },
    async getBlur(val) {
      if (val.target.innerText == "") {
        val.target.placeholderText = '请输入文字';
      }
      //更新文字
      let response=await CardRestAPI.updateCard(this.cardinfo.id,val.target.innerText);
      console.log("update card:"+"id:"+this.cardinfo.id+" title:"+val.target.innerText+" response:"+response);
      if(response.data.id!=null){
        this.cardinfo.edit = false;
      }
      console.log("getBlur")
    },
    changeVal(val) {
      this.cardinfo.title = val.target.innerText;
      console.log("this.cardinfo.title==>", this.cardinfo.title);
    },
  },
  computed: {},
};
</script>

<style>
.list-card {
  background-color: rgb(108, 243, 234);
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  cursor: pointer;
  /* display: block; */
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  z-index: 0;
}

.list-card-title {
  white-space: normal;
  clear: both;
  display: block;
  margin: 0 0 4px;
  /* overflow: hidden; */
  text-decoration: none;
  word-wrap: break-word;
  color: #172b4d;
}
.list-card-operation {
  background-color: #f4f5f7;
  background-clip: padding-box;
  background-origin: initial;
  border-radius: 3px;
  opacity: 0.8;
  padding: 4px;
  position: absolute;
  right: 2px;
  top: 2px;

  z-index: 40;
}
.list-card-editor {
  background-color: rgb(255, 255, 255);
  min-width: -webkit-fill-available;
  min-height: 90px;
  height: auto;
  resize: none;
  overflow-wrap: break-word;
}
.list-card-editor2 {
  background-color: rgba(184, 178, 178, 0);
  min-width: -webkit-fill-available;
  resize: none;
  background: rgba(0, 0, 0, 0);
  color: rgb(177, 25, 25);
  overflow-wrap: break-word;
}
</style>