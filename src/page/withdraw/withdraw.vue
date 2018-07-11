<template>
  <div class="withdraw">
    <mheader headTitle='提现' :goBack="'true'" class="borderBottom-1px"></mheader>
    <window-tips ref='windowTips'></window-tips>
    <div class="withdraw-input">
      <ul>
        <li>
          <div>提现金额</div>
          <div>{{$route.query.withdrawMoney}}元</div>
        </li>
        <li>
          <div>银行卡号</div>
          <div>{{decodeURIComponent($route.query.bankNo)}}</div>
        </li>
        <li>
          <label>手机验证码</label>
          <div class="borderBottom-1px">
            <input type="text" placeholder="请输入手机验证码" v-model='SMSCode' autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="8">
            <span @click="getCode()">{{countdown}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="withdraw-enter" @click='_withdrawRequest' :style="{background:payClick?'#ff654f':'#999'}">确定</div>
  </div>
</template>

<script>

import mheader from '@/components/header/header.vue'
import windowTips from '@/components/common/windowTips/windowTips.vue'  
import { requestSmsCodeJson, withdrawRequest } from '@/server/getData.js'
import { encryptByDES } from '@/config/des_encryption.js'
import { mapState } from 'vuex';
import { getStore } from '@/config/mUtils';

export default {
  data () {
    return {
      phone:'',
      countdown:'获取验证码',
      SMSCode:'',
      getSMScode:false, //节流
      payClick:true,//支付节流
    };
  },
  mounted(){
    setTimeout(() => {
      if(!this.$store.state.userInfo){
        this.$router.push('login');
        return;
      }
    }, 2000);
  },
  computed: {
    ...mapState([
        'userInfo'
    ]),
  },
  methods:{
    getCode(){
      if(!this.$route.query.withdrawMoney){
        this.$router.go(-1);
      }
      if(this.getSMScode){
        return;
      }
      let token, userId, amount, smsType;
      requestSmsCodeJson(token=getStore('token'), userId=getStore('userId'), amount=this.$route.query.withdrawMoney, smsType=5).then(res => { 
          this.getSMScode = true;
          let second = 60;
          let countTimer =  setInterval(() => {
            this.countdown--;
            this.countdown = second--+'秒';
            if(this.countdown=='1秒'){
              this.getSMScode = false;
              this.countdown = '立即获取';
              clearInterval(countTimer);
            }
          }, 1000);
          if(res.data.code!=1){
            this.getSMScode = false;
            this.countdown = '立即获取';
            clearInterval(countTimer);
            this.$refs.windowTips.toast(res.data.msg);
          }
      }).catch((error)=>{
        console.log(error);
      });
    },
    _withdrawRequest(){
      if(!this.SMSCode){
        this.$refs.windowTips.toast('请输入手机验证码');
        return;
      }
      if(!this.payClick){
        return;
      }
      this.payClick = false;
      let token, userId, amount, mobileCode;
      withdrawRequest(token=getStore('token'), userId=getStore('userId'), amount=this.$route.query.withdrawMoney, mobileCode=this.SMSCode).then(res => { 
        if(res.data.code==1){
          this.payClick = true;
          this.$refs.windowTips.toast('提现成功');
          setTimeout(() => {
           this.$router.push('account');
          }, 1500);
        }else {
          this.payClick = true;
          this.$refs.windowTips.toast(res.data.msg);
        }
      }).catch((error)=>{
        this.payClick = true;
        console.log(error);
      });
    }
  },
  components: {
    mheader,
    windowTips
  }
}

</script>
<style lang='less' scoped>
.withdraw {
  min-height: 100%;
  width: 100%;
  box-sizing:border-box; 
  background: #f4f4f4;
  padding-top: 0.8rem;
  .withdraw-input {
    margin-top: 0.24rem;
    background: #fff;
    li:nth-child(3) {
      display: block;
      display: flex;
      height: 0.8rem;
      line-height: 0.8rem;
      >label {
        display: block;
        height: 100%;
        font-size: 0.2rem;
        padding:0 0.2rem;
        width: 2rem;
      }
      >div {
        display: block;
        width: 100%;
        display: flex;
        font-size: 0.24rem;
        input {
          display: block;
          width: 100%;
          height: 100%;
          line-height: 0.8rem;
          text-align: right;
        }
        span {
          display: block;
          height: 100%;
          width: 2.8rem;
          text-align: center;
          color: #ff654f;
          position: relative;
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50% ,-50%);
          }
          i {
            font-size: 0.16rem;
            color: #666;
          }
        }
      }
    }
    li:nth-child(1),
    li:nth-child(2), {
      display: block;
      display: flex;
      height: 0.8rem;
      padding: 0 0.23rem;
      line-height: 0.8rem;
      font-size: 0.2rem;
      >div:nth-child(1) {
        display: block;
        flex: 1;
      }
    }
  }
  .withdraw-enter {
    height: 0.76rem;
    line-height: 0.76rem;
    font-size: 0.3rem;
    text-align: center; 
    color: #ffffff;
    margin: 0.3rem 0.24rem 0.2rem;
    border-radius: 0.76rem;
    background: #ff654f;
  }
  p.hint1 {
    color: #999;
    font-size: 0.18rem;
    text-align: right;
    margin-top: 0.2rem;
    padding-right: 0.23rem;
  }
  p.hint2 {
    color: #999;
    font-size: 0.18rem;
    text-align: center;
  }
}
</style>