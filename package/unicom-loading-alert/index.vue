<template>
  <div class="alertCover" v-show="visible">
    <div class="alertClass">
      <img class="a-a-loading" :src="icon" alt="icon" />
      <p class="a-a-content">{{info}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "loadingAlert",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  props: {
    info: String, //提示内容
    //控制显示隐藏
    visible: {
      default: false,
      type: Boolean
    },
    icon: {
      default: "",
      type: String
    }
  },
  watch: {
    visible(newVal) {
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
  @keyframes loading {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
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
    width: auto;
    height: auto;
    padding: 20px 30px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.6);
    transform: translate(-50%, -50%);
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    font-size: 16px;
    .a-a-loading {
      display: inline-block;
      width: 48px;
      height: 48px;
      animation: loading 1.4s infinite;
      color: #fff;
      border: 1px solid #fff;
    }
    .a-a-content {
      color: #fff;
    }
  }
}
</style>