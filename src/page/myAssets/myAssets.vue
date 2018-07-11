<template>
  <div class="myAssets">
    <mheader headTitle='我的资产' :goBack="'true'" class="borderBottom-1px"></mheader>
    <div class="ring-wrap">
      <div class="ring" id="ring"></div>
    </div>
    <div class='assets-detail'>
      <ul>
        <li>
          <div>
            <span></span>
            <span>可用余额 :</span>
            <span>{{usablesum}}</span>
          </div>
        </li>
        <li>
          <div>
            <span></span>
            <span>待收本金 :</span>
            <span>{{recivedprincipal}}</span>
          </div>
        </li>
        <li>
          <div>
            <span></span>
            <span>待收收益 :</span>
            <span>{{recivedinterest}}</span>
          </div>
        </li>
        <li>
          <div>
            <span></span>
            <span>冻结金额 :</span>
            <span>{{Number(invest_freeAmount)+Number(withdraw_freeAmount)+Number(ljmdFreezeSum)}}</span>
            <span @click="showExplanation=true">?</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="myAssets-explanation" v-if="showExplanation">
      <div class="explanation">
        <div>投标中冻结：{{invest_freeAmount}}</div>
        <div>提现中冻结：{{withdraw_freeAmount}}</div>
        <div>回款中冻结：{{ljmdFreezeSum}}</div>
        <div class="borderTop-1px" @click="showExplanation=false">知道了</div>
      </div>
      <div class="cover"></div>
    </div>
    <div class="column-chart-wrap">
       <h3>收益走势</h3>
       <h3>2018年每月投标收益走势</h3>
       <div class="column-chart" id='columnChart'></div>
    </div>
  </div>
</template>

<script>

import mheader from '@/components/header/header.vue'   
import { histogram, wapMyProperty } from '@/server/getData.js'
import { getStore } from '@/config/mUtils'
import { mapState } from 'vuex';
import echarts from 'echarts'

