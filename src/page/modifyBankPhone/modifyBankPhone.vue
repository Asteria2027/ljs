<template>
  <div class="modifyBankPhone">
    <mheader headTitle='修改预留手机号' :goBack="'true'" class="borderBottom-1px"></mheader>
    <window-tips ref='windowTips'></window-tips>
    <div class="modifyBankPhone-input">
      <ul>
        <li class="borderBottom-1px">
          <label>银行名称</label>
          <div>
            {{bankName?bankName:'--'}}
          </div>
        </li>
        <li class="borderBottom-1px">
          <label>银行卡号</label>
          <div>
            {{bankNo?bankNo:'--'}}
          </div>
        </li>
        <li class="borderBottom-1px">
          <label>原手机号</label>
          <div>
            {{bankMobile?`${this.bankMobile.substring(0,3)}****${this.bankMobile.substring(8,11)}`:'--'}}
          </div>
        </li>
        <li class="borderBottom-1px newPhone">
          <label>新手机号</label>
          <div>
            <input type="number" v-model='newPhone' placeholder="请输入新手机号" autofocus="autofocus" oninput="if(value.length>15)value=value.slice(0,15);if(!/^-?\d+\.?\d{0,2}$/.test(value))value=value.slice(0,value.length-1)">
          </div>
        </li>
        <!-- <li class="borderBottom-1px">
          <label>手机验证码</label>
          <div>
            <input type="text" placeholder="请输入手机验证码" v-model='SMSCode' autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="8">
            <span @click="getCode()">{{countdown}}</span>
          </div>
        </li> -->
      </ul>
    </div>
    <div class="modifyBankPhone-enter" @click='modifyBankPhoneSubmit' :style="{background:payClick?'#ff654f':'#999'}">下一步</div>
  </div>
</template>

<script>

import mheader from '@/components/header/header.vue'
import windowTips from '@/components/common/windowTips/windowTips.vue'  
import { updateBankMobile, depositAccoutInfo } from '@/server/getData.js'
import { mapState } from 'vuex';
import queryZs from '@/config/queryZsResults';
import { getStore, setStore, formSubmit } from '@/config/mUtils';

export default {
  mixins:[queryZs],
  data () {
    return {
      bankName:'',//银行名称
      bankNo:'',//银行卡号
      bankMobile:'',//银行手机号
      bindSerialNo:'',//绑定协议号
      newPhone:'',//新手机号
      countdown:'获取验证码',
      // SMSCode:'',
      // getSMScode:false //节流
      payClick:true,//跳转节流
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
      let token, userId;
      depositAccoutInfo(token=getStore('token'), userId=getStore('userId')).then(res => { 
        if(res.data.code==1){
          this.bankName=res.data.data.bankName;
          this.bankNo=res.data.data.bankNo;
          this.bankMobile=res.data.data.bankMobile;
          this.bindSerialNo=res.data.data.bindSerialNo;
        }else {
          this.$refs.windowTips.toast(res.data.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // getCode(){
    //   let token, userId, smsType, mobile, otherAccNo, bindSerialNo;
    //   if(!this.newPhone){
    //    this.$refs.windowTips.toast('请输入新手机号');
    //    return;
    //   }
    //   if(!(/^1(3|4|5|7|8)\d{9}$/.test((String(this.newPhone))))){
    //       this.$refs.windowTips.toast('请输入正确的手机号码');
    //       return;
    //   }
    //   if(this.getSMScode){
    //     return;
    //   }
    //   requestSmsCode(token=getStore('token'), userId=getStore('userId'), smsType=9, mobile=this.newPhone, otherAccNo,bindSerialNo=this.bindSerialNo).then(res => { 
    //     this.getSMScode = true;
    //     let second = 60;
    //     let countTimer =  setInterval(() => {
    //       this.countdown = second--+'秒';
    //       if(this.countdown=='1秒'){
    //         this.getSMScode = false;
    //         this.countdown = '获取验证码';
    //         clearInterval(countTimer);
    //       }
    //     }, 1000);
    //     if(res.data.code!=1){
    //       this.getSMScode = false;
    //       this.countdown = '获取验证码';
    //       clearInterval(countTimer);
    //       this.$refs.windowTips.toast(res.data.msg);
    //     }
    //   }).catch(function (error) {
    //     console.log(error);
    //   });
    // },
    modifyBankPhoneSubmit(){
      
      if(!this.newPhone){
       this.$refs.windowTips.toast('请输入新手机号');
       return;
      }
      // if(!this.SMSCode){
      //  this.$refs.windowTips.toast('请输入验证码');
      //  return;
      // }
      if(!(/^1(3|4|5|7|8)\d{9}$/.test((String(this.newPhone))))){
          this.$refs.windowTips.toast('请输入正确的手机号码');
          return;
      }
      if(!this.payClick){
          return;
      }
      this.payClick = false;
      let token, userId, oriMobile, newMobile, platForm, callBackURL;
      updateBankMobile(token=getStore('token'), userId=getStore('userId'), oriMobile=this.bankMobile, newMobile=this.newPhone, platForm='3',callBackURL=`wapfront/securityCenter?zsCallback=modifyBankPhone`).then(res => { 
        if(res.data.code==1){
          this.payClick = true;
          setStore('modifyBankPhoneOrderNo',res.data.data.orderNo);
          formSubmit(res.data.data.zsUrl,{reqMsg:res.data.data.reqMsg});
        }else {
          this.payClick = true;
          this.$refs.windowTips.toast(res.data.msg);
        }
      }).catch( (error)=>{
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
.modifyBankPhone {
  min-height: 100%;
  width: 100%;
  box-sizing:border-box; 
  background: #f4f4f4;
  padding-top: 0.8rem;
  .modifyBankPhone-input {
    margin-top: 0.24rem;
    background: #fff;
    li {
      display: block;
      display: flex;
      padding: 0.2rem 0;
      height: 0.4rem;
      line-height: 0.4rem;
      >label {
        display: block;
        height: 100%;
        font-size: 0.2rem;
        padding:0 0.2rem;
        width: 1.4rem;
      }
      >div {
        display: block;
        width: 100%;
        display: flex;
        font-size: 0.24rem;
        >input {
          display: block;
          width: 100%;
          height: 0.4rem;
          line-height: 0.4rem;
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
    .newPhone {
      >div>input {
        display: block;
        flex: 1;
        padding-right: 0.3rem;
        text-align: right;
      }
    }
  }
  .modifyBankPhone-enter {
    height: 0.76rem;
    line-height: 0.76rem;
    font-size: 0.3rem;
    text-align: center; 
    color: #ffffff;
    margin: 0.3rem 0.24rem 0.2rem;
    border-radius: 0.76rem;
    background: #ff654f;
  }
}
</style>