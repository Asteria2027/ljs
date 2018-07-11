<template>
  <div class="InviteFriendsToGifts">
    <div class="banner">
      <img src="./wap_partnership_page1.png" alt="">
    </div>
    <div class="first-gifts">
      <span class="title" @click="isShowFirstRule=!isShowFirstRule">规则详情</span>
      <ul>
        <li>
          <div>
            <span>10元</span>
            <span>红包</span>
          </div>
          <div>500元≤被邀请人首笔或第二笔投标&lt;10000元</div>
        </li>
        <li>
          <div>
            <span>50元</span>
            <span>红包</span>
          </div>
          <div>被邀请人首笔或第二笔投标≥10000元</div>
        </li>
      </ul>
      <div class="rule-description" v-show='isShowFirstRule'>
        <img src="./partshipt_dsj.png" alt="">
        <p>1.您邀请的好友前2笔投标达到相应金额，即可获得相应的红包奖励，限前2笔投标。
          <br>a、500元≤被邀请人首笔或者第二笔投标&lt;10000元，奖励邀请人10元红包。
          <br>b、被邀请人首笔或者第二笔投标≥10000元，奖励邀请人50元红包。
        </p>
        <p>2.邀请一位好友最多可获得100元现金，两位好友最多可获得200元现金，三位好友最多可获得300元现金，多邀多得，不设上限。</p>
        <p>3.被邀请人投标项目：除转让专区外的其他项目。</p>
        <p>4.推荐人的抵扣红包在好友投标当日发放，有效期为15天，在<span style="color:#ffb719;">【我的账户-我的福利-红包】</span>查看，逾期红包将失效。</p>
        <p>5.邀请红包在普通版与存管版的区别
          <br>邀请好友在普通版或存管版注册后，2018年5月22日起通过综合存管版和普通版的投标笔数进行红包发放判断，当被推荐人在存管版投标符合条件后，推荐人就可在存管版获得10或50元红包奖励；<br>好友在普通版的投标，推荐人没有红包奖励，但佣金收益照常发放。</p>
      </div>
    </div>
    <div class="second-gifts">
      <span class="title" @click="isShowFirstRule2=!isShowFirstRule2">规则详情</span>
      <div>佣金新规则从2017年12月8日开始施行</div>
      <img src="./commission.png" alt="">
      <div>注册即可成为联金理财师，获取好友投标最高1%佣金收益</div>
      <div class="rule-description2" v-show='isShowFirstRule2'>
        <img class="dsj" src="./partshipt_dsj.png" alt="">
				<p>1.个人注册即可成为联金理财师，获取好友投标最高1%佣金收益，等级越高收益越高。普通版和存管版所邀请的好友是同步的，且好友在两个版本的投标都有佣金收益。</p>
				<p>2.佣金适用所有产品。</p>
				<p>3.佣金计算方式：
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;佣金按日统计，被推荐人投标成功时按日返还至推荐人账户。
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;佣金=所有被推荐人的总待收*佣金系数/365。
				</p>
				<p>4.推荐人佣金系数与自身在投本金相关，个人在投本金取两个版本（普通版和存管版）的在投本金之和，佣金收益在各自版本发放。推荐人个人在投本金对应佣金系数参考下表。
					<br>(备注：每天00:30根据个人当前在投本金更新当天佣金系数，邀请人返佣系数以邀请人最新待收的计息日的次日为准；邀请人与被邀请人的首笔投标计息日不能为同一天，且邀请人的投标计息日须在被邀请人投标的前一天。)
				</p>
				<div>
					<table cellspacing="0">
						<tbody><tr>
							<td>联金理财师等级</td>
							<td>个人在投本金（X）<br>好友总在投本金（Y）</td>
							<td>佣金系数</td>
						</tr>
						<tr>
							<td>理财师Lv1</td>
							<td>1w≤X&lt;5w<br>或Y≥10W,且在投好友数≥5</td>
							<td>0.3%</td>
						</tr>
						<tr>
							<td>理财师Lv2</td>
							<td>5W≤X&lt;20W<br>或Y≥30W,且在投好友数≥5</td>
							<td>0.5%</td>
						</tr>
						<tr>
							<td>理财师Lv3</td>
							<td>20W≤X&lt;50W<br>或Y≥80W,且在投好友数≥8</td>
							<td>0.8%</td>
						</tr>
						<tr>
							<td>理财师Lv4</td>
							<td>X≥50W<br>或Y≥180W,且在投好友数≥8</td>
							<td>1%</td>
						</tr>
					</tbody></table>
				</div>
				<p>5.自“理财师”上线之日起，平台老用户原有的邀请的人数不会清零，佣金计算规则直接沿用新规则。</p>
				<p>6.佣金新规则从2017年12月8日开始实行，2017年12月8日前仍按原来规则计算佣金收益。</p>
				<p>7.邀请的好友在存管版投标返佣到存管版，在普通版投标的返佣到普通版。</p>
      </div>
    </div>
    <div class="invite-friends">
      <p>1.被邀请人在pc端或app端直接注册时填写邀请人服务号/手机号码；</p>
			<p>2.通过邀请人分享的邀请链接注册；</p>
			<p class="p_thin">点击一下按钮分享链接给好友，或者下载 <span>"联金所APP"</span>进入<span>【我的账户】-【邀请好友】</span>，把邀请链接发给好友即可。</p>
			<p>3.微信关注“联金所服务号”，点击菜单栏【领取福利】-【生成专属推广海报】，分享 “专属海报”给好友，好友扫海报的二维码注册即可。</p>
			<img class="fwh" src="./wechat_donwewm_fwh.png">
			<p>4.填补推荐人（若被邀请人已注册，但未关联上邀请人，可在app端进行填补：账户-设置-我的推荐人处填补邀请人服务号/手机号码）。</p>
    </div>
    <div class="invite-friends2">
      <div>
        <span>注册即送668元红包</span>
      </div>
    </div>
    <div class="footer">
      <img src="./wap_partnership_page6.png" alt="">
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
    <div class="screen_cover" v-if="showintroduceCover" @touchmove.prevent></div>
     <div class="inviteFriends-enter" @click='share' v-if='userInfo'>邀请好友赚取佣金</div>
  </div>
