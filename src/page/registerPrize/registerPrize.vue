<template>
  <div class="registerPrize" :class="{'over':(useRuleShow||showRegister)?true:false}">
    <div>
      <img src="./xs_banner.png" alt="">
    </div>
    <div class="platform-advantage">
      <img src="./xs_ptys_title.png" alt="">
      <img src="./xs_ptys.png" alt="">
    </div>
    <div class="novice-red-envelope">
      <img src="./xs_newpacket_title.png" alt="">
      <p>新人注册即可获得668元投标红包</p>
      <img src="./xs_newWelfare_con.png" alt="" @click="showRegister=true;getImgCode();">
      <p @click="useRuleShow=true">使用规则></p>
      <img class="use_rule" src="./xs_newPacket_rule.png" alt="" @click="useRuleShow=!useRuleShow" v-if="useRuleShow">
    </div>
    <div class="newbie-exclusive">
      <img src="./xs_xsWelfare_title.png" alt=""> 
      <p>新用户注册30天内，不限投标次数，累计限额{{this.novice_limit}}</p>
      <img src="./xs_welfare.png" alt="">
      <img src="./LJ_assistant.png" alt="">
      <p>深圳前海联金所金融信息服务有限公司 版权所有</p>
      <p>粤ICP备14046625号</p>
      <p>总部：深圳市福田区天安数码城创新科技广场一期B座1011</p>
    </div>
    <div class="register" v-if="showRegister">
      <div class="title">
        <img src="./zl_login_bg2.png" alt="">
        <img class="close" src="./zl_chacha.png" alt="" @click="showRegister=false">
      </div>
      <div class="register-input">
        <ul>
          <li>
            <label><i class="iconfont icon-shouji"></i></label>
            <div>
              <input type="number" placeholder="请输入手机号码" v-model="phone" autocomplete="off" oninput="if(value.length>11)value=value.slice(0,11);if(!/^-?\d+\.?\d{0,2}$/.test(value))value=value.slice(0,value.length-1)">
            </div>
          </li>
          <!-- <li>
            <label><i class="iconfont icon-tuxingyanzhengma"></i></label>
            <div>
              <input type="text" placeholder="图形验证码" v-model='imgcode' autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="6">
              <span @click='getImgCode'><img :src="imgCodeSrc"></span>
            </div>
          </li> -->
          <li>
            <label><i class="iconfont icon-duanxinyanzhengma"></i></label>
            <div>
              <input type="text" placeholder="短信验证码" v-model="SMScon" autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')">
              <span @click="send_SMS2" style="color:#ff684e;">{{countdown}}</span>
            </div>
          </li>
          <li>
            <label><i class="iconfont icon-shezhimima"></i></label>
            <div>
              <input :type="showPwd?'text':'password'" v-model='pwd' placeholder="设置8-16位密码" autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="16">
              <span @click="showPwd=!showPwd">
                <i class="iconfont " :class="{'icon-yan':showPwd,'icon-biyan':!showPwd}"></i>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="register-submit-wrap">
        <p class="register-agree">
          <i @click='registerAgree=!registerAgree' class="iconfont icon-weixuanzhongyuanquan" :class="{'icon-weixuanzhongyuanquan':!registerAgree,'icon-selected':registerAgree}"></i>
          阅读并同意
          <router-link tag="span" to="Agreement/regitsterAgreement">《联金所平台注册协议》</router-link>
          <router-link tag="span" to="Agreement/IntermediaryServiceAgreement">《居间服务协议》</router-link>
          <router-link tag="span" to="Agreement/riskDisclosure">《网络借贷风险及禁止性行为揭示书》</router-link>
        </p>
        <div class="register-enter" @click='registerSubmit'>立即领取668元红包</div>
        <p class="gologin">已有账户?<router-link to='/login'>立即登录</router-link></p>
      </div>
    </div>
    <div class="screen_cover" @touchmove.prevent v-if="useRuleShow||showRegister"></div>
    <div class="down" v-if="downShow">
      <span>联金所，<i>60多万</i>用户的明智选择</span>
      <span>
        <i></i>
        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.usky.ljspro">手机端下载</a>
        <i class="iconfont icon-guanbi" @click="downShow=false"></i>
      </span>
    </div>
    <window-tips ref='windowTips'></window-tips>
  </div>