export default {
  data () {
    return {
      showExplanation:false,
      usablesum:'', //可用余额
      recivedprincipal:'', //待收本金
      recivedinterest:'', //待收收益
      invest_freeAmount:'', //投标中冻结金
      withdraw_freeAmount:'', //提现中冻结
      ljmdFreezeSum:'', //回款中的冻结
      toSum:'',
      Gained:[0,0,0,0,0,0,0,0,0,0,0,0],//已收益
      profitable:[0,0,0,0,0,0,0,0,0,0,0,0],//待收益
    };
  },
  mounted(){
    this._histogram();
    this._wapMyProperty();
    if(this.$store.state.userInfo){
      this.toSum = this.$store.state.userInfo.toSum;
    }
    setTimeout(()=>{
      if(this.$store.state.userInfo&&this.$store.state.userInfo.toSum) {
        this.toSum = this.$store.state.userInfo.toSum;
      }
    },200);

    this.drawBar();
  },
   computed: {
    ...mapState([
        'userInfo'
    ]),
  },
  methods:{
    drawPie(){
      // 基于准备好的dom，初始化echarts实例
      let pieChart = echarts.init(document.getElementById('ring'));
      let option1 = {
        graphic:{
            type:'text',
            left:'center',
            top:'center',
            style:{
              text:`${this.toSum}\n 总资产（元）`,
              textAlign:'center',
              // fill:'#999',
              width:30,
              height:30
            },
        },
        series: [
            {
                name:'访问来源',
                type: 'pie',
                radius: ['55%', '70%'],
                itemStyle: {
                  normal:{
                      label:{
                        show:false,
                      },
                  },
                },
                data: [
                    {value: this.usablesum, name: '可用余额'},
                    {value: this.recivedprincipal, name: '待收本金'},
                    {value: this.recivedinterest, name: '待收收益'},
                    {value: Number(this.invest_freeAmount)+Number(this.withdraw_freeAmount)+Number(this.ljmdFreezeSum), name: '冻结金额'},
                ]
            }
        ],
        color:['#FDA22D','#4DA4FE','#97FE03','#EB5CF4']
      };
      pieChart.setOption(option1)
    },
    drawBar(Gained,profitable){
      let BarChart = echarts.init(document.getElementById('columnChart'));
      var option = {
        tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data:['已收收益','待收收益'],
        bottom:'-4px'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '7%',
        containLabel: true
      },
      xAxis: [
        {
          type : 'category',
          data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
          axisLine:{
            lineStyle:{
              color:'#1c7cb7'
            },
          },
          axisLabel: {
            textStyle: {
              color:'#222222',
              fontSize:6
            },
            interval:0,
          },
          axisTick:{
            show:false
          }
        }
      ],
      yAxis : [
        {
          type : 'value',
          axisLine:{
            lineStyle:{
              color:'#1c7cb7'
            }
          },
          axisLabel: {
            textStyle: {
              color:'#222222'
            }
          },
          axisTick:{
            show:false
          }
        }
      ],
      series : [
        {
          name:'已收收益',
          type:'bar',
          stack: '收益',
          itemStyle:{
            normal:{
              color:'#ff7e50'
            }
          },
          data:Gained,
          //barGap:'50%',
          barWidth : '60%'
        },
        {
          name:'待收收益',
          type:'bar',
          stack: '收益',
          itemStyle:{
            normal:{
              color:'#87cffb'
            }
          },
          data:profitable,
          //barGap:'50%',
          barWidth : '60%'
        },
      ]
      };
      BarChart.setOption(option);     
    },
    _histogram(){
      let token, userId;
      histogram(token=getStore('token'), userId=getStore('userId')).then(res => { 
        if(res.data.code==1){
          this.usablesum = res.data.data.usablesum;
          this.recivedprincipal = res.data.data.recivedprincipal;
          this.recivedinterest = res.data.data.recivedinterest;
          this.invest_freeAmount = res.data.data.invest_freeAmount;
          this.withdraw_freeAmount = res.data.data.withdraw_freeAmount;
          this.ljmdFreezeSum = res.data.data.ljmdFreezeSum;
          this.drawPie();
        }else {
          alert(res.data.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    _wapMyProperty(){
      let token, userId;
      wapMyProperty(token=getStore('token'), userId=getStore('userId')).then(res => { 
        if(res.data.code==1){
          if(res.data.data.hasInterest){
            this.getIncome(res.data.data.hasInterest,'hasInterest');//已收益
          }
          if(res.data.data.forPayInterest){
            this.getIncome(res.data.data.forPayInterest,'forPayInterest');//待收益
          }
        }else {
          alert(res.data.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    getIncome(income,type){
      if(type=='hasInterest'){
        for(var i in income){
          this.Gained[(Number(income[i].REPAYDATE.slice(-2))-1)] = income[i].HASINVEREST;
        }
      }else if(type=='forPayInterest') {
        for(var i in income){
          this.profitable[(Number(income[i].REPAYDATE.slice(-2))-1)] = income[i].AMOUNT;
        }
      }
      this.drawBar(this.Gained,this.profitable);
    }
  },
  components: {
    mheader
  },
}

</script>
<style lang='less' scoped>

.myAssets {
  box-sizing: border-box;
  background: #F5f5f5;
  padding-top: 0.8rem;
  min-height: 100%;   
  width: 100%;
  .ring-wrap {
    background: #fff;
    .ring {
      height: 4rem;
      width: 4rem;
      font-size: 0.2rem;
      margin:0 auto;
      // border: 0.2rem solid rgba(0, 0, 0, 0.2);
      // border-radius: 50%;
      text-align: center;
      >div:nth-child(2){
        margin-top: 0.1rem;
        color: #999;
      }
    }
  }
  
  .assets-detail {
    font-size: 0.2rem;
    background: #fff;
    li {
      display:block;
      display:flex;
      div {
        display: block;
        display: flex;
        height: 0.5rem;
        min-width:50%;
        line-height: 0.5rem;
        margin: 0 auto;
        overflow: hidden;
        color: #999;
        span:nth-child(1) {
          margin-top: 0.1rem;
          margin-right: 0.2rem;
          height: 0.2rem;
          width: 0.2rem;
        }
        span:nth-child(2) {
          margin-right: 0.15rem;
        }
        span:nth-child(3) {
          margin-right: 0.2rem;
        }
        span:nth-child(4) {
          margin-top: 0.05rem;
          height: 0.3rem;
          width: 0.3rem;
          text-align: center;
          line-height: 0.35rem;
          border:1px solid #F26A5C;
          color: #F26A5C;
          border-radius: 50%;
        }
      }
    }
    li:nth-child(1){
      div>span:nth-child(1){
        background: #FDA22D;
      }
    }
    li:nth-child(2){
      div>span:nth-child(1){
        background: #4DA4FE;
      }
    }
    li:nth-child(3){
      div>span:nth-child(1){
        background: #97FE03;
      }
    }
    li:nth-child(4){
      padding-bottom: 0.3rem;
      div>span:nth-child(1){
        background: #EB5CF4;
      }
    }
  }
}
.myAssets-explanation {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10001;
  .cover {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .explanation {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 2rem;
    width: 4.5rem;
    font-size: 0.2rem;
    text-align: center;
    background: #fff;
    padding-top:0.4rem;
    border-radius: 0.05rem;
    div {
      line-height: 0.4rem;
    }
    div:last-child{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 0.7rem;
      line-height: 0.7rem;
    }
  }
}
.column-chart-wrap {
  margin-top: 0.2rem;
  background: #fff;
  padding-bottom: 0.4rem;
  h3:nth-child(1) {
    padding-top: 0.4rem;
    font-size: 0.2rem;
    padding-left: 0.23rem;
  }
  h3:nth-child(2) {
    padding-top: 0.4rem;
    font-size: 0.25rem;
    text-align: center;
    color: #FDA22D;
  }
  .column-chart {
    height: 4rem;
    width: 100%;
    margin: 0 auto;
  }
}
</style>