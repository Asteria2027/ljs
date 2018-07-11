<template>
 <div class="inviteFriends">
  <mheader headTitle='邀请好友'  class="borderBottom-1px">
    <span slot='back' class="back" @click="back"> <i class="iconfont icon-back"></i></span>
  </mheader>
  <div class="banner" @click="goInviteFriendsToGifts">
     <img src="./tuceng.png">
  </div>
  <div class="introduce">
     <p v-if="custRate"><i class="icon-weibiaoti- iconfont"></i> 您当前为平台VIP合伙人</p>
     <p v-if="custRate">当前享有返佣率：<span>1%</span></p>
     <p  v-if='userCommissionInfo' class="expla"><span style="color:#000;">您当前等级：理财师Lv{{userCommissionInfo.userLevel}}&nbsp;(返佣率{{userCommissionInfo.payRate}}%)</span><span @click='showintroduceCover=true'>?</span> </p>
     <p v-if='!custRate&&!userCommissionInfo' class="expla"><span>您暂无返佣资格，注册成功即可获好友投标最高1%返佣</span><span @click='showintroduceCover=true'>?</span> </p>
  </div>
  <div class="screen_cover" v-if="showintroduceCover" @touchmove.prevent></div>
  <div class="introduce-cover" v-if="showintroduceCover">
    <p>投标总额是您在平台上已经投标而尚未收回的本金;</p>
    <p>每天00:30根据个人当前投标总额更新当日返佣率。</p>
    <p class="borderTop-1px" @click="showintroduceCover=false">知道了</p>
  </div>
  <div class="frends-num">
     <ul>
       <li>
         <router-link to='myFriends' tag='span'>好友总人数&nbsp; ></router-link>
         <router-link to='rebatesDetails' tag='span'>已赚佣金&nbsp;  ></router-link>
       </li>
       <li>
         <span><i>{{(friendNum==0||friendNum)?friendNum:'--'}}</i>&nbsp; 人</span>
         <span><i>{{(totalCommissionAmt==0||totalCommissionAmt)?totalCommissionAmt:'--'}}</i>&nbsp; 元</span>
       </li>
     </ul>
  </div>
  <div class="recently-rebate">
    <h3 class="borderBottom-1px">最近的返佣</h3>
    <div class="recently-rebate-title">
      <div>返佣金额</div>
      <div>返佣时间</div>
      <div>备注</div>
    </div>
    <div class="no-rebate" v-if='currentRebate.length==0'>暂无返佣记录</div>
    <div class="rebate-list" v-if='currentRebate.length>0'>
      <ul>
        <li v-for="(item, index) in currentRebate" :key='index'>
          <div>{{item.commissionContribute}}元</div>
          <div>{{item.paydate}}</div>
          <div>{{item.realName}}投标<br><br>{{item.remark}}</div>
        </li>
      </ul>
    </div>
  </div>
  <div class="weChatShare" @touchmove.prevent v-if='weChatSharePrompt'>
    <div class="quxian"><img src="./quxian.png"></div>
    <div>
      <div>点击右上角分享给朋友圈！</div>
      <div>1、点击右上角&nbsp;<img src="./sandian.png" alt=""></div>
      <div>2、点击&nbsp;<img src="./my-WeChat@2x.png" alt="">&nbsp;发送给朋友</div>
      <div>3、或点击&nbsp;<img src="./my-Circle@2x.png">&nbsp;分享到朋友圈</div>
    </div>
    <div class="weChatShare-close" @click='weChatSharePrompt=false'><img src="./cha.png"></div>
  </div>
  <div class="browserShare" @touchmove.prevent v-if='browserSharePrompt'>
    <div>您好，请在微信中关注公众号: '联金所服务号'，</div>
    <div>在微信中进行邀请好友操作。</div>
    <div class="browserShare-close" @click='browserSharePrompt=false'><img src="./cha.png"></div>
  </div>
  <div class="inviteFriends-enter" @click='share'>邀请好友赚取佣金</div>
 </div>
</template>

<script>
import mheader from '@/components/header/header.vue'
import { inviteFriendInit } from "@/server/getData.js";
import wxApi from "@/server/wxapi.js";
import { getStore } from '@/config/mUtils';
import { mapState } from 'vuex';

 export default {
   mixins:[wxApi],
   data () {
     return {
       custRate:'',//返佣率
       userCommissionInfo:'',
       friendNum:'',//好友人数
       totalCommissionAmt:'',//已赚佣金
       currentRebate:[],//返佣记录对象数组
       showintroduceCover:false,//弹窗显示
       weChatSharePrompt:false,//微信内分享提示
       browserSharePrompt:false,//浏览器内分享提示
     }
   },
   mounted(){
     this._inviteFriendInit();
     this.wxRegister(this.wxRegCallback);
   },
   computed: {
    ...mapState([
        'userInfo'
    ]),
  },
   methods: {
     back(){
       this.$router.push('account');
     },
     goInviteFriendsToGifts(){
       this.$router.push('InviteFriendsToGifts');
     },
     wxRegCallback () {
        this.wxShare();
      },
      wxShare () {
        let opstion = {
          title: '联金所是一家知名风投+上市公司+行业专家三方投标的互联网金融平台,100元起投，资金全程银行存管，安全透明，投标更安心。', // 分享标题
          link: location.origin+'/wapfront/register?serviceNo='+this.$store.state.userInfo.serviceNo, // 分享链接
          imgUrl: 'https://www.uf-club.com/images/wap/base/reg_hongbao.png',// 分享图标
          success: function () {
            console.log('分享成功')
          },
          error: function () {
            console.log('分享失败')
          }
        }
        // 将配置注入通用方法
        this.ShareTimeline(opstion);
        this.ShareAppMessage(opstion);
      },
     _inviteFriendInit(){
        let token,userId;
        //邀请好友初始化
        inviteFriendInit(token=getStore('token'), userId=getStore('userId')).then(res => {
          if(res.data.code==1){
            this.custRate = res.data.data.custRate;
            this.userCommissionInfo = res.data.data.userCommissionInfo?res.data.data.userCommissionInfo:'';
            this.friendNum = res.data.data.totalMap.friendNum;
            this.totalCommissionAmt = res.data.data.totalMap.totalCommissionAmt;
            this.currentRebate = res.data.data.currentRebate;
          }else {
            
          }
        }).catch((error) => {
          console.log(error);
        });
     },
     share(){
        if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
          this.weChatSharePrompt = true;
        }else {
          this.browserSharePrompt = true;
        }
     }
   },
   components: {
     mheader
   }
 }
