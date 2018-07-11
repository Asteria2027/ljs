<template>
 <div class="myTenderDetail">
    <mheader headTitle='详情' :goBack="'true'" class="borderBottom-1px"></mheader>
    <div ref='myTenderLists' class="myTenderLists">
      <div class="myTender-list borderBottom-1px">
        <h3> 
          <span class="omitted">{{investDetail.borrowTitle}}</span>
          <span v-if='investDetail.redPacketAmt>0'>{{`${investDetail.redPacketAmt}元红包`}}</span>
          <span v-if='investDetail.plusCouponPeriod>0&&investDetail.plusCouponPer>0'>{{`奖励${investDetail.plusCouponPer}%${investDetail.plusCouponPeriod}个月`}}</span>
          <span v-if='investDetail.plusCouponPerJxb>0&&investDetail.plusCouponPeriodJxb>0'>{{`奖励${investDetail.plusCouponPerJxb}%${investDetail.plusCouponPeriodJxb}个月`}}</span>
          <span v-if='investDetail.plusCouponPerAuto>0&&investDetail.plusCouponPeriodAuto>0'>{{`奖励${investDetail.plusCouponPerAuto}%${investDetail.plusCouponPeriodAuto}个月`}}</span>
        </h3>
        <ul>
          <li>
            <div>
              <div>{{investDetail.rate}}%</div>
              <p>历史年化</p>
            </div>
            <div>
              <div>{{investDetail.investTime}}</div>
              <p>交易时间</p>
            </div>
            <div v-if="type!='TBZ'">
              <div>{{(type=='CYZ'||type=='END')?`${investDetail.investAmt}元`:`${investDetail.waitedPI}元`}}</div>
              <p>{{(type=='CYZ'||type=='END')?'投标金额':'代收本金'}}</p>
            </div>
            <div v-if="type=='ZRZ'">
              <div>{{`${investDetail.discountRate}%`}}</div>
              <p>打折奖励</p>
            </div>
          </li>
          <li>
            <div>
              <div>{{`${investDetail.deadline}个月`}}</div>
              <p>投标期限</p>
            </div>
            <div>
              <div>{{type=='TBZ'?`${investDetail.investAmt}元`:investDetail.expiryTime}}</div>
              <p>{{type=='TBZ'?'投标金额':'到期时间'}}</p>
            </div>
            <div v-if="type!='TBZ'">
              <div>{{type=='CYZ'?(investDetail.sumPlusIncome>0?`${investDetail.intAmt}元`:`${investDetail.intAmt}元`):type=='ZRZ'?`${investDetail.notReceiveInteRest}元`:type=='END'?`${investDetail.intAmt}元`:''}}</div>
              <p>{{type=='CYZ'?'预期收益':type=='ZRZ'?'代收收益':type=='END'?'到帐收益':''}}<span class="add-money" v-if="(type=='CYZ'||type=='END')&&investDetail.sumPlusIncome>0">{{`+${investDetail.sumPlusIncome}元`}}</span></p>
            </div>
            <div v-if="type=='ZRZ'">
              <div>{{`${investDetail.discountSum}元`}}</div>
              <p>折让金额</p>
            </div>
          </li>
          <li>
            <div>
              <div>{{investDetail.paymentModeTxt}}</div>
              <p>还款方式</p>
            </div>
            <div v-if="type=='CYZ'||type=='ZRZ'">
              <div>{{investDetail.beginTime}}</div>
              <p>计息时间</p>
            </div>
            <div v-if="type=='CYZ'&&investDetail.zrStatus=='N'">
              <div>{{investDetail.zrTime}}</div>
              <p>锁定期至</p>
            </div>
            <!-- <div class="boder-cir" v-if="type=='CYZ'&&investDetail.zrStatus=='Y'">
              <span>转让</span>
            </div>
            <div class="boder-cir" v-if="type=='ZRZ'&&investDetail.zrStatus=='Y'">
              <span>撤销转让</span>
            </div> -->
          </li>
        </ul>
      </div>
    </div>
    <div style="font-size:0.2rem;padding:0.25rem 0.23rem;background:#fff;font-weight:bold;"  v-if='type=="TBZ"'>
      等待放款计息
    </div>
    <div class="repayment-data" v-if='type=="CYZ"||type=="END"||type=="ZRZ"'>
      <div class="Repayment-title borderTop-1px">
        回款详情（金额单位：元）
      </div>
      <div class="repayment-data-title">
        <span>回款日期</span>
        <span>总额（本金+收益）</span>
        <span>状态</span>
      </div>
      <div class="repayment-data-con-wrap" ref="repaymentdataconWrap">
        <div class="repayment-data-con borderBottom-1px" v-for="(item,index) in repaymentDetails" :key="index">
          <span>{{item.payDate}}</span>
          <span>{{Number(item.prinAmt)+Number(item.intAmt)}}({{item.prinAmt}}+{{item.intAmt}})</span>
          <span>{{item.status=='PAID'?'已支付':item.status=='UNPAID'?'未支付':''}}</span>
        </div>
      </div>
      <div class="notData" v-if='noData'>暂无记录</div>
      <div class="loaded" v-if='isLoaded&&repaymentDetails.length>5' style="font-size:0.18rem;padding:0.25rem 0;text-align:center;background:f5f5f5;color:#999;">已全部加载完</div>
    </div>  
 </div>
</template>

