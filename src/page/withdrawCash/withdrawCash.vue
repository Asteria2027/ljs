<template>
  <div class="withdrawCash">
    <mheader headTitle='提现' :goBack="'true'" class="borderBottom-1px">
      <router-link tag='div' to='withdrawCashRecord' slot='right' class="right">提现记录</router-link>
    </mheader>
    <div class="fast-recharge">
      <div class="account-info">
        <div><img :src="accountInfo.bankImg" alt=""></div>
        <div>
          <p>{{accountInfo.bankName}}</p>
          <p>{{accountInfo.bankNo}}</p>
        </div>
      </div>
      <div class="look-withdraw-money">
        <div>可提现金额</div>
        <div> <i>{{(userInfo&&userInfo.canUseAbleAmt)?userInfo.canUseAbleAmt:'--'}}元</i> </div>
      </div>
      <div class="withdraw-money">
        <div>提现金额</div>
        <div>
          <input type="number" v-model='withdrawMoney' placeholder="提现金额100元起" autofocus="autofocus" oninput="if(value.length>15)value=value.slice(0,15);if(!/^-?\d+\.?\d{0,2}$/.test(value))value=value.slice(0,value.length-1)">
        </div>
      </div>
      <div class="withdraw-enter" @click="withdrawNextStep" :style="{background:payClick?'#ff654f':'#999'}">下一步</div>
      <div class="withdraw-instructions">
        <p>1、提现单笔金额≤5万，如超过5万请分多笔操作。</p>
        <p>2、充值15天后提现免费（注：充值次日算第1天）。您当月（满足免费提现额度前提下）按上月月末的待收本金不同，享有不同的免费提现次数，超过免费提现次数按3元/笔收费。<br/> 免费提现额度=可用余额-冻结金额+15天内投标金额-15天内充值金额。<br/>免费提现次数：用户按上月月末的待收本金不同，享有不同的免费提现次数。</p>
        <img src="./tixian.png" alt="">
        <p>3、超出免费提现额度的提现属于“紧急提现”，另收取超出部分的0.5%作为提现手续费（最低3元/笔）。</p>
        <p>4、提现到账时间：实时到账（具体到账时间以银行回调时间为准，如遇银行维护则有延迟）。</p>
      </div>
    </div>
    <window-tips ref='windowTips'></window-tips>
  </div>
</template>

<script>
import mheader from '@/components/header/header.vue'   
import windowTips from '@/components/common/windowTips/windowTips.vue'
import { mapState } from 'vuex';
import { depositAccoutInfo, withdrawRequest } from "@/server/getData.js";
import queryZs from '@/config/queryZsResults';
import { getStore,setStore,formSubmit } from '@/config/mUtils';

  export default {
    mixins:[queryZs],
    data () {
      return {
        accountInfo:'',
        withdrawMoney:'',//提现金额
        payClick:true,//节流
      }
    },
    mounted(){
      this.queryZsResult(this.$route.query.zsCallback);
      this.getDepositAccoutInfo();
    },
    computed: {
      ...mapState([
        'userInfo'
      ]),
    },
    methods:{
      getDepositAccoutInfo(){ 
        //获取存管账户
        let token, userId;
        depositAccoutInfo(token=getStore('token'), userId=getStore('userId')).then(res => { 
          if(res.data.code==1){
            this.accountInfo=res.data.data;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      withdrawNextStep(){
        if(!this.withdrawMoney){
          this.$refs.windowTips.toast('请输入提现金额');
          return;
        }
        if(Number(this.withdrawMoney)<100){
          this.$refs.windowTips.toast('提现金额100元起');
          return;
        }
        if(Number(this.withdrawMoney)>this.$store.state.userInfo.canUseAbleAmt){
          this.$refs.windowTips.toast('您输入的金额大于可提现金额');
          return;
        }
        if(!this.payClick){
          return;
        }
        this.payClick = false;
        let token, userId, amount,platForm, callBackURL;
        withdrawRequest(token=getStore('token'), userId=getStore('userId'), amount=this.withdrawMoney, platForm='3', callBackURL=`wapfront/account?zsCallback=withdrawCash`).then(res => { 
          if(res.data.code==1){
            this.payClick = true;
            setStore('withdrawCashOrderNo',res.data.data.orderNo);
            formSubmit(res.data.data.zsUrl,{reqMsg:res.data.data.reqMsg});  
          }else {
            this.payClick = true;
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch((error)=>{
          this.payClick = true;
          console.log(error);
        });
        // this.$router.push(`withdraw?withdrawMoney=${this.withdrawMoney}&bankNo=${encodeURIComponent(this.accountInfo.bankNo)}`);
      }
    },
    components: {
      mheader,
      windowTips
    }
  }
</script>

<style lang='less' scope>
.withdrawCash {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  background: #f4f4f4;
  padding-top: 0.8rem;
  .fast-recharge {
    .account-info {
      display: block;
      display: flex;
      background: #fff;
      padding: 0.3rem 0;
      >div:nth-child(1) {
        width: 1.3rem;
        height: 1rem;
        text-align: center;
        img {
          width: 0.8rem;
          height: 0.8rem;
        }
      }
      >div:nth-child(2){
        padding-top: 0.1rem;
        p:nth-child(1),
        p:nth-child(2) {
          font-size: 0.25rem;
          line-height: 0.35rem;
          font-weight: 700;
        }
        p:nth-child(3) {
          color: #999;
          font-size: 0.16rem;
          line-height: 0.4rem;
          span.money {
            color: #ff654f;
          }
        }
      }
    }
    .look-withdraw-money {
      margin-top: 0.2rem;
      display: block;
      display: flex;
      height: 0.4rem;
      padding: 0.2rem;
      font-size: 0.23rem;
      background: #fff;
      >div:nth-child(1) {
        width: 1.2rem;
        height: 0.4rem;
        text-align: center;
        line-height: 0.4rem;
      }
      >div:nth-child(2) {
        display: block;
        flex: 1;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: right;
        i {
          color: #ff654f;
        }
      }
    }
    .withdraw-money {
      display: block;
      display: flex;
      height: 0.4rem;
      padding: 0.2rem;
      font-size: 0.23rem;
      background: #fff;
      >div:nth-child(1) {
        width: 1.2rem;
        text-align: center;
        line-height: 0.4rem;
      }
      >div:nth-child(2) {
        display: block;
        flex: 1;
        input {
          height: 0.4rem;
          line-height: 0.4rem;
          width: 100%;
          text-align: right;
        }
      }
    }
    .withdraw-enter {
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.3rem;
      text-align: center; 
      color: #ffffff;
      margin: 0.6rem 0.24rem 0.2rem;
      border-radius: 0.7rem;
      background: #ff654f;
    }
    .withdraw-instructions {
      padding: 0.2rem;
      font-size: 0.23rem;
      color: #999;
      line-height: 0.3rem;
      margin-top: 0.8rem;
      img {
        width: 100%;
        height: 3rem;
      }
    }
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
