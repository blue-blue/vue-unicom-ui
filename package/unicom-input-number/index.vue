<template>
  <div class="unicom-input-number-wrap">
    <div class="unicom-input-number" :class="{ 'is-disabled': disabled }">
      <span
        class="numberHandle minus"
        :class="{ 'is-disabled': currentValue<=min }"
        :disabled="currentValue<=min"
        @click="!disabled&&handle('minus')"
      >-</span>
      <input v-model.number="currentValue" @focus="handle($event)" @blur="handle($event)" :disabled="disabled" type="number" />
      <span
        class="numberHandle add"
        :class="{ 'is-disabled': currentValue>=max }"
        :disabled="currentValue>=max"
        @click="!disabled&&handle('add')"
      >+</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    precision: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10
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
    currentValue: {
       handler: function(val, oldval) {
        if(val>this.max){
          this.currentValue = this.max;
        }else if(val<this.min){
          this.currentValue = this.min;
        }
        this.$emit("change", this.currentValue);
      }
    }
  },
  methods: {
    handle(type) {
      if(type=="add" || type=="minus") {
        type == "add"?this.currentValue=Number((this.currentValue+this.step).toFixed(this.precision)):this.currentValue=Number((this.currentValue-this.step).toFixed(this.precision));
      }else {
        this.$emit("focus", type, this.currentValue);
        this.$emit("blur", type, this.currentValue);
      }
    }
  }
};
</script>

<style lang="scss" type="text/css">
.unicom-input-number-wrap {
  &:hover {
    border: 1px solid #409eff;
  }
  display: inline-block;
  box-sizing: border-box;
  width: 200px;
  color: #606266;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: white;
  overflow: hidden;
  .unicom-input-number {
    display: flex;
    justify-content: space-between;
    height: 36px;
    line-height: 36px;
    .numberHandle {
      display: inline-block;
      padding: 0 15px;
      font-size: 20px;
      background: #f5f7fa;
      cursor: pointer;
      user-select: none;
    }
    .add {
      border-radius: 0 4px 4px 0;
    }
    .minus {
      border-radius: 4px 0 0 4px;
    }
    input {
      flex: 1;
      width: 60%;
      height: 36px;
      line-height: 36px;
      padding: 0px 7px;
      margin: 0;
      outline: none;
      border: 1px solid #dcdfe6;
      border-top: 0;
      border-bottom: 0;
      color: #606266;
      text-align: center;
    }
    input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
  .is-disabled {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>