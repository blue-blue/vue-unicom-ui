<template>
  <div class="unicom-calendar" :style="styles">
    <div class="unicom-input" @click="(disabled==false)?handleCalendar(showCalendar):''">
      <input
        class="dataValue"
        :value="value"
        type="text"
        :placeholder="placeholder"
        :class="{ 'is-disabled': disabled }"
        :disabled="disabled"
      />
      <i v-show="value && clearable" class="unicom-close" @click="cleanValue">X</i>
    </div>
    <div class="calendar" v-show="showCalendar">
      <ul class="dateHeader">
        <li class="preYear" @click="preYear()">&laquo;</li>
        <li class="preMonth" @click="preMonth()">&lt;</li>
        <li class="dateShow">{{showYear}}年{{showMonth+1}}月{{showDay}}日</li>
        <li class="nextMonth" @click="nextMonth()">&gt;</li>
        <li class="nextYear" @click="nextYear()">&raquo;</li>
      </ul>
      <div class="dateContent">
        <ul class="dateWeek">
          <li v-for="(item,index) in weekList" :key="index">{{item}}</li>
        </ul>
        <ul class="dateDays">
          <li
            v-for="(item,index) in getCalendar"
            :key="index"
            @click="item.type=='normal'&&handleDay(item)"
            :class="{nowDateShow:item.type=='normal', 
            nowSelectDateShow:startYear==item.showYear&&startMonth==item.showMonth&&startDay==item.showDay&&item.type=='normal',
            nowadays:nowYear==item.showYear&&nowMonth==item.showMonth&&nowDay==item.showDay&&item.type=='normal'
          }"
          >{{item.showDay}}</li>
        </ul>
      </div>
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
          width: "200px"
        };
      }
    },
    placeholder: {
      type: String,
      default: "请选择日期"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      weekList: ["日", "一", "二", "三", "四", "五", "六"],
      showYear: "",
      showMonth: "",
      showDay: "",
      nowYear: new Date().getFullYear(),
      nowMonth: new Date().getUTCMonth(),
      nowDay: new Date().getDate(),
      startYear: "",
      startMonth: "",
      startDay: "",
      showCalendar:false
    };
  },
  watch: {
    value: {
      handler: function(val, oldval) {
        let showDate = "";
        let startDate = "";
        val == ""
          ? (showDate = startDate = new Date())
          : (showDate = startDate = new Date(val));
        this.startYear = this.showYear = showDate.getFullYear();
        this.startMonth = this.showMonth = showDate.getMonth();
        this.startDay = this.showDay = showDate.getDate();
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    getCalendar: function() {
      // 定义每个月的天数，如果是闰年第二月改为29天 new Date(2017,1+1,0).getDate()
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (
        (this.showYear % 4 === 0 && this.showYear % 100 !== 0) ||
        this.showYear % 400 === 0
      ) {
        daysInMonth[1] = 29;
      }
      // 获得指定年月的1号是星期几
      let targetDay = new Date(this.showYear, this.showMonth, 1).getDay();
      // 渲染的列表数组
      let calendarArr = [];
      // 日期是(日--六)这个顺序也就是(0--6)
      if (targetDay >= 0) {
        // 添加上月天数 targetDay为多少，要在calendarArr的数组中push几个''的obj作为占位
        let monthIndex = this.showMonth == 0 ? 11 : this.showMonth - 1;
        let preMonthDay = [];
        for (let i = 0; i < targetDay; i++) {
          preMonthDay.push({ type: "pre", showDay: daysInMonth[monthIndex]-- });
        }
        calendarArr = preMonthDay.reverse().concat(calendarArr);
        // 添加当月天数
        for (let i = 0; i < daysInMonth[this.showMonth]; i++) {
          calendarArr.push({
            type: "normal",
            showYear: this.showYear,
            showMonth: this.showMonth,
            showDay: i + 1
          });
        }
        // 根据calendarArr来判断该月日期展示方式是5*7还是6*7，然后添加尾部占位符，添加下月天数
        let nextNum = 0;
        if (calendarArr.length > 35) {
          nextNum = 42 - calendarArr.length;
        } else {
          nextNum = 35 - calendarArr.length;
        }
        for (let i = 0; i < nextNum; i++) {
          calendarArr.push({ type: "next", showDay: i + 1 });
        }
        return calendarArr;
      }
    }
  },
  methods: {
    preYear() {
      this.showYear -= 1;
    },
    nextYear() {
      this.showYear += 1;
    },
    preMonth() {
      if (this.showMonth < 1) {
        this.showMonth = 11;
        this.showYear = this.showYear - 1;
      } else {
        this.showMonth = this.showMonth - 1;
      }
    },
    nextMonth() {
      if (this.showMonth > 10) {
        this.showMonth = 0;
        this.showYear = this.showYear + 1;
      } else {
        this.showMonth = this.showMonth + 1;
      }
    },
    handleDay(item) {
      this.startYear = item.showYear;
      this.startMonth = item.showMonth;
      this.startDay = item.showDay;
      this.$emit( "click", item.showYear + "/" + Number(item.showMonth + 1) + "/" + item.showDay );
    },
    cleanValue() {
      this.$emit("click", "");
    },
    handleCalendar(){
      this.showCalendar = !this.showCalendar;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.unicom-calendar {
  .unicom-input {
    width: 100%;
    position: relative;
    .dataValue {
      width: 100%;
      box-sizing: border-box;
      padding: 0px 14px;
      height: 38px;
      line-height: 38px;
      outline: none;
      border: 1px solid #dcdfe6;
      color: #606266;
      border-radius: 4px;
      &:focus {
        border-color: #409eff;
      }
    }
    .unicom-close {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      font-style: normal;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .calendar {
    user-select: none;
    width: 290px;
    height: 310px;
    border: 1px solid black;
    list-style: none;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 4px;
    line-height: 30px;
    margin: 5px 0;
    cursor: default;
    .dateHeader {
      width: 95%;
      text-align: center;
      margin: 0 auto;
      padding: 0;
      user-select: none;
      li {
        display: inline-block;
        padding: 0 5px;
        height: 30px;
        line-height: 30px;
        margin: 3px 1px;
        cursor: pointer;
      }
    }
    .dateContent {
      width: 95%;
      margin: 0 auto;
      .dateWeek,
      .dateDays {
        text-align: center;
        padding: 0;
        margin: 0;
        li {
          display: inline-block;
          width: 30px;
          height: 30px;
          line-height: 30px;
          margin: 3px;
        }
      }
      .dateWeek {
        border-bottom: 1px solid #ebeef5;
      }
      .dateDays {
        li {
          color: #c0c4cc;
        }
        .nowDateShow {
          color: #606266;
          font-weight: initial;
          position: relative;
        }
        .nowSelectDateShow {
          background: #39f;
          color: white;
          border-radius: 4px;
        }
        .nowDateShow:hover:not(.nowSelectDateShow) {
          color: #1989fa;
        }
        .nowadays {
          color: #000;
          &::after {
            position: absolute;
            content: "\2022";
            right: 0;
            bottom: -3px;
            color: #1989fa;
          }
        }
      }
    }
  }
  .is-disabled {
    // input {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
    // }
  }
}
</style>