</template>

<script>

  import windowTips from '@/components/common/windowTips/windowTips.vue'
  import { regCheckPhone, textCode, checkCode, SendSMS2, register, tokenCode } from '@/server/getData.js'
  import { encryptByDES } from '@/config/des_encryption.js'
  import {setStore} from '@/config/mUtils'

  export default {
    data () {
      return {
        downShow:true,//展示下载app悬浮窗
        useRuleShow:false,//使用规则窗口
        showRegister:false,//注册窗口
        phone:'',
        pwd:'',//密码
        SMScon:'',//短信验证码
        showPwd:false,
        imgcode:'', //图片验证码
        imgCodeSrc:'', //图片验证码路径
        countdown:'获取验证码', //倒计时
        registerAgree:false, // 同意注册协议
        getSMScode:false, //节流
        tokencode:'',
        countTimer:null
      }
    },
    mounted(){
      this._tokenCode();
    },
    beforeRouteEnter(to, from, next){
      if(!((from.name== 'regitsterAgreement'&&to.name=='registerPrize')||(from.name== 'IntermediaryServiceAgreement'&&to.name=='registerPrize')||(from.name== 'riskDisclosure'&&to.name=='registerPrize'))){
        next(vm=>{
          vm.downShow=true;//展示下载app悬浮窗
          vm.useRuleShow=false;//使用规则窗口
          vm.showRegister=false;//注册窗口
          vm.phone='';
          vm.pwd='';//密码
          vm.SMScon='';//短信验证码
          vm.showPwd=false;
          vm.imgcode=''; //图片验证码
          vm.imgCodeSrc=''; //图片验证码路径
          vm.countdown='获取验证码'; //倒计时
          vm.registerAgree=false; // 同意注册协议
          vm.getSMScode=false; //节流   
          vm._tokenCode(); //节流   
          clearInterval(vm.countTimer);
          vm.countTimer = null;
        });
      }else {
        next();
      }
    },
    methods:{
      getImgCode(){
        this.imgCodeSrc = `${textCode}?pageId=wapUserReg&d=${(new Date()).getTime().toString()}`;
      },
      _tokenCode(){
        tokenCode().then(res => {
            if(res.data.code==1){
              this.tokencode = res.data.data;
            }
        }).catch(function (error) {
            console.log(error);
        });
      },
      checkImgCode(getCountdown){
        let pageId = 'wapUserReg';
        let textCode = this.imgcode;
        if(!textCode) {
          this.$refs.windowTips.toast('图片验证码为空，请输入验证码');
          return;
        }
        // //校验图片验证码
        // checkCode(pageId, textCode).then(res => {
        //   if(res.data.code==1){
        //     if(getCountdown=='getCountdown'){
        //       this.send_SMS();
        //     }
        //   }else {
        //     this.getImgCode();
        //     this.$refs.windowTips.toast(res.data.msg);
        //   }
        // }).catch(function (error) {
        //   console.log(error);
        // });
      },
      send_SMS2(){
        // if(!this.imgcode) {
        //   this.$refs.windowTips.toast('图片验证码为空，请输入验证码');
        //   return;
        // }
        if(this.getSMScode){
          return;
        }
        this.getSMScode = true;
        let phone, send_type, tokenCode;
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
            this._tokenCode();
          }
        }).catch( (error)=>{
          this.getSMScode = false;
           this.getImgCode();
           this._tokenCode();
          console.log(error);
        });
      },
      registerSubmit(){
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
        register(code=this.SMScon, mobile=encryptByDES(this.phone), password=encryptByDES(this.pwd), platForm=3, refferee=this.recommender, send_type='register').then(res => {
          if(res.data.code==1){
            setStore('token',res.data.data.token);
            setStore('userId',res.data.data.userId);
            this.$router.push('/registerSuccess');
          }else {
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
    },
    components: {
      windowTips
    }
  }
</script>

<style lang='less' scope>
.over {
  height: 100%;
  overflow: hidden;
}
.registerPrize {
  position: relative;
  box-sizing:border-box; 
  min-height: 100%;
  padding-bottom: 0.8rem;
  background: linear-gradient( 90deg, #ffeec2 0%, #ffefcb 20%, #fff6e4 35%, #fff8e6 50%, #fff6e4 65%, #ffefcb 80%,#ffeec2 100%);
  >div:nth-child(1) {
    height: 4.22rem;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .platform-advantage {
    text-align: center;
    overflow: hidden;
    img:nth-child(1){
      width: 1.7rem;
      height: 0.5rem;
    }
    img:nth-child(2){
      width: 100%;
      height: 3.42rem;
    }
  }
  .novice-red-envelope {
    text-align: center;
    overflow: hidden;
    img:nth-child(1){
      width: 1.7rem;
      height: 0.5rem;
    }
    p{
      font-size: 0.25rem;
    }
    img:nth-child(3){
      width: 6rem;
      height: 4.22rem;
    }
    .use_rule {
      position: fixed;
      height: 4.69rem;
      width:100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 100;
    }
  }
  .newbie-exclusive {
    text-align: center;
    overflow: hidden;
    img:nth-child(1){
      width: 2.53rem;
      height: 0.49rem;
    }
    p{
      font-size: 0.18rem;
      line-height: 0.3rem;
    }
    p:nth-child(2){
      font-size: 0.25rem;
      line-height: 0.3rem;
    }
    img:nth-child(3){
      margin-top: 0.2rem;
      width: 6.1rem;
      height: 3.42rem;
    }
    img:nth-child(4){
      width: 6.4rem;
      height: 3.08rem;
    }
  }
  .register {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 90%;
    z-index: 100;
    overflow: hidden;
    .title {
      width: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
      }
      .close {
        position: absolute;
        right: 0;
        top: 0;
        height: 0.6rem;
        width: 0.6rem;
      }
    }
    .register-input {
      margin: -0.4rem 0.2rem 0;
      padding: 0.4rem 5% 0.1rem;
      background: #fff;
      li {
        display: block;
        display: flex;
        margin-bottom: 0.4rem;
        padding-left: 0.15rem;
        background-color: #eeeeee;
        border-radius: 50px;
        box-shadow: 0 0.02rem 0.03rem #e6e6e6 inset;
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
          }
          span {
            display: block;
            height: 100%;
            width: 2.8rem;
            text-align: center;
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
            }
          }
        }
      }
    }
    .register-submit-wrap {
      background: #fff;
      margin: -0.1rem 0.2rem 0;
      padding: 0 5% 0.2rem;
    }
    .register-enter {
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.3rem;
      font-weight: bold;
      text-align: center;
      color: #ffffff;
      margin: 0 0.24rem 0.2rem;
      border-radius: 0.15rem;
      background: #fff45c;
      box-shadow: 0px 0.03rem 0px #ed9300;
      color: #e9301a;
    }
    .register-agree {
      padding-left: 0.24rem;
      font-size: 0.18rem;
      line-height: 0.4rem;
      margin-bottom: 0.2rem;
      i {
        font-size: 0.24rem;
        color: #ff5252;
        padding-right: 0.1rem;
      }
      span {
        color: #ff5252;
      }
    }
    p.gologin {
      text-align: center;
      font-size: 0.22rem;
      padding: 0.1rem 0;
      a {
        padding-left: 0.2rem;
        color: #f7f004;
      }
    }
  }
  .down {
    display: block;
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 0.4rem;
    width: 100%;
    padding: 0.15rem 0.2rem;
    line-height: 0.4rem;
    background: #4a134d;
    font-size: 0.2rem;
    overflow: hidden;
    >span {
      display: block;
      flex: 1;
    }
    span:nth-child(1){
      color: #ffe82c;
      i {
        font-size: 0.3rem;
        color: #ff684e;
      }
    }
    >span:nth-child(2){
      display: block;
      display: flex;
      >i:nth-child(1) {
        display: block;
        flex: 1;
      }
      >a:nth-child(2) {
        width: 1.3rem;
        text-align: center;
        color: #ff684e;
        background: #fff;
        border-radius: 0.1rem;
      }
      >i:nth-child(3) {
        font-size: 0.35rem;
        color: #fff;
        padding-right: 0.4rem;
        padding-left: 0.2rem;
      }
    }
  }
}
.screen_cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
</style>
