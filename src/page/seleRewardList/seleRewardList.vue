<template>
  <div class="seleRewardList">
    <mheader :headTitle="redenvelopes?'红包列表':'奖励券列表'" :goBack="'true'" class="borderBottom-1px">
      <div slot='right' class="right" @click="setSelectBenefitObj('no');$router.go(-1);">不使用福利</div>
    </mheader>
    <div class="select-benefits">
      <div v-if="redenvelopes">
        <ul>
          <li v-for='(item,index) in redenvelopes' :key="index" @click="setSelectBenefitObj('redenvelope',item.Id,item.awardMoney,item.activityType);$router.go(-1);">
              <div class="borderBottom-1px">
                <span>{{item.ativityName}}</span>
                <span><i>{{item.awardMoney}}</i>元</span>
              </div>
              <div>
                 <p>单笔满{{item.useRuleAmt}}元可使用 <i class="icon-selected iconfont" v-if='BenefitsId==item.Id'></i> </p>
                 <p>有效期至:{{item.expiryDateStr}}</p>
              </div>
          </li>
        </ul>
      </div>
      <div v-if="rewardTickets">
        <ul>
          <li v-for='(item,index) in rewardTickets' :key="index" @click="setSelectBenefitObj('rewardTicket',item.Id,item.couponRate,item.activityType);$router.go(-1);">
              <div class="borderBottom-1px">
                <span>{{item.ativityName}}</span>
                <span><i>{{item.couponRate}}</i>%</span>
              </div>
              <div>
                <p>单笔满{{item.useRuleAmt}}可使用 <i class="icon-selected iconfont" v-if='BenefitsId==item.Id'></i> </p>
                <p>有效期至: {{item.expiryDateStr}}</p>
                <p>加息期限: {{item.couponPeriod}}</p>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import mheader from '@/components/header/header.vue';
import { getStore, setStore, removeStore } from "@/config/mUtils";

  export default {
    data () {
      return {
        BenefitsId:'',//选择福利的Id
        redenvelopes:JSON.parse(getStore('redenvelopes'))?JSON.parse(getStore('redenvelopes')):null,
        rewardTickets:JSON.parse(getStore('rewardTickets'))?JSON.parse(getStore('rewardTickets')):null,
      }
    },
    mounted(){
      if(getStore('selectBenefitObj')){
        this.BenefitsId = JSON.parse(getStore('selectBenefitObj')).Id;
      }else if(this.redenvelopes){
        this.BenefitsId = this.redenvelopes[0].Id;
        this.setSelectBenefitObj('redenvelope',this.BenefitsId,this.redenvelopes[0].awardMoney,this.redenvelopes[0].activityType);
      }else if(this.rewardTickets){
        this.BenefitsId = this.rewardTickets[0].Id;
        this.setSelectBenefitObj('rewardTicket',this.BenefitsId,this.rewardTickets[0].couponRate,this.rewardTickets[0].activityType);
      }
    },
    methods:{
      setSelectBenefitObj(type, Id, val, activityType){//选择福利类型与id
        let selectBenefitObj = {
          type, Id, val, activityType,
        }
        setStore('selectBenefitObj',JSON.stringify(selectBenefitObj));
      },
    },
    components: {
      mheader
    }
  }
</script>

<style lang='less' scope>
.seleRewardList {
  box-sizing: border-box;
  background: #f4f4f4;
  padding: 0.8rem 0 0;
  min-height: 100%;
  width: 100%;
}
.right {
  font-size: 0.2rem;
  position: absolute;
  top:0;
  right:0.4rem;
  line-height: 0.8rem;
  color: #222;
}
// 选择福利
.seleRewardList .select-benefits {
  >div:nth-child(1){
    ul {
      li {
        display: block;
        font-size: 0.23rem;
        background: #fff;
        margin-bottom: 0.2rem;
        >div:nth-child(1){
          padding: 0.25rem 0.23rem;
          span:nth-child(2) {
            color: #FFAD05;
            i {
              font-size: 0.4rem;
            }
          }
        }
        >div:nth-child(2){
          line-height: 0.4rem;
          padding: 0.15rem 0.5rem 0.25rem 0.23rem;
          p:nth-child(1) {
            i {
              font-size: 0.3rem;
              color: #4FE85C;
              float: right;
            }
          }
          >p:nth-child(n+2) {
            color: #999;
            font-size: 0.18rem;
          }
        }
      }
      li.sele {
        box-sizing:border-box; 
        background-size: 0.5rem 0.5rem;
      }
    }
  }
}
</style>
