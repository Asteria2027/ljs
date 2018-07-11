<template>
  <div class="account">
    <window-tips ref='windowTips'></window-tips>
    <div class="user-info">
      <span class="exit" @click='isExit=true'>安全退出</span>
      <span class="message" :class="{'redDot': isNewMassage}" @click="lookMessage">消息</span>
      <span v-if="isOpenAcc==1" class="eye iconfont " :class="{'icon-yan':hideAssets=='0','icon-biyan':hideAssets=='1'}" @click="setHideAssets"></span>
      <div class="user-assets" v-if="isOpenAcc==1">
        <img src="./avatarBank.png" alt="">
        <router-link tag='p' to='myAssets'>我的资产 (元) <i class="iconfont icon-more"></i> </router-link>
        <router-link tag='p' to='myAssets' class="account-money">{{hideAssets==0?(toSum?toSum:'--'):'***'}}</router-link>
      </div>
      <div class="user-assets-detail" v-if="isOpenAcc==1">
        <ul>
          <li>
            <p>可用余额(元)</p> 
            <p>{{hideAssets==0?(usableAmount?usableAmount:'--'):'***'}}</p>
          </li>
          <li>
            <p>待收本金(元)</p>
            <p>{{hideAssets==0?(forPayPrincipal?forPayPrincipal:'--'):'***'}}</p>
          </li>
           <li>
            <p>累计收益(元)</p>
            <p>{{hideAssets==0?(hasAllInterest?hasAllInterest:'--'):'***'}}</p>
          </li> 
        </ul>
      </div>
      <div v-if="isOpenAcc==0" class="notOpenAcc">
         <img src="./avatarBank.png" alt="">
         <p>开通存管账户，投标及账户资金更安全</p>
         <router-link tag='p' to='depositAccount'>立即开通存管</router-link>
      </div>
    </div>
    <div class="manage-money">
      <div @click='manage_money(1)'>提现</div>
      <div @click='manage_money(2)'>充值</div>
    </div>
    <div class="account-list">
      <ul>
        <router-link tag='li' to='/myTender'>
          <div><i class="iconfont icon-wdtoubiao"></i></div>
          <div>我的投标</div>
          <div>{{cyzNum>0?`${cyzNum}笔持有中`:''}}<i data-v-d997418a="" class="iconfont icon-more"></i></div>
        </router-link>
        <router-link tag="li" to='/returnedMoneyCalendar'>
          <div><i class="iconfont icon-huikuanric"></i></div>
          <div>回款日程</div>
          <div><i class="iconfont icon-more"></i></div>
        </router-link >
        <router-link tag="li" to="/transactionDetails">
          <div><i class="iconfont icon-mingxi"></i></div>
          <div>交易明细</div>
          <div><i class="iconfont icon-more"></i></div>
        </router-link>
      </ul>
      <ul>
        <router-link tag='li' to='/inviteFriends'>
          <div><i class="iconfont icon-yaoqinghaoyou"></i></div>
          <div>邀请好友</div>
          <div>享双重好礼<i class="iconfont icon-more"></i></div>
        </router-link>
        <router-link tag='li' to='/myRebates'>
          <div><i class="iconfont icon-fanli" style="font-size:0.26rem"></i></div>
          <div>我的返利</div>
          <div>{{`${memberBonusCount&&memberBonusCount>0?'已赚返利'+memberBonusCount+'元':''}`}}<i class="iconfont icon-more"></i></div>
        </router-link>
        <router-link tag='li' to='/myWelfare'>
          <div><i class="iconfont icon-wdfuli"></i></div>
          <div>我的福利</div>
          <div>{{`${userRedNum>0?userRedNum+'个红包未使用':userCouponNum>0?userCouponNum+'张奖励券未使用':''}`}}<i class="iconfont icon-more"></i></div>
        </router-link>
        <router-link tag='li' to='/securityCenter'>
          <div><i class="iconfont icon-anquanzhongxin"></i></div>
          <div>安全中心</div>
          <div><i class="iconfont icon-more"></i></div>
        </router-link>
      </ul>
      <ul>
         <!-- <li @click='goAutomaticBid' v-if='isOpenAcc==0'>
          <div><i class="iconfont icon-selected" style="font-size:0.25rem"></i></div>
          <div>自动投标</div>
          <div>您还未开通存管<i class="iconfont icon-more"></i></div>
        </li> -->
         <li @click='goAutomaticBid' v-if='autoBidSetStatus==1'>
          <div><i class="iconfont icon-selected" style="font-size:0.25rem"></i></div>
          <div>自动投标授权成功</div>
          <div><i class="iconfont icon-more"></i></div>
        </li>
         <li @click='goAutomaticBid' v-if='autoBidSetStatus!=1&&isOpenAcc==1'>
          <div><i class="iconfont icon-selected" style="font-size:0.25rem"></i></div>
          <div>自动投标</div>
          <div>您还未开通自动投标<i class="iconfont icon-more"></i></div>
        </li>
      </ul>
    </div>
    <!-- <div class="setAutoBid" v-if="setAutoBid">
      <div>存管版开启自动投标后，您将授权平台为您按照自动投标设置的条件进行投标 </div>
      <div>
        <input ref="inputAuto" @keyup.13="bindNewPhonecheck" type="text" placeholder="请输入手机验证码" v-model='SMSCode' autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="8">
        <span @click="getCode()">{{countdown}}</span>
      </div>
      <div class="borderTop-1px">
        <span @click="setAutoBid=false">取消</span>
        <span @click='setAutoBidComfirm'>确定</span>
      </div>
    </div> -->
    <div class="screen_cover" @touchmove.prevent v-show="!isLogin||isExit" :style="{'z-index':isExit?'1002':'99'}"></div>
    <Dialog @leftBtn='isExit=false' @rightBtn='exit' v-if="isExit">
      <div class="title" style="font-size:0.28rem;text-align:center;height:1rem;padding-top:0.5rem;">
        您确定退出当前账号？
      </div>
    </Dialog>
    <transition name="login-menu-fade" mode="out-in">
      <div class="account-login" v-if="!isLogin">
        <div>
          <img src="./login-logo.png" alt="">
        </div>
        <p><span class="icon-shouyexiaozianquan iconfont"></span>账户资金由浙商银行存管</p>
        <div class="btn-go">
          <router-link to="register">注册</router-link>
          <router-link to="login">登录</router-link>
        </div>
      </div>
    </transition>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import footGuide from "@/components/footer/footGuide.vue"
