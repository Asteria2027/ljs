<template>
  <div class="investDetailTransactionSucess">
    <mheader headTitle='投标成功' class="borderBottom-1px"></mheader>
    <div class="success-png">
      <img v-if="$route.query.subjectType||returnStatus==1" style="width:0.8rem;" src="./smile.png" alt="">
      <img v-if="returnStatus==0" style="width:0.8rem;" src="./error.png" alt="">
      <img v-if="returnStatus==2" style="width:0.8rem;" src="./processing.png" alt="">
      <p v-if="$route.query.subjectType==4">投标成功，开始计息</p>
      <p v-if="$route.query.subjectType&&$route.query.subjectType!=4">投标成功，请等待计息</p>
      <p>{{msg}}</p>
    </div>
    <div class="goOther">
      <router-link tag="span" to="invest">返回投标列表</router-link>
      <router-link tag="span" to="myTender">查看投标记录</router-link>
    </div>
    <div class="success-share">
      <p>独乐乐不如众乐乐，赶紧邀请好友投标，坐享佣金收益</p>
      <router-link tag='p' to='inviteFriends'>活动详情 》</router-link>
      <ul>
        <li @click='share'>
          <img src="./my-WeChat@2x.png" alt="">
          <p>微信</p>
        </li>
        <li @click='share'>
          <img src="./pyq.png" alt="">
          <p>朋友圈</p>
        </li>
      </ul>
    </div>
    <div class="screen_cover" v-if="showintroduceCover" @touchmove.prevent></div>
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
    <window-tips ref='windowTips'></window-tips>
  </div>
</template>

<script>
import mheader from "@/components/header/header.vue";
import windowTips from '@/components/common/windowTips/windowTips.vue'
import wxApi from "@/server/wxapi.js";
import { queryInvestResult, queryTransferResult } from '@/server/getData.js'
import { getStore } from "@/config/mUtils";
import { mapState } from 'vuex';

  export default {
    mixins:[wxApi],
    data () {
      return {
        msg:'',//返回结果
        returnStatus:'',//返回状态 0失败 1成功 2处理中
        showintroduceCover:false,//弹窗显示
        weChatSharePrompt:false,//微信内分享提示
        browserSharePrompt:false,//浏览器内分享提示
      }
    },
    mounted(){
      if(getStore('investDetailTransactionOrderNo')&&this.$route.query.zsCallback=='investDetailTransaction'){
        this._queryInvestResult();
      }else if(getStore('debtTransferTransactionOrderNo'&&this.$route.query.zsCallback=='investDetailTransaction')){
        this._queryTransferResult();
      }
      this.wxRegister(this.wxRegCallback);
    },
    computed: {
      ...mapState([
          'userInfo'
      ]),
    },
    methods:{
      //  查询非转让标投资结果
      _queryInvestResult(){
        if(!getStore('investDetailTransactionOrderNo')){return;}
        let token, userId, orderNo;
        queryInvestResult(token=getStore('token'), userId=getStore('userId'), orderNo=getStore('investDetailTransactionOrderNo')).then(res => { 
          if(res.data.code==1){
            if(res.data.data.blockSts=="http20"){
              this.returnStatus = 1;
            }else if(res.data.data.blockSts=="http30"){
              this.returnStatus = 0;
            }else if(res.data.data.blockSts=="http60"){
              this.returnStatus = 2;
            }
          }else {
            this.returnStatus = 2;
          }
          this.msg = res.data.data.resultMsg;
        }).catch((error)=>{
          console.log(error);
        });
      },
      //  查询转让标投资结果
      _queryTransferResult(){
        if(!getStore('debtTransferTransactionOrderNo')){return;}
        let token, userId, orderNo;
        queryTransferResult(token=getStore('token'), userId=getStore('userId'), orderNo=getStore('debtTransferTransactionOrderNo')).then(res => { 
          if(res.data.code==1){
            if(res.data.data.blockSts=="http20"){
              this.returnStatus = 1;
            }else if(res.data.data.blockSts=="http30"){
              this.returnStatus = 0;
            }else if(res.data.data.blockSts=="http60"){
              this.returnStatus = 2;
            }
          }else {
            this.returnStatus = 2;
          }
          this.msg = res.data.data.resultMsg;
        }).catch((error)=>{
          console.log(error);
        });
      },
      wxRegCallback () {
        this.wxShare();
      },
      wxShare () {
        let opstion = {
          title: '联金所是一家知名风投+上市公司+行业专家三方投标的互联网金融平台,100元起投，资金全程银行存管，安全透明，投标更安心。', // 分享标题
          link: location.origin+'/wapfront/register?serviceNo='+this.$store.state.userInfo.serviceNo,      // 分享链接
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
      share(){
        if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
          this.weChatSharePrompt = true;
        }else {
          this.browserSharePrompt = true;
        }
      },
    },
    components: {
      mheader,
      windowTips
    }
  }
</script>

<style lang='less' scope>
.investDetailTransactionSucess {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  background: #f4f4f4;
  padding-top: 0.8rem;
  .success-png {
    background: #ffffff;
    text-align: center;
    padding-bottom: 0.8rem;
    img {
      padding: 0.5rem 0 0.3rem;
    }
    p {
      font-size: 0.25rem;
      color: #5BBD57;
    }
  }
  .goOther {
    display: block;
    display: flex;
    font-size: 0.25rem;
    text-align: center;
    background: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    span {
      display: block;
      flex: 1;
      padding: 0.25rem 0;
    }
    span:nth-child(1) {
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
  .success-share {
    font-size: 0.2rem;
    line-height: 0.4rem;
    text-align: center;
    background: #fff;
    margin-top: 0.2rem;
    padding: 0.25rem 0;
    >p:nth-child(2){
      color: #ff6f4e;
    }
    >ul {
      display: block;
      display: flex;
      padding: 0.3rem 0.4rem 0;
      li {
        display: block;
        flex: 1;
        text-align: center;
        img {
          height: 0.8rem;
          width: 0.8rem;
        }
        p {
          color: #000;
          font-size: 0.16rem;
        }
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
      margin: 0.6rem auto 0;
      display: block;
      height: 0.7rem;
      width: 0.7rem;
    }
  }
}
</style>
