<template>
  <div class="list-header">
    <h6>{{header}}</h6>
  </div>
</template>

<script>

export default {
  name: "CardListHeader",
  props:["header"],
  data() {
    return {
      
    };
  },
  components: {
    
  },
};
</script>

<style>
.list-header {
    flex: 0 0 auto;
    padding: 10px 8px;
    position: relative;
    min-height: 20px;
}
</style>