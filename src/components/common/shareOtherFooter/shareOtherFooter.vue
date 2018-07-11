<template>
  <div class="shareOtherFooter">
    <div class="weChatShare" @touchmove.prevent v-if='weChatSharePrompt'>
      <div class="quxian"><img src="./quxian.png"></div>
      <div>
        <div>点击右上角分享给朋友圈！</div>
        <div>1、点击右上角&nbsp;<img src="./sandian.png" alt=""></div>
        <div>2、点击&nbsp;<img src="./my-WeChat@2x.png" alt="">&nbsp;发送给朋友</div>
        <div>3、或点击&nbsp;<img src="./my-Circle@2x.png">&nbsp;分享到朋友圈</div>
      </div>
      <div class="weChatShare-close" @click='weChatSharePrompt=false;showintroduceCover=false'><img src="./cha.png"></div>
    </div>
    <div class="browserShare" @touchmove.prevent v-if='browserSharePrompt'>
      <div>您好，请在微信中关注公众号: '联金所服务号'，</div>
      <div>在微信中进行邀请好友操作。</div>
      <div class="browserShare-close" @click='browserSharePrompt=false;showintroduceCover=false'><img src="./cha.png"></div>
    </div>
    <transition name="share-menu-fade" mode="out-in">
      <div class="share-footer" v-if="shareFooter" @touchmove.prevent>
        <ul>
          <li @click='shareWeiXin'><img src="./my-WeChat@2x.png" alt=""></li>
          <li @click='shareWeiXin'><img src="./pyq.png" alt=""></li>
          <li @click="OtherShare('sina')"><img src="./weibo.png" alt=""></li>
          <li @click="copyLink" class="tag-read" :data-clipboard-text="copyText"><img src="./copy.png" alt=""></li>
        </ul>
        <div class="borderTop-1px" @click="showintroduceCover=false;shareFooter=false">
          取消
        </div>
      </div>
    </transition>
    <div class="screen_cover" v-if="showintroduceCover" @touchmove.prevent></div>
    <div class="inviteFriends-enter" @click="showFooter">邀请好友赚取佣金</div>
  </div>
</template>

<script>
import wxApi from "@/server/wxapi.js";
import { getStore } from '@/config/mUtils';
import { mapState } from 'vuex';
import Clipboard from 'clipboard';

  export default {
    mixins:[wxApi],
    data(){
      return {
        showintroduceCover:false,//弹窗显示
        weChatSharePrompt:false,//微信内分享提示
        browserSharePrompt:false,//浏览器内分享提示
        shareFooter:false,//分享弹窗
        shareObj:{},
        copyText:'',//复制内容
        clipboard:null,
      }
    },
    mounted(){
      this.wxRegister(this.wxRegCallback);
      this.clipboard = new Clipboard('.tag-read')  
      this.clipboard.on('success', e => {  
        alert('复制成功')
      })  
      this.clipboard.on('error', e => {  
        // 不支持复制  
        alert('该浏览器不支持自动复制');
        // 释放内存  
        this.clipboard.destroy();  
      })  
      setTimeout(()=>{
        if(this.$store.state.userInfo){
          this.copyText = location.origin+'/wapfront/register?serviceNo='+this.$store.state.userInfo.serviceNo;
        }
      },1000)
      setTimeout(()=>{
        this.shareObj = {
          Title:'联金所是一家知名风投+上市公司+行业专家三方投标的互联网金融平台,100元起投，资金全程银行存管，安全透明，投标更安心。',
          Image:'https://www.uf-club.com/images/wap/base/reg_hongbao.png',
          Content:'联金所是一家知名风投+上市公司+行业专家三方投标的互联网金融平台,100元起投，资金全程银行存管，安全透明，投标更安心。',
          Url:location.origin+'/wapfront/register?serviceNo='+this.$store.state.userInfo.serviceNo
        }
      },1000)
    },
    methods:{
      copyLink(){
        if(!this.$store.state.userInfo){
          alert('您还未登录，请登录');
          this.$router.push('login');
          return;
        }
        this.shareFooter=false;
        this.showintroduceCover = false;
      },
      showFooter(){
        this.showintroduceCover=true;
        this.shareFooter=true
      },
      OtherShare(Type){
        if(!this.$store.state.userInfo){
          alert('您还未登录，请先登录');
          this.$router.push('login');
          return;
        }
        this.shareFooter=false;
        this.showintroduceCover = false;
        this.shareys(Type, this.shareObj.Url, this.shareObj.Title, this.shareObj.Image, this.shareObj.Content);
      },
      shareys(type, url, title, img, content){
        switch (type) {
          case "sina":
              url = "http://service.weibo.com/share/share.php?title=" + encodeURIComponent(title) + '&pic=' + img+ '&url=' + url;
              window.open(url);
              break;
          default:
              break;
        }
      },
      wxRegCallback () {
        this.wxShare();
      },
      wxShare () {
        let opstion = {
          title: this.shareObj.Title, // 分享标题
          link: this.shareObj.Url, // 分享链接
          imgUrl: this.shareObj.Image,// 分享图标
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
      shareWeiXin(){
        if(!this.$store.state.userInfo){
          alert('您还未登录，请先登录');
          this.$router.push('login');
          return;
        }
        this.shareFooter=false;
        if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
          this.weChatSharePrompt = true;
        }else {
          this.browserSharePrompt = true;
        }
      }
    },
    destroyed(){
      this.clipboard.destroy();
    }
  }
</script>

<style lang='less' scope>
.share-menu-fade-enter-active, .share-menu-fade-leave-active {
  transition: .5s;
  transform: translateY(0);
}
.share-menu-fade-enter, .share-menu-fade-leave-active {
  transform: translateY(100%);
}
.shareOtherFooter {
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
    z-index: 1003;
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
    z-index: 1003;
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
  .share-footer {
    position: fixed;
    width: 100%;
    height: 2rem;
    left: 0;
    bottom: 0;
    z-index: 1002;
    background: #fff;
    ul {
      display: block;
      display: flex;
      height: 1.3rem;
      li {
        display: block;
        flex: 1;
        text-align: center;
        padding: 0.25rem 0;
        img {
          height: 0.8rem;
          width: 0.8rem;
        }
      }
    }
    >div {
      font-size: 0.23rem;
      text-align: center;
      padding: 0.25rem 0;
    }
  }
}

</style>
