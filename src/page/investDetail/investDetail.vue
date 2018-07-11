<template>
  <div class="investDetail">
    <mheader :headTitle='title' :goBack="'true'"></mheader>
    <invest-detail-card :DetailData='DetailData' :type='$route.query.subjectType' ></invest-detail-card>
    <div class="transfer-amount" v-if="$route.query.subjectType==4">
      <div>
        <p>{{DetailData.auctionBasePrice}}</p>
        <p>转让金额</p>
      </div>
      <div>
        <p>{{DetailData.debtSum}}</p>
        <p>债权价值</p>
      </div>
    </div>
    <div class="lending-conditions">
      <p v-if="$route.query.subjectType==4">预期收益: {{interest}}</p>
      <p v-if="$route.query.subjectType==4">实际支付: {{DetailData.auctionBasePrice}}</p>
      <p v-if="$route.query.subjectType!=4">起投金额: 100元，并以10的倍数递增</p>
    </div>
    <div class="other-detail-list">
      <div class="borderBottom-1px" @click="go(`tenderRecord?borrowId=${$route.query.borrowId}`)" v-if='$route.query.subjectType!=4'>
        <span>投标记录</span>
        <span v-if='userInfo'>{{DetailData.investCount?`${DetailData.investCount}人`:''}}<i class="iconfont icon-more"></i></span>
        <span v-else><i class="iconfont icon-more"></i></span>
      </div>
      <div class="borderBottom-1px" v-if='$route.query.subjectType==4'>
        <span>还款方式</span>
        <span>{{DetailData.paymentMode==1?'等额本息':DetailData.paymentMode==2?'按月付息，到期还本':DetailData.paymentMode==3?'等本等息':DetailData.paymentMode==4?'一次性还本付息':''}}</span>
      </div>
      <div @click="go(`projectDetails?subjectType=${$route.query.subjectType}&borrowId=${$route.query.borrowId}`)" class="borderBottom-1px" v-if='$route.query.subjectType==5||$route.query.subjectType==6||$route.query.subjectType==7'>
        <span>项目信息</span>
        <span><i class="iconfont icon-more"></i></span>
      </div>
      <div class="borderBottom-1px" @click="go(`BorrowerinfoAndRiskManage?borrowId=${$route.query.borrowId}&subjectType=${$route.query.subjectType}&bid=${$route.query.bid?$route.query.bid:''}`)" v-if='$route.query.subjectType==3||$route.query.subjectType==4'>
        <span>借款人信息</span>
        <span><i class="iconfont icon-more"></i></span>
      </div>
      <div @click="go(`riskManage?borrowId=${$route.query.borrowId}&subjectType=${$route.query.subjectType}&bid=${$route.query.bid?$route.query.bid:''}`)" v-if='$route.query.subjectType==3||$route.query.subjectType==4' class="borderBottom-1px">
        <span>风险管理</span>
        <span><i class="iconfont icon-more"></i></span>
      </div>
      <div @click="go(`commonProblem?subjectType=${$route.query.subjectType}`)" class="borderBottom-1px">
        <span>常见问题</span>
        <span><i class="iconfont icon-more"></i></span>
      </div>
      <div @click="go('riskWarning')" class="borderBottom-1px">
        <span>风险提示</span>
        <span><i class="iconfont icon-more"></i></span>
      </div>
    </div>
    <div class="investDetail-supplement" v-if='$route.query.subjectType==6'>
      <p>{{noviceMsg}}</p>
      <router-link to="inviteFriends">邀请好友来投标>></router-link>
    </div>
    <div class="gotoLogin" v-if='!userInfo'>
      <router-link tag='div' to='/login'>登录</router-link>
      <router-link tag='p' to='/register'>去注册>></router-link>
    </div>
    <div class="investment" v-if='userInfo'>
      <div v-if='canInvest!=1' style="background:#999">无投标资格</div>
      <div v-if='canInvest==1&&(borrowStatus==3||borrowStatus==8)' style="background:#999">已售完</div>
      <div v-if='canInvest==1&&borrowStatus==4' style="background:#999">还款中</div>
      <div v-if='canInvest==1&&borrowStatus!=3&&borrowStatus!=8&&borrowStatus!=4' @click='goTransaction'>立即投标</div>
      <p>网贷有风险，出借需谨慎</p>
    </div>
    <div class="electronic-seal" v-if="userInfo&&userInfo.caAuthorization!=1">
      <img src="./electronic-seal-logo.png" alt="">
      <p>平台已对接法大大电子签章系统，交易保障再次升级，因电子签章需电子签名，我们需要您的授权。</p>
      <p class="electronic-seal-agree" @click="sealAgree=!sealAgree"><i class="iconfont" :class="{'icon-weixuanzhongyuanquan':!sealAgree,'icon-selected':sealAgree}"></i>我已经阅读并同意<router-link to="/Agreement/electronicSealAuthorizationAgreement">《电子签名授权书》</router-link></p>
      <p @click="agreeSeal" :style="{background:sealAgree?'#ff654f':'#999'}">我已知道并授权</p>
    </div>
    <div class="screen_cover" @touchmove.prevent  v-show="userInfo&&userInfo.caAuthorization!=1" ></div>
    <window-tips ref='windowTips'></window-tips>
    <!-- 标尺功能开发 -->
    <div class="rule" v-if="$route.query.subjectType!=4">
      <h3 class="borderBottom-1px">收益计算</h3>
      <p><span>出借金额（元）</span></p>
      <p><span>{{activeRuleMoney}}</span></p>
      <ul class="rule-select-list-content">
        <div class="active_line"></div>
        <div class="rule-swiper-container borderBottom-1px">
            <div class="swiper-wrapper">
                <div class="swiper-slide rule-line" :class="{'hight-line':index%10==0}" v-for="(item, index) in ruleLen" :key="index">
                  <span v-if="index%10==0" class="rule-scale">{{index*1000}}</span>
                </div>
            </div>
        </div>
      </ul>
      <div class="pre-gain">
        <div>预期收益（元）</div> 
        <div>{{interest}}</div> 
        <div style="margin-top:0.15rem;font-size:0.16rem">(此收益仅供参考，以实际收益为准)</div>
      </div>
    </div>
  </div>  
