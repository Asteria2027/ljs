
<template>
  <div class="container" ref="container">
    <window-tips ref='windowTips'></window-tips>

    <!-- 页面上面部分 -->
    <div class="container_fixed clearfix">

      <div class="container_tip borderBottom-1px">
        <p>限查看当日及之后日期的回款信息</p>
      </div>

      <div class="container_selectDate borderBottom-1px">
        <div class="container_selectDate_start">
            <date-picker :date="startTime" :option="option" :limit="startLimit" @change="isWatch = true"></date-picker>
            <i class="iconfont icon-moreunfold"></i>
        </div>
        <div class="container_selectDate_center">
          至
        </div>
        <div class="container_selectDate_end">
            <date-picker :date="endTime" :option="option" :limit="endLimit" @change="isWatch = true" ></date-picker>
            <i class="iconfont icon-moreunfold"></i>                     
        </div>
      </div>

      <div class="container_returnTotal">
        <p v-if="hasReturn">日期内暂无回款记录</p>
        <p v-else>回款总额{{returnTotal.countSumTotal}}元  <br> （本金{{returnTotal.prinAmtTotal}}元 收益{{returnTotal.intAmtTotal}}元）</p>
      </div>

      <div class="container_caption clearfix">
          <h1>回款日期</h1>
          <h1>总额（本金+收益）（元）</h1>
      </div>
  </div>

  <!-- 回款列表 -->
  <div class="container_list">
      <ul>
        <li class="borderBottom-1px"  v-for="(item, index) in returnDetailList" :key="index"  @click="getReturnDay(item.pay_date)">
          <span>{{item.pay_date}}</span>
          <span>{{item.count_sum}}({{item.prinAmt}}+{{item.intAmt}})</span>
        </li>
      </ul>
      <div v-if="isLoaded && !hasReturn" class="container_list_loaded">已全部加载完成</div>
  </div>

  <!-- 某日回款弹窗 -->
  <div class="container_win" v-if="retunDayWinShow">
    <div class="container_win_caption">
      {{returnDay[0].repayDate}} 回款信息
    </div>
    <div class="container_win_detail" v-for="(item, index) in returnDay" :key="index" >
      <h1>{{item.productName}}{{item.loanCount}}个</h1>
      <p><span>收益{{item.repayInterest}}元</span> 回款本金{{item.repayPrincipal}}元</p>
    </div>
    <div class="container_win_button" @click="closeWin">
      确定
    </div>
  </div>
  <div class="container_mark"  v-if="retunDayWinShow" @click="closeWin"></div>

  </div>
</template>

<script>
import myDatepicker from 'vue-datepicker'
import windowTips from '@/components/common/windowTips/windowTips.vue'
import { getStore } from '@/config/mUtils';
import { queryInvestAmountInfo, queryDayInvestAmountInfo } from '@/server/getData.js'

