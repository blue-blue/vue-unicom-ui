<template>
  <div class="alertCover">
    <transition name="alert-fade">
      <div class="alertClass" v-show="visible">
        <div class="a-c-title" :class="type">{{title}}</div>
        <div class="a-c-content">{{info}}</div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "infoAlert",
  data() {
    return {
      timer: null //延迟器
    };
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
      this.$emit("closeBack", "消息");
    }
  },
  created() {
    //第一次进入
    this.visible = false;
  },
  mounted() {},
  props: {
    info: String, //提示内容
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
      default: 2500,
      type: Number
    },
    //控制显示隐藏
    visible: {
      default: false,
      type: Boolean
    },
    closeBack: {
      type: Object
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
  .alert-fade-enter-active,
  .alert-fade-leave-active {
    transition: all 0.3s ease-in-out;
  }
  .alert-fade-enter {
    transform: translateX(-320px);
    opacity: 0;
  }
  .alert-fade-leave-to {
    opacity: 1;
    transform: translateY(-100%);
  }
  .alertClass {
    width: 320px;
    height: 140px;
    border-radius: 10px;
    border: 1px solid #999;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
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