import windowTips from '@/components/common/windowTips/windowTips.vue'
import Dialog from '@/components/common/dialog/dialog.vue'  
import { mapActions, mapState, mapMutations } from 'vuex'
import { myHomeDate , queryLatestNews, requestSmsCode, autoBidSet} from '@/server/getData.js'
import queryZs from '@/config/queryZsResults';
import { getStore, setStore, removeStore, cookie, formSubmit } from '@/config/mUtils'

export default {
  mixins:[queryZs],
  data() {
    return {
      isLogin:true,//是否登录
      toSum:'',// 总金额
      usableAmount:'', //可用余额
      hasAllInterest:'', //累计收益
      forPayPrincipal:'',//待收本金
      cyzNum:0,//投标持有笔数
      isOpenAcc:getStore('isOpenAcc')?getStore('isOpenAcc'):'',//存管开户状态。0：没有开通；1有开通
      autoBidSetStatus:'',
      userRedNum:'',//红包个数
      userCouponNum:'',//奖励券个数
      memberBonusCount:'',//返利
      isNewMassage: false, // 是否有未读的新消息
      newMassageId : '',
      hideAssets:getStore('hideAssets')?getStore('hideAssets'):'0',//是否隐藏资产
      // countdown:'获取验证码',
      // getSMScode:false, //节流
      // setAutoBid:false,//设置自动投标
      // SMSCode:'',//验证码
      isExit:false,//退出弹窗
      // goClick:false,//节流
    };
  },
  mounted(){
    this.queryZsResult(this.$route.query.zsCallback);
    this._getUserInfo();
    this._queryLatestNews();
  },
  computed: {
    ...mapState([
        'userInfo'
    ]),
  },
  methods:{
    ...mapActions(["Exit"]),
    setHideAssets(){
      if(getStore('hideAssets')=='1'){
        this.hideAssets = '0';
      }else {
        this.hideAssets = '1';
      }
      setStore('hideAssets',this.hideAssets)
    },
    // getCode(){
    //   if(this.getSMScode){
    //     return;
    //   }
    //   let token, userId, smsType;
    //   requestSmsCode(token=getStore('token'), userId=getStore('userId'), smsType=7).then(res => { 
    //     this.$refs.inputAuto.focus();
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
    // setAutoBidComfirm(){
    //   if(!this.SMSCode){
    //     this.$refs.windowTips.toast('请输入验证码');
    //     return;
    //   }
    //   let token, userId, mobileCode, flag;
    //   autoBidSet(token=getStore('token'), userId=getStore('userId'), mobileCode=this.SMSCode, flag=1).then(res => { 
    //     if(res.data.code==1){
    //       this.$refs.windowTips.toast('自动投标开启成功');
    //       this.setAutoBid=false;
    //       // this.$store.state.userInfo.autoBidSetStatus=1;
    //       this.autoBidSetStatus=1;
    //     }else {
    //       this.$refs.windowTips.toast(res.data.msg);
    //     }
    //   }).catch(function (error) {
    //     console.log(error);
    //   });
    // },
    _getUserInfo(){
      let token,userId;
      userId = getStore('userId');       
      token = getStore('token');
      //获取用户信息
      myHomeDate(token, userId ).then(res => {
        if(res.data.code==1){
          this.$store.state.userInfo = { ...res.data.data };
          this.toSum = res.data.data.toSum;
          this.usableAmount = res.data.data.usableAmount;
          this.hasAllInterest = res.data.data.hasAllInterest;
          this.forPayPrincipal = res.data.data.forPayPrincipal;
          this.cyzNum = res.data.data.cyzNum;
          this.isOpenAcc = res.data.data.isOpenAcc;
          this.autoBidSetStatus = res.data.data.autoBidSetStatus;
          this.userRedNum = res.data.data.userRedNum;
          this.memberBonusCount = res.data.data.memberBonusCount;
          this.userCouponNum = res.data.data.userCouponNum;
          if(getStore('isOpenAcc')){
            this.$store.state.userInfo.isOpenAcc = getStore('isOpenAcc');
          }
        }else {
          this.Exit();
          // this.isOpenAcc=1;
          this.isLogin=false;
        }
      }).catch((error) => {
        this.Exit();
        console.log(error);
        // this.isOpenAcc=1;
        this.isLogin=false;
      });
    },
    lookMessage(){
      setStore('newMassageId', this.newMassageId)
      setStore('isNewMassage', this.isNewMassage)
      this.$router.push('message')
    },
    // 查询最新的消息的id
    _queryLatestNews() {
      let token,userId;
      queryLatestNews( userId = getStore("userId"), token = getStore("token")  ).then( res => {
        if(res.data.code == 1) {
          this.newMassageId = res.data.data.id;    
          if(getStore('newMassageId')) {
            let id = getStore('newMassageId')
            if( id == this.newMassageId ) {
              this.isNewMassage = false
            }else {
              this.isNewMassage = true
            }
          }else {
            this.isNewMassage = true            
          }
        }
      }).catch( function (error) {
        console.log(error);
      })

    },
    manage_money(num){
      if(num==1){//提现
        if(this.isOpenAcc==0) {
          this.$refs.windowTips.toast('您未开通资金存管账户，将为您跳转到开通页面');
          setTimeout(() => {
            this.$router.push('depositAccount');
          }, 1500);
        }else {
          this.$router.push('withdrawCash');
        }
      }else if(num==2){ //充值
        if(this.isOpenAcc==0){
          this.$refs.windowTips.toast('您未开通资金存管账户，将为您跳转到开通页面');
          setTimeout(() => {
            this.$router.push('depositAccount');
          }, 1500);
        }else {
          this.$router.push('recharge');
        }
      }
    },
    goAutomaticBid(){
      // if(this.goClick){
      //     return;
      // }
      // this.goClick = true;
      if(this.autoBidSetStatus==1){
        this.$router.push('automaticBid');
      }else { 
        this.$refs.windowTips.toast('您还未开通自动投标，请先去安全中心开通业务授权');
        // let token, userId, callBackURL, flag;
        // autoBidSet(token=getStore('token'), userId=getStore('userId'), callBackURL=`${window.location.origin}/wapfront/account?zsCallback=autoBidSet`, flag=1).then(res => { 
        //   if(res.data.code==1){
        //     this.goClick = false;
        //     // this.$refs.windowTips.toast('自动投标开启成功');
        //     // this.setAutoBid=false;
        //     // this.$store.state.userInfo.autoBidSetStatus=1;
        //     setStore('autoBidSetOrderNo',res.data.data.orderNo);
        //     formSubmit(res.data.data.zsUrl,{reqMsg:res.data.data.reqMsg});  
        //   }else {
        //     this.goClick = false;
        //     this.$refs.windowTips.toast(res.data.msg);
        //   }
        // }).catch((error)=>{
        //   this.goClick = false;
        //   console.log(error);
        // });
      }
    },
    exit(){
      this.Exit();   
      this.$router.push({path:'/login'});
    }
  },
  components: {
    footGuide,
    windowTips,
    Dialog
  }
};
</script>
<style lang="less" scoped>