</template>

<script>

import wxApi from "@/server/wxapi.js";  
import { mapState } from 'vuex';

  export default {
    mixins:[wxApi],
    data () {
      return {
        isShowFirstRule:false,
        isShowFirstRule2:false,
        showintroduceCover:false,//弹窗显示
        weChatSharePrompt:false,//微信内分享提示
        browserSharePrompt:false,//浏览器内分享提示
      }
    },
    mounted(){
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
      share(){
        if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
          this.weChatSharePrompt = true;
        }else {
          this.browserSharePrompt = true;
        }
      }
    }
  }
</script>

<style lang='less' scope>
.InviteFriendsToGifts {
  padding-bottom: 0.6rem;
  width: 100%;
  box-sizing:border-box; 
  background: #f5f5f5;
  .banner {
    width: 100%;
    height: 3.42rem;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .first-gifts {
    position: relative;
    width: 100%;
    height: 4.6rem;
    background: url('./wap_partnership_page2.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    text-align: center;
    font-size: 0.2rem;
    .title {
      margin-top: 1rem;
      display: inline-block;
      width: 1.9rem;
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.2rem;
      border-radius: 0.2rem;
      color: #ee4419;
      background-color: #fee479;
    }
    ul:nth-child(2){
      display: block;
      display: flex;
      li {
        display: block;
        flex: 1;
        >div:nth-child(1){
          position: relative;
          margin: 0.1rem auto 0.2rem;
          height: 2.22rem;
          width: 2.22rem;
          background: url('./wap_redPacket.png') no-repeat;
          background-size: 100% 100%;
          span:nth-child(1){
            position: absolute;
            top: 1.1rem;
            left: 0.7rem;
            font-size: 0.35rem;
            color: #fdfaa8;
          }
          span:nth-child(2){
            position: absolute;
            top: 1.9rem;
            left: 0.9rem;
            font-size: 0.16rem;
            color: #e9390d;
          }
        }
        >div:nth-child(2){
          color: #e9390d;
          line-height: 0.3rem;
        }
      }
    }
  }
  .second-gifts {
    position: relative;
    width: 100%;
    min-height: 7.27rem;
    background: url('./wap_partnership_page3.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    text-align: center;
    font-size: 0.2rem;
    .title {
      margin-top: 1.2rem;
      display: inline-block;
      width: 1.9rem;
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.2rem;
      border-radius: 0.2rem;
      color: #ee4419;
      background-color: #fee479;
    }
    div:nth-child(2){
      padding: 0.25rem 0;
    }
    >img {
      width: 5.92rem;
      height: 5.13rem;
    }
    div:nth-child(4){
      padding: 0.5rem 0;
    }
  }
  .invite-friends {
    width: 100%;
    min-height: 5.55rem;
    background: url('./wap_partnership_page4.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
    font-size: 0.2rem;
    p:nth-child(1){
      padding-top: 1.2rem;
    }
    p {
      line-height: 0.35rem;
      padding-left: 0.25rem;
      padding-right: 0.25rem;
      text-align: left;
      color: #fff;
    }
    >img {
      padding-left: 0.25rem;
    }
  }
  .invite-friends2 {
    width: 100%;
    min-height: 4.94rem;
    background: url('./wap_partnership_page5.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
    font-size: 0.2rem;
    >div {
      height: 1.23rem;
      padding-top: 1.8rem;
      width: 2.96rem;
      margin: 1.5rem auto 0;
      text-align: center;
      background: url(./redPacket02.png) no-repeat;
      background-size: 100% 100%;
      >span {
        color:#fce48b;
      }
    }
  }
  .footer {
    >img {
      height: 4.44rem;
      width: 100%;
    }
  }
  .rule-description {
    position: absolute;
    z-index: 100;
    top: 1.6rem;
    left: 50%;
    transform: translateX(-50%);
    width: 5.5rem;
    font-size: 0.2rem;
    background:#974224;
    color: #fff;
    line-height: 0.3rem;
    border-radius: 0.1rem;
    padding: 0.2rem;
    text-align: left;
    >img {
      width: 0.24rem;
      height: 0.14rem;
      position: absolute;
      top: -0.1rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .rule-description2 {
    position: absolute;
    z-index: 100;
    top: 1.8rem;
    left: 50%;
    transform: translateX(-50%);
    width: 5.5rem;
    font-size: 0.2rem;
    background:#974224;
    color: #fff;
    line-height: 0.3rem;
    border-radius: 0.1rem;
    padding: 0.2rem;
    text-align: left;
    >img {
      width: 0.24rem;
      height: 0.14rem;
      position: absolute;
      top: -0.1rem;
      left: 50%;
      transform: translateX(-50%);
    }
    table {
      margin: 0.1rem auto 0.1rem;
      color: #dc7c27;
      text-align: center;
      td {
        width: 1.77rem;
        height: 0.4rem;
        background-color: #fff;
        border: 1px solid #e9c99c;
      }
    }
  }
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