let token, userId, dateStr, dateEnd, pageNum, pageSize;
export default {
  data () {
    return {
      returnTotal: {}, // 回款总额数据
      returnDetailList: [], // 回款列表
      pageNum: 1,
      pageSize: 10,
      returnDay: [], // 某日回款情况
      retunDayWinShow: false,
      isLoaded:  false,  // 是否回款数据加载完成
      hasReturn: false, // 有无回款数据
      isWatch: false,  // 是否监听
      // 下面是日历插件的配置
      startTime: { // 起始时间
        time: ''  
      },
      endTime: {  // 结束时间
        time: ''
      },
      option: {
        type: 'day',
        week: ['一', '二', '三', '四', '五', '六', '日'],
        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        format: 'YYYY-MM-DD',
        placeholder: 'when?',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '0.55rem',
          'font-size': '0.24rem',  
          'border': '0px solid #fff',
          'border-radius': '2px',
          'color': '#000000',
          "width": '2.6rem',
          "text-align": 'center'
        },
        color: {
          checkedDay: '#ff5256',
          header: '#ff6d2b',
          headerText: '#fff',
        },
        buttons: {
          // ok: '确定',
          cancel: '关闭'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      timeoption: {
        type: 'min',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm'
      },
      multiOption: {
        type: 'multi-day',
        week: ['yui', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format:"YYYY-MM-DD HH:mm"
      },
      startLimit: [{
        type:'fromto',
        from:'2016-01-10',
        to:'2016-01-30'
      }],
      endLimit: [{
        type:'fromto',
        from:'2016-01-10',
        to:''
      }],

    };
  },
  mounted() {
    this.initTime();
    window.addEventListener('scroll', this.loadMore);
    this.getReturnList();
  },
  methods: {
    // 格式啊化时间 '2018-05-06'
    customFormatter(date) {
      let day = date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString();
      let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1).toString();
      let year = date.getFullYear().toString();
      return year + "-" + month+ '-' + day
    },
    // 初始化时间选择器的时间
    initTime(){
      const date = new Date();
      const nextDate = new Date( date.getFullYear(), date.getMonth()+2, 0 );
      this.startTime.time = this.customFormatter(date);
      this.endTime.time = this.customFormatter( nextDate )
      this.startLimit[0].from = new Date(date.getTime() - 24*60*60*1000)
      this.endLimit[0].from = this.startTime.time
      this.startLimit[0].to = this.endTime.time
    },
    // 获取回款列表
    getReturnList() {
      queryInvestAmountInfo(  token=getStore('token'), userId=getStore('userId'), dateStr = this.startTime.time, dateEnd = this.endTime.time, pageNum = this.pageNum, pageSize = this.pageSize  ).then( (res) => {  
        let data = res.data.data;
        if(data.investAmoutTotal == null) {
          this.hasReturn = true;
          return;
        }else {
          this.hasReturn = false;
        }
        this.returnTotal = data.investAmoutTotal;
        this.returnDetailList = this.returnDetailList.concat(data.InvestAmountInfoList);
        this.isLoaded = data.InvestAmountInfoList.length < this.pageSize ?  true : false;
      }).catch(function (error) { 
        console.log(error);
      })
    },
    // 获取某一日的回款
    getReturnDay(day) {
      let date;
      queryDayInvestAmountInfo(token=getStore('token'), userId=getStore('userId'), date = day).then(  (res) => {
        let data = res.data.data;
        console.log(data.arr_list);
        this.returnDay = data.arr_list;
        this.retunDayWinShow = true;        
      }).catch( function (error) { 
        console.log(error);
       })
    },
    // 加载更多
    loadMore() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.body.clientHeight;
      if(this.$refs.container.offsetHeight - clientHeight < (scrollTop + 10) && !this.isLoaded) {
        this.pageNum ++;
        this.getReturnList();
      }
    },
    // 关闭弹窗
    closeWin() {
        this.retunDayWinShow = false; 
    },
  },
  watch: {
    'startTime.time': function (newVal, oldVal) {  
        if(this.isWatch){ 
          if( new Date().getTime() > (new Date(this.startTime.time).getTime() + 24*60*60*1000) ){
            this.isWatch = false;
            this.startTime.time = oldVal
            this.$refs.windowTips.toast('限查看当日及之后日期的回款信息');
          } else {
            this.returnDetailList = [];
            this.getReturnList();      
            this.endLimit[0].from = this.startTime.time
          }
        }
    },
    'endTime.time':function(newVal, oldVal){
       if(this.isWatch){
          if( new Date(this.startTime.time).getTime() > new Date(this.endTime.time).getTime()){
            this.isWatch = false;
            this.endTime.time = oldVal
            this.$refs.windowTips.toast('结束日期不能小于起始日期');
          }else {
            this.returnDetailList = [];            
            this.getReturnList();
            this.startLimit[0].to = this.endTime.time
          }
       }
     },

    
  },
  destroyed () {
    window.removeEventListener('scroll', this.loadMore)
  },
  components: {
    'date-picker': myDatepicker,
    windowTips
  }
}

</script>
<style lang='less' scoped>

#word() {
    font-size: 0.28rem;
    line-height: 0.8rem;
}

.container {
  padding-top: 4.3rem;
  font-size: 0.24rem;

  .container_fixed {
    position: fixed;
    top: 0.8rem;
    width: 100%;
    z-index: 10;
    background-color: #fff;
  }

  .container_tip {
    text-align: center;
    color: #000000;
    #word;
  }
  .container_selectDate {
    height: 0.8rem;
    display: block;
    display: flex;
    #icon(){
      position: absolute;
      left: 2.4rem;
      top: 0.26rem;
    }
    .container_selectDate_start {
      float: left;
      position: relative;
      i {
        #icon;
      }
    }
    .container_selectDate_center {
      text-align: center;
      line-height: 0.8rem;
      display: block;
      flex: 1;
    }
    .container_selectDate_end {
      float: right;
      position: relative;
      i {
          #icon;
        }
    }
  }

  .container_returnTotal {
    text-align: center;
    color: #000000;
    #word;
    line-height: 0.55rem;
  }

  .container_caption {
    display: block;
    padding: 0 0.2rem;
    background-color: #efefef;
    #word;
    h1:first-child {
      float: left;
    }
    h1:nth-child(2) {
      float: right;
    }
  }
  .container_list {
      ul {
        li {
           padding: 0 0.2rem;
            #word;

          span:nth-child(2) {
            float: right;
            width: 3.3rem;
            text-align: center;
          }
        }
      }
      .container_list_loaded {
        background-color: #ddd;
        font-size: 0.18rem;
        text-align: center;
        line-height: 0.4rem;
        height: 0.4rem;
      }
    }


  .container_win {
    position: fixed;
    top: 50%;
    left: 0.7rem;    
    width: 5rem;
    margin-top: -1.7rem;
    background-color: #fff;
    z-index: 1001;
    text-align: center;
    border-radius: 0.05rem;
    .container_win_caption {
      padding-top: 0.2rem;
      font-size: 0.26rem;
      line-height: 0.5rem;
      color: #262626;
    }
    .container_win_detail {
      max-height: 2rem;
      overflow-y: auto;
      padding: 0.2rem;      
      text-align: left;
      font-size: 0.26rem;
      line-height: 0.5rem;
      p {
        color: #999999;
      }
    }
    .container_win_button {
        font-size: 0.28rem;
        line-height: 0.9rem;
        border-top: 1px solid #dddddd;
    }
  }
  .container_mark {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;

  }
}


</style>