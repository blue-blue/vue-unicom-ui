<template>
  <div class="unicom-tabs" :style="styles">
    <ul class="nav">
      <li
        v-for="(item,index) in tabsList" :key="index"
        :class="{active:menuKey==item.key}"
        @click="menuShow(item.key)"
      >{{item.label}}</li>
    </ul>
    <slot :name="activeName"></slot>
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
    activeName: {
      type: String,
      required: true
    },
    tabsList: {
      type: Array,
      default: [
        { label: "暂无标题", key: "none" }
      ]
    }
  },
  data() {
    return {
      menuKey: this.activeName
    };
  },
  computed: {},
  watch: {},
  methods: {
    menuShow(key) {
      this.menuKey = key;
      this.$emit("click",key)
    }
  },
  created() {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.unicom-tabs {
  width: 100%;
  overflow: auto;
  .nav {
    width: 100%;
    padding: 0;
    margin: 0 0 15px 0;
    display: block;
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #dcdfe6;
    position: relative;
    user-select: none;
    display: flex;
    li {
      list-style: none;
      flex: 1;
      // float: left;
      text-align: center;
      min-width: 50px;
      cursor: pointer;
    }
    .active {
      left: 200px;
      color: #409eff;
      width: 100%;
      border-bottom: 2px solid #409eff;
      transition: 0.2s all linear;
    }
  }
}
</style>
