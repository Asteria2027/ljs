<template>
  <div class="register">
    <mheader style='z-index:0;background-color:rgba(0,0,0,0);position:relative'>
      <span slot='logo' class="head_logo"></span>
    </mheader>
    <window-tips ref='windowTips'></window-tips>
    <div class="register-input">
      <ul>
        <li :class="{'no_border':checkPhone}">
          <label><i class="iconfont icon-shouji"></i></label>
          <div>
            <input :readonly="checkPhone" type="number" placeholder="请输入手机号码" v-model="phone" autocomplete="off" oninput="if(value.length>11)value=value.slice(0,11);if(!/^-?\d+\.?\d{0,2}$/.test(value))value=value.slice(0,value.length-1)">
          </div>
        </li>
        <!-- <li v-if='checkPhone'>
          <label><i class="iconfont icon-tuxingyanzhengma"></i></label>
          <div>
            <input type="text" placeholder="图形验证码" v-model='imgcode' autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="6">
            <span @click='getImgCode'><img :src="imgCodeSrc"></span>
          </div>
        </li> -->
        <li v-if='checkPhone'>
          <label><i class="iconfont icon-duanxinyanzhengma"></i></label>
          <div>
            <input type="text" placeholder="短信验证码" v-model="SMScon" autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')">
            <span @click="SendSMS2()">{{countdown}}</span>
          </div>
        </li>
        <li v-if='checkPhone'>
          <label><i class="iconfont icon-shezhimima"></i></label>
          <div>
            <input :type="showPwd?'text':'password'" v-model='pwd' placeholder="设置8-16位密码" autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="16">
            <span @click="showPwd=!showPwd">
              <i class="iconfont " :class="{'icon-yan':showPwd,'icon-biyan':!showPwd}"></i>
            </span>
          </div>
        </li>
      <p class="fill-recommender" v-if='checkPhone&&!$route.query.serviceNo' @click='hasRecommender=!hasRecommender'>填写推荐人</p>
      <li v-if='checkPhone&&hasRecommender&&!$route.query.serviceNo'>
          <label><i class="iconfont icon-denglumima"></i></label>
          <div>
            <input type="text"  v-model='recommender' placeholder="请输入推荐人服务号或者手机号(可选)" autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')">
          </div>
        </li>
      </ul>
    </div>
    <div class="register-enter" @click='registerSubmit'>立即领取668元红包</div>
    <p v-if='checkPhone' class="register-agree">
      <i @click='registerAgree=!registerAgree' class="iconfont icon-weixuanzhongyuanquan" :class="{'icon-weixuanzhongyuanquan':!registerAgree,'icon-selected':registerAgree}"></i>
      阅读并同意
      <router-link tag="span" to="Agreement/regitsterAgreement">《联金所平台注册协议》</router-link>
      <router-link tag="span" to="Agreement/IntermediaryServiceAgreement">《居间服务协议》</router-link>
      <router-link tag="span" to="Agreement/riskDisclosure">《网络借贷风险及禁止性行为揭示书》</router-link>
    </p>
    <p class="gologin" v-if='!checkPhone'>已有账户?<router-link to='/login'>立即登录</router-link></p>
  </div>
</template>

<script>

import mheader from '@/components/header/header.vue'
import windowTips from '@/components/common/windowTips/windowTips.vue'
import { regCheckPhone, textCode, checkCode, querytipM, SendSMS2, register, tokenCode } from '@/server/getData.js'
import { encryptByDES } from '@/config/des_encryption.js'
import {setStore,getStore} from '@/config/mUtils'

