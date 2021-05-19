<template>
  <div class="unicom-dropdown" :style="styles" @mouseover="flag=true" @mouseleave="flag=false">
    <div class="title">
      <slot></slot>
    </div>
    <transition name="drop">
      <ul v-show="flag">
        <em></em>
        <li v-for="(item,index) in list" :key="index" @click="clickHandle(item,index)">{{item.label}}</li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return {
      flag:false
    }
  },
  props: {
    styles: {
      type: Object,
      default: function() {
        return {
          width: "100%"
        };
      }
    },
    list: {
      type: Array,
      default: function() {
        return [{ label: "暂无选项" }];
      }
    }
  },
  methods: {
    clickHandle(item, index) {
      this.$emit("click", item, index);
    }
  }
};
</script>
<style lang="scss" scoped>
.unicom-dropdown {
  position: relative;
  display: inline-block;
  .title {
    border: 1px solid #dcdfe6;
    height: 38px;
    line-height: 38px;
    font-size: 16px;
    text-align: center;
    padding: 0 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-radius: 4px 4px 4px 4px;
  }
  .drop-leave-active, .drop-enter-active {
    transition: max-height 0.4s;
  }
  .drop-enter, .drop-leave-to {
    max-height: 0;
    // opacity: 0;
  }
  .drop-enter-to, .drop-leave {
    max-height: 100px;
  }
  ul {
    // display: none;
    position: relative;
    text-align: center;
    border: 1px solid #dcdfe6;
    padding: 0;
    border-radius: 4px 4px 4px 4px;
    background: white;
    overflow: hidden;
    em {
      position: absolute;
      width: 0;
      height: 0;
      line-height: 0;
      font-size: 0;
      border: 8px solid;
      bottom: 100%;
      border-color: transparent transparent #dcdfe6 transparent;
    }
    li {
      // list-style: none;
      line-height: 30px;
      padding: 0 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: pointer;
    }
    li:hover {
      background: #dcdfe6;
      color: #409eff;
    }
  }
  ul:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    line-height: 0;
    font-size: 0;
    border: 6px solid;
    bottom: 100%;
    margin-left: 2px;
    border-color: transparent transparent white transparent;
  }
  // &:hover ul {
  //   display: block;
  // }
}
</style>