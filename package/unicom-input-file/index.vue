<template>
  <div class="unicom-input-file-wrap">
    <div class="unicom-input-file" :class="{ 'is-disabled': disabled }">
      <span class="iocn"><slot></slot></span>
      {{placeholder}}
      <input type="file" :disabled="disabled" @change="getFile($event)" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: "",
    },
    placeholder: {
      type: [String, Number],
      default: "选取文件"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  watch: {
    currentValue: function (val) {
      this.$emit("input", {
        fileUrl: this.getObjectURL(val),
        fileName: val.name,
        value: val
      });
    }
  },
  methods: {
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      }
      return url;
    },
    getFile(event) {
      this.currentValue = event.target.files[0];
      // this.currentValue = event.target.files[0];
      // url
      // console.log(this.getObjectURL(event.target.files[0]))
    }
  }
};
</script>

<style lang="scss" type="text/css">
.unicom-input-file-wrap {
  display: inline-block;
  box-sizing: border-box;
  width: 100px;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  background: #67c23a;
  color: white;
  cursor: pointer;
  .unicom-input-file {
    position: relative;
    text-align: center;
    padding: 0 7px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    .iocn {
      display: inline-block;
    }
    input {
      position: absolute;
      z-index: 100;
      right: 0;
      top: 0;
      width: 100%;
      height: 36px;
      line-height: 36px;
      opacity: 0;
    }
  }
  .is-disabled {
    color: #c0c4cc;
    input {
      cursor: not-allowed;
    }
  }
}
</style>