</script>

<style lang='less' scope>
.inviteFriends {
  box-sizing: border-box;
  background: #f4f4f4;
  padding: 0.8rem 0;
  min-height: 100%;
  width: 100%;
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
  .banner {
    height: 4.2rem;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .introduce {
    padding: 0.3rem 0.23rem;
    font-size: 0.25rem;
    line-height: 0.4rem;
    background: #fff;
    p:nth-child(1){
      font-weight: bold;
      i {
        color: #FECC72;
        padding-right: 0.1rem;
      }
    }
    p:nth-child(2){
      color: #999;
      font-size: 0.2rem;
      padding-left: 0.15rem;
      span {
        font-size: 0.3rem;
        color: #FF6B2D;
      }
    }
    p.expla {
      overflow: hidden;
      span:nth-child(1){
        float: left;
        font-weight: 100; 
        font-size: 0.16rem;
        color: #999;
      }
      >span:nth-child(2) {
        float: left;
        margin-left: 0.1rem;
        height: 0.25rem;
        width: 0.25rem;
        text-align: center;
        line-height: 0.25rem;
        color: #81B6E0;
        border-radius: 50%;
        border: 1px solid #81B6E0;
      }
    }
  }
  .introduce-cover {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 1002;
    height: 3rem;
    width: 80%;
    border-radius: 0.1rem;
    background: #fff;
    text-align: center;
    font-size: 0.2rem;
    line-height: 0.3rem;
    p:nth-child(1) {
      margin-top: 1rem;
      padding: 0 0.3rem;
    }
    p:nth-child(2) {
      margin-top: 0.1rem;
      padding: 0 0.3rem;
    }
    p:nth-child(3) {
      position: absolute;
      bottom: 0;
      height: 0.7rem;
      line-height: 0.7rem;
      width: 100%;
    }
  }
  .frends-num {
    ul {
      margin: 0.2rem 0;
      padding: 0.3rem 0;
      font-size: 0.2rem;
      background: #fff;
      li{
        display: block;
        display: flex;
        >span {
          display: block;
          flex: 1;
          text-align: center;
        }
      }
      li:nth-child(1){
        padding-bottom: 0.2rem;
        color: #81B6E0;
      }
      li:nth-child(2){
        i {
          color: #FF6B2D;
          font-size: 0.3rem;
        }
      }
    }
  }
  .recently-rebate {
    background: #fff;
    >h3 {
      margin:0 0.3rem;
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.2rem;
    }
    .recently-rebate-title {
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.2rem;
      display: block;
      display: flex;
      >div {
        display: block;
        flex: 1;
        text-align: center;
        color: #999;
      }
    }
    .rebate-list li{
      display: block;
      display: flex;
      font-size: 0.2rem;
      padding: 0.25rem 0;
      >div {
        display: block;
        flex: 1;
        text-align: center;
        color: #999;
      }
    }
    .no-rebate {
      padding-top: 0.5rem;
      height: 0.5rem;
      color: #999;
      font-size: 0.23rem;
      text-align: center;
    }
  }
}
.inviteFriends .inviteFriends-enter {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.3rem;
  text-align: center;
  color: #ffffff;
  background: #ff654f;
}
.screen_cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
}
.weChatShare {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  font-size: 0.25rem;
  .quxian {
    position: absolute;
    z-index: 1002;
    right: 0.5rem;
    top: 1.2rem;
    height: 1.75rem;
    width: 1.65rem;
    img {
      height: 100%;
      width: 100%;
    }
  }
  >div:nth-child(2){
    z-index: 1002;
    color: #fff;
    margin-top: 3.5rem;
    margin-left: 25%;
    >div {
      margin-bottom: 0.2rem; 
    }
    >div:nth-child(1){
      font-size: 0.3rem;
      font-weight: 600;
    }
    img {
      vertical-align: middle;
      height: 0.35rem;
      width: 0.35rem;
    }
  }
  .weChatShare-close {
    img{
      margin: 0.8rem auto 0;
      display: block;
      height: 0.7rem;
      width: 0.7rem;
    }
  }
}
.browserShare {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  font-size: 0.25rem;
  text-align: center;
  color: #fff;
  >div:nth-child(1) {
    margin-top: 5rem;
    margin-bottom: 0.3rem;
  }
  .browserShare-close {
    img{
      margin: 0.8rem auto 0;
      display: block;
      height: 0.7rem;
      width: 0.7rem;
    }
  }
}
</style>
