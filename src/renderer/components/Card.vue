<template>
    <div class="list-card">
        <CardDetail class="list-card-details" :card="card_info.card"></CardDetail>
    </div>
</template>

<script>

import CardDetail from './CardDetail.vue'
export default {
  name: "Card",
  props:["card_info"],
  data() {
    return {
      
    };
  },
  mounted:function(){
    
  },
  components: {
    CardDetail,
   
  },
};
</script>

<style>

.list-card {
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
    cursor: pointer;
    display: block;
    margin-bottom: 8px;
    max-width: 300px;
    min-height: 20px;
    position: relative;
    text-decoration: none;
    z-index: 0;
}
.list-card-details {
    overflow: hidden;
    padding: 6px 8px 2px;
    position: relative;
    z-index: 10;
}
</style>