<template>
  <div class="depositAccount">
    <mheader headTitle='存管账户' :goBack="'true'" class="borderBottom-1px"></mheader>
    <div class="depositAccount-logo">
      <img src="./czbank_LOGO.png" alt="">
    </div>
    <div class="person-info">
      <ul>
        <li class="borderBottom-1px">
          <div>真实姓名</div>
          <div v-if="userInfo&&userInfo.isRealName==1">{{userInfo.realName?userInfo.realName:'--'}}</div>
          <div v-else><input type="text" placeholder="请输入姓名" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" v-model='depositName' autocomplete="off" maxlength="15"></div>
        </li>  
        <li class="borderBottom-1px">
          <div>身份证号码</div>
          <div v-if="userInfo&&userInfo.isRealName==1">{{userInfo.idNo?userInfo.idNo:'--'}}</div>
          <div v-else><input type="text" placeholder="请输入身份证" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" v-model='IDcard' autocomplete="off" maxlength="20"></div>
        </li>    
      </ul>
      <ul>
      </ul>
      <ul>
        <li class="account-bank borderBottom-1px">
          <div>银行卡预留手机号</div>
          <div><input type="number" placeholder="请输入手机号"  v-model='reservedPhone' autofocus="autofocus" oninput="if(value.length>15)value=value.slice(0,11);if(!/^-?\d+\.?\d{0,2}$/.test(value))value=value.slice(0,value.length-1)"></div>
        </li>
      </ul>
      <div class="comfirm" @click="openUpdateAccno" :style="{background:payClick?'#ff654f':'#999'}">下一步</div>
      <p class="agree">
        <i @click="agree=!agree" class="iconfont" :class="{'icon-selected':agree,'icon-weixuanzhongyuanquan':!agree}"></i>
        我已阅读并同意
        <router-link to="Agreement/ZSBentrust" style="color:#000;">《浙商银行委托扣款业务服务协议》</router-link>
        和
        <router-link to="Agreement/ZSBdeposit" style="color:#000;">《浙商银行网络借贷交易资金存管业务三方协议》</router-link>
      </p>
    </div>
    <window-tips ref='windowTips'></window-tips>
  </div>
</template>

<script>

import mheader from '@/components/header/header.vue'   
import windowTips from '@/components/common/windowTips/windowTips.vue'
import { mapState } from 'vuex';
import Swiper from 'swiper'
import '@/style/swiper.min.css'
import { depositAccoutInfo, getBankList,  provinceList, cityList, pubBankList, requestSmsCode,openDepositAcco } from "@/server/getData.js";
import queryZs from '@/config/queryZsResults';
import { getStore,setStore ,formSubmit } from '@/config/mUtils';

export default {
  mixins:[queryZs],
  data () {
    return {
      depositName:'',
      IDcard:'',
      reservedPhone:'',//预留手机号
      agree:false,//协议
      payClick:true,//开通节流
    };
  },
  beforeRouteEnter(to, from, next){
    if(!((from.name== 'ZSBdeposit'&&to.name=='depositAccount')||(from.name== 'ZSBentrust'&&to.name=='depositAccount'))){
      next(vm=>{
        vm.depositName='';
        vm.IDcard='';
        vm.reservedPhone='';//预留手机号
        vm.agree=false;//协议
        vm.payClick=true;//开通节流
        setTimeout(() => {
          if(vm.$store.state.userInfo&&vm.$store.state.userInfo.isRealName==1){
            vm.reservedPhone = vm.$store.state.userInfo.cellphone
            return;
          }
        }, 1000);
        vm.queryZsResult(vm.$route.query.zsCallback);
      });
    }else {
      next();
    }
  }, 
  computed: {
    ...mapState([
        'userInfo'
    ]),
  },
  methods:{
    openUpdateAccno(){
      if(!this.agree){
        this.$refs.windowTips.toast('请勾选协议');
        return;
      }     
      if(!this.payClick){
          return;
      }
      this.payClick = false;
      let token, userId, accountName, idNo, mobile, callBackURL, platForm;
      openDepositAcco(
        token=getStore('token'), 
        userId=getStore('userId'),
        accountName=this.$store.state.userInfo.isRealName!=1?this.depositName:this.$store.state.userInfo.realName, idNo=this.$store.state.userInfo.isRealName!=1?this.IDcard:this.$store.state.userInfo.idNo, 
        mobile=this.reservedPhone,
        callBackURL=`wapfront/account?zsCallback=depositAccount`,
        platForm=3
      ).then(res => { 
        if(res.data.code==1){
          this.$store.state.userInfo.isOpenAcc=1;
          this.payClick = true;
          setStore('depositAccountOrderNo',res.data.data.orderNo);
          formSubmit(res.data.data.zsUrl,{reqMsg:res.data.data.reqMsg})
        }else {
          this.payClick = true;
          this.$refs.windowTips.toast(res.data.msg);
        }
      }).catch((error)=> {
        this.payClick = true;
        console.log(error);
      });
    },
  },
  components:{
    mheader,
    windowTips
  }
}

