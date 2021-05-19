<template>
  <div class="carousel-item-cover">
    <div
      v-show="ready"
      class="carousel-item"
      :class="{
      'is-active': active,
      'is-hover': hover,
      'is-animating': animating
    }"
      :style="itemStyle"
    >
      <div v-show="!active" class="carousel-item-mask"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarouselItem",

  props: {
    name: String
  },

  data() {
    return {
      hover: false,
      translate: 0,
      active: false,
      ready: false,
      animating: false
    };
  },

  methods: {
    //处理个数少 且 无限轮播的下标
    processIndex(index, activeIndex, length) {
      if (activeIndex === 0 && index === length - 1) {
        return -1;
      } else if (activeIndex === length - 1 && index === 0) {
        return length;
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1;
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2;
      }
      return index;
    },

    calcTranslate(index, activeIndex, isVertical) {
      const distance = this.$parent.$el[
        isVertical ? "offsetHeight" : "offsetWidth"
      ];
      return distance * (index - activeIndex);
    },

    translateItem(index, activeIndex, oldIndex) {
      const parentDirection = this.parentDirection; //父组件方向
      const length = this.$parent.items.length; //轮播个数
      //如果当前子组件
      if (oldIndex !== undefined) {
        this.animating = index === activeIndex || index === oldIndex;
      }

      if (index !== activeIndex && length > 2 && this.$parent.loop) {
        index = this.processIndex(index, activeIndex, length);
      }

      this.active = index === activeIndex;
      const isVertical = parentDirection === "vertical";
      this.translate = this.calcTranslate(index, activeIndex, isVertical);
      this.ready = true;
    }
  },

  computed: {
    //父组件排列顺序
    parentDirection() {
      return this.$parent.direction;
    },
    //子组件translate位移距离
    itemStyle() {
      const translateType =
        this.parentDirection === "vertical" ? "translateY" : "translateX";
      const value = `${translateType}(${this.translate}px)`;
      const style = {
        transform: value
      };
      return style;
    }
  },

  created() {
    this.$parent && this.$parent.updateItems();
  },

  destroyed() {
    this.$parent && this.$parent.updateItems();
  }
};
</script>
<style lang="scss" scoped>
.carousel-item-cover {
  .carousel-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    z-index: 0;
  }
  .carousel-item.is-animating {
    transition: transform 0.4s ease-in-out;
  }
  .carousel-item-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fff;
    opacity: 0.24;
    transition: 0.2s;
  }
}
</style>