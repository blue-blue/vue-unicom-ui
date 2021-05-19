<template>
  <div class="unicom-pages" :style="styles">
    <ul v-show="hidePage">
      <span v-show="showTotal">共{{total}}条</span>
      <!-- 左侧 -->
      <li :class="currentPage-1 < 1 ? 'noOptional' : 'optional'" @click="navigate(currentPage-1 < 1 ? 1 : currentPage-1)" >{{prevText}}</li>
      <li v-if="currentPage !== 1" @click="navigate(1)">1</li>
      <!-- 左中 -->
      <li v-for="p in prevs" @click="navigate(p)">{{p}}</li>
      <!-- 中 -->
      <li class="active">{{currentPage}}</li>
      <!-- 右中 -->
      <li v-for="p in nexts" @click="navigate(p)">{{p}}</li>
      <!-- 右 -->
      <li v-if="currentPage !== pages" @click="navigate(pages)">{{pages}}</li>
      <li :class="currentPage+1 > pages ? 'noOptional' : 'optional'" @click="navigate(currentPage+1 > pages ? pages : currentPage+1)" >{{nextText}}</li>
      <span class="inputCurrentPage" v-show="showSizer"> 展示 <input type="number" v-model="sizeNumber" /> 条 </span>
      <span class="inputCurrentPage" v-show="showElevator"> 前往第 <input type="number" v-model="inputCurrentPage" @change="setInputCurrentPage" /> 页 </span>
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
          width: "100%"
        };
      }
    },
    total: {
      type: Number,
      default: 40
    },
    size: {
      type: Number,
      default: 10
    },
    current: {
      type: Number,
      default: 1
    },
    prevText: {
      type: String,
      default: "<"
    },
    nextText: {
      type: String,
      default: ">"
    },
    showTotal: {
      type: Boolean,
      default: false
    },
    showElevator: {
      type: Boolean,
      default: false
    },
    showSizer: {
      type: Boolean,
      default: false
    },
    showPage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sizeNumber: this.size,
      currentPage: 1,
      inputCurrentPage:1
    };
  },
  computed: {
    // 总页数 totalPage 应该等于需显示的总数除以每页显示的个数，并向上取整
    pages: function() {
      return Math.ceil(this.total / this.sizeNumber);
    },
    prevs: function() {
      let data = [];
      for (let i = 2; i >= 1; i--) {
        if (this.currentPage - i > 1) {
          data.push(this.currentPage - i);
        }
      }
      if (data[0] && data[0] > 1) {
        if (data[0] - 1 > 2) {
          data.unshift("···");
        } else if (data[0] - 1 > 1) {
          data.unshift(data[0] - 1);
        }
      }
      return data;
    },
    nexts: function() {
      let data = [];
      for (let i = 2; i >= 1; i--) {
        if (this.currentPage + i < this.pages) data.push(this.currentPage + i);
      }
      if (data[0] && data[0] < this.pages) {
        if (data[0] + 1 < this.pages) data.unshift("···");
      }
      return data.reverse();
    },
    hidePage: function () {
      let hidePage = "";
      if(this.showPage == true){
        hidePage = this.pages >1
      }else {
        hidePage = this.pages >=1
      }
      return hidePage;
    }
  },
  watch: {
    current: {
      handler: function(val, oldval) {
        if(Math.abs(val)>=this.pages){
          this.currentPage = this.pages;
        }else if(Math.abs(val)==0){
          this.currentPage = 1;
        }else if(Math.abs(val)<=this.pages){
          this.currentPage = Math.abs(val);
        }
      },
      deep: true,
      immediate: true
    },
    currentPage: {
      handler: function(val, oldval) {
        this.inputCurrentPage = val;
        this.$emit("current-change",this.inputCurrentPage)
      },
      deep: true,
      immediate: true
    },
    sizeNumber: {
      handler: function(value, oldval) {
        if( value<1 ) {
          this.sizeNumber = 1;
          // this.currentPage = 1;
        }else if( value>this.total ) { 
          this.sizeNumber = this.total;
          // this.currentPage = 1;
        }
        this.currentPage = 1;
        this.$emit("size-change",value);
      },
      deep: true,
      // immediate: true
    }
  },
  methods: {
    navigate(page) {
      if(page !== "···"){ 
        this.currentPage = page; 
        // this.$emit("current-change",this.currentPage)
      }
    },
    setInputCurrentPage(e){
      let value = Number(e.target.value);
      if(value > this.pages) {
        this.inputCurrentPage = this.currentPage = this.pages;
      }else if(value < 1){
        this.inputCurrentPage = this.currentPage = 1;
      }else {
        this.inputCurrentPage = this.currentPage = value;
      }
    }
  },
  created() {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.unicom-pages {
  width: 100%;
  text-align: center;
  user-select: none;
  ul {
    display: inline-block;
    li {
      list-style: none;
      display: inline-block;
      min-width: 24px;
      height: 24px;
      line-height: 24px;
      background: #f4f4f5;
      margin: 0 2px;
      border-radius: 3px;
      padding: 5px;
      cursor: pointer;
    }
    .optional,
    li:hover,
    .active {
      background: #39f;
      color: white;
    }
    .noOptional {
      background: #a0cfff;
      color: white;
      cursor: not-allowed;
      &:hover {
        background: #a0cfff;
      }
    }
    .inputCurrentPage {
      display: inline-block;
      input {
        display: inline-block;
        box-sizing: border-box;
        height: 38px;
        width: 45px;
        outline: none;
        border: 1px solid #dcdfe6;
        color: #606266;
        border-radius: 4px;
        text-align: center;
        vertical-align: middle;
        &:focus {
          border-color: #409eff;
        }
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
  }
}
</style>
