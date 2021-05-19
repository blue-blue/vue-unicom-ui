<template>
  <div class="unicom-input-text-wrap">
    <div class="unicom-input-text" :class="{ 'is-disabled': disabled }">
      <span class="iconLeft">
        <slot></slot>
      </span>
      <input
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        v-model="currentValue"
        @focus="handle"
        @blur="handle"
        @change="handle"
      />
      <span
        v-show="currentValue && clearable"
        class="iconfont unicom-guanbi"
        @click="cleanValue()"
      ></span>
      <span
        class="iconfont"
        :class="yanjingIcon"
        @click="showPassword()"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: "",
    },
    placeholder: {
      type: String,
      default: "请输入内容...",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
  },
  data() {
    return {
      inputType: this.type,
      currentValue: this.value,
      typeFlag: false,
      yanjingIcon: false,
    };
  },
  watch: {
    currentValue: function (val) {
      this.$emit("input", val);
      this.showIcon();
    },
  },
  methods: {
    cleanValue() {
      this.currentValue = "";
      this.$emit("clear", "");
    },
    handle(e) {
      this.$emit("focus", e, e.target.value);
      this.$emit("blur", e, e.target.value);
      this.$emit("change", e, e.target.value);
    },
    showPassword() {
      //密码展示/隐藏
      this.typeFlag = !this.typeFlag;
      this.typeFlag == false
        ? (this.inputType = "password")
        : (this.inputType = "text");
      this.showIcon();
    },
    showIcon() {
      // 眼睛的显示/隐藏
      if (this.type == "password") {
        if (this.inputType == "password") {
          this.currentValue == ""
            ? (this.yanjingIcon = "")
            : (this.yanjingIcon = "unicom-yanjing_bi");
        } else if (this.inputType !== "password") {
          this.currentValue == ""
            ? (this.yanjingIcon = "")
            : (this.yanjingIcon = "unicom-yanjing");
        }
      } else {
        this.yanjingIcon = "";
      }
    },
  },
  mounted() {
    this.showIcon();
  },
};
</script>

<style lang="scss" type="text/css">
.unicom-input-text-wrap {
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
  .unicom-input-text {
    display: flex;
    height: 36px;
    line-height: 36px;
    input {
      flex: 1;
      width: 80%;
      height: 36px;
      line-height: 36px;
      border: 0;
      padding: 0 7px;
      outline: none;
      border-radius: 4px;
      background: transparent;
    }
    .iconLeft {
      .iconfont {
        margin: 0 0 0 7px;
      }
    }
    .iconfont {
      margin-right: 5px;
      background: transparent;
      cursor: pointer;
    }
  }
  .is-disabled {
    cursor: not-allowed;
    background-color: #f5f7fa;
    input {
      background-color: transparent;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
</style>