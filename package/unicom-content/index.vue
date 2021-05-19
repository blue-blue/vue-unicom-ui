<template>
  <div class="unicom-content" :style="styles">

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
    }
  },
  data() {
    return { };
  },
  computed: {},
  watch: {},
  methods: {
    menuShow(index) {
      this.menuIndex = index;
      console.log(this.menuIndex);
    }
  },
  created() {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.unicom-content {
 
}
</style>
