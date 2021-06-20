<template>
  <div>
    <span class="list-card-title js-card-name" dir="auto">
      <span class="card-short-id" hidden>#2</span>
      <p style="word-break: break-all">{{ card.title }}</p>
    </span>
    
  </div>
</template>

<script>

export default {
  name: "CardDetail",
  props: ["card"],
  data() {
    return {
      message: "CardDetail message",
    };
  },
  components: {
    
  },
};
</script>

//white-space: normal;
<style>
.list-card-title {
  white-space: normal;
  clear: both;
  display: block;
  margin: 0 0 4px;
  overflow: hidden;
  text-decoration: none;
  word-wrap: break-word;
  color: #172b4d;
}
</style>