<script>
import mheader from "@/components/header/header.vue";
import { investRepaymentDetails } from "@/server/getData.js";
import { getStore } from "@/config/mUtils";

 export default {
   data () {
     return {
      investDetail:'',
      type:'',
      debtId:'',
      pageNum:1, //当前页 
      repaymentDetails:[],//回款日程列表
      loaded: true, // 加载完成
      noData:false,//暂无相关记录
      isLoaded:false,//判断加载是否完成
     }
   },
   mounted(){
     this.getMyTenderDetail();
     window.addEventListener("scroll", this._loadMore);
   },
   methods:{
     getMyTenderDetail(){
       if(getStore('investDetailObj')&&JSON.parse(getStore('investDetailObj')).type){
         this.investDetail = JSON.parse(getStore('investDetailObj')).indexdetail;
         this.type = JSON.parse(getStore('investDetailObj')).type;
         this.debtId = JSON.parse(getStore('investDetailObj')).indexdetail.debtId;
        //  console.log(this.investDetail)
        //  console.log(this.debtId)
         this.getInvestRepaymentDetails();
       }
     },
     getInvestRepaymentDetails(){
        let token, userId, prdCode, investCode, investId, status, pageNum, pageSize, debtId;
        investRepaymentDetails(token=getStore('token'), userId=getStore('userId'), prdCode=this.investDetail.productCode, investCode=this.investDetail.investCode, investId=this.investDetail.investId, status=this.type, pageNum=this.pageNum, pageSize=20, debtId=this.debtId).then(res => { 
          if(res.data.code==1){
            let len = this.repaymentDetails.length;
            this.repaymentDetails = this.repaymentDetails.concat(res.data.data);
            if (len == this.repaymentDetails.length) {
              this.loaded = false;
              this.isLoaded = true;
            } else {
              this.loaded = true;
            }
          }
          if(this.repaymentDetails.length==0){
            this.noData = true;
          } else {
            this.noData = false;
          }
        }).catch(function (error) {
          console.log(error);
        });
     },
     _loadMore() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.body.clientHeight;
      if(this.$refs.repaymentdataconWrap.offsetHeight-clientHeight<(Number(scrollTop)+10)&&this.loaded){
        this.loaded = false;
        this.pageNum++;
        this.getInvestRepaymentDetails();
      }
    },
   },
   components: {
     mheader
   },
   destroyed() {
     window.removeEventListener("scroll", this._loadMore);
   }
 }
</script>

<style lang='less' scope>
.myTenderDetail {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  background: #f4f4f4;
  padding-top: 0.8rem;
}
 
.myTender-list {
  width: 100%;
  background: #fff;
  overflow: hidden;
  > h3 {
    color: #7a7a7a;
    font-size: 0.23rem;
    margin: 0.1rem 0 0.1rem 0.24rem;
    display: block;
    display: flex;
    span:nth-child(1) {
      word-wrap: break-word;
      word-break: break-all;
      white-space: pre-wrap !important;
      line-height: 0.4rem;
      margin-right: 0.2rem;
      display: block;
    }
    span:nth-child(2) {
      display: block;
      height: 0.2rem;
      line-height: 0.23rem;
      font-size: 0.16rem;
      padding: 0.04rem 0.05rem;
      margin-right: 0.2rem;
      background: #ffb524;
      border-radius: 0.1rem;
      color: #fff;
       white-space: nowrap;  /*强制span不换行*/
      display: inline-block; 
    }
    span:nth-child(3) {
      display: block;
      height: 0.2rem;
      line-height: 0.23rem;
      font-size: 0.16rem;
      padding: 0.04rem 0.05rem;
      margin-right: 0.2rem;
      background: #ffb524;
      border-radius: 0.1rem;
      color: #fff;
       white-space: nowrap;  /*强制span不换行*/
      display: inline-block; 
    }
    span:nth-child(4) {
      display: block;
      height: 0.2rem;
      line-height: 0.23rem;
      font-size: 0.16rem;
      padding: 0.04rem 0.05rem;
      margin-right: 0.2rem;
      background: #ffb524;
      border-radius: 0.1rem;
      color: #fff;
       white-space: nowrap;  /*强制span不换行*/
      display: inline-block; 
    }
  }
  > ul {
    display: block;
    display: flex;
    font-size: 0.2rem;
    li {
      display: block;
      flex: 1;
      > div {
        > div {
          margin-bottom: 0.2rem;
        }
        > p {
          font-size: 0.18rem;
          color: #999999;
          padding-bottom: 0.2rem;
        }
      }
    }
    li:first-child {
      padding-left: 0.24rem;
      text-align: left;
    }
    li:nth-child(2) {
      text-align: center;
    }
    li:last-child {
      padding-right: 0.24rem;
      text-align: right;
    }
    .boder-cir {
      position: relative;
      span {
        position: absolute;
        text-align: center;
        right: 0;
        width: 80%;
        line-height: 0.5rem;
        border: 1px solid #ef5146;
        color: #ef5146;
        border-radius: 0.5rem;
      }
    }
  }
}
.add-money {
  color: #ef5146;
}
.Repayment-title {
  font-size: 0.23rem;
  padding: 0.25rem 0 0.25rem 0.23rem;
  background: #ffffff;
}
.repayment-data {
  font-size: 0.23rem;
  .repayment-data-title {
    display: block;
    display: flex;
    text-align: center;
    padding: 0.25rem 0;
    span {
      display: block;
      flex: 1;
    }
  }
  .repayment-data-con {
    display: block;
    display: flex;
    text-align: center;
    padding: 0.25rem 0;
    background: #fff;
    span {
      display: block;
      flex: 1;
    }
  }
}
.notData {
  font-size:0.18rem;
  text-align:center;
  padding:0.25rem 0;
}
</style>
