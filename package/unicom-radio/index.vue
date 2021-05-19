<template>
  <div class="unicom-radio-wrap">
    <label class="unicom-radio" :class="{ 'is-disabled': disabled }">
      <input class="radio" type="radio" :name="name" :value="value" v-model="currentValue" :disabled="disabled" />
      <span class="label"> <slot></slot> </span>
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'checked',//指向props的参数名
    event: 'change'//事件名称
  },
  props: {
    name: {
      type: String,
      required: true
    },
    checked: {
      type: [Number, String],
      required: true
    },
    value: {
      type: [Number, String],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentValue: this.checked
    }
  },
  watch: {
    currentValue: function (val) {
      this.$emit("change", val);
    }
  }
};
</script>
<style lang="scss" scoped>
.unicom-radio-wrap {
  height: 36px;
  line-height: 36px;
  display: inline-block;
  .unicom-radio {
    .label{
      .iconfont{
        padding: 0 3px;
      }
    }
  }
  .is-disabled {
    cursor: not-allowed;
    input {
      cursor: not-allowed;
    }
  }
}
</style>