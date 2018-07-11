<template>
 <div class="myFriends">
    <mheader headTitle='我的好友' :goBack="'true'" class="borderBottom-1px">
      <router-link tag='div' to='rebatesRank' slot='right' class="right">返佣排行</router-link>
    </mheader>
    <div class="Placeholder"></div>
    <div class="frends-num">
      <ul>
        <li>
          <router-link to='myFriends' tag='span'>好友总人数</router-link>
          <router-link to='rebatesDetails' tag='span'>已赚佣金</router-link>
        </li>
        <li>
          <span><i>{{friendNum}}</i>&nbsp; 人</span>
          <span><i>{{totalCommissionAmt}}</i>&nbsp; 元</span>
        </li>
      </ul>
    </div>
    <div class="myFriends-recode">
      <div class="myFriends-recode-title">
        <div>好友</div>
        <div>注册日期</div>
        <div>返佣总额</div>
      </div>
      <div class="notData" v-if='noData'>暂无好友记录</div>
      <div class="myFriends-recode-list" ref="myFriendsRecode">
        <ul>
          <li v-for="(item, index) in friendRebate" :key='index'>
            <div>{{item.realName}}<br/><br/>{{item.cellPhone}}</div>
            <div>{{item.createTime}}</div>
            <div>{{item.commissionContribute}}元</div>
          </li>
        </ul>
      </div>
      <div class="loaded" v-if='isLoaded' style="font-size:0.18rem;padding:0.25rem 0;text-align:center;background:f5f5f5;color:#999;">已全部加载完</div>
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
import { queryFriendNewList } from "@/server/getData.js";
import wxApi from "@/server/wxapi.js";
import { getStore } from '@/config/mUtils';
import { mapState } from 'vuex';

export default {
  mixins:[wxApi],
  data () {
    return {
      friendNum:'',//好友人数
      totalCommissionAmt:'',//已赚佣金
      friendRebate:[],//好友记录对象数组
      weChatSharePrompt:false,//微信内分享提示
      browserSharePrompt:false,//浏览器内分享提示
      pageNum:1, //当前页 
      loaded: true, // 加载完成
      noData:false,//暂无相关记录
      isLoaded:false,//判断加载是否完成
     }
  },
  mounted(){
    this._queryFriendNewList();
    window.addEventListener("scroll", this._loadMore);
    this.wxRegister(this.wxRegCallback);
  },
  computed: {
    ...mapState([
        'userInfo'
    ])
  },
  methods:{
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
    _queryFriendNewList(){
      let token, userId, pageNum, pageSize;
      //邀请记录--好友列表
      queryFriendNewList(token=getStore('token'), userId=getStore('userId'),pageNum=this.pageNum,pageSize=20).then(res => {
        if(res.data.code==1){
          this.friendNum = res.data.data.totalMap.friendNum;
          this.totalCommissionAmt = res.data.data.totalMap.totalCommissionAmt;
          let len = this.friendRebate.length;
          this.friendRebate = this.friendRebate.concat(res.data.data.friendRebate);
          if (len == this.friendRebate.length) {
            this.loaded = false;
            this.isLoaded = true;
          } else {
            this.loaded = true;
          }
        }
        if(this.friendRebate.length==0){
          this.noData = true;
        } else {
          this.noData = false;
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
    },
    _loadMore() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.body.clientHeight;
      if(this.$refs.myFriendsRecode.offsetHeight-clientHeight<(Number(scrollTop)+10)&&this.loaded){
        this.loaded = false;
        this.pageNum++;
        this._queryFriendNewList();
      }
    },
  },
  components: {
     mheader
  },
  destroyed() {
    window.removeEventListener("scroll", this._loadMore);
  }
}
</script>

<style lang='less' scope>
.myFriends {
  box-sizing: border-box;
  background: #f4f4f4;
  padding: 3.2rem 0 0.8rem;
  min-height: 100%;
  width: 100%;
  .Placeholder{
    position: fixed;
    top: 0;
    height: 2.5rem;
    width: 100%;
    background: #f4f4f4;
    z-index: 2;
  }
  .frends-num {
    position: fixed;
    z-index: 3;
    top: 1rem;
    left: 0;
    width: 100%;
    height: 1.3rem;
    ul {
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
      li:nth-child(2){
        padding-top: 0.2rem;
        i {
          color: #FF6B2D;
          font-size: 0.3rem;
        }
      }
    }
  }
  .myFriends-recode {
    background: #fff;
    >h3 {
      margin:0 0.3rem;
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.2rem;
    }
    .myFriends-recode-title {
      position: fixed;
      z-index: 3;
      top: 2.5rem;
      width: 100%;
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.2rem;
      display: block;
      display: flex;
      background: #fff;
      >div {
        display: block;
        flex: 1;
        text-align: center;
      }
    }
    .myFriends-recode-list li{
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
  }
}
.right {
  font-size: 0.2rem;
  position: absolute;
  top:0;
  right:0.4rem;
  line-height: 0.8rem;
  color: #222;
}

.inviteFriends-enter {
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
.notData {
  font-size:0.18rem;
  text-align:center;
  padding:0.25rem 0;
}
</style>
