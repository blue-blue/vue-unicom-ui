<template>
  <div class="unicom-select-wrap" :class="{'hidden': disabled}">
    <div class="unicom-select" :class="{'is-disabled': disabled}">
      <input type="text" v-model="currentValue.lable" @click="isshowFlag" :placeholder="placeholder" />
      <i v-show="currentValue && clearable" @click="cleanValue()" class="iconfont unicom-guanbi"></i>
      <i class="iconfont" :class="isShow?'unicom-xiajiantou':'unicom-shangjiantou'"></i>
      <ul v-show="isShow">
        <li
          v-for="(item,index) in options"
          :class="{'active':currentValue===item}"
          :key="index"
          @click="selectCurrent(item)"
        >{{item.lable}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    event: "change"
  },
  props: {
    value: {
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请选择内容..."
    },
    clearable: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isShow: false,
      currentValue: this.value
    };
  },
  computed: { },
  watch: {
    currentValue: {
      handler: function(val, oldval) {
        this.$emit("change", val);
      }
    }
  },
  methods: {
    isshowFlag() {
      if(this.disabled==false){
        this.isShow = !this.isShow;
        this.isShow == true ? this.blurHandle() : "";
      }
    },
    blurHandle() {
      setTimeout(() => {
        this.isShow = false;
      }, 20000);
    },
    selectCurrent(item) {
      this.currentValue = item;
      this.isShow = false;
    },
    cleanValue() {
      this.currentValue = "";
    }
  }
};
</script>

<style lang="scss">
.hidden {
  overflow: hidden;
}
.unicom-select-wrap {
  &:hover {
    border: 1px solid #409eff;
  }
  display: inline-block;
  box-sizing: border-box;
  width: 200px;
  height: 36px;
  line-height: 36px;
  color: #606266;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: white;
  .unicom-select {
    position: relative;
    display: flex;
    padding: 0 7px;
    input {
      flex: 1;
      width: 80%;
      border: 0;
      padding: 0;
      outline: none;
      border-radius: 4px;
      background: transparent;
      color: #606266;
    }
    .iconfont {
      padding-left: 7px;
    }
    .unicom-guanbi {
      cursor: pointer;
    }
    ul {
      background: #fff;
      padding: 0;
      position: absolute;
      left: 0px;
      top: 40px;
      width: 100%;
      border-radius: 4px;
      box-shadow: 0px 0px 4px 0px #ccc;
      li {
        list-style: none;
        font-size: 14px;
        padding: 0;
        text-indent: 14px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #606266;
        height: 34px;
        line-height: 34px;
        box-sizing: border-box;
        cursor: pointer;
        &:hover {
          background-color: #f5f7fa;
        }
        &.active {
          color: #409eff;
          font-weight: bold;
        }
      }
    }
  }
  .is-disabled {
    cursor: not-allowed;
    background-color: #f5f7fa;
    input {
      cursor: not-allowed;
    }
  }
}
</style>