</template>

<script type="text/ecmascript-6">
import mheader from '@/components/header/header.vue'
import investDetailCard from '../../components/common/investmentDetailCard/investmentDetailCard.vue'
import { wapLjtcInvestDetail, wapCheDaiInvestDetail, wapLjqyInvestDetail, wapZrzqDetail, wapNewHandInvestDetail, updateCaAuthorization, calcIncome } from '@/server/getData.js'
import {mapState} from 'vuex'
import { getStore, setStore } from "@/config/mUtils";
import windowTips from '@/components/common/windowTips/windowTips.vue'
import Swiper from 'swiper'
import '@/style/swiper.min.css'
    
export default {
  data () {
    return {
      DetailData:'',//详情数据
      title:'',//标题
      canInvest:'1',//是否可以投标
      sealAgree:false,//电子签章协议
      borrowStatus:'',//借款状态(3,8)：已售完；4：还款中
      ruleLen:1,//标尺长度
      ruleSwiper:null,
      activeRuleMoney:0,
      noviceMsg:'',
      interest:'0.00',//预期收益
    };
  },
  mounted(){
    this.getDetailData();
  },
  computed: {
    ...mapState([
      'userInfo'
    ]),
  },
  methods: {
    go(path){
      this.$router.push({path:path});
    },
    agreeSeal(){
      if(!this.sealAgree){
        return;
      }
      let userId, token;
      updateCaAuthorization(userId=getStore('userId'),token=getStore('token')).then(res => {
        this.$refs.windowTips.toast('授权成功');
        this.$store.state.userInfo.caAuthorization = 1;
      }).catch((error)=>{
        console.log(error);
      });
    },
    getDetailData(){
      // subjectType 3 散标专区、subjectType 4 转让专区、subjectType 5 个人专区、subjectType 6 新手专区、subjectType 7 企业专区
      let borrowId, zrId, userId, type ,tem;
      if(this.$route.query.subjectType==3){ //散标专区
        this.title = '散标专区';
        wapLjtcInvestDetail(borrowId=this.$route.query.borrowId, userId=getStore('userId'), type).then(res => {
          if(res.data.code==1){
            this.DetailData = res.data.data;
            this.borrowStatus = res.data.data.borrowDetailMap.borrowStatus;
            tem = this.DetailData.borrowDetailMap.borrowAmount;
            this.ruleLen = Math.floor((Number(tem.replace(/,/g, ""))+1000)/1000);
            setTimeout(()=>{
              this.initRuleSwiper();
            },200)
          }else {
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      }else if(this.$route.query.subjectType==4){ //转让专区
        this.title = '转让专区';
        wapZrzqDetail(zrId=this.$route.query.borrowId, userId=getStore('userId')).then(res => {
          if(res.data.code==1){
            this.DetailData = res.data.data;
            this._calcIncome();
          }else {
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      }else if(this.$route.query.subjectType==5){ //个人专区
        this.title = '个人专区';
        wapCheDaiInvestDetail(borrowId=this.$route.query.borrowId, userId=getStore('userId'), type).then(res => {
          if(res.data.code==1){
            this.DetailData = res.data.data;
            this.borrowStatus = res.data.data.borrowDetailMap.borrowStatus;
            tem = this.DetailData.borrowDetailMap.borrowAmount;
            this.ruleLen = Math.floor((Number(tem.replace(/,/g, ""))+1000)/1000);
            setTimeout(()=>{
              this.initRuleSwiper();
            },200)
          }else {
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      }else if(this.$route.query.subjectType==6){ //新手专区
        this.title = '新手专区';
        wapNewHandInvestDetail(borrowId=this.$route.query.borrowId, userId=getStore('userId'), type).then(res => {
          if(res.data.code==1){
            this.DetailData = res.data.data;
            this.noviceMsg = res.data.data.noviceMsg;
            this.borrowStatus = res.data.data.borrowDetailMap.borrowStatus;
            this.canInvest = res.data.data.canInvest;
            tem = this.DetailData.borrowDetailMap.borrowAmount;
            this.ruleLen = Math.floor((Number(tem.replace(/,/g, ""))+1000)/1000);
            setTimeout(()=>{
              this.initRuleSwiper();
            },200)
          }else {
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      }else if(this.$route.query.subjectType==7){ //企业专区
        this.title = '企业专区';
        wapLjqyInvestDetail(borrowId=this.$route.query.borrowId, userId=getStore('userId'), type).then(res => {
          if(res.data.code==1){
            this.DetailData = res.data.data;
            this.borrowStatus = res.data.data.borrowDetailMap.borrowStatus;
            tem = this.DetailData.borrowDetailMap.borrowAmount;
            this.ruleLen = Math.floor((Number(tem.replace(/,/g, ""))+1000)/1000);
            setTimeout(()=>{
              this.initRuleSwiper();
            },200)
          }else {
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    goTransaction(){
      if(this.$store.state.userInfo){
        if(this.$store.state.userInfo.isOpenAcc==0){
          this.$refs.windowTips.toast('您还未开通存管账户，将为您跳到开通存管页面');
          setTimeout(()=>{
            this.$router.push('depositAccount');
          },1500)
        }else {
          setStore('DetailData',JSON.stringify(this.DetailData));
          this.$router.push(`investDetailTransaction?borrowId=${this.$route.query.borrowId}&subjectType=${this.$route.query.subjectType}`);
        }
      }else {
        this.$router.push('login');
      }
    },
    initRuleSwiper(){
      let self = this;
      this.ruleSwiper = new Swiper('.rule-swiper-container', {
        paginationClickable: true,//是否支持点击
        centeredSlides: true,//是否显示居中
        slideToClickedSlide:true,//是否点击居中
        speed: 300,
        touchRatio:0.5,
        longSwipesRatio : 0.1,
        threshold : 2,
        followFinger : true,
        slidesPerView: 30,
        spaceBetween: 0,
        centeredSlides: true,
        freeMode:false,
        freeModeSticky:false,
        initialSlide :0,//初始位置
        slideToClickedSlide:true,//是否点击居中
        observer:true,//修改swiper自己或子元素时，自动初始化swiper  
        observeParents:true,//修改swiper的父元素时，自动初始化swiper  
        onTransitionEnd: function(swiper){
          self.activeRuleMoney = swiper.realIndex*1000;
          console.log(self.activeRuleMoney);
          self._calcIncome(self.activeRuleMoney);
        }
      });
    },
    _calcIncome(Amt){
        let borrowId, investAmt, investId;
        if(this.$route.query.subjectType!=4){
          borrowId=this.$route.query.borrowId;
          investAmt = Amt;
        }else {
          investId=this.DetailData.investId;
        }
        calcIncome(borrowId, investAmt, investId).then(res => {
          if(res.data.code==1){
            this.interest = res.data.data.interest;
          }
        }).catch( (error) => {
          this.interest = 0;
          console.log(error);
        });
    }
  },
  components:{
    mheader,
    investDetailCard,
    windowTips
  },
  destroyed(){
    if(this.ruleSwiper){
      this.ruleSwiper.destroy();
    }
  }
}   
</script>
<style lang='less' scoped>

.investment-fade-enter-active, .investment-fade-leave-active {
    transition: .5s;
    transform: translateY(0);
}
.investment-fade-enter, .investment-fade-leave-active {
  transform: translateY(100%);
}



.overh {
  height: 100%;
  overflow: hidden;
}
.investDetail {
  min-height: 100%;
  width: 100%;
  box-sizing:border-box; 
  background: #f4f4f4;
  padding-top: 0.8rem;
  padding-bottom: 1.97rem;
  overflow: hidden;
  .transfer-amount {
    font-size: 0.3rem;
    display: block;
    display: flex;
    padding: 0.2rem 0;
    line-height: 0.35rem;
    background: #fff;
    margin-top: 0.2rem;
    >div {
      display: block;
      flex: 1;
      text-align: center;
      >p:nth-child(2){
        font-size: 0.14rem;
        color: #999;
      }
    }
  }
}
.lending-conditions {
  background: #fff;
  margin: 0.2rem 0;
  padding: 0.15rem 0;
  p {
    padding-left: 0.23rem;
    font-size: 0.20rem;
    line-height: 0.5rem;
  }
}
.other-detail-list {
  background: #ffffff;
  >div {
    display: block;
    display: flex;
    height: 0.88rem;
    line-height: 0.88rem;
    span:nth-child(1){
      display: block;
      padding-left: 0.24rem;
      font-size: 0.24rem;
      color: #222;
    }
    span:nth-child(2){
      display: block;
      padding-right: 0.24rem;
      flex: 1;
      font-size: 0.22rem;
      color: #999;
      text-align: right;
      i {
        padding-left: 0.3rem;
        font-size: 0.22rem;
      }
    }
  }
}
.investDetail-supplement {
  margin-top: 0.24rem;
  padding: 0 0.24rem;
  font-size: 0.2rem;
  line-height: 0.32rem;
  color: #999;
  a:nth-child(2){
    color: #fc9d14;
  }
}
.gotoLogin {
  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 0;
  height: 1.97rem;
  width: 100%;
  text-align: center;
  background: #ffffff;
  overflow: hidden;
  >div {
    height: 0.76rem;
    line-height: 0.76rem;
    font-size: 0.3rem;
    color: #ffffff;
    margin:0.5rem 0.24rem 0.2rem;
    border-radius: 0.76rem;
    background: #ff654f;
  }
  >p {
    font-size: 0.2rem;
    color: #ff654f;
  }
}
.investment {
  position: fixed;
  bottom: 0;
  left: 0;
  min-height: 1.5rem;
  width: 100%;
  z-index: 100;
  text-align: center;
  background: #ffffff;
  overflow: hidden;
  >div {
    height: 0.76rem;
    line-height: 0.76rem;
    font-size: 0.3rem;
    color: #ffffff;
    margin:0.3rem 0.24rem 0.22rem;
    border-radius: 0.76rem;
    background: #ff654f;
  }
  >p {
    text-align: center;
    font-size: 0.2rem;
    color: #999;
  }
}
.investment-input {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #f4f4f4;
  z-index: 1002;
  .account-money {
    li {
      display: block;
      display: flex;
      padding: 0 0.24rem;
      font-size: 0.24rem;
      background: #fff;
      height: 0.8rem;
      line-height: 0.8rem;
      .money {
        color: #ff654f;
      }
      >div:nth-child(2) {
        display: block;
        flex: 1;
        text-align: right;
        color: #4a97d2;
        padding-right: 0.2rem;
      }
    }
  }
  .account-transaction {
    margin-top: 0.2rem;
    li {
      display: block;
      display: flex;
      padding: 0 0.24rem;
      font-size: 0.24rem;
      background: #fff;
      height: 0.8rem;
      line-height: 0.8rem;
      .money {
        color: #ff654f;
      }
      >div:nth-child(2) {
        display: block;
        flex: 1;
        text-align: right;
        color: #4a97d2;
        padding-right: 0.2rem;
        input {
          height: 100%;
          line-height: 0.8rem;
          padding-left: 0.44rem;
          width: 100%;
        }
      }
    }
    .sele-welfare {
      div:nth-child(1){
        padding-right: 0.7rem;
        font-size: 0.25rem;
      }
      div:nth-child(2){
        text-align: left;
         font-size: 0.25rem;
         color: #000;
      }
      div i{
         font-size: 0.25rem;
         color: #ff654f;
      }
    }
    .available-redenvelopes {
      div:nth-child(2){
        padding-right: 0.24rem;
        flex: 1;
        font-size: 0.22rem;
        color: #999;
        text-align: right;
        i {
          padding-left: 0.3rem;
          font-size: 0.22rem;
        }
      }
    }
  }
  >p.agree {
    margin-top: 0.2rem;
    font-size: 0.24rem;
    padding-left: 0.24rem;
    i {
      font-size: 0.24rem;
      padding-right: 0.15rem;
      color: #ff654f;
    }
  }
  >p.welfare {
    margin-top: 0.2rem;
    font-size: 0.26rem;
    padding-left: 0.24rem;
    color: #8f8f94;
    text-align: center;
    span {
      color: #ff654f;
    }
  }
  >p.tip {
    text-align: center;
    font-size: 0.2rem;
    color: #999;
  }
  .investment-transaction {
    height: 0.76rem;
    line-height: 0.76rem;
    font-size: 0.3rem;
    color: #ffffff;
    margin:0.3rem 0.24rem 0.22rem;
    border-radius: 0.76rem;
    text-align: center;
    background: #ff654f;
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
// 选择福利
.investDetail .select-benefits {
  height: 7.5rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #f4f4f4;
  z-index: 1003;
  >div:nth-child(1){
    height: 2rem;
    line-height: 2rem;
    background: #fff;
    font-size: 0.23rem;
    text-align: center;
    margin-bottom: 0.2rem;
  }
  >div:nth-child(2){
    max-height: 4.6rem;
    overflow: auto;
    ul {
      li {
        display: block;
        display: flex;
        font-size: 0.23rem;
        min-height: 1.8rem;
        background: #fff;
        margin-bottom: 0.2rem;
        >div:nth-child(1){
          width: 30%;
          height: 100%;
          text-align: center;
          padding-top: 0.5rem;
          line-height: 0.4rem;
          >p:nth-child(1){
            color: #ff654f;
          }
        }
        >div:nth-child(2){
          display: block;
          flex: 1;
          height: 100%;
          padding-top: 0.3rem;
          line-height: 0.4rem;
          padding-bottom: 0.2rem;
          padding-right: 0.23rem;
        }
      }
      li.sele {
        border: 1px solid #ff654f;
        box-sizing:border-box; 
        background-image: url('./gouxuan.png');
        background-repeat: no-repeat;
        background-position: right bottom;
        background-size: 0.5rem 0.5rem;
      }
    }
  }
  .noSeleBenefits.sele {
    border: 1px solid #ff654f;
    box-sizing:border-box; 
    background-image: url('./gouxuan.png');
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: 0.5rem 0.5rem;
  }
  .seleCancel {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0.7rem;
    line-height: 0.7rem;
    background: #fff;
    font-size: 0.23rem;
    text-align: center;
  }
}
.electronic-seal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 4rem;
  height: 4.4rem;
  font-size: 0.2rem;
  background: #fff;
  z-index: 1002;
  padding: 0 0.5rem;
  border-radius: 0.1rem;
  img {
    display: block;
    margin: 0.5rem auto 0.4rem;
    width: 4.13rem;
    height: 0.63rem;
  }
  p:nth-child(2){
    line-height: 0.3rem;
  }
  .electronic-seal-agree {
    margin: 0.3rem 0;
    i {
      padding-right: 0.15rem;
      color: #ff654f;
      font-size: 0.2rem;
    }
    a {
      color: #ff654f;
    }
  }
  p:last-child {
    width: 70%;
    height: 0.7rem;
    margin: 0 auto;
    text-align: center;
    line-height: 0.7rem;
    border-radius: 1rem;
    color: #fff;
  }
}
.screen_cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}
.rule {
  background: #fff;
  margin-top: 0.2rem;
  >h3 {
    font-size: 0.25rem;
    padding: 0.25rem 0.23rem;
  }
  p:nth-child(2){
    font-size: 0.23rem;
    text-align: center;
    >span {
      display: inline-block;
      padding: 0.35rem 0 0.1rem;
      
    }
  }
  p:nth-child(3){
    font-size: 0.5rem;
    text-align: center;
    color: #ff5c5f;
    >span {
      display: inline-block;
      padding: 0.1rem 0 0.1rem 0;
      border-bottom: 1px dashed #dbdbdb;
    }
  }
  .rule-select-list-content {
    position: relative;
    height: 1.5rem;
    width: 100%;
    font-size: 0.14rem;
    color: #dbdbdb;
    background: #fff;
    .rule-swiper-container {
      height: 100%;
    }
    >.swiper-wrapper {
      height: 100%;
      >.swiper-slide {
        position: relative;
        height: 100%;
      }
    }
    .rule-line {
      height: 0.2rem;
      position: relative;
      bottom: -1.3rem;
      // background: #dbdbdb;
    }
    .rule-line:before {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      height: 100%;
      border-left: 1px solid #dbdbdb;
      content:'';
    }
    .rule-line:first-child{
      height: 0.4rem;
      margin-top: -0.2rem;
      > .rule-scale {
        position: absolute;
        top: -0.4rem;
        left: -0.05rem;
      }
    }
    .hight-line{
      height: 0.4rem;
      margin-top: -0.2rem;
    }
    .rule-scale {
      position: absolute;
      top: -0.4rem;
      left: -0.2rem;
    }
    .active_line {
      position: absolute;
      z-index: 10;
      width: 2px;
      height: 0.6rem;
      left: 48.4%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      top: 0.9rem;
      background: #ff5c5f;
    }
    .swiper-slide-active:before {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      height: 100%;
      // border-left: 1px solid red;
      content:'';
    }
  }
  .pre-gain {
    font-size: 0.23rem;
    background: #fff;
    padding: 0.25rem 0;
    text-align: center;
    div:nth-child(1){
      margin: 0.25rem 0 0.2rem;
    }
    div:nth-child(2){
      font-size: 0.3rem;
      color: #8FD1FF;
    }
  }
}
</style>