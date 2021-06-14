<template>
    <div>
        <span class="list-card-title js-card-name" dir="auto">
            <span class="card-short-id " hidden>#2</span>
            {{card.title}}
        </span>
        <BadgeList v-bind:checklist="card.checklist"></BadgeList>
    </div>
</template>

<script>
import BadgeList from "./Badge/BadgeList.vue";
export default {
  name: "CardDetail",
  props:["card"],
  data() {
    return {
      message: "CardDetail message",
    };
  },
  components:{
     BadgeList,
  }
};
</script>

<style>
.list-card-title {
    clear: both;
    display: block;
    margin: 0 0 4px;
    overflow: hidden;
    text-decoration: none;
    word-wrap: break-word;
    color: #172b4d;
}
</style>