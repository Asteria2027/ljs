<template>
  <div class="rewardRecord">
    <mheader headTitle='收益奖励记录' :goBack="'true'"  class="borderBottom-1px">
      <div slot='right' class="right">单位（元）</div>
    </mheader>
    <div class="rewardRecord-title">
      <div>
        <p>奖励总收益</p>
        <p>{{totalPlusIncome}}</p>
      </div>
      <div>
        <p>已发放总收益</p>
        <p>{{totalReceivedPlusIncome}}</p>
      </div>
      <div>
        <p>待发放总收益</p>
        <p>{{totalUnreceivedPlusIncome}}</p>
      </div>
    </div>
    <div ref="rewardRecordCon">
      <div class="rewardRecord-con" v-for="(item,index) in rewardRecordList" :key="index">
        <h3>{{item.investTime}} &nbsp;投标&nbsp; {{item.title}}&nbsp;{{item.amount}}元&nbsp;奖励{{item.plusCouponPer}}%&nbsp;{{item.plusCouponPeriod}}个月</h3>
        <div>
          <div>
            <p>奖励收益</p>
            <p>{{item.sumPlusIncome}}</p>
          </div>
          <div>
            <p>已发放收益</p>
            <p>{{item.givePlusIncome}}</p>
          </div>
          <div>
              <p>待发放收益</p>
              <p>{{item.toGiveIncome}}</p>
          </div>
        </div>
        <p v-if='item.transferFlag==1'>奖励期内转让，奖励至{{item.endDate}}</p>
      </div>
    </div>
     <not-data v-if='noData'>
      <div slot='hint' class='noWelfare'>没有相关记录</div>
    </not-data>
  </div>
</template>

<script>

import mheader from '@/components/header/header.vue'
import notData from '../../components/common/notData/notData.vue'
import { queryUserPlusIncomeList } from "@/server/getData.js";
import { getStore } from "@/config/mUtils";

 export default {
   data () {
     return {
       rewardRecordList:[],
       pageNum:1, //当前页
       loaded:true, // 加载完成
       noData:false,
       totalPlusIncome:0,//奖励总收益
       totalUnreceivedPlusIncome:0,//待发放收益
       totalReceivedPlusIncome:0,//已发放收益
     }
   },
   mounted(){
     this._queryUserPlusIncomeList();
     window.addEventListener('scroll', this._loadMore);
   },
   methods:{
    _queryUserPlusIncomeList(){
      let token, userId, pageNum,pageSize;
      //收益奖励记录
      queryUserPlusIncomeList((token = getStore("token")),(userId = getStore('userId')),pageNum=this.pageNum,pageSize=20).then(res => {
          if(res.data.code==1&&res.data.data.totalPlusIncomeMap!=null){
            this.totalPlusIncome = res.data.data.totalPlusIncomeMap.totalPlusIncome;
            this.totalUnreceivedPlusIncome = res.data.data.totalPlusIncomeMap.totalUnreceivedPlusIncome;
            this.totalReceivedPlusIncome = res.data.data.totalPlusIncomeMap.totalReceivedPlusIncome;
          }
          if(res.data.code==1&&res.data.data.plusIncomeList!=null){
            let len = this.rewardRecordList.length;
            this.rewardRecordList = this.rewardRecordList.concat(res.data.data.plusIncomeList);
            if (len == this.rewardRecordList.length) {
              this.loaded = false;
            } else {
              this.loaded = true;
            }
          }
          if(this.rewardRecordList.length==0){
            this.noData = true;
          } else {
            this.noData = false;
          }
      }).catch((error)=>{
          console.log(error); 
      });
    },
    _loadMore(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.body.clientHeight;
      if(this.$refs.rewardRecordCon.offsetHeight-clientHeight<(Number(scrollTop)+10)&&this.loaded){
        this.loaded = false;
        this.pageNum++;
        this._queryUserPlusIncomeList();
      }
    }
   },
   components: {
      mheader,
      notData
   },
  destroyed () {
    window.removeEventListener('scroll', this._loadMore)
  },
 }
</script>

<style lang='less' scope>
.rewardRecord {
  box-sizing: border-box;
  background: #f4f4f4;
  padding-top: 1.8rem;
  min-height: 100%;
  width: 100%;
  .rewardRecord-title {
    position: fixed;
    top: 0.8rem;
    left: 0;
    width: 100%;
    z-index: 1;
    display: block;
    display: flex;
    font-size: 0.25rem;
    color: #4A97D2;
    >div {
      display: block;
      flex: 1;
      text-align: center;
      line-height: 0.35rem;
      padding: 0.2rem 0;
      background: #fff;
    }
  }
  .rewardRecord-con {
    font-size: 0.2rem;
    background: #fff;
    color: #999;
    padding: 0.2rem 0.23rem;
    margin-top: 0.2rem;
    >h3 {
      line-height: 0.3rem;
    }
    >div:nth-child(2){
      display: block;
      display: flex;
      >div {
        display: block;
        flex: 1;
        line-height: 0.35rem;
        padding: 0.15rem 0;
        background: #fff;
      }
      >div:nth-child(2){
        text-align: center;
      }
      >div:nth-child(3){
        text-align: right;
      }
    }
    >p {
      color: #4A97D2;
    }
  }
  .noWelfare {
    font-size:0.2rem;
    color:#999;
    line-Height:0.3rem;
  }
}
.right {
  font-size: 0.2rem;
  position: absolute;
  top:0;
  right:0.4rem;
  line-height: 0.8rem;
  color: #222;
}
</style>
