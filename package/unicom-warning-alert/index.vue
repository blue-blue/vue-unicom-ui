<template>
  <div class="alertCover" v-show="visible">
    <div class="alertClass" ref="alertBox">
      <div class="a-c-title" :class="type">{{title}}</div>
      <div class="a-c-content">{{info}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "warningAlert",
  data() {
    return {
      timer: null //延迟器
    };
  },
  created() {
    this.visible = false;
  },
  methods: {
    //延时关闭
    setTimeoutFn() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.closeAlert();
      }, this.delayTime);
    },
    //关闭弹框
    closeAlert() {
      this.$emit("closeBack", "");
    }
  },
  mounted() {},
  props: {
    info: {
      type: String,
      default: "这是一条提示内容",
    }, //提示内容
    title: {
      default: "提示",
      type: String
    }, //提示标题
    //提示类型
    type: {
      default: "default",
      type: String
    },
    delayTime: {
      default: 1500,
      type: Number
    },
    //控制显示隐藏
    visible: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    visible: {
      handler: function(val, oldval) {
        val && this.setTimeoutFn();
        this.visible = val;
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style lang="scss" scoped>
.alertCover {
  $warning: #e6a23c;
  $success: #0c6;
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
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3)!important;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .alertClass {
    width: 320px;
    height: 140px;
    transform: translate(-50%, -50%);
    border-radius: 4px 4px 4px 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    overflow: hidden;
    position: absolute;
    top: 40%;
    left: 50%;
    animation: 1s;
    text-align: center;
    font-size: 16px;
    .a-c-title {
      width: 100%;
      border-bottom: 1px solid;
      line-height: 40px;
      font-size: 20px;
      color: #fff;
    }
    .a-c-content {
      width: 100%;
      line-height: 100px;
      background: #fff;
    }
  }
}
</style>