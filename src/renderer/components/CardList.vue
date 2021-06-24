<template>
  <draggable
    class="list-cards list-group u-fancy-scrollbar list-card-details"
    v-model="dataInCardList"
    v-bind="dragOptions"
    :move="onMove"
    @start="isDragging = true"
    @end="isDragging = false"
  >
    <transition-group name="no" type="transition">
      <div v-for="(card, index) in dataInCardList" :key="index">
        <Card v-bind:cardinfo="card"></Card>
      </div>
    </transition-group>
  </draggable>

  <!-- <div style="white-space: normal;" v-if="dataInCardList.length > 0">
      {{ listString }}
    </div> -->
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
        console.log("newValue===''..." + newValue === "");
        console.log("newValue==''..." + newValue == "");
        console.log("newValue===null..." + newValue === null);
        console.log("newValue==null..." + newValue == null);
        if (newValue != null && newValue !== "") {
          //位置发生了改变
          console.log("computed setter..." + newValue.length);
          this.data2 = newValue;
        } else {
          //返回原位置
          console.log("set(newValue)");
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
.list-card-details {
  overflow: hidden;
  padding: 6px 6px 2px 2px;
  position: relative;
  z-index: 10;
}
.list-cards {
  flex: 1 1 auto;

  margin: 0 4px;
  padding: 0 4px;
  z-index: 1;
  min-height: 0;
  bottom: 0;
  
}
.u-fancy-scrollbar {
  max-height: 75%;
  overflow: scroll;
  background: #eeeeee;
}
.u-fancy-scrollbar::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}
.u-fancy-scrollbar::-webkit-scrollbar-track-piece {
  background: rgba(233, 63, 25, 0.08);
}
</style>