<template>
  <div class="unicom-select-linkage" :class="{ 'is-disabled': disabled }" :style="styles">
    <input type="text" :value="value" @click="isShow()" :placeholder="placeholder" />
    <i v-show="value && clearable" class="unicom-close" @click="cleanValue">X</i>
    <ul class="menu menu1" v-show="listShow" :style="{'width':menuWidth+'px'}">
      <li v-for="(item,index) in list" :key="index" @click="clickHandle1(item,index)">
        <span>{{item.label}}</span>
        <i>&gt;</i>
      </li>
    </ul>
    <ul class="menu menu2" :style="{'width':menuWidth+'px', 'left':menuWidth-4+'px'}" v-show="listShow && source2Show">
      <li v-for="(item,index) in source2.children" :key="index" @click="clickHandle2(item,index)">
        <span>{{item.label}}</span>
        <i>&gt;</i>
      </li>
    </ul>
    <ul class="menu menu3" :style="{'width':menuWidth+'px', 'left':menuWidth*2-8+'px'}" v-show="listShow && source2Show && source3Show">
      <li v-for="(item,index) in source3.children" :key="index" @click="clickHandle3(item,index)">
        <span>{{item.label}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
      default: function() {
        return {
          width: "30%"
        };
      }
    },
    menuWidth: {
      default: 150
    },
    placeholder: {
      type: String,
      default: "请选择内容..."
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default: function() {
        return [
          {
            label: "项目管理",
            value: 1,
            children: [
              {
                label: "项目进度",
                value: 2,
                children: [
                  {
                    label: "项目一",
                    value: 3,
                    children: [{ label: "详细信息", value: 4 }]
                  }
                ]
              },
              {
                label: "任务安排",
                value: 2,
                children: [
                  {
                    label: "项目er",
                    value: 3,
                    children: [{ label: "详细信息", value: 4 }]
                  }
                ]
              }
            ]
          },
          {
            label: "数据统计",
            value: 1,
            children: [
              {
                label: "任务安排",
                value: 2
              }
            ]
          },
          {
            label: "人员管理",
            value: 1
          }
        ];
      }
    }
  },
  data() {
    return {
      listShow: false,
      source2: [],
      source2Show: false,
      source3: [],
      source3Show: false,
      value: ""
    };
  },
  computed: {},
  methods: {
    isShow() {
      this.listShow = !this.listShow;
      // this.isShow == true ? this.blurHandle() : "";
    },
    clickHandle1(item,index) {
      if (item.children && item.children.length !== 0) {
        this.source2 = item;
        this.source2Show = true;
        this.source3Show = false;
      } else {
        this.source2Show = false;
        this.value = item.label;
      }
    },
    clickHandle2(item) {
      if (item.children && item.children.length !== 0) {
        this.source3 = item;
        this.source3Show = true;
      } else {
        this.source3Show = false;
        this.value = item.label;
      }
    },
    clickHandle3(item) {
      this.value = item.label;
      this.$emit("input", item);
    },
    // blurHandle() {
    //   setTimeout(() => {
    //     this.isShow = false;
    //   }, 20000);
    // },
    selectCurrent(item) {
      const value = item.lable;
      this.value = value;
      this.$emit("click", value);
      // this.isShow = false;
    },
    cleanValue() {
      this.value = "";
      this.$emit("input", "");
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.unicom-select-linkage {
  position: relative;
  display: inline-block;
  input {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 14px;
    height: 38px;
    line-height: 38px;
    outline: none;
    border: 1px solid #dcdfe6;
    color: #606266;
    border-radius: 4px;
    &:focus {
      border-color: #409eff;
    }
  }
  .unicom-close {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-style: normal;
    font-size: 12px;
    cursor: pointer;
  }
  .menu {
    position: absolute;
    top: 40px;
    height: 150px;
    background: #fff;
    padding: 0;
    border-radius: 4px;
    box-shadow: 0px 0px 4px 0px #ccc;
    li {
      list-style: none;
      margin: 0;
      padding: 0 14px;
      font-size: 14px;
      width: 100%;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;
      span {
        float: left;
      }
      i {
        float: right;
        font-style: normal;
      }
      &:hover {
        background-color: #f5f7fa;
      }
      &.active {
        color: #409eff;
        font-weight: bold;
      }
    }
  }
  .menu2, .menu3{
    border-radius: 0 4px 4px 0;
  }
  .is-disabled {
    input {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
</style>
