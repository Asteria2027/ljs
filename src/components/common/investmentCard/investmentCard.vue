<!-- 推荐投标卡片 -->
<template>
  <div class="investmentCard" v-if='newHandList||HandList||investList'>
    <!-- 首页投标card -->
     <!-- 1 散标专区 2 个人专区 3 企业专区 6 新手专区 -->
    <div class="home_list_title" @click="gotoAddress(curtitle)" v-if='curtitle'>
      <div class="borderBottom-1px">
          <span>{{cardTitle}}</span>  
          <i class="num">({{num}})</i>
      </div>
      <div class="borderBottom-1px">
          <i>{{newHandList?'100元起投 期限短':'100元起投 可转'}}</i>
          <i class="iconfont icon-more"></i>
      </div>
    </div>
    <div class="home_list-content borderBottom-1px" v-if='curtitle&&newHandList' @click="gotoDetail(item.borrowId,item.subjectType)" v-for="(item, index) in newHandList" :key="index">
      <h3>{{item.borrowTitle}}</h3>
      <ul>
        <li class="annualization-rate">
          <div><span >{{item.newRate}}</span><span>%</span></div>
          <p>历史年化</p>
        </li>
        <li class="remaining-period">
          <div><span>{{item.deadline}}</span><span>个月</span></div>
          <p>投标期限</p>
        </li>
        <li class="transfer-amount">
          <div>{{item.investNum}}</div>
          <p>可投金额</p>
        </li>
        <li class="target-progress">
          <div class="pro_box">
            <p class="pro_bg"></p>
            <p class="pro_bar" :style="{width: item.schedules + '%'}"></p>
          </div>
          <i>{{item.schedules}}%</i>
          <p>标的进度</p>
        </li>
      </ul>
    </div>
    <div class="home_list-content" v-if='curtitle&&HandList' @click="gotoDetail(HandList.borrowId,HandList.subjectType)">
      <h3>{{HandList.borrowTitle}}</h3>
      <ul>
        <li class="annualization-rate">
          <div><span >{{HandList.newRate}}</span><span>%</span></div>
          <p>历史年化</p>
        </li>
        <li class="remaining-period">
          <div><span>{{HandList.deadline}}</span><span>个月</span></div>
          <p>投标期限</p>
        </li>
        <li class="transfer-amount">
          <div>{{HandList.investNum}}</div>
          <p>可投金额</p>
        </li>
        <li class="target-progress">
          <div class="pro_box">
            <p class="pro_bg"></p>
            <p class="pro_bar" :style="{width: HandList.schedules + '%'}"></p>
          </div>
          <i>{{HandList.schedules}}%</i>
          <p>标的进度</p>
        </li>
      </ul>
    </div>
    <!-- 投标页面card -->
    <div class="invest_list-content" v-if='!curtitle' @click="gotoDetail(item.borrowId?item.borrowId:item.id,item.subjectType,item.bid)" v-for="(item, index) in investList" :key="index">
      <h3>
        <span class="borderBottom-1px">{{item.borrowTitle?item.borrowTitle:'--'}}<i v-if='investAttr=="6"||item.subjectType=="6"'>新手专区</i></span>
        <span class="borderBottom-1px">投标中</span>  
      </h3>
      <ul>
        <li class="annualization-rate">
          <div><span >{{item.minRate}}</span><span>%</span></div>
          <p>历史年化</p>
        </li>
        <li class="period">
          <div><span>{{item.deadline}}</span><span>个月</span></div>
          <p>投标期限</p>
        </li>
        <li class="the-date-of-settlement">
          <div>{{item.leftInvestAmt?item.leftInvestAmt:item.payDay}}</div>
          <p v-if="investAttr=='5'">结息日</p>
          <p v-if="investAttr!='5'">可投金额</p>
        </li>
         <li class="target-progress" v-if='investAttr!="5"'>
          <div class="pro_box">
            <p class="pro_bg"></p>
            <p class="pro_bar" :style="{width: item.schedules + '%'}"></p>
          </div>
          <i>{{item.schedules}}%</i>
          <p>标的进度</p>
        </li>
        <li class="transfer-amount" v-if='investAttr=="5"'>
          <div>{{item.auctionbaseprice1}}</div>
          <p>转让金额</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { setStore } from '@/config/mUtils'

