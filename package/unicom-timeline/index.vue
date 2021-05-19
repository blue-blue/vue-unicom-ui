<template>
  <div class="unicom-timeline" :style="styles">
    <div v-for="(item,index) in list" :key="index" class="timeLine">
      <p class="point" :style="{'background':index<activIndex? color:'white','borderColor': color}"></p>
      <div class="content">
        <div class="time">{{item.timestamp}}</div>
        <div class="text">{{item.content}}</div>
      </div>
    </div>
    <div class="dottedLine"></div>
  </div>
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
      default: function() {
        return {
          width: "100%"
        };
      }
    },
    color: {
      type: String,
      default: "#39f"
    },
    reverse:{
      type: Boolean,
      default:false
    },
    activIndex:{
      type: Number,
      default:0
    },
    activities: {
      type: Array,
      default: function() {
        return [
          { content: "暂无数据", timestamp: "00-00-00 00:00" },
          { content: "暂无数据", timestamp: "00-00-00 00:00" }
        ];
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    list:function(){
      let newArr = [];
      this.reverse == true? newArr = this.activities.reverse(): newArr = this.activities;
      return newArr;
    }
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.unicom-timeline {
  // border: 1px solid red;
  overflow: hidden;
  position: relative;
  .timeLine {
    position: relative;
    top: 0;
    width: 100%;
    .point {
      width: 15px;
      height: 15px;
      border: 1px solid #39f;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: -14px;
      z-index: 10;
    }
    .content {
      overflow: hidden;
      margin: 0 0 5px 30px;
      font-size: 16px;
      border: 1px solid #409eff;
      border-radius: 4px 4px 4px 4px;
      padding: 10px;
      .time {
        color: #909399;
        font-size: 14px;
      }
    }
  }
  .dottedLine {
    position: absolute;
    left: 7px;
    top: 2px;
    height: 100%;
    width: 0;
    border: 1px solid #e4e7ed;
  }
}
</style>
