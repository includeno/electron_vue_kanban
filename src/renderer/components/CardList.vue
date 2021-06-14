<template>
  <div class="list-cards u-fancy-scrollbar">
    <div v-for="(card,index) in cardlist" :key="index">
      <Card v-bind:card_info="card"></Card>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  name: "CardList",
  props:["cardlist"],
  data() {
    return {
      
    };
  },
  mounted: function () {
    
  },
  components: {
    Card,
  },
};
</script>

<style>
.list-cards {
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 4px;
  padding: 0 4px;
  z-index: 1;
  min-height: 0;
}
.u-fancy-scrollbar {
    -webkit-overflow-scrolling: touch;
    -webkit-transform: translateZ(0);
}
</style>