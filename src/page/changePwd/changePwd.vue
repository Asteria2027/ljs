<template>
  <div class="changePwd">
    <mheader headTitle='修改登录密码' :goBack="'true'"></mheader>
    <window-tips ref='windowTips'></window-tips>
    <div class="changePwd-input">
      <ul>
        <li>
          <label><i class="iconfont icon-shouji"></i></label>
          <div  class="borderBottom-1px">
            <input type="text" placeholder="请输入手机号码" v-model='cellPhone' autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="11">
          </div>
        </li>
        <!-- <li>
          <label><i class="iconfont icon-tuxingyanzhengma"></i></label>
          <div  class="borderBottom-1px">
            <input type="text" placeholder="请输入图形验证码" autocomplete="off" v-model="imgCode" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="6">
            <span @click='getImgCode'><img :src="imgCodeSrc" style="display:block;height:auto;width:80%;margin-right:10%;"></span>
          </div>
        </li> -->
        <li>
          <label><i class="iconfont icon-duanxinyanzhengma"></i></label>
          <div  class="borderBottom-1px">
            <input type="text" placeholder="请输入手机验证码" v-model='SMSCode' autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="8">
            <span @click="send_SMS2()">{{countdown}}</span>
          </div>
        </li>
        <li>
          <label><i class="iconfont icon-shezhimima"></i></label>
          <div  class="borderBottom-1px">
            <input :type="showPwd?'text':'password'" placeholder="请输入新登录密码" v-model="pwd" autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="16">
            <span @click="showPwd=!showPwd">
              <i class="iconfont " :class="{'icon-yan':showPwd,'icon-biyan':!showPwd}"></i>
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="changePwd-enter" @click='changePwdSubmit'>提交</div>
  </div>
</template>

<script type="text/ecmascript-6">

import mheader from '@/components/header/header.vue'
import windowTips from '@/components/common/windowTips/windowTips.vue'
import { forgetPassword, textCode, checkCode, SendSMS2, tokenCode } from '@/server/getData.js'
import { encryptByDES } from '@/config/des_encryption.js'

export default {
  data () {
    return {
      showPwd:false ,
      cellPhone:'', //手机号
      imgCode:'', //图片验证码
      SMSCode:'',//手机验证码
      pwd:'',//登录密码
      imgCodeSrc:'', //图片验证码路径
      countdown:'立即获取', //倒计时
      getSMScode:false, //节流
      tokencode:'',
    };
  },
  mounted(){
    this.getImgCode();
    this._tokenCode();
  },
  methods:{
     _tokenCode(){
      tokenCode().then(res => {
          if(res.data.code==1){
            this.tokencode = res.data.data;
          }
      }).catch(function (error) {
          console.log(error);
      });
    },
    getImgCode(){
      this.imgCodeSrc = `${textCode}?pageId=wapForgetPass&d=${(new Date()).getTime().toString()}`;
    },
    send_SMS2(){
      // if(!this.imgCode) {
      //   this.$refs.windowTips.toast('图片验证码为空，请输入验证码');
      //   return;
      // }
      if(this.getSMScode){
        return;
      }
      let phone,send_type, pageId, tokenCode;
      SendSMS2(phone=this.cellPhone, send_type='forget_pwd', tokenCode=this.tokencode).then(res => { 
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
          this._tokenCode();
        }
      }).catch( (error) => {
        this.getImgCode();
        this._tokenCode();
        console.log(error);
      });
    },
    changePwdSubmit(){
      if(this.cellPhone==''){
        this.$refs.windowTips.toast('请输入手机号码');
        return
      }
      this.cellPhone = this.cellPhone.replace(/(^\s*)|(\s*$)/g, ""); 
      if(!(/^1(3|4|5|7|8)\d{9}$/.test((String(this.cellPhone))))){
        this.$refs.windowTips.toast('请输入正确的手机号码');
        return;
      }
      if(!this.SMSCode){
      this.$refs.windowTips.toast('请输入手机验证码');
      return;
      }
      if(!this.pwd){
        this.$refs.windowTips.toast('请输入新的登录密码');
        return;
      }
      this.SMSCode = this.SMSCode.replace(/(^\s*)|(\s*$)/g, ""); 
      this.pwd = this.pwd.replace(/(^\s*)|(\s*$)/g, ""); 
      if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(this.pwd))){
        this.$refs.windowTips.toast('密码设置不规范，密码应由8位~16位数字与英文字母组成');
        return;
      }
      let phoneNum = encryptByDES(this.cellPhone);
       //忘记密码修改
      let cellPhone, password, code, send_type;
      forgetPassword(cellPhone=phoneNum, password=encryptByDES(this.pwd), code=this.SMSCode, send_type='forget_pwd').then(res => {
        if(res.data.code==1){
          this.$refs.windowTips.toast('修改密码成功');
          setTimeout(() => {
            this.$router.push({path:'/login'});
          }, 1500);
          // this.checkPhone = true;
        }else {
          this.$refs.windowTips.toast(res.data.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  components:{
    mheader,
    windowTips
  }
}

</script>
<style lang='less' scoped>
.changePwd {
  min-height: 100%;
  width: 100%;
  box-sizing:border-box; 
  background: #f4f4f4;
  padding-top: 0.8rem;
  .changePwd-input {
    margin-top: 0.24rem;
    background: #fff;
    li {
      display: block;
      display: flex;
      >label {
        display: block;
        width: 0.8rem;
        height: 100%;
        i {
          display: block;
          text-align: center;
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0.4rem;
        }
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
          height: 100%;
          line-height: 0.8rem;
        }
        span {
          display: block;
          height: 100%;
          width: 2.4rem;
          margin-right: 0.2rem;
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
  .changePwd-enter {
    height: 0.76rem;
    line-height: 0.76rem;
    font-size: 0.3rem;
    text-align: center; 
    color: #ffffff;
    margin: 0.5rem 0.24rem 0.3rem;
    border-radius: 0.76rem;
    background: #ff654f;
  }
}
</style>