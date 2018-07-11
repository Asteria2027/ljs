<template>
  <div class="home">
    <mswiper :bannerData='IndexBannerData'></mswiper>
    <div class="announcement borderBottom-1px" v-if="announcementTitle&&hideAnnouncement==0">
      <span @click="$router.push(`/messageDetial/${messageid}?fromHome=1`)"><i class="iconfont icon-gonggaoguanli"></i>{{announcementTitle}}</span>
      <span @click="setHideAnnouncement" class="iconfont icon-guanbi"></span>
    </div>
    <div class="home-guide">
      <ul>
        <li @click="goPath('static/newGuide/newGuide.html','1')">
          <p><img src="./xszx.png"></p>
          <p>新手指引</p>
        </li>
        <router-link tag='li' to='infoDisclosure'>
          <p><img src="./xxpl.png"></p>
          <p>信息披露</p>
        </router-link>
        <router-link tag='li' to='inviteFriends'>
          <p><img src="./yqhy.png"></p>
          <p>邀请好友</p>
        </router-link>
        <router-link tag='li' to='onlineService'>
          <p><img src="./rgkf.png"></p>
          <p>在线客服</p>
        </router-link>
      </ul>
    </div>

    <div class="Popular" v-if='borrowId'>
      <img class="hot" src="./hot.png">
      <div class="the-term">{{deadline}}期限</div>
      <div class="rate">
        <!-- <span>15</span>%<span>~20</span>%  -->
        <div> <span> {{maxRate}}{{Number(addRate)>0?'+'+addRate:''}}<span style="font-size:0.3rem">%</span> <i v-if="coupon">{{coupon?'+'+coupon+'%':''}}&nbsp;{{month?month+'个月':''}}</i> </span> </div>
      </div>
      <p class="expected">预期年化收益</p>
      <div class="Popular-detail">
        <ul>
          <li>
            <div>{{investCount}}人</div>
            <div>已投人数</div>
          </li>
          <li>
            <div>{{leftInvestAmt}}元</div>
            <div>剩余</div>
          </li>
          <li>
            <div>{{minInvestAmt}}元</div>
            <div>起投金额</div>
          </li>
        </ul>
      </div>
      <div class="go-invest" @click='goinvestDetail'>立即投标</div>
      <div class="guarantee"><span class="icon-shouyexiaozianquan iconfont"></span>&nbsp;账户资金由浙商银行存管</div>
    </div>

    <div class="home-membership-report">
      <ul>
        <li>
          <p>已加入会员</p>
          <p>
            <span><i class="num">{{headDates&&headDates.userCount?headDates.userCount:'*'}}</i>人</span>
          </p>
        </li>
        <li>
          <p>累计为会员赚取</p>
          <p>
            <span><i class="num" v-if="moneyFormatYi">{{moneyFormatYi}}</i><i v-if="moneyFormatYi">亿</i><i class="num" v-if="moneyFormatWang">{{moneyFormatWang}}</i><i v-if="moneyFormatWang">万</i><i class="num">{{moneyFormatYuan?moneyFormatYuan:'*'}}</i><i>元</i></span>
          </p>
        </li>
        <li>
          <p>平台安全运营</p>
          <p><span class="num">{{headDates&&headDates.safeRunYears?headDates.safeRunYears:'*'}}</span>年<span class="num">{{headDates&&headDates.safeRunDays?headDates.safeRunDays:'*'}}</span>天</p>
        </li>
      </ul>
    </div>
    <div class="online-phone" @click="callPhone=true">
      拨打客服电话 400-867-9888
    </div>
    <div class="call" v-if="callPhone">
      <p>呼叫电话 400-867-9888</p>
      <p>（0755-88607525）</p>
      <div>
         <p>周一~周五： 09:00-20:00</p>
        <p>周六~周日： 09:00-12:00</p>
        <p>13:30-18:00</p>
      </div>
      <p class="borderTop-1px">
        <span @click="callPhone=false">取消</span>
        <span><a href="tel:400-867-9888">呼叫</a> </span>
      </p>
    </div>
     <div class="screen_cover" @touchmove.prevent v-if="callPhone"></div>
    <div class="home-Other-side">
      <a href="https://bank.uf-club.com/index.do">桌面版</a>
      <a onclick="window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.usky.ljspro'">下载APP</a>
    </div>
    <foot-guide></foot-guide>

  </div>
  
