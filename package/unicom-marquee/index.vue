<template>
  <div class="unicom-marquee" :style="{width:width,height:heihgt}">
    <div class="u-m-main" ref="box">
      <div class="u-m-m-list" v-for="(item,index) in sendVal" :key="index" ref="list">
        {{item.name}}
        <span class="u-m-m-l-detail">{{item.detail}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnciomMarquee",
  data() {
    return {
      // 定时器标识
      nowTime: null,
      // 每一个内容的宽度
      disArr: []
    };
  },
  props: {
    message: {
      type: "String",
      required: true,
      default: ""
    },
    speed: {
      type: "Number",
      required: true,
      default: "1000"
    },
    sendVal: [],
    width: {
      type: String,
      default: "300px"
    },
    height: {
      type: String,
      default: "55px"
    }
  },
  methods: {
    // 获取margin属性
    getMargin(obj) {
      var marg = window.getComputedStyle(obj, null)["margin-right"];
      marg = marg.replace("px", "");
      return Number(marg); // 强制转化成数字
    },
    // 移动的方法
    moveLeft() {
      var that = this;
      var outbox = this.$refs.box;
      // 初始位置
      var startDis = 0;
      this.nowTime = setInterval(function() {
        startDis -= 0.5;
        // console.log('初始化移动：', startDis)
        if (Math.abs(startDis) > Math.abs(that.disArr[0])) {
          // 每次移动完一个元素的距离，就把这个元素的宽度
          that.disArr.push(that.disArr.shift());
          // 每次移动完一个元素的距离，就把列表数据的第一项放到最后一项
          // console.log('that.sendVal: ', that.sendVal)
          // console.log('that.sendVal: ', that.sendVal.shift())
          that.sendVal.push(that.sendVal.shift());
          startDis = 0;
          // console.log('移动')
        } else {
          // console.log('不来不来就不来...')
        }
        // 后面换了es6的模板字符串就可以了
        outbox.style = `transform: translateX(${startDis}px)`;
      }, this.speed / 60);
    }
  },
  beforeDestroy() {
    // 清除定时器标识
    this.nowTime = null;
  },
  mounted() {
    clearInterval(this.nowTime);
    // var that = this
    var item = this.$refs.list;
    var len = this.sendVal.length;
    var arr = [];
    // 因为设置的margin值一样，所以取第一个就行。
    var margin = this.getMargin(item[0]);
    for (var i = 0; i < len; i++) {
      arr.push(item[i].clientWidth + margin); // 把宽度和 margin 加起来就是每一个元素需要移动的距离
    }
    this.disArr = arr;
    this.moveLeft();
  }
};
</script>
<style lang="scss" scoped>
.unicom-marquee {
  margin: 100px auto;
  overflow: hidden;
  color: red;
  .u-m-main {
    white-space: nowrap;
    .u-m-m-list {
      margin-right: 25px;
      display: inline-block;
      font-size: 0.3rem;
      height: 40px;
      line-height: 40px;
      .u-m-m-l-detail {
        /*color: #FF8900;*/
        color: red;
      }
    }
  }
}
</style>