.login-menu-fade-enter-active, .login-menu-fade-leave-active {
  transition: .8s;
  transform: translateY(0);
}
.login-menu-fade-enter, .login-menu-fade-leave-active {
  transform: translateY(100%);
}

.account {
  box-sizing: border-box;
  background: #f4f4f4;
  padding-bottom: 0.87rem;
  min-height: 100%;
  width: 100%;
  .user-info {
    position: relative;
    height: 4.44rem;
    width: 100%;
    overflow: hidden;
    background: #f4775f;
    .exit, .message  {
      position: absolute;
      top: 0.3rem;
      font-size: 0.26rem;
      color: #fee7df;
    }
    .eye {
      position: absolute;
      top: 0.35rem;
      right: 1.2rem;
      font-size: 0.18rem;
      color: #fff;
    }
    .exit {
      left: 0.24rem; 
    }
    .message {
      right: 0.24rem;
      &.redDot::after {
        display: block;
        content: "";
        width: 0.12rem;
        height: 0.12rem;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        top: -0.1rem;
        right: -0.1rem;
      }
    }
    .notOpenAcc {
      > img {
        display: block;
        width: 1.18rem;
        height: 1.18rem;
        margin: 0.6rem auto 0.3rem;
        border-radius: 50%;
      } 
      > p:nth-child(2) {
        font-size: 0.2rem;
        color: #ffffff;
        text-align: center;
        margin-bottom: 0.5rem;
      }
      > p:nth-child(3) {
        font-size: 0.26rem;
        color: #ffffff;
        text-align: center;
        width: 2.5rem;
        height: 0.7rem;
        line-height: 0.7rem;
        border: 1px solid #fff;
        border-radius: 1rem;
        margin: auto;
      }
    }
    .user-assets {
      > img {
        display: block;
        width: 1.18rem;
        height: 1.18rem;
        margin: 0.46rem auto 0.22rem;
        border-radius: 50%;
      }
      > p:nth-child(2) {
        font-size: 0.18rem;
        color: #ffffff;
        text-align: center;
        margin-bottom: 0.26rem;
        i {
          font-size: 0.18rem;
        }
      }
      .account-money {
        font-size: 0.6rem;
        color: #ffffff;
        text-align: center;
      }
    }
    .user-assets-detail {
      ul {
        width: 100%;
        height: 0.74rem;
        margin-top: 0.6rem;
        margin-bottom: 0.26rem;
        display: block;
        display: flex;
        color: #fff;
        li {
          display: block;
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(0, 0, 0, 0.2);
          p:nth-child(1) {
            font-size: 0.15rem;
            margin-bottom: 0.16rem;
          }
          p:nth-child(2) {
            font-size: 0.26rem;
          }
        }
      }
    }
  }

  .manage-money {
    height: 0.9rem;
    width: 100%;
    font-size:0.24rem;
    color: #222;
    display: block;
    display: flex;
    background: #fff;
    overflow: hidden;
    div {
      display: block;
      flex: 1;
      text-align: center;
      height: 0.7rem;
      margin: 0.1rem 0;
      line-height: 0.7rem;
      i {
        line-height: 0.7rem;
        font-size:0.26rem;
        margin-right: 0.05rem;
      }
    }
    div:nth-child(2){
      color: #ff6f4e;
      border-left: 1px solid #f4f4f4;
    }
  }

  .account-list {
    overflow: hidden;
    margin-bottom: 0.2rem;
    ul{
      margin-top: 0.2rem;
      width: 100%;
      background: #fff;
      li {
        display: block;
        display: flex;
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.24rem;
        color: #222;
        div:nth-child(1) {
          width: 0.85rem;
          height: 0.9rem;
          text-align: center;
          i {
            font-size: 0.35rem;
            line-height: 0.9rem;
            color: #FFD072;
          }
        }
        div:nth-child(2) {
          border-bottom: 1px solid #f4f4f4;
        }
        div:nth-child(3){
          display: block;
          flex: 1;
          text-align: right;
          color: #999;
          border-bottom: 1px solid #f4f4f4;
          i {
            font-size: 0.24rem;
            line-height: 0.9rem;
            padding-right: 0.24rem;
            padding-left: 0.15rem;
            color: #999;
          }
        }
      }
    }
    ul:nth-child(2){
      li:nth-child(1){
        div:nth-child(3){
          color: #ff6f4e;
        }
      }
    }
  }
  // .setAutoBid {
  //   position: fixed;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%,-50%);
  //   z-index: 1003;
  //   font-size: 0.2rem;
  //   background: #fff;
  //   height: 3rem;
  //   width: 5rem;
  //   overflow: hidden;
  //   >div:nth-child(1){
  //     font-size: 0.2rem;
  //     line-height: 0.35rem;
  //     margin-top: 0.3rem;
  //     padding: 0.25rem;
  //     text-align: center;
  //   }
  //   >div:nth-child(2){
  //     // margin-top: 0.3rem;
  //     display: block;
  //     display: flex;
  //     padding:0 0.25rem;
  //     >input {
  //       display: block;
  //       flex: 1;
  //       padding: 0.25rem;
  //     }
  //     >span {
  //       display: block;
  //       width: 1.2rem;
  //       text-align: center;
  //       padding: 0.25rem 0;
  //       color: #FF654F;
  //     }
  //   }
  //   >div:nth-child(3){
  //     display: block;
  //     display: flex;
  //     >span {
  //       display: block;
  //       flex: 1;
  //       text-align: center;
  //       padding: 0.3rem 0;
  //     }
  //   }
  // }
}
.account-login {
  position: fixed;
  bottom: 0.87rem;
  left: 0;
  height: 5.3rem;
  width: 100%;
  background: #f5f5f5;
  z-index: 99;
  div:nth-child(1){
    height: 3.12rem;
    padding: 0.3rem 0;
    width: 100%;
    text-align: center;
    background: #fff;
    img {
      height: 100%;
      width: 3.6rem;
    }
  }
  p:nth-child(2){
    background: #fff;
    text-align: center;
    font-size: 0.2rem;
    span {
      color: #5BE750;
      font-size: 0.2rem;
      padding-right: 0.15rem;
    }
  }
  .btn-go {
    display: block;
    display: flex;
    background: #fff;
    padding: 0.25rem 0;
    >a {
      display: block;
      flex: 1;
      text-align: center;
      height: 0.6rem;
      margin:0 0.5rem;
      line-height: 0.6rem;
      font-size: 0.25rem;
      background: #FF654F;
      color: #fff;
      border-radius: 1rem;
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
}
</style>