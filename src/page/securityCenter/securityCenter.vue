<template>
  <div class="securityCenter">
    <mheader headTitle='安全中心'>
      <span slot='back' class="back" @click="back"> <i class="iconfont icon-back"></i></span>
    </mheader>
    <div class="securityCenter-list">
      <div to='idVerified' class="borderBottom-1px" v-if='userInfo&&userInfo.isOpenAcc==1'>
        <span>实名认证</span>
        <router-link tag='span' to='depositAccount' v-if='userInfo&&userInfo.isRealName==0'><span class="red-coring">未认证</span><i class="iconfont icon-more"></i></router-link>
        <router-link tag='span' to='idVerified' v-if='userInfo&&userInfo.isRealName==1'>已认证<i class="iconfont icon-more"></i></router-link>
      </div>
      <router-link tag='div' to='depositAccount' class="borderBottom-1px" v-if='userInfo&&userInfo.isOpenAcc==0'>
        <span>存款开户</span>
        <span v-if='userInfo'><span>未开户</span><i class="iconfont icon-more"></i></span>
      </router-link>
      <router-link to='bankCard' tag='div' class="borderBottom-1px" v-if='userInfo&&userInfo.isOpenAcc==1'>
        <span>银行卡</span>
        <span v-if='userInfo&&userInfo.bindingStatus==1'>已绑定<i class="iconfont icon-more"></i></span>
        <span v-else><span class="red-coring">未绑卡</span><i class="iconfont icon-more"></i></span>
      </router-link>
      <router-link tag='div' to='bindNewPhone' class="borderBottom-1px">
        <span>登录手机号</span>
        <span><span class="red-coring">修改</span><i class="iconfont icon-more"></i></span>
      </router-link>
      <router-link tag='div' to='ModifyBankPhone' class="borderBottom-1px" v-if='userInfo&&userInfo.isOpenAcc==1'>
        <span>银行预留手机号</span>
        <span><span class="red-coring">修改</span><i class="iconfont icon-more"></i></span>
      </router-link>
      <!-- <router-link tag='div' class="borderBottom-1px" to='modifyDealPwd'>
        <span>交易密码</span>
        <span><span class="red-coring">修改</span><i class="iconfont icon-more"></i></span>
      </router-link> -->
      <div class="borderBottom-1px" @click='resetDealPwd' v-if='userInfo&&userInfo.isOpenAcc==1'>
        <span>浙商交易密码</span>
        <span><span class="red-coring">修改</span><i class="iconfont icon-more"></i></span>
      </div>
      <router-link class="borderBottom-1px" tag='div' to='modifyLogin'>
        <span>登录密码</span>
        <span><span class="red-coring">修改</span><i class="iconfont icon-more"></i></span>
      </router-link>
      <div class="borderBottom-1px" @click='goAutomaticBid' v-if='userInfo&&userInfo.isOpenAcc==1&&((userInfo.autoBidSetStatus==1&&userInfo.custRole!=1)||(userInfo.autoBidSetStatus==0))&&userInfo.custRole!=2'>
        <span>业务授权</span>
        <span><span :class="{'swichOff':userInfo.autoBidSetStatus==0,'swichOpen':userInfo.autoBidSetStatus==1}"><i></i></span></span>
      </div>
    </div>
    <windowTips ref='windowTips'></windowTips>
  </div>
</template>

<script>

import mheader from '@/components/header/header.vue'   
import windowTips from '@/components/common/windowTips/windowTips.vue'
import { DepositResetPwd, autoBidSet } from "@/server/getData.js";
import queryZs from '@/config/queryZsResults';
import { setStore,getStore,formSubmit } from '../../config/mUtils';
import { mapState } from 'vuex';

export default {
  mixins:[queryZs],
  data () {
    return {
      goClick:true,//节流
    };
  },
  mounted(){
    this.queryZsResult(this.$route.query.zsCallback);
  },
  methods:{
    back(){
      this.$router.push('account');
    },
    resetDealPwd(){
      if(!this.goClick){
        return;
      }
      this.goClick = false;
      let token, userId,callBackURL;
      DepositResetPwd(token=getStore('token'), userId=getStore('userId'),callBackURL=`wapfront/securityCenter?zsCallback=DepositResetPwd`).then(res => { 
        if(res.data.code==1){
          this.goClick = true;
          setStore('DepositResetPwdOrderNo',res.data.data.orderNo);  
          formSubmit(res.data.data.zsUrl,{reqMsg:res.data.data.reqMsg});   
        }else {
          this.goClick = true;
          this.$refs.windowTips.toast(res.data.msg);
        }
      }).catch((error)=>{
        this.goClick = true;
        console.log(error);
      });
    },
    goAutomaticBid(){
      if(!this.goClick){
          return;
      }
      this.goClick = false;
      if(this.autoBidSetStatus==1){
        this.$router.push('automaticBid');
      }else {
        let token, userId, callBackURL, flag;
        if(this.$store.state.userInfo.autoBidSetStatus==1){
          flag=0;
        }else {
          flag=1;
        }
        autoBidSet(token=getStore('token'), userId=getStore('userId'), callBackURL=`wapfront/account?zsCallback=autoBidSet`, flag).then(res => { 
          if(res.data.code==1){
            this.goClick = true;
            setStore('autoBidSetOrderNo',res.data.data.orderNo);
            formSubmit(res.data.data.zsUrl,{reqMsg:res.data.data.reqMsg});  
          }else {
            this.goClick = true;
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch((error)=>{
          this.goClick = true;
          console.log(error);
        });
      }
    },
  },
  computed: {
    ...mapState([
        'userInfo'
    ]),
  },
   components:{
    mheader,
    windowTips
  }
}

</script>
<style lang='less' scoped>

.securityCenter {
  min-height: 100%;
  width: 100%;
  box-sizing:border-box; 
  background: #f4f4f4;
  padding-top: 0.8rem;
  padding-bottom: 1.97rem;
  .back {
    position: relative;
    display: block;
    height: 0.8rem;
    width: 0.8rem;
    i {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      padding-left: 0.15rem;
    }
  }
}
.securityCenter-list {
  margin-top: 0.2rem;
  background: #ffffff;
  >div {
    display: block;
    display: flex;
    height: 0.38rem;
    line-height: 0.38rem;
    padding: 0.25rem 0;
    >span:nth-child(1){
      display: block;
      padding-left: 0.24rem;
      font-size: 0.24rem;
      color: #222;
    }
    >span:nth-child(2){
      display: block;
      padding-right: 0.24rem;
      flex: 1;
      font-size: 0.22rem;
      color: #999;
      text-align: right;
      >.swichOff {
        position: relative;
        display: block;
        margin: 0 0 0 auto;
        height: 0.38rem;
        width: 0.7rem;
        background: #999;
        border-radius: 0.2rem;
        i {
          position: absolute;
          height: 0.3rem;
          width: 0.3rem;
          border-radius: 50%;
          background: #fff;
          top: 50%;
          left: 2%;
          transform: translateY(-50%);
        }
      }
      >.swichOpen {
        position: relative;
        display: block;
        margin: 0 0 0 auto;
        height: 0.38rem;
        width: 0.7rem;
        background: #8FD1FF;
        border-radius: 0.2rem;
        i {
          position: absolute;
          height: 0.3rem;
          width: 0.3rem;
          border-radius: 50%;
          background: #fff;
          top: 50%;
          right: 2%;
          transform: translateY(-50%);
        }
      }
      >i {
        padding-left: 0.3rem;
        font-size: 0.22rem;
      }
    }
    .red-coring {
      color: #FF5256;

    }
  }
}
</style>