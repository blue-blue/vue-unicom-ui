<template>
  <div class="alertCover" v-show="visible">
    <div class="alertClass" ref="alertBox">
      <div class="a-c-title" :class="type">{{title}}</div>
      <div class="a-c-content">
        <span class="a-c-c-info">{{info}}</span>
        <div class="a-c-input">
          <!-- 输入框内容 -->
          <input class="a-c-i-input" type="text" v-model="inputVal" />
        </div>
      </div>

      <div class="a-c-button">
        <button @click="cancelFn" class="a-c-b-cancel">{{cancelButtonText}}</button>
        <button @click="confirmFn" class="a-c-b-confirm">{{confirmButtonText}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "inputAlert",
  data() {
    return {
      inputVal: ""
    };
  },
  methods: {
    //取消按钮
    cancelFn() {
      //重置
      this.$emit("cancelBack", "取消");
    },
    // 确认按钮
    confirmFn() {
      this.$emit("confirmBack", this.inputVal);
    }
  },
  mounted() {},
  props: {
    info: String, //提示内容
    //提示标题
    title: {
      default: "提示",
      type: String
    },
    //提示类型
    type: {
      default: "default",
      type: String
    },
    confirmButtonText: {
      default: "确认",
      type: String
    },
    cancelButtonText: {
      default: "取消",
      type: String
    },
    confirmBack: {
      type: Object
    },
    cancelBack: {
      type: Object
    },
    //控制显示隐藏
    visible: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    visible(newVal) {
      this.inputVal = "";
      this.visible = newVal;
    }
  }
};
</script>
<style lang="scss" scoped>

.alertCover {
  $warning: #e6a23c;
$success: #67c23a;
$error: #f56c6c;
$default: #909399;
.warning {
  background: $warning;
}
.success {
  background: $success;
}
.error {
  background: $error;
}
.default {
  background: $default;
}
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .alertClass {
    width: 320px;
    height: auto;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    border: 1px solid #999;
    overflow: hidden;
    position: absolute;
    padding-bottom: 10px;
    top: 40%;
    left: 50%;
    animation: 1s;
    text-align: center;
    font-size: 16px;
    background: #fff;
    .a-c-title {
      width: 100%;
      border-bottom: 1px solid;
      line-height: 40px;
      font-size: 20px;
      color: #fff;
    }
    .a-c-content {
      width: 100%;
      height: 100px;
      padding: 20px 0;
      box-sizing: border-box;
      .a-c-input {
        margin: 10px 0;
        .a-c-i-input {
          width: 200px;
          height: 34px;
          box-sizing: border-box;
          border-color: 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          padding: 0 15px;
          outline: none;
          border: 1px solid #dcdfe6;
          -webkit-appearance: none;
          background-color: #fff;
          border-radius: 4px;
        }
      }
    }
    .a-c-button {
      display: flex;
      justify-content: space-around;
      button {
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 10px;
        background: #fff;
        border: 1px solid #dcdfe6;
        margin: 0;
        padding: 0;
        outline: none; //消除默认点击蓝色边框效果
        &:active {
          background: #3a8ee6;
          color: #fff;
          border: 1px transparent;
        }
      }
      .a-c-b-confirm {
        background: #66b1ff;
        color: #fff;
        border: 1px transparent;
      }
    }
  }
}
</style>