export default {
  data () {
    return {
      phone:'',
      pwd:'',//密码
      SMScon:'',//短信验证码
      recommender:'',//推荐人
      checkPhone:false, // 校验手机号是否有效
      showPwd:false,
      hasRecommender:false, // 有无推荐人
      registerAgree:false, // 同意注册协议
      imgCodeSrc:'', //图片验证码路径
      imgcode:'', //图片验证码
      countdown:'获取验证码', //倒计时
      getSMScode:false, //节流
      tokencode:'',//凭证
      countTimer:null,
    }
  },
  beforeRouteEnter(to, from, next){
    if(!((from.name== 'regitsterAgreement'&&to.name=='register')||(from.name== 'IntermediaryServiceAgreement'&&to.name=='register')||(from.name== 'riskDisclosure'&&to.name=='register'))){
      next(vm=>{
        vm.phone='';
        vm.pwd='';//密码
        vm.SMScon='';//短信验证码
        vm.recommender='';//推荐人
        vm.checkPhone=false; // 校验手机号是否有效
        vm.showPwd=false;
        vm.hasRecommender=false; // 有无推荐人
        vm.registerAgree=false;// 同意注册协议
        vm.imgCodeSrc=''; //图片验证码路径
        vm.imgcode=''; //图片验证码
        // agreeShowSele:'',//协议展示选择 1 《居间服务协议》 2 《平台注册协议》 3《网络借贷风险及禁止性行为揭示书》
        // querytip:'',//协议
        vm.countdown='获取验证码'; //倒计时
        vm.getSMScode=false; //节流
        clearInterval(vm.countTimer);
        vm.countTimer=null;
        vm._tokenCode();
      });
    }else {
      next();
    }
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
    registerSubmit(){
      if(!this.checkPhone){
          if(this.phone==''){
          this.$refs.windowTips.toast('请输入手机号');
          return
        }
        this.phone = this.phone.replace(/(^\s*)|(\s*$)/g, ""); 
        if(!(/^1(3|4|5|7|8)\d{9}$/.test((String(this.phone))))){
          this.$refs.windowTips.toast('请输入正确的手机号码');
          return;
        }
        let phoneNum = encryptByDES(this.phone);
        //校验手机号
        regCheckPhone(phoneNum).then(res => {
          if(res.data.code==1){
            this.checkPhone = true;
          }else {
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
        //查询注册协议
        querytipM().then(res => {
          if(res.data.code==1){
          this.querytip = res.data.data;
          }else {
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
        let pageId = 'wapUserReg'
        //获取验证码
        this.getImgCode();
      }else {
        if(!this.SMScon){
          this.$refs.windowTips.toast('请填写短信验证码');
          return;
        }
        if(!this.pwd){
          this.$refs.windowTips.toast('请填写密码');
          return;
        }
        if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(this.pwd))){
          this.$refs.windowTips.toast('密码设置不规范，密码应由8位~16位数字与英文字母组成');
          return;
        }
        if(!this.registerAgree){
          this.$refs.windowTips.toast('请同意注册协议');
          return;
        }
        this.SMScon = this.SMScon.replace(/(^\s*)|(\s*$)/g, ""); 
        this.pwd = this.pwd.replace(/(^\s*)|(\s*$)/g, ""); 
        let code, mobile, password, platForm, refferee, send_type;
        register(code=this.SMScon, mobile=encryptByDES(this.phone), password=encryptByDES(this.pwd), platForm=3, refferee=this.$route.query.serviceNo?this.$route.query.serviceNo:this.recommender, send_type='register').then(res => {
          if(res.data.code==1){
            setStore('token',res.data.data.token);
            setStore('userId',res.data.data.userId);
            this.$router.push('/registerSuccess');
          }else {
            this._tokenCode();
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
      
    },
    SendSMS2(){
      // if(!this.imgcode) {
      //   this.$refs.windowTips.toast('图片验证码为空，请输入验证码');
      //   return;
      // }
      if(this.getSMScode){
        return;
      }
      this.getSMScode = true;
      let phone,send_type, pageId, tokenCode;
      SendSMS2(phone=this.phone, send_type='register', tokenCode=this.tokencode).then(res => {
        let second = 60;
        this.countTimer =  setInterval(() => {
          this.countdown--;
          this.countdown = second--+'秒';
           if(this.countdown=='1秒'){
            this.getSMScode = false;
            this.countdown = '获取验证码';
            clearInterval(this.countTimer);
          }
        }, 1000);
        if(res.data.code!=1){
          this.getSMScode = false;
          this.countdown = '立即获取';
          clearInterval(this.countTimer);
          this.$refs.windowTips.toast(res.data.msg);
          this.getImgCode();
        }
      }).catch( (error) => {
        this.getSMScode = false;
        this.countdown = '立即获取';
        clearInterval(this.countTimer);   
        this.getImgCode();
        console.log(error);
      });
    },
    getImgCode(){
      this.imgCodeSrc = `${textCode}?pageId=wapUserReg&d=${(new Date()).getTime().toString()}`;
    },
  },
  components:{
    mheader,
    windowTips
  }
}

</script>
<style lang='less' scoped>

.register {
  position: relative;
  z-index: 1;
  box-sizing:border-box; 
  background:#ed0c3d;
  min-height: 100%;
  max-width: 6.4rem;
  margin: 0 auto;
  background-image: url('./register1_bg.jpg');
  background-repeat: no-repeat;
  background-position:center top;  
  background-size: 6.4rem;
  overflow: hidden;
  .head_logo {
    width: 4.84rem;
    height: 0.59rem;
    background-image: url('./wap_hb_logo.png');
    background-repeat: no-repeat;
    background-size: 2.95rem 0.46rem;
    background-position:left center;
    position: absolute;
    top: 50%;
    left:0.5rem;
  }
  .register-input {
    margin-top: 6rem;
    color: #ffffff;
    padding: 0 5%;
    // background: #fff;
    li.no_border {
      border: 0 none;
    }
    li {
      display: block;
      display: flex;
      margin-bottom: 0.4rem;
      border: 1px solid #fff;
      border-radius: 0.15rem;
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
          background: none;
          color: #ffffff;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
          color: #ffffff;
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #ffffff;
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #ffffff;
        }
        :-ms-input-placeholder { /* Internet Explorer 10+ */
          color: #ffffff;
        }
        span {
          display: block;
          height: 100%;
          width: 2.8rem;
          text-align: center;
          color: #fff;
          position: relative;
          img {
            height: 100%;
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50% ,-50%);
          }
          i {
            font-size: 0.16rem;
            color: #fff;
          }
        }
      }
    }
    .fill-recommender {
      font-size: 0.3rem;
      margin-bottom: 0.4rem;
    }
  }
  .register-enter {
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    font-weight: bold;
    text-align: center;
    color: #ffffff;
    margin: 0.5rem 0.24rem 0.5rem;
    border-radius: 0.15rem;
    background: #ff435b;
  }
  .register-agree {
    padding-left: 0.24rem;
    font-size: 0.18rem;
    line-height: 0.4rem;
    color: #ffffff;
    span {
      color: #f8b9c1;
    }
  }
  p.gologin {
    text-align: center;
    font-size: 0.22rem;
    color: #ffffff;
    a {
      color: #f7f004;
    }
  }
}
.agree-service_wap {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1000;
    position: fixed;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
}
.net-risk,
.platform-registration,
.intermediate-service {
  background: #fff;
  width: 90%;
  border-radius: 0.15rem;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -45%;
  margin-left: -45%;
  font-size: 0.18rem;
  height: 5rem;
  padding-bottom: 1rem;
  // overflow: scroll;
  .service-wrap {
    padding-top: 0.2rem;
    padding: 0.2rem 0.24rem 0;
    height: 5rem;
    overflow: scroll;
  }
  .tc_foot{
    position: absolute;
    width: 100%;
    height: 0.7rem;
    bottom: 0;
    left: 0;
    background: #fff;
    span {
      display: block;
      text-align: center;
      line-height: 0.8rem;
      height: 0.8rem;
      font-size: 0.3rem;
      color: #4a97d2;
    } 
  } 
  // .tc_tit {
  //   text-align: center;
  //   padding: 0.1rem;
  //   border-bottom: 1px dotted #eee;
  //   h2 {
  //     font-size: 0.4rem;
  //     font-weight: normal;
  //   }
  // }
  // .tc_cont {
  //   padding: 0 0.2rem 0.2rem 0.2rem;
  //   max-height: 5rem;
  //   overflow-y: auto;
  //   p {
  //     font-size: 0.23rem;
  //     line-height: 0.4rem;
  //   }
  //   h4 {
  //     font-weight: normal;
  //     font-size:0.3rem;
  //   }
  // }
  
}

</style>