<template>
  <div
    class="carousel-cover"
    :style="{ height: height,width:width }"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
  >
    <div class="carousel">
      <transition v-if="direction === 'horizontal'" name="carousel-arrow-left">
        <button
          type="button"
          @click.stop="setActiveItem(activeIndex - 1)"
          class="c-nav c-nav-left"
        >left</button>
      </transition>

      <transition v-if="direction === 'horizontal'" name="carousel-arrow-right">
        <button
          type="button"
          @click.stop="setActiveItem(activeIndex + 1)"
          class="c-nav c-nav-right"
        >right</button>
      </transition>
      <slot></slot>
    </div>

    <ul :class="['carousel-nav-ul',{'carousel-nav-ul-vertical':direction==='vertical'}]">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="[
          'carousel-tabNav',
          'carousel-tabNav--' + direction,
          ]"
        @click.stop="handleIndicatorClick(index)"
      >
        <button :class="['carousel-button',{ 'is-active': index === activeIndex }]">
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Carousel",

  props: {
    initialIndex: {
      type: Number,
      default: 0
    },
    width: {
      default: "500px",
      type: String
    },
    height: {
      default: "300px",
      type: String
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    type: String,
    loop: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: "horizontal",
      validator(val) {
        return ["horizontal", "vertical"].indexOf(val) !== -1;
      }
    }
  },

  data() {
    return {
      items: [],//指示器
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
    };
  },


  watch: {
    //指示器
    items(val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex);
    },

    activeIndex(val, oldVal) {
      this.resetItemPosition(oldVal);
      if (oldVal > -1) {
        this.$emit("change", val, oldVal);
      }
    },

    autoplay(val) {
      val ? this.startTimer() : this.pauseTimer();
    },

    loop() {
      this.setActiveItem(this.activeIndex);
    }
  },

  methods: {
    handleMouseEnter() {
      this.pauseTimer();
    },

    handleMouseLeave() {
      this.startTimer();
    },

    itemInStage(item, index) {
      const length = this.items.length;
      if (
        (index === length - 1 && item.inStage && this.items[0].active) ||
        (item.inStage && this.items[index + 1] && this.items[index + 1].active)
      ) {
        return "left";
      } else if (
        (index === 0 && item.inStage && this.items[length - 1].active) ||
        (item.inStage && this.items[index - 1] && this.items[index - 1].active)
      ) {
        return "right";
      }
      return false;
    },

    updateItems() {
      this.items = this.$children.filter(
        item => item.$options.name === "CarouselItem"
      );
    },
    // 重置轮播图定位
    resetItemPosition(oldIndex) {
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex, oldIndex);
      });
    },
    //定时轮播切换
    playSlides() {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      } else if (this.loop) {
        this.activeIndex = 0;
      }
    },
    //清除定时器
    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    //定时器开始
    startTimer() {
      if (this.interval <= 0 || !this.autoplay || this.timer) return;
      this.timer = setInterval(this.playSlides, this.interval);
    },
    //设置下标
    setActiveItem(index) {
      let length = this.items.length;//指示器的长度
      const oldIndex = this.activeIndex;//原下标
      if (index < 0) {
        //如果小于0 
        this.activeIndex = this.loop ? length - 1 : 0;
      } else if (index >= length) {
        this.activeIndex = this.loop ? 0 : length - 1;
      } else {
        this.activeIndex = index;
      }
      if (oldIndex === this.activeIndex) {
        this.resetItemPosition(oldIndex);
      }
    },
    //指示器点击事件
    handleIndicatorClick(index) {
      this.activeIndex = index;
    },
  },

  created() {
  },

  mounted() {
    this.updateItems();
    this.$nextTick(() => {
      this.startTimer();
    });
  },

  beforeDestroy() {
    this.pauseTimer();
  }
};
</script>
<style lang="scss" scoped>
.carousel-cover {
  margin: 50px auto;
  border: 1px solid;
  position: relative;
  overflow: hidden;
  .carousel {
    width: 100%;
    height: 100%;
    border: 1px solid red;
    position: relative;
  }
  .c-nav {
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    height: 36px;
    width: 36px;
    cursor: pointer;
    transition: 0.3s;
    border-radius: 50%;
    background-color: rgba(31, 45, 61, 0.11);
    color: #fff;
    position: absolute;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
    text-align: center;
    font-size: 12px;
  }
  .c-nav-left {
    left: 16px;
  }
  .c-nav-right {
    right: 16px;
  }
  .carousel-nav-ul {
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
  }
  .carousel-nav-ul-vertical{
    width:auto; 
    right: 10px;
    top:50%;
    transform: translateY(-50%);
  }
  .carousel-tabNav {
    background-color: transparent;
    
  }
  .carousel-tabNav--horizontal {
    display: inline-block;
    padding: 12px 4px;
  }
  .el-carousel--vertical {
    overflow-y: hidden;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
  .carousel-button {
    border: none;
    outline: none;
    height: auto;
    width: auto;
    width:30px;
    height:8px;
    margin:3px 3px;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      background:#999;
    }
  }
  .is-active{
    background: #999;
  }
}
</style>