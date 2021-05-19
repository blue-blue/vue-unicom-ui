<template>
  <div class="unicom-transfer">
    <div class="leftBox" :style="{'height': styles.height,'width': styles.width}">
      <div class="selectNumber">
        <label class="allCheck"> <input type="checkbox" v-model="leftAllCheck" /> 全选 </label>
        <span class="number">{{selectNumber(leftDate,true)}}/{{leftDate.length}}</span>
      </div>
      <ul>
        <li v-for="(item,index) in leftDate" :key="index">
          <label :class="{'select-disabled':item.disable}"> <input type="checkbox" :disabled="item.disable" :name="item.name" :id="item.id" v-model="item.check" /> {{item.name}} </label>
        </li>
      </ul>
      <div class="dataNone" v-show="leftDate.length==0">暂无数据</div>
    </div>
    <div class="centerBox" :style="{'height': styles.height,width:centerWidth+'px'}">
      <div class="buttonWrap">
        <button class="btnLeft" :class="{'is-disabled':selectNumber(rightDate,true)==0}" @click="toLeft()">&lt; </button>
        <button class="btnRight" :class="{'is-disabled':selectNumber(leftDate,true)==0}" @click="toRight()">&gt;</button>
      </div>
    </div>
    <div class="rightBox" :style="{'height': styles.height,'width': styles.width}">
      <div class="selectNumber">
        <label class="allCheck"> <input type="checkbox" v-model="rightAllCheck" /> 全选 </label>
        <span class="number">{{selectNumber(rightDate,true)}}/{{rightDate.length}}</span>
      </div>
      <ul v-show="rightDate.length!==0">
        <li v-for="(item,index) in rightDate" :key="index">
          <label :class="{'select-disabled':item.disable}"> <input type="checkbox" :disabled="item.disable" :name="item.name" :id="item.id" v-model="item.check" /> {{item.name}} </label>
        </li>
      </ul>
      <div class="dataNone" v-show="rightDate.length==0">暂无数据</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
      default: function() {
        return {
          width: '150px',
          height: '300px'
        };
      }
    },
    centerWidth: {
      type: Number,
      default: 100
    },
    source: {
      type: Array,
      default: function() {
        return [
          { id:"", name:"暂无数据", check: false }
        ]
      }
    }
  },
  data() {
    return {
      leftAllCheck:false,
      rightAllCheck:false,
      leftDate: [],
      rightDate: []
    };
  },
  watch:{
    source: {
      handler(newVal,oldVal) {
        // 对数据添加标识，以便用于排序
        newVal.map(function(item,index){
          item.sort = index+1;
        });
        this.leftDate = newVal;
      },
      immediate: true,
    },
    leftAllCheck: {
      handler(newVal,oldVal){
        this.leftDate.map(function(item,index){
          if(item.disable == false){
            item.check = newVal;
          }
        })
      }
    },
    rightAllCheck: {
      handler(newVal,oldVal){
        this.rightDate.map(function(item,index){
          if(item.disable == false){
            item.check = newVal;
          }
        })
      }
    }
  },
  computed: {
    selectNumber:function(){
      return function(data, status){
        return this.filterArr(data, status).length;
      }
    }
  },
  methods: {
    filterArr(data, check) {
      // return data.filter(item => item.check == check);
      let filterArr = [];
      data.map(function(item,index){
        if(item.check == check) {
          filterArr.push(item);
        }
      })
      return filterArr;
    },
    arrObjSort(props){
      return function(a,b) {
        return a[props] - b[props];
      }
    },
    toRight() {
      // 获取左侧栏选中状态为true的列表，filterArr返回一个数组
      let toRightArr = this.filterArr(this.leftDate, true);
      // 左侧栏只显示未选中状态为false的列表
      this.leftDate = this.filterArr(this.leftDate, false);
      // 将左侧栏选中状态为true的列表push进右侧栏
      this.rightDate.push(...toRightArr);
      // 对右侧栏列表进行排序
      this.rightDate.sort(this.arrObjSort("sort"));
      // 对右侧选中状态进行重置
      this.rightDate.map(item=> item.check = false );
      this.leftAllCheck = false;
      this.$emit("click",this.rightDate)
    },
    toLeft(){
      let toLeftArr = this.filterArr(this.rightDate, true);
      this.rightDate = this.filterArr(this.rightDate, false);
      this.leftDate.push(...toLeftArr);
      this.leftDate.sort(this.arrObjSort("sort"));
      this.leftDate.map(item=> item.check = false );
      this.rightAllCheck = false;
      this.$emit("click",this.rightDate);
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.unicom-transfer {
  display: inline-block;
  user-select: none;
  .leftBox, .rightBox {
    float: left;
    min-height: 280px;
    overflow: hidden;
    border: 1px solid #dcdfe6;
    border-radius: 4px 4px 4px 4px;
    .selectNumber {
      background: #f7f7f7;
      height: 38px;
      line-height: 38px;
      .allCheck{
        margin-left: 10px;
      }
      .number{
        float: right;
        margin-right: 10px;
      }
    }
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        height: 26px;
        line-height: 26px;
        white-space: nowrap;
        // padding: 0 10px 0 10px;
        // width: 90%;
        text-overflow: ellipsis;
        margin: 0 10px 0 10px;
        overflow: hidden;
      }
    }
    .dataNone{
      text-align: center;
      margin-top: 11.65%;
    }
  }
  .centerBox {
    float: left;
    min-height: 280px;
    min-width: 100px;
    text-align: center;
    position: relative;
    .buttonWrap{
      height: 30px;
      white-space: nowrap;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      .btnLeft, .btnRight{
        border: 0;
        padding: 0 10px;
        height: 30px;
        border-radius: 4px 4px 4px 4px;
        color:white;
        background: #409eff;
        cursor: pointer;
        outline: none;
      }
      .is-disabled {
        background: #a0cfff;
        cursor: not-allowed;
      }
    }
  }
  input[type="checkbox"] {
    vertical-align: middle;
    width: 18px;
    height: 18px;
    margin-top: -2px;
    background-color: #fff;
    border: 1px solid #c9c9c9;
    border-radius: 2px;
    color: #fff;
    text-align: center;
    line-height: 15px;
    margin-right: 0.14rem;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    outline: none;
    &:checked {
      color: #fff;
      background-color: #1d8bea;
      border: 1px solid #1d8bea;
    }
    &:hover {
      border: 1px solid #1d8bea;
    }
    &:after {
      content: "✔";
    }
  }
  .select-disabled {
    cursor: not-allowed;
    color: #c0c4cc;
    input {
      cursor: not-allowed;
      &:checked {
        color: #fff;
        background-color: #a0cfff;
        border: 1px solid #c9c9c9;
      }
    }
  }
}
</style>
