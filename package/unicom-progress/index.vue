<template>
  <div class="unicom-progress" :style="styles">
    <div class="progress" :style="{'background':background,'width':percentage+'%'}"></div>
  </div>
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
      default: function() {
        return {
          width: "100%",
          background: "#f3f3f3"
        };
      }
    },
    background: {
      type: String,
      default: "#409eff"
    },
    percentage: {
      type: Number,
      default: 0
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.unicom-progress {
  position: relative;
  display: inline-block;
  border-radius: 7px 7px 7px 7px;
  .progress {
    width: 100%;
    height: 15px;
    transition: 0.4s;
    border-radius: 7px 7px 7px 7px;
  }
}
</style>