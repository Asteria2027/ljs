<template>
  <div class="container">
    <Calendar :nowMonth="dateMonth" :returnDays="returnDays"  @selectMonth="selectMonth" @selectDay="selectDay">
    </Calendar>

    <window-tips ref='windowTips'></window-tips>

    <template v-if="monthReturnTotal.isReturn">
      <!-- 月回款信息 -->
      <div class="container_monthReturn">
          <h1>{{monthReturnTotal.dateMonth}}月回款项目{{monthReturnTotal.payCount}}笔</h1>
          <p>应回款{{monthReturnTotal.payAmtSum}}元（本金{{monthReturnTotal.payPrinAmtSum}}元 收益{{monthReturnTotal.payIntAmtSum}}元）</p>
          <p>已回款{{monthReturnTotal.paidAmtSum}}元（本金{{monthReturnTotal.paidPrinAmtSum}}元收益{{monthReturnTotal.paidIntAmtSum}}元）</p>
      </div>
      <div class="container_line"></div>

      <!-- 日回款信息 -->
      <div class="container_dayReturn">
        <template v-if="dayReturnTotal.isReturn">
          <div class="container_dayReturn_total">
            <h1>{{dayReturnTotal.year}}年{{dayReturnTotal.month}}月{{dayReturnTotal.day}}日回款项目{{dayReturnTotal.repayCount}}笔</h1>
            <p>应回款{{dayReturnTotal.prinAmtsum + dayReturnTotal.intAmtsum}}元（本金{{dayReturnTotal.prinAmtsum}}元 收益{{dayReturnTotal.intAmtsum}}元）</p>
          </div>
          <div class="container_dayReturn_detail" v-for="(item, index) in dayReturnTotal.payAmtList" :key="index">
            <p>{{item.productName}}</p>
            <p>应回款{{item.prinAmt + item.intAmt}}元（本金{{item.prinAmt}}元 收益{{item.intAmt}}元）</p>
          </div>
        </template>

        <div class="container_dayReturn_noReturn" v-else-if="dayReturnTotal.isReturn == null">
          <h1>点击日历可以查看当日回款数据</h1>
        </div>

        <div class="container_dayReturn_noReturn" v-else>
          <h1>{{dayReturnTotal.month}}月{{dayReturnTotal.day}}日无回款数据</h1>
        </div>

      </div>
    </template>

    <template v-else>
      <div class="container_monthReturn">
        <h1>{{monthReturnTotal.dateMonth}}月无回款信息</h1>
      </div>
      <div class="container_line"></div>
    </template>

  </div>
</template>

<script>

import Calendar from '../../components/common/calendar/calendar'
import windowTips from '@/components/common/windowTips/windowTips.vue'
import { queryPayDateAmtDetails, queryMonthPayDateAmtSum } from '@/server/getData.js'
import { getStore } from '@/config/mUtils';


let token, userId, dateMonth; 
export default {
  data () {
    return {
      dateMonth: "",
      returnDays: [], // 某月有回款数据的日子
      monthReturnTotal: {}, // 月回款数据
      dayReturnTotal:{}, // 日回款数据
      currentMonth: ''  // 本月（现在是几月） 
    };
  },
  mounted() {
    this.currentMonth = this.getCurrentMonth(); 
    this.selectMonth( this.currentMonth );
  },
  methods: {
    // 月回款信息
    selectMonth(month){
      if( new Date(month) < new Date(this.currentMonth) ) {
        this.$refs.windowTips.toast('只能查看本月及之后的回款数据');
        return
      }
      dateMonth = this.dateMonth = month;
      let _this = this;
      queryMonthPayDateAmtSum( token=getStore('token'), userId=getStore('userId'), dateMonth = dateMonth ).then(function (res) {
        let data = res.data.data;
        if(data) {
          _this.monthReturnTotal = Object.assign({}, data, {isReturn: true, dateMonth: dateMonth.slice(-1)}) ;
          const dateList = data.dateList;
        dateList.forEach(element => {
            _this.returnDays.push(element.payDate);
          });
        }else {
          _this.returnDays = [];
          _this.monthReturnTotal = {isReturn: false, dateMonth: dateMonth.slice(-1)};
        }
        _this.dayReturnTotal = {}

        }).catch(function(err){
          console.log(err);
      })
    },
    // 日回款信息
    selectDay( parmDate ) {
      let _this = this;
      let date;
      queryPayDateAmtDetails( token=getStore('token'), userId=getStore('userId'), date = parmDate ).then(function (res) { 
          let data = res.data.data;
         _this.dayReturnTotal = Object.assign( {}, {year: parmDate.slice(0,4), month: parmDate.slice(5,7), day: parmDate.slice(-2) }) 
        if(data) { 
          _this.dayReturnTotal = Object.assign( {}, _this.dayReturnTotal, data, {isReturn: true});
        }else {
          _this.dayReturnTotal = Object.assign( {},  _this.dayReturnTotal, {isReturn: false})
        }

      }).catch(function (err) { 
        console.log(err);
      })
    },
    // 月份前面加0
    plusZero( month ) {
      var num = parseInt(month);
      if( num <= 9 && num >= 1 ) {
        return "0" + num;
      }else {
        return month + '';
      }
    },
    // 获取现在的月份
    getCurrentMonth() {
      const date=new Date();  
      const year=date.getFullYear();   
      let month=date.getMonth()+1;  
      month = (month<10 ? "0"+month : month);   
      const myDate = (year.toString() + "-" + month.toString()); 
      return myDate;
    }
  },
  components: {
    Calendar,
    windowTips
  }
}

</script>
<style lang='less' scoped>
#h1(){
  h1{
  font-size: 0.28rem;
  line-height: 0.38rem;
  }
}
#p() {
  p {
    font-size: 0.24rem;
    line-height: 0.36rem;
    color: #999999;
  }
}

.container {
  font-size: 0.24rem;
  .container_monthReturn {
  padding: 0.2rem 0 0.2rem 0.2rem;
    #h1;
    #p;
  }
  .container_line {
    border-bottom: 1px solid #dddddd;
    border-top: 1px solid #dddddd;
    height: 0.16rem;
    background-color: #f4f4f4;
  }
  .container_dayReturn {
    .container_dayReturn_noReturn {
      padding: 0.2rem;
      text-align: center;
      #h1();
      border-bottom: 1px solid #dddddd;        
    }
    .container_dayReturn_total {
      padding: 0.2rem 0 0.2rem 0.2rem;
      border-bottom: 1px solid #dddddd;
      #h1;
      #p;
    }
    .container_dayReturn_detail {
      padding: 0.2rem 0 0.2rem 0.2rem;
      border-bottom: 1px solid #dddddd;
        #p;
    }
  }
}

</style>