export default {
  props: {
    cardTitle: {
      type: String,
      default: ''
    },
    newHandList:{},//新手专区
    HandList: {},//其他
    num: {},
    curtitle: {//判断首页还是投标页面
      type: String,
      default: ''
    },
    investList:{},//投标页面
    investAttr:{ // 1 个人专区 2 散标专区 3 企业专区 4 转让专区 5 新手专区
      type:String,
    }
  },
  methods:{
    gotoAddress(curtitle){
      if(curtitle){
        this.$router.push({path:'/invest'});
        setStore('curTitle',curtitle);
        return;
      }
      this.$router.push({path:'/invest'});
    },
    gotoDetail(borrowId,subjectType,bid){
      if(bid){
         this.$router.push({path:`/investDetail?borrowId=${borrowId}&subjectType=${subjectType}&bid=${bid}`});
      }else {
        this.$router.push({path:`/investDetail?borrowId=${borrowId}&subjectType=${subjectType}`});
      }
    }
  }
}
</script>
<style lang='less' scoped>
.investmentCard {
  .num {
    color: #fe6246;
  }
  .home_list_title {
    display: block;
    display: flex;
    height: 0.5rem;
    padding-top: 0.2rem;
    width: 100%;
    background: #fff;
    >:nth-child(1){
      display: block;
      flex: 1;
      text-align: left;
      margin-left: 0.24rem;
      display: block;
      font-size: 0.24rem;
      span {
        font-weight: 700;
        color: #222222;  
      } 
    }
    >:nth-child(2){
      display: block;
      flex: 1;
      font-size: 0.21rem;
      text-align: right;
      margin-right: 0.15rem;
      display: block;
      font-size: 0.21rem;
      color: #999;
      i {
        font-size: 0.21rem;
      }
    }
  }
  .home_list-content {
    width: 100%;
    background: #fff;
    overflow: hidden;
    >h3 {
      color: #7a7a7a;
      font-size: 0.2rem;
      margin: 0.3rem 0 0.26rem 0.24rem;
    }
    >ul {
      display: block;
      display: flex;
      font-size: 0.18rem;
      li {
        display: block;
        flex: 1;
        >div {
          margin-bottom:0.3rem;
        }
        >p {
          font-size: 0.18rem;
          color: #999999;
          text-align: center;
          padding-bottom: 0.3rem;
        }
      }
      li:nth-child(1) {
        padding-left: 0.1rem;
      }
      li:nth-child(3) {
        padding-right: 0.1rem;
      }
    }
    .annualization-rate {
      >div {
        color: #fe6246;
        text-align: center;
        >span:nth-child(1){
          font-size:0.42rem; 
        }
        >span:nth-child(2){
          font-size:0.2rem; 
        }
      }
    }
    .remaining-period {
      >div {
        color: #222222;
        text-align: center;
        >span:nth-child(1){
          font-size:0.42rem; 
        }
        >span:nth-child(2){
          font-size:0.16rem; 
        }
      }
    }
    .transfer-amount {
      >div {
        color: #222222;
        text-align: center;
        font-size:0.42rem; 
      }
    }
    .target-progress {
      height: 0.08rem;
      padding-top: 0.15rem;
      padding-right: 0.24rem;
      position: relative;
      .pro_box {
        position: relative;
        width: 0.72rem;
      }
      .pro_bg {
        width: 100%;
        height: 0.08rem;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 0.08rem;
        background: #f4f4f4;
      }
      .pro_bar {
        background: #FE9A15;
        position: absolute;
        left: 0;
        top: 0;
        height: 0.08rem;
        width: 50%;
        border-radius: 0.08rem;
      }
      >i {
        position: absolute;
        left: 0.8rem;
        top: 0.11rem;
      }
      >p {
        margin-top: 0.55rem;
        text-align: left;
      }
    }
  }
  // 投标card
  .invest_list-content {
    margin-bottom: 0.2rem;
    width: 100%;
    background: #fff;
    overflow: hidden;
    >h3 {
      display: block;
      display: flex;
      height: 0.7rem;
      line-height: 0.7rem;
      color: #7a7a7a;
      font-size: 0.2rem;
      margin-left: 0.24rem;
      span:nth-child(1) {
        display: block;
        flex: 1;
        i {
          margin-left: 0.15rem;
          padding: 0.02rem 0.04rem;
          color: #70C8FE;
          border: 1px solid #70C8FE;
          font-size: 0.14rem;
        }
      }
      span:nth-child(2) {
        margin-right: 0.24rem;
      }
    }
    >ul {
      display: block;
      width: 100%;
      display: flex;
      font-size: 0.18rem;
      li {
        display: block;
        padding-top: 0.3rem;
        flex: 1;
        >div {
          margin-bottom:0.3rem;
          text-align: center;
        }
        >p {
          font-size: 0.18rem;
          color: #999999;
          text-align: center;
          padding-bottom: 0.3rem;
        }
      }
      li:nth-child(1) {
        padding-left: 0.1rem;
      }
      li:nth-child(3) {
        padding-right: 0.1rem;
      }
    }
    .annualization-rate {
      >div {
        color: #fe6246;
        text-align: center;
        >span:nth-child(1){
          font-size:0.42rem; 
        }
        >span:nth-child(2){
          font-size:0.2rem; 
        }
      }
    }
    .period {
      >div {
        color: #222222;
        >span:nth-child(1){
          font-size:0.42rem; 
        }
        >span:nth-child(2){
          font-size:0.16rem; 
        }
      }
    }
    .target-progress {
      height: 0.08rem;
      padding-top: 0.45rem;
      padding-right: 0.24rem;
      position: relative;
      .pro_box {
        position: relative;
        width: 0.72rem;
      }
      .pro_bg {
        width: 100%;
        height: 0.08rem;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 0.08rem;
        background: #f4f4f4;
      }
      .pro_bar {
        background: #FE9A15;
        position: absolute;
        left: 0;
        top: 0;
        height: 0.08rem;
        width: 50%;
        border-radius: 0.08rem;
      }
      >i {
        position: absolute;
        left: 0.8rem;
        top: 0.40rem;
      }
      >p {
        margin-top: 0.55rem;
        text-align: left;
      }
    }
    .transfer-amount,
    .the-date-of-settlement {
      >div {
        color: #222222;
        font-size:0.42rem; 
      }
    }
    .transfer-amount {
      margin-right: 0.24rem;
    }
  }
}

</style>