</script>

<style lang='less' scoped>
.over {
  height: 100%;
  overflow: hidden;
}
.depositAccount {
  box-sizing: border-box;
  background: #f4f4f4;
  padding-top: 0.8rem;
  min-height: 100%;   
  width: 100%;
  .depositAccount-logo {
    height: 0.5rem;
    text-align: center;
    background: #fff;
    padding: 0.25rem 0;
    margin-bottom: 0.2rem;
    img {
      display: block;
      height: 100%;
      margin: 0 auto;
    }
  }
  .person-info {
    ul {
      font-size: 0.26rem;
    }
    ul>li {
      display: block;
      display: flex;
      height: 0.88rem;
      line-height: 0.88rem;
      background: #fff;
      >div:nth-child(1) {
        color: #222;
        padding-left: 0.24rem;
      }
      >div:nth-child(2) {
        display: block;
        flex: 1;
        padding-right: 0.24rem;
        text-align: right;
        input {
          display: block;
          height: 0.88rem;
          line-height: 0.88rem;
          width: 100%;
          text-align: right;
        }
      }
    }
    .account-bank {
      >div:nth-child(2) {
        display: block;
        flex: 1;
        color: #cdcdcd;
        padding-right: 0.24rem;
        span {
          display: block;
          height: 0.88rem;
          width: 100%;
          text-align: right;
          color: #756f6e;
          i {
            height: 0.88rem;
            color: #756f6e;
          }
        }
      }
    }
    .Account-opening-address {
      display: block;
      display: flex;
      height: 0.88rem;
      line-height: 0.88rem;
      font-size: 0.26rem;
      div {
        display: block;
        flex: 1;
      }
      div:nth-child(1){
        padding-left: 0.24rem;
      }
      div:nth-child(2){
        padding-right: 0.24rem;
        text-align: right;
      }
    }
    li.SMS-verification-code {
      >div:nth-child(2) {
        display: block;
        display: flex;
        color: #cdcdcd;
        padding-right: 0.24rem;
        input {
          flex: 1;
          height: 0.88rem;
          line-height: 0.88rem;
          text-align: left;
          padding-left: 0.42rem;
        }
        span {
          display: block;
          width: 1.5rem;
          text-align: center;
          height: 0.6rem;
          line-height: 0.6rem;
          margin-top: 0.13rem;
          color: #F05141;
          border-radius: 0.2rem 0.2rem;
        }
      }
    }
    .comfirm {
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.3rem;
      text-align: center;
      color: #ffffff;
      margin: 0.4rem 0.24rem 0.15rem;
      border-radius: 0.7rem;
      background: #ff654f;
    }
  }
  .bank-select-list {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 5rem;
    background: #fff;
    width: 100%;
    z-index: 1002;
    .bank-select-list-title {
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.2rem;
      display: block;
      display: flex;
      padding: 0 0.23rem;
      background: #f5f5f5;
      >div {
        display: block;
        flex: 1;
      }
      >div:nth-child(2) {
        text-align: center;
      }
      >div:nth-child(3) {
        text-align: right;
      }
    }
    .bank-select-list-content {
      background: #fff;
      height: 2.3rem;
      width: 100%;
      font-size: 0.2rem;
      .bank-swiper-container {
        height: 2.3rem;
        overflow: hidden;
      }
      .swiper-slide {
        text-align: center;
        background: #fff;
        color:gray;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }
      .swiper-slide-active{
        color:black;
        font-size: 0.25rem;
      }
      .swiper-slide-prev{
        font-size: 0.25rem;
      }
      .swiper-slide-next{
        font-size: 0.25rem;
      }
      .active_line {
        position: absolute;
        width: 90%;
        left: 5%;
        top: 30%;
        margin-top: 0.08rem;
        height: 0.5rem;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        z-index: 9;
      }
    }
  }
  .province-select-list {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 5rem;
    background: #fff;
    width: 100%;
    z-index: 1002;
    .province-select-list-title {
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.2rem;
      display: block;
      display: flex;
      padding: 0 0.23rem;
      background: #f5f5f5;
      >div {
        display: block;
        flex: 1;
      }
      >div:nth-child(2) {
        text-align: center;
      }
      >div:nth-child(3) {
        text-align: right;
      }
    }
    .province-select-list-content {
      background: #fff;
      height: 2.3rem;
      width: 100%;
      font-size: 0.2rem;
      .province-swiper-container {
        height: 2.3rem;
        overflow: hidden;
      }
      .swiper-slide {
        text-align: center;
        background: #fff;
        color:gray;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }
      .swiper-slide-active{
        color:black;
        font-size: 0.25rem;
      }
      .swiper-slide-prev{
        font-size: 0.25rem;
      }
      .swiper-slide-next{
        font-size: 0.25rem;
      }
      .active_line {
        position: absolute;
        width: 90%;
        left: 5%;
        top: 30%;
        margin-top: 0.08rem;
        height: 0.5rem;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        z-index: 9;
      }
    }
  }
  .cityList-select-list {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 5rem;
    background: #fff;
    width: 100%;
    z-index: 1002;
    .cityList-select-list-title {
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.2rem;
      display: block;
      display: flex;
      padding: 0 0.23rem;
      background: #f5f5f5;
      >div {
        display: block;
        flex: 1;
      }
      >div:nth-child(2) {
        text-align: center;
      }
      >div:nth-child(3) {
        text-align: right;
      }
    }
    .cityList-select-list-content {
      background: #fff;
      height: 2.3rem;
      width: 100%;
      font-size: 0.2rem;
      .cityList-swiper-container {
        height: 2.3rem;
        overflow: hidden;
      }
      .swiper-slide {
        text-align: center;
        background: #fff;
        color:gray;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }
      .swiper-slide-active{
        color:black;
        font-size: 0.25rem;
      }
      .swiper-slide-prev{
        font-size: 0.25rem;
      }
      .swiper-slide-next{
        font-size: 0.25rem;
      }
      .active_line {
        position: absolute;
        width: 90%;
        left: 5%;
        top: 30%;
        margin-top: 0.08rem;
        height: 0.5rem;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        z-index: 9;
      }
    }
  }
  .pubBankList-select-list {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 5rem;
    background: #fff;
    width: 100%;
    z-index: 1002;
    .pubBankList-select-list-title {
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.2rem;
      display: block;
      display: flex;
      padding: 0 0.23rem;
      background: #f5f5f5;
      >div {
        display: block;
        flex: 1;
      }
      >div:nth-child(2) {
        text-align: center;
      }
      >div:nth-child(3) {
        text-align: right;
      }
    }
    .pubBankList-select-list-content {
      background: #fff;
      height: 2.3rem;
      width: 100%;
      font-size: 0.2rem;
      .pubBankList-swiper-container {
        height: 2.3rem;
        overflow: hidden;
      }
      .swiper-slide {
        text-align: center;
        background: #fff;
        color:gray;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }
      .swiper-slide-active{
        color:black;
        font-size: 0.25rem;
      }
      .swiper-slide-prev{
        font-size: 0.25rem;
      }
      .swiper-slide-next{
        font-size: 0.25rem;
      }
      .active_line {
        position: absolute;
        width: 90%;
        left: 5%;
        top: 30%;
        margin-top: 0.08rem;
        height: 0.5rem;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        z-index: 9;
      }
    }
  }
  p.agree {
    padding: 0.1rem 0.23rem 0.1rem;
    font-size: 0.16rem;
    padding-left: 0.24rem;
    line-height: 0.3rem;;
    i {
      font-size: 0.24rem;
      padding-right: 0.15rem;
      color: #ff654f;
    }
    a {
      color: #ff654f !important;
    }
  }
}
.screen_cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}
</style>