<template>
  <div class="card-composer-container js-card-composer-container">
    <a class="open-card-composer js-open-card-composer" href="#">
      <span class="icon-sm icon-add"></span>
      <textarea v-if="add_card_button_show==0"
        class="list-card-composer-textarea js-card-title"
        dir="auto"
        placeholder="Enter a title for this card…"
        style="
          overflow: hidden;
          overflow-wrap: break-word;
          resize: none;
          height: 54px;"
        v-model="new_card_title"
      >
      </textarea>
      <button v-if="add_card_button_show==0" @click="add_card">添加卡片</button>
      <span class="js-add-another-card" v-if="add_card_button_show==1" v-on:click="show_add_card_button">Add a card</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "CardComposer",
  props:["boardcardlist_index"],
  data() {
    return {
      add_card_button_show:1,
      new_card_title:"",
    };
  },
  components: {},
  mounted:function(){
    console.log("boardcardlist_index:"+this.boardcardlist_index)
  },
  methods: {
    //显示add card按钮
    show_add_card_button() {
      this.add_card_button_show=0
    },
    add_card(){
      this.$emit("add_card",this.new_card_title,this.boardcardlist_index)
      this.add_card_button_show=1;
      this.new_card_title="";
    }
  },
};
</script>
<style>
.icon-sm {
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  width: 20px;
}
.card-composer-container {
  min-height: 38px;
  max-height: 38px;
  display: flex;
  justify-content: space-between;
}
.open-card-composer {
  border-radius: 3px;
  color: #5e6c84;
  display: block;
  flex: 1 0 auto;
  margin: 2px 0 8px 8px;
  padding: 4px 8px;
  position: relative;
  text-decoration: none;
  -webkit-user-select: none;
  user-select: none;
}
.icon-add:before {
  content: "\e901";
}
</style>