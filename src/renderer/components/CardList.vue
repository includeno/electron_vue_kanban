<template>
  <div class="list-cards u-fancy-scrollbar">
    <draggable
      class="list-group"
      tag="div"
      v-model="dataInCardList"
      v-bind="dragOptions"
      :move="onMove"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <transition-group name="no" type="transition" tag="div">
        <div
          
          v-for="(card, index) in dataInCardList"
          :key="index"
        >
          <Card v-bind:cardinfo="card"></Card>
        </div>
      </transition-group>
    </draggable>
    <div style="white-space: normal;" v-if="dataInCardList.length > 0">
      {{ listString }}
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
      data2: [],
      editable: true,
      isDragging: false,
      delayedDragging: false,
    };
  },
  mounted: function () {
    this.data2 = this.cardlist;
  },
  components: {
    Card,
    draggable,
  },
  computed: {
    dragOptions() {
      return {
        animation: 20,
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
        return this.data2;
      },
      set(newValue) {
        console.log("newValue===''..." + newValue==='');
        console.log("newValue==''..." + newValue=='');
        console.log("newValue===null..." + newValue===null);
        console.log("newValue==null..." + newValue==null);
        if (newValue != null && newValue!=="") {
          //位置发生了改变
          console.log("computed setter..." + newValue.length);
          this.data2 = newValue;
          
        }
        else{
          //返回原位置
          
        }
        return this.data2;
      },
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
  
}
.u-fancy-scrollbar {
  -webkit-overflow-scrolling: touch;
  -webkit-transform: translateZ(0);
}

</style>