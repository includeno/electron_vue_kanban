<template>
  <span class="js-badges">
    <div class="badge js-checkitems-badge" title="title">
      <span class="badge-icon icon-sm icon-checklist"></span>
      <span class="badge-text js-checkitems-badge-text">
        {{ completedTaskCount }}/{{ totalTaskCount }}
      </span>
    </div>
  </span>
</template>

<script>
export default {
  name: "Badge",
  props: ["checklist"],
  data() {
    return {
      title: "title demo",
      checked: 0,
    };
  },
  components: {},
  computed: {
    totalTaskCount: function () {
      var count = 0;
      if (this.checklist != null) {
        for (var p1 of this.checklist) {
          count = count + p1.check_list_items.length;
        }
      }

      return count;
    },
    // 计算属性的 getter
    completedTaskCount: function () {
      var count = 0;
      if (this.checklist != null) {
        for (var p1 of this.checklist) {
          for (var i = 0; i < p1.check_list_items.length; i++) {
            var pair = p1.check_list_items[i];
            for (var pro in pair) {
              if (pair[pro] == "1") {
                count = count + 1;
              }
            }
          }
        }
      }

      return count;
    },
  },
};
</script>

<style>
.badge-text {
  font-size: 12px;
  padding: 0 4px 0 2px;
  vertical-align: top;
  white-space: nowrap;
}
.badge {
  color: #5e6c84;
  display: inline-block;
  margin: 0 4px 4px 0;
  max-width: 100%;
  min-height: 20px;
  overflow: hidden;
  position: relative;
  padding: 2px;
  text-decoration: none;
  text-overflow: ellipsis;
  vertical-align: top;
}
.badge-icon {
  color: #6b778c;
  vertical-align: top;
}
.icon-sm {
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  width: 20px;
}

.icon-checklist:before {
  content: "\e91a";
}
</style>