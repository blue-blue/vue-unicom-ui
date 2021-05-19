<template>
  <div class="unicom-checkbox-group">
    <div class="unicom-checkbox-wrap" v-for="(item,index) in sourceList" :key="index">
      <label class="unicom-checkbox" :class="{ 'is-disabled': item.disabled }">
        <input type="checkbox" v-model="currentValue" :value="item.value" :disabled="item.disabled" />
        <span class="label"><i class="iconfont" :class="item.icon"></i> {{item.label}} </span>
      </label>
    </div>
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
    sourceList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentValue: this.checkValue
    }
  },
  watch: {
    currentValue: function(val) {
      this.$emit("input",val)
    }
  },
  methods: { },
  computed: { },
  mounted() { }
};
</script>
<style lang="scss" scoped>
.unicom-checkbox-group {
  // display: inline-block;
  display: flex;
  .unicom-checkbox-wrap {
    // display: inline-block;
    margin-right: 30px;
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
}
</style>