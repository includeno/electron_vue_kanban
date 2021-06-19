<template>
  <div class="list-cards u-fancy-scrollbar">
    
    <draggable
      class="list-group"
      tag="ul"
      v-model="dataInCardList"
      v-bind="dragOptions"
      :move="onMove"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <transition-group type="transition" >
        <div class="list-group-item" v-for="(card, index) in dataInCardList" :key="index">
          <Card v-bind:card_info="card"></Card>
        </div>
        
      </transition-group>
    </draggable>
    <div v-if="dataInCardList.length>0">
      {{listString}}
    </div>
    
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Card from "./Card.vue";

export default {
  name: "CardList",
  props: ["cardlist"],
  data() {
    return {
      data:[],
      editable: true,
      isDragging: false,
      delayedDragging: false,
    };
  },
  mounted: function () {
    this.data=this.cardlist;
  },
  components: {
    Card,
    draggable,
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost",
      };
    },
    listString() {
      return JSON.stringify(this.dataInCardList, null, 2);
    },
    dataInCardList: {
      get() {
        return this.data;
      },
      set(newValue){
            console.log('computed setter...'+newValue);
            this.data=newValue;
            return this.data;
        }
    },
  },
  methods: {
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    
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
  cursor: pointer;
}
.u-fancy-scrollbar {
  -webkit-overflow-scrolling: touch;
  -webkit-transform: translateZ(0);
}
.list-group-item {
  cursor: move;
}
.list-group {
  min-height: 20px;
}


</style>