<template>
  <div class="unicom-checkbox-wrap">
    <label class="unicom-checkbox" :class="{ 'is-disabled': disabled }">
      <input type="checkbox" v-model="currentValue" :value="value" :disabled="disabled" />
      <span class="label"> <slot></slot> </span>
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'checkValue',//指向props的参数名
  },
  props: {
    checkValue: {
      type: Array,
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
      currentValue: this.checkValue
    }
  },
  watch: {
    currentValue: function (val) {
      this.$emit("input", val);
    }
  },
  computed: { },
  methods: { }
};
</script>
<style lang="scss" scoped>
.unicom-checkbox-wrap {
  display: inline-block;
  .unicom-checkbox{
    input[type="checkbox"] {
      vertical-align: middle;
      width: 18px;
      height: 18px;
      margin-top: -2px;
      background-color: #fff;
      border: 1px solid #c9c9c9;
      border-radius: 2px;
      color: #fff;
      text-align: center;
      line-height: 15px;
      margin-right: 0.14rem;
      cursor: pointer;
      -webkit-appearance: none;
      -moz-appearance: none;
      -ms-appearance: none;
      -o-appearance: none;
      appearance: none;
      outline: none;
      &:checked {
        color: #fff;
        background-color: #1d8bea;
        border: 1px solid #1d8bea;
      }
      &:hover {
        border: 1px solid #1d8bea;
      }
      &:after {
        content: "✔";
      }
    }
  }
  .is-disabled {
    cursor: not-allowed;
    input[type="checkbox"] {
      cursor: not-allowed;
      &:hover {
        border: 1px solid #c0c4cc;
      }
    }
  }
}
</style>