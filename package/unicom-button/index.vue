<template>
  <div class="unicom-button" :class="{ 'is-disabled': disabled }">
    <button
      :class="plain == false ? 'default' : 'borderRadius'"
      :style="{
        background: background,
        borderColor: background == 'white' ? '#dcdfe6' : background,
        color: background == 'white' ? '#000' : 'white',
      }"
      @click="clickHandle"
    >
      <span class="slot"> <slot></slot> </span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: "white",
    },
    plain: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    clickHandle(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="scss" type="text/css">
.unicom-button {
  display: inline-block;
  box-sizing: border-box;
  width: 100px;
  &:active button {
    opacity: 0.75;
  }
  button {
    width: 100%;
    outline: none;
    white-space: nowrap;
    cursor: pointer;
    padding: 0 7px;
    height: 38px;
    line-height: 38px;
    font-size: 16px;
    border: 1px solid transparent;
    text-align: center;
    .slot {
      .iconfont {
        margin-right: 7px;
      }
    }
  }
  .borderRadius {
    border-radius: 20px;
  }
  .default {
    border-radius: 4px;
  }
}
.is-disabled {
  button {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>