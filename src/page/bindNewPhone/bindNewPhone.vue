<template>
  <div class="bindNewPhone">
    <mheader headTitle='绑定新手机' :goBack="'true'" class="borderBottom-1px"></mheader>
    <window-tips ref='windowTips'></window-tips>
    <div class="bindNewPhone-input">
      <ul>
        <li>
          <label>我的手机号码</label>
          <div  class="borderBottom-1px">
            {{$route.query.newPhone?decodeURIComponent($route.query.newPhone):(userInfo&&userInfo.cellphone?userInfo.cellphone:'--')}}
          </div>
        </li>
        <li>
          <label>图形验证码</label>
          <div  class="borderBottom-1px">
            <input type="text" placeholder="请输入图形验证码" autocomplete="off" v-model="imgCode" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="6">
            <span @click='getImgCode'><img :src="imgCodeSrc" style="display:block;height:auto;width:80%;margin-right:10%;"></span>
          </div>
        </li>
        <li>
          <label>手机验证码</label>
          <div  class="borderBottom-1px">
            <input @keyup.13="bindNewPhonecheck" type="text" placeholder="请输入手机验证码" v-model='SMSCode' autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="8">
            <span @click="getCode()">{{countdown}}</span>
          </div>
        </li>
      </ul>
    </div>
    <p class="hint1">验证码10分钟内有效</p>    
    <div class="bindNewPhone-enter" @click='bindNewPhonecheck' v-if='!$route.query.newPhone'>下一步</div>
    <div class="bindNewPhone-enter" @click='NewPhoneSubmit' v-else>确定</div>
    <p class="hint2">绑定手机后，您的登录手机账号将会变成新绑定的手机号</p>
  </div>
</template>

<script>

import mheader from '@/components/header/header.vue'
import windowTips from '@/components/common/windowTips/windowTips.vue'  
import { SendSMS, updateCellphoneFirst, updateCellphoneSecond, textCode } from '@/server/getData.js'
import { mapState } from 'vuex';
import { getStore } from '@/config/mUtils';

export default {
  data () {
    return {
      phone:'',
      countdown:'获取验证码',
      SMSCode:'',
      getSMScode:false, //节流
      imgCode:'',
      imgCodeSrc:'',
    };
  },
  mounted(){
    this.getImgCode();
  },
  computed: {
    ...mapState([
        'userInfo'
    ]),
  },
  methods:{
    getImgCode(){
       if(this.$route.query.newPhone){
        this.imgCodeSrc = `${textCode}?pageId=wapModifyPhone2&d=${(new Date()).getTime().toString()}`;
      }else {
        this.imgCodeSrc = `${textCode}?pageId=wapModifyPhone1&d=${(new Date()).getTime().toString()}`;
      }
      
    },
    bindNewPhonecheck(){
      if(!this.SMSCode){
        this.$refs.windowTips.toast('联金所: 请输入验证码');
        return;
      }
      let token, userId, cellphone, send_type, checkCode;
      updateCellphoneFirst(token=getStore('token'), userId=getStore('userId'), cellphone, send_type='modify_phone1', checkCode=this.SMSCode).then(res => { 
        if(res.data.code==1){
          this.$router.push('bindNewPhoneSecond');
        }else {
          this.$refs.windowTips.toast(res.data.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    getCode(){
      if(!this.imgCode) {
        this.$refs.windowTips.toast('图片验证码为空，请输入验证码');
        return;
      }
      if(this.getSMScode){
        return;
      }
      let token, userId, phone, send_type, pageId, imgCode;
      if(this.$route.query.newPhone){
        send_type = 'modify_phone2';
        pageId = 'wapModifyPhone2';
        phone = decodeURIComponent(this.$route.query.newPhone);
      }else {
        send_type = 'modify_phone1';
        pageId = 'wapModifyPhone1';
      }
      SendSMS(token=getStore('token'), userId=getStore('userId'), phone, send_type, pageId, imgCode=this.imgCode).then(res => { 
        this.getSMScode = true;
          let second = 60;
          let countTimer =  setInterval(() => {
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
          this.getImgCode();
        }
      }).catch( (error)=>{
        this.getImgCode();
      });
    },
    NewPhoneSubmit(){
      if(!this.$route.query.newPhone){
        this.$refs.windowTips.toast('请输入新手机号');
        return;
      }
      let token, userId, cellphone, send_type, checkCode;
      updateCellphoneSecond(token=getStore('token'), userId=getStore('userId'), cellphone=decodeURIComponent(this.$route.query.newPhone), send_type='modify_phone2', checkCode=this.SMSCode).then(res => { 
        if(res.data.code==1){
         this.$store.state.userInfo.cellphone = `${decodeURIComponent(this.$route.query.newPhone).substring(0,3)}****${decodeURIComponent(this.$route.query.newPhone).substring(7,11)}`;
          this.$refs.windowTips.toast('成功绑定手机');
          setTimeout(() => {
           this.$router.push('securityCenter');
          }, 1500);
        }else {
          this.$refs.windowTips.toast(res.data.msg);
        }
      }).catch(function (error) {
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
.bindNewPhone {
  min-height: 100%;
  width: 100%;
  box-sizing:border-box; 
  background: #f4f4f4;
  padding-top: 0.8rem;
  .bindNewPhone-input {
    margin-top: 0.24rem;
    background: #fff;
    li {
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
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.24rem;
        input {
          display: block;
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
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
  }
  .bindNewPhone-enter {
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