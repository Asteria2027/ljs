<template>
  <div class="modifyLogin">
    <mheader headTitle='修改登录密码' :goBack="'true'" class="borderBottom-1px"></mheader>
    <window-tips ref='windowTips'></window-tips>
    <div class="modifyLogin-input">
      <ul>
        <li>
          <label>我的手机号码</label>
          <div  class="borderBottom-1px">
            {{userInfo&&userInfo.cellphone?userInfo.cellphone:'--'}}<span style='color:#999'>(验证码10分钟内有效)</span>
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
            <input type="text" placeholder="请输入手机验证码" v-model='SMSCode' autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="8">
            <span @click="getCode()">{{countdown}}</span>
          </div>
        </li>
        <li>
          <label>新登录密码</label>
          <div  class="borderBottom-1px">
            <input @keyup.13="newLoginPwdSubmit" :type="showNewDealPwd?'text':'password'" placeholder="请输入新登录密码" v-model='newLoginPwd' autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="16">
            <span @click="showNewDealPwd=!showNewDealPwd" class="iconfont" :class="{'icon-yan':showNewDealPwd,'icon-biyan':!showNewDealPwd}" style='fontSize:0.15rem;'></span>
          </div>
        </li>
      </ul>
    </div>
    <div class="modifyLogin-enter" @click='newLoginPwdSubmit'>确定</div>
  </div>
</template>

<script>

import mheader from '@/components/header/header.vue'
import windowTips from '@/components/common/windowTips/windowTips.vue'  
import { SendSMS, setNewPasswordByPhone, textCode } from '@/server/getData.js'
import { encryptByDES } from '@/config/des_encryption.js'
import { mapState } from 'vuex';
import { getStore } from '@/config/mUtils';

export default {
  data () {
    return {
      newLoginPwd:'',//登录密码
      showNewDealPwd:false,
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
      this.imgCodeSrc = `${textCode}?pageId=wapModifyLoginPwd&d=${(new Date()).getTime().toString()}`;
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
      SendSMS(token=getStore('token'), userId=getStore('userId'), phone, send_type='modify_login_pwd', pageId='wapModifyLoginPwd', imgCode=this.imgCode).then(res => { 
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
            this.getImgCode();
          }
      }).catch((error)=>{
        console.log(error);
        this.getImgCode();
      });
    },
    newLoginPwdSubmit(){
      if(!this.SMSCode){
        this.$refs.windowTips.toast('请输入手机验证码');
        return;
      }
      if(!this.newLoginPwd){
        this.$refs.windowTips.toast('请输入新的登录密码');
        return;
      }
      let token, userId, cellphone, send_type, checkCode,newPassword;
      setNewPasswordByPhone(token=getStore('token'), userId=getStore('userId'), cellphone, send_type='modify_login_pwd', checkCode=this.SMSCode, newPassword=encryptByDES(this.newLoginPwd)).then(res => { 
        if(res.data.code==1){
          this.$refs.windowTips.toast('登录密码设置成功');
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
.modifyLogin {
  min-height: 100%;
  width: 100%;
  box-sizing:border-box; 
  background: #f4f4f4;
  padding-top: 0.8rem;
  .modifyLogin-input {
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
        font-size: 0.24rem;
        height: 0.8rem;
        line-height: 0.8rem;
        input {
          display: block;
          width: 100%;
          height: 100%;
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
  .modifyLogin-enter {
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