</template>

<script>
import footGuide from '@/components/footer/footGuide.vue'
import mheader from '@/components/header/header.vue'
import mswiper from '@/components/common/mswiper/mswiper.vue'
import investmentCard from '@/components/common/investmentCard/investmentCard.vue'
import { headDate, indexNewHandInfo, indexCheDaiInfo, indexLjqyInfo, indexLjtcInfo, getIndexBanner,indexBorrowDataInfo,getRecommendBorrow, queryLatestNews } from '@/server/getData.js'
import RemoteJs from '@/components/common/remoteJs/remoteJs'
import { mapState } from 'vuex'
import { getStore, setStore } from '@/config/mUtils';

export default {
  data () {
    return {
      menuShow:false,
      moneyFormat:'',//数据格式化
      IndexBannerData:[],//首页轮播图
      headDates:{ //首页头部会员数据
        userCount:'',
        webEarnedMoneyAmount:'',
        safeRunDays:'',
        safeRunYears:''
      },
      callPhone:false,
      wapNewHandListData:{}, //首页新手标数据
      indexCheDaiInfoData:{}, //首页个人专区车贷标
      indexLjqyInfoData:{}, //首页企业专区
      indexLjtcInfoData:{}, //首页散标
      wapIndexData:{}, //首页标的集合
      indexBorrowInfoData:{}, //首页标的数据展示
      moneyFormatYi:'',
      moneyFormatWang:'',
      moneyFormatYuan:'',
      deadline:'',
      maxRate:'',
      addRate:'',//新手标额外利率
      leftInvestAmt:'',
      minInvestAmt:'',
      investCount:'',
      borrowId:'',
	    coupon:'',//加息率
      month:'',//加息期限
      announcementTitle:'',//公告标题
      messageid:'',//公告id
      hideAnnouncement:getStore('hideAnnouncement')?getStore('hideAnnouncement'):'0',//是否隐藏公告
    };
  },
  mounted(){
    //首页轮播
    getIndexBanner().then(res => {
      if(res.data.code==1){
       this.IndexBannerData = res.data.data;
      }
    }).catch(function (error) {
      console.log(error);
    });
    //首页头部会员数据
    headDate().then(res => {
      if(res.data.code==1){
        this.headDates.userCount = res.data.data.userCount;
        this.headDates.webEarnedMoneyAmount = res.data.data.webEarnedMoneyAmount;
        this.headDates.safeRunDays = res.data.data.safeRunDays;
        this.headDates.safeRunYears = res.data.data.safeRunYears;
        this.moneyFormatYi = Math.floor(this.headDates.webEarnedMoneyAmount/100000000);
        this.moneyFormatWang = Math.floor(this.headDates.webEarnedMoneyAmount%100000000/10000);
        this.moneyFormatYuan =  this.headDates.webEarnedMoneyAmount%10000;
      }
    }).catch(function (error) {
      console.log(error);
    });

    let token,userId;
    //推荐标
    getRecommendBorrow(token=getStore('token'), userId=getStore('userId')).then(res => {
      if(res.data.code==1){
        this.deadline = res.data.data[0].deadline;
        this.maxRate = res.data.data[0].maxRate;
        this.addRate = res.data.data[0].addRate;
        this.leftInvestAmt = res.data.data[0].leftInvestAmt;
        this.minInvestAmt = res.data.data[0].minInvestAmt;
        this.investCount = res.data.data[0].investCount;
        this.borrowId = res.data.data[0].borrowId;
        this.subjectType = res.data.data[0].objectType;
        if(this.subjectType!=6&&this.subjectType!=4){
					this.coupon =res.data.data[0].activitys[0].coupon;
					this.month = res.data.data[0].activitys[0].month;
				}
      }
    }).catch((error) => {
      console.log(error);
    });
    this._queryLatestNews();
  },
  computed: {
    ...mapState([
      'userInfo'
    ]),
  },
  methods:{
    goPath(src,type){
      if(type==1){
        window.location.href = `${src}${this.$store.state.userInfo?"?isLogin=true":''}`;
      }
    },
    //点击图标刷新页面
    reload(){
        window.location.reload();
    },
    goinvestDetail(){
      if(this.borrowId&&this.subjectType){
        this.$router.push(`investDetail?borrowId=${this.borrowId}&subjectType=${this.subjectType}`);
      }
    },
    setHideAnnouncement(){
      if(getStore('hideAnnouncement')=='1'){
        this.hideAnnouncement = '0';
      }else {
        this.hideAnnouncement = '1';
      }
      setStore('hideAnnouncement',this.hideAnnouncement)
    },
    _queryLatestNews(){//获取首页公告
      let token,userId;
      queryLatestNews(token=getStore('token'), userId=getStore('userId')).then(res => {
        if(res.data.code==1){
          this.announcementTitle = res.data.data.title;
          this.messageid = res.data.data.id;
          if(getStore('messageid')&&getStore('messageid')!=this.messageid){
            setStore('hideAnnouncement',0);
            this.hideAnnouncement = 0;
          }
          setStore('messageid',this.messageid);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  components: {
    footGuide,
    mswiper,
    mheader,
    investmentCard,
    RemoteJs,
  },
}

</script>
<style lang='less' scoped>

.home {
  box-sizing:border-box;
  background: #f4f4f4;
  padding-bottom: 0.87rem;
  min-height: 100%;
  width: 100%;
}
.head_logo {
  width: 4.84rem;
  height: 0.59rem;
  background-image: url('./LOGO.png');
  background-repeat: no-repeat;
  background-size: 2.66rem 0.46rem;
  background-position:left center;
  position: absolute;
  top: 50%;
  left:0.3rem;
  transform: translateY(-50%);
}
.home_register {
  position: absolute;
  right:0.4rem;
  line-height: 0.8rem;
  font-size: 0.24rem;
  color: #222;
}
.head_memu {
  position: absolute;
  right:0.22rem;
  line-height: 0.8rem;
  font-size: 0.44rem;
  color: #222;
}
.announcement {
  display: block;
  display: flex;  
  padding: 0.25rem 0.25rem;
  background: #fff;
  >span:nth-child(1){
    display: block;
    flex: 1;
    font-size: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    i {
      font-size: 0.2rem;
      padding-right: 0.15rem;
      color: #FF654F;
    }
  }
  >span:nth-child(2){
    width: 0.7rem;
    text-align: center;
    font-size: 0.2rem;
    color: #999;
  }
}
.home-guide {
  background: #fff;
  padding: 0.3rem 0;
  ul {
    display: block;
    display: flex;
    li {
      display: block;
      flex: 1;
      text-align: center;
      p:nth-child(1){
        height: 0.62rem;
        width: 100%;
        margin-bottom: 0.2rem;
        img {
          display: block;
          margin: 0 auto;
          height: 0.62rem;
          width: 0.74rem;
        }
        >a {
          display: block;
          height: 100%;
          width: 100%;
          color: #000;
        }
      }
      p:nth-child(2){
        font-size: 0.2rem;
      }
    }
  }
}
.Popular {
  position: relative;
  margin: 0.2rem 0;
  padding: 0 0.23rem;
  background: #fff;
  font-size: 0.2rem;
  .hot {
    position: absolute;
    height: 0.7rem;
    width: 0.7rem;
    top: 0;
    left: 0.2rem;
  }
  .the-term {
    color: #999;
    text-align: center;
    padding: 0.5rem 0 0.3rem;
  }
  .rate {
    color: #F5C73E;
    text-align: center;
    >div {
      >span {
				position: relative;
        font-size: 0.7rem;
        color: #FF654F;
			}
      >span>i {
				position: absolute;
				top: 0;
				right: -1.1rem;
				font-size: 0.16rem;
				padding: 0.06rem 0.08rem 0.1rem;
				text-align: center;
				color: #F5C73E;				
				background: url('./jiaxi.png') no-repeat;
        background-size: 100% 100%;
			}
    }
  }
  .expected {
    color: #999;
    text-align: center;
    padding: 0.2rem 0;
  }
  .Popular-detail {
    ul {
      display: block;
      display: flex;
      padding: 0.25rem 0;
      li {
        display: block;
        flex: 1;
        >div:nth-child(1){
          font-size: 0.3rem;
        }
        >div:nth-child(2){
          font-size: 0.18rem;
          color: #999;
          margin-top: 0.1rem;
        }
      }
      li:nth-child(2) {
        text-align: center;
      }
      li:nth-child(3) {
        text-align: right;
      }
    }
  }
  .go-invest {
    height: 0.7rem;
    line-height: 0.7rem;
    width: 90%;
    margin: 0 auto 0.1rem;
    color: #fff;
    font-size: 0.35rem;
    text-align: center;
    background: #FF654F;
    border-radius: 0.5rem;
  }
  .guarantee {
    text-align: center;
    color: #999;
    padding-bottom: 0.2rem;
    >span {
      color: #5BE750;
    }
  }
}
.home-membership-report {
  background: #ffffff;
  margin-bottom: 0.2rem;
  ul {
    width: 100%;
    padding: 0.25rem 0;
    display: block;
    display: flex;
    color: #999;
    text-align: center;
    li {
      display: block;
      flex: 1;
      >p:nth-child(1){
        font-size: 0.16rem;
        margin-bottom: 0.16rem;
      }
      >p:nth-child(2){
        font-size: 0.23rem;
      }
      .num {
        color: #fe9a15;
      }
    }
    // li:nth-child(1){
    //   border-right: 1px solid #f5f5f5;
    // }
  }
}
.online-phone {
  margin:0.3rem 0 0.1rem;
  text-align: center;
  color: #8FD1FF;
  font-size: 0.2rem;
}
.call {
  position: fixed;
  z-index: 1002;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  height: 3rem;
  width: 5rem;
  border-radius: 0.1rem;
  background: #fff;
  font-size: 0.25rem;
  text-align: center;
  line-height: 0.3rem;
  >p:nth-child(1){
    margin: 0.25rem 0;
  }
  >p:nth-child(2){
    margin-bottom: 0.25rem;
  }
  >div {
    color: #999;
    text-align: right;
    padding-right: 20%;
  }
  >p:last-child {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.7rem;
    line-height: 0.7rem;
    >span {
      display: block;
      height: 100%;
      width: 47%;
      float: left;
      >a {
        color: #000;
      }
    }
    >span:nth-child(1) {
      border-right: 1px solid #f5f5f5;
    }
  }
}
.home-Other-side {
  display: block;
  display: flex;
  height: 0.75rem;
  padding: 0.05rem 0;
  line-height: 0.8rem;
  text-align: center;
  font-size: 0.22rem;
  color: #e25353;
  >a {
    display: block;
    flex: 1;
    color: #e25353;
  }
  >a:nth-child(1) {
    border-right: 1px solid #F4F4F4;
  }
}
.home-information {
  display: block;
  display: flex;
  width: 100%;
  height: 0.7rem;
  line-height: 0.7rem;
  font-size: 0.24rem;
  background: #ffffff;
  margin-bottom: 0.2rem;
  overflow: hidden;
  text-align: center;
  >div {
    display: block;
    flex: 1;
    span:nth-child(1) {
      font-size: 0.24rem;
      padding-right: 0.1rem;
      color: rgb(70, 181, 252);
    }
    &:first-child {
      border-right: 1px solid #F4F4F4;
        span:nth-child(1) {
          color: rgb(252, 186, 96);
        } 
    }
  }
}
.home_card {
  margin-bottom: 0.2rem;
}
.screen_cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1001;
}
</style>
