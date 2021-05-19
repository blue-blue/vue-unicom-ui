<template>
  <div class="unicom-tree" :style="styles">
    <ul>
      <li v-for="(item,index) in newList" :key="index">
        <span @click="showHandle(newList,item,index)">
          <b class="iconShow" v-text="item.show==false?'+':'-'"></b>
          {{item.name}}
        </span>
        <ul v-show="item.show">
          <li v-for="(item2,index2) in item.subItems" :key="index2">
            <span @click="showHandle(item.subItems,item2,index2)">
              <b class="iconShow" v-text="item2.show==false?'+':'-'"></b>
              {{item2.name}}
            </span>
            <ul v-show="item2.show">
              <li v-for="(item3,index3) in item2.subItems" :key="index3">
                <span @click="getItem(item3,index3)"><input type="checkbox" :name="item3.name" :id="item3.id" v-model="item3.check" />{{item3.name}}</span>
              </li>
            </ul>
          </li>
        </ul>
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
          width: '300px'
        };
      }
    },
    show: {
      type: Boolean,
      default: false
    },
    accordion: {
      type: Boolean,
      default: false
    },
    current: {
      default: ''
    },
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return { };
  },
  computed:{
    newList:function(){
      if (this.list.length !== 0) {
        this.list.map((item, index) => {
          this.$set(item, "show", this.show);
          item.subItems.map((item2, index) => {
            this.$set(item2, "show", this.show);
          });
          if(typeof(this.current) == 'number' && this.current == index){
            this.$set(item, "show", true);
            item.subItems.map((item2, index) => {
              this.$set(item2, "show", true);
            });
          }
        });
      }
      return this.list
    }
  },
  methods: {
    showHandle(list,item,index){
      let saveShow = item.show;
      if(this.accordion == true){
        list.map((val, index) => {
          this.$set(val, "show",false);
        })
      }
      this.$set(item, "show", saveShow = !saveShow);
    },
    getItem(item, index) {
      this.$emit("click", this.newList, item);
    }
  }
};
</script>

<style lang="scss" type="text/css">
.unicom-tree {
  position: relative;
  display: inline-block;
  .iconShow {
    display: inline-block;
    width: 13px;
    height: 13px;
    line-height: 13px;
    text-align: center;
    border: 1px solid #409eff;
  }
  ul {
    padding: 0;
    margin: 0;
    li {
      list-style: none;
      line-height: 30px;
      cursor: pointer;
      ul {
        padding-left: 20px!important;
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