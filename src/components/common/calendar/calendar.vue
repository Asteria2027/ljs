<template>
  <div class="calendar clearfix">
    <div class="calendar_month">
      <div class="calendar_month_preMonth" @click="preMonth()">
        <i class="iconfont icon-back"></i>
      </div>
      <div class="calendar_month_content">
          {{nowMonth}}
      </div>
      <div class="calendar_month_nextMonth" @click="nextMonth()">
        <i class="iconfont icon-more"></i>
      </div>
    </div>
    <div class="calendar_week">
      <ul>
        <li v-for="(item, index) in weeks" :key="index">{{item}}</li>
      </ul>
    </div>

    <div class="calendar_day">
      <ul>
        <li v-for="n in preDaysNum"><span></span></li>
        <li :class="{ 'cur': selectLiIndex == item.id }"  v-for="(item, index) in days" :key="index" @click="clickDay(item)">
          <span>{{item.id}}</span>
          <i v-if="item.isReturn && selectLiIndex != item.id" class="iconfont icon-money"></i>
        </li>
      </ul>  

    </div>
  
  </div>
</template>

<script>
export default {
  data () {
    return {
      weeks: ['日','一','二','三','四','五','六'],
      days:[],
      preDaysNum: 0,
      selectLiIndex: ''
    }
  },
  props: {
    nowMonth:{
      type: String,
    },
    returnDays: {
      type: Array
    }
  },
  mounted(){
    this.rendCalendar();
    this.clickDayInit();
  },
  methods: {
    // 上一个月
    nextMonth() {
      this.$emit("selectMonth",  this.getNextMonth(this.nowMonth))
      this.selectLiIndex = ''
    },
    // 下一个月
    preMonth(){
      this.$emit("selectMonth",  this.getPreMonth(this.nowMonth))
      this.selectLiIndex = ''
    },
    // 获取下一个月
    getNextMonth( month ){
      if (typeof (month) != 'string') {
        console.log(参数必须为字符串);
        return;
      }
      var oldYear = month.slice(0,4);
      var oldMonth = month.slice(5,7);
      var newMonth = parseInt(oldMonth) + 1;
      var newYear;
      if(newMonth >= 13) {
        newMonth = '01';
        newYear = parseInt(oldYear) + 1 + '';
      }else if(newMonth <= 9) {
          newMonth = '0' + newMonth;
          newYear = oldYear;
      }else {
        newMonth = newMonth + '';
        newYear = oldYear;
      }
      return newYear + '-' + newMonth;
    },
    // 获取上一个月
    getPreMonth( month ) {
      if (typeof (month) != 'string') {
        console.log(参数必须为字符串);
        return;
      }
      var oldYear = month.slice(0,4);
      var oldMonth = month.slice(5,7);
      var newMonth = parseInt(oldMonth) - 1;
      var newYear;
      if(newMonth == 0 ) {
        newMonth = '12';
        newYear = parseInt(oldYear) - 1 + '';
      }else {
          newMonth = this.plusZero(newMonth);
          newYear = oldYear;
      }
      return newYear + '-' + newMonth;
    },
    // 获取某一个月有多少天
    getMonthDaysSum( month ) {
      var theYear = month.slice(0,4);
      var theMonth = month.slice(5,7); 
      var d = new Date(theYear, theMonth, 0);
      return d.getDate();
    },
    // 获取某一个月 的days 数组
    getMonthDaysArr(month) {
      const daysSum = this.getMonthDaysSum(month)
      var daysArr = []
      for (let i = 1; i <= daysSum; i++) {
        daysArr.push(i)
      }
      var _this = this;
      daysArr.forEach(function(val,index){
        let date = _this.nowMonth + "-" + _this.plusZero(val);
        const isReturn = _this.returnDays.indexOf (date) > -1 ? true : false;
        daysArr[index] = {
          id: val,
          date: date,
          isReturn: isReturn
        }
      })
      return daysArr
    },
    // 1-9 的数字前加一个 “0”
    plusZero( month ) {
      var num = parseInt(month);
      if( num <= 9 && num >= 1 ) {
        return "0" + num;
      }else {
        return month + '';
      }
    },
    // 渲染日历
    rendCalendar() {
      this.days = this.getMonthDaysArr(this.nowMonth)
      this.preDaysNum = new Date( this.nowMonth + "-01").getDay();
    },
    // 点击某日
    clickDay(item) {
      this.selectLiIndex = item.id;
      this.$emit("selectDay",  item.date)
    },
    // 默认选择今天
    clickDayInit() {
        let nowDay = this.plusZero(new Date().getDate());
        let nowTime = this.nowMonth + nowDay;
        this.clickDay({id: nowDay, date: nowTime})
    }
    
  },

  watch: {
    nowMonth:function (val, oldVal) { 
      this.rendCalendar(); 
    },
    returnDays: function(val, oldVal) {
      this.rendCalendar(); 
    }
  }
}

</script>
<style lang='less' scoped>
  .calendar {
      text-align: center;
      font-size: 0.26rem;
      padding: 0 0.1rem;
      .calendar_month {
        display: block;
        display: flex;
        height: 1.2rem;
        line-height: 1.2rem;
        .calendar_month_preMonth, .calendar_month_nextMonth{
          width: 0.5rem;
        }
        i {
          vertical-align: middle;
        }
        .calendar_month_content {
          flex: 1;
          font-size: 0.25rem;
          color: #ff644e;
          font-weight: bold;
        }

      }

      .calendar_week {
        height: 0.4rem;
        line-height: 0.4rem;
        ul {
          width: 100%;
          display: flex;
          li {
            float: left;
            font-size: 0.28rem;
            flex: 1;
            color: #999999;
          }
        }
      }
      .calendar_day {
        ul {
          li {
            position: relative;
            float: left;
            width: 0.8856rem;
            height: 0.8856rem;
            line-height: 0.8856rem;
            font-size: 0.24rem;
            color: #010101;
            &.cur {
              border-radius: 50%;
              background-color: #ff9507;
              color: #fff;
            }
            .iconfont {
              position: absolute;
              top: 0.05rem;
              right: 0.05px;
              font-size: 0.26rem;
              height: 0.3rem;
              line-height: 0.3rem;
              color: #ff9507;
            }
          }

        }
      }
  }

</style>