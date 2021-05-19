<template>
  <div class="unicom-switch-wrap">
    <div
      class="unicom-switch"
      :style="{background:currentValue==true?openColor:downColor}"
      :class="{ 'is-disabled': disabled }"
      @click="!disabled && control()"
    >
      <span class="remind openRemind" v-show="currentValue==true">{{openRemind}}</span>
      <span class="slider" :style="{float:currentValue==false?'left':'right'}"></span>
      <span class="remind downRemind" v-show="currentValue==false">{{downRemind}}</span>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    openColor: {
      type: String,
      default: "#409eff"
    },
    downColor: {
      type: String,
      default: "#dcdfe6"
    },
    openRemind: {
      type: String,
      default: "开"
    },
    downRemind: {
      type: String,
      default: "关"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    currentValue: function (val) {
      this.$emit("change",val)
    }
  },
  methods: {
    control(ev) {
      this.currentValue = !this.currentValue;
    }
  }
};
</script>

<style lang="scss" type="text/css">
.unicom-switch-wrap {
  display: inline-block;
  box-sizing: border-box;
  min-width: 60px;
  height: 25px;
  line-height: 25px;
  .unicom-switch {
    height: 100%;
    padding: 0 5px;
    border-radius: 18px;
    color: white;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    text-align: center;
    transition: 0.3s;
    .remind{
      margin: 0 5px;
    }
    .slider {
      float: right;
      display: block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      background: white;
      border-radius: 50%;
      margin-top: 2.5px;
    }
  }
  .is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>