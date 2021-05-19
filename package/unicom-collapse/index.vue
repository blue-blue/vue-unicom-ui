<template>
  <div class="unicom-collapse" :style="styles">
    <div class="collapse" v-for="(item,index) in newList">
      <div class="title" @click="clickHandle(item, index)">
        <i :style="{'transform':item.show==true?'rotate(90deg)':'rotate(0deg)'}"></i>
        {{item.title}}
      </div>
      <transition name="drop">
        <div class="contentWrap" v-show="item.show">
          <div class="content" v-for="(item2,index2) in item.content" :key="index2">{{item2}}</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
      default: function () {
        return {
          width: "100%",
        }
      }
    },
    show: {
      type: Boolean,
      default: false,
    },
    accordion: {
      type: Boolean,
      default: false,
    },
    current: {
      default: "",
    },
    list: {
      type: Array,
      default: function () {
        return [
          {
            title: "标题",
            content: ["暂无内容"],
          },
        ];
      }
    },
  },
  computed: {
    newList: function () {
      if (this.list.length !== 0) {
        this.list.map((item, index) => {
          this.$set(item, "show", this.show);
          if (typeof this.current == "number" && this.current == index) {
            this.$set(item, "show", true);
          }
        })
      }
      return this.list;
    },
  },
  methods: {
    clickHandle(item, index) {
      let saveShow = item.show;
      if (this.accordion == true) {
        this.newList.map((item, index) => {
          this.$set(item, "show", false);
        });
      }
      this.$set(item, "show", (saveShow = !saveShow));
      this.$emit("click", item, index);
    },
  },
};
</script>
<style lang="scss" scoped>
.unicom-collapse {
  position: relative;
  display: inline-block;
  border: 1px solid #dcdfe6;
  min-height: 38px;
  line-height: 38px;
  border-radius: 4px 4px 4px 4px;
  .collapse {
    .title {
      background: #f7f7f7;
      padding: 0 10px;
      &:not(:last-child) {
        border-bottom: 1px solid #eaecf5;
      }
      i {
        margin-right: 15px;
        transition: transform 0.2s ease-in-out;
        display: inline-block;
        width: 0;
        height: 0;
        font-style: normal;
        vertical-align: middle;
        border: 4px solid;
        border-left-color: #666666;
        border-right-color: transparent;
        border-top-color: transparent;
        border-bottom-color: transparent;
        // transform:rotate(90deg);
        transform-origin: center;
      }
    }
    .contentWrap {
      overflow: hidden;
      padding: 0 15px;
      .content {
        border-top: 1px solid #eaecf5;
        &:first-child {
          border-top: 0;
        }
      }
    }
    .drop-leave-active,
    .drop-enter-active {
      transition: max-height 0.4s;
    }
    .drop-enter,
    .drop-leave-to {
      max-height: 0;
      // opacity: 0;
    }
    .drop-enter-to,
    .drop-leave {
      max-height: 500px;
    }
  }
}
</style>