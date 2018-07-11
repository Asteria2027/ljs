<template>
  <div class="myWelfare">
    <mheader headTitle='我的福利' :goBack="'true'"  class="borderBottom-1px"></mheader>
    <div class="myWelfare-title">
      <ul>
        <li :class="{'colring':sele==1}" @click='sele=1;pageNum=1;redList=[];_queryRedEnvelopeList();'>红包</li>
        <li :class="{'colring':sele==2}" @click='sele=2;pageNum=1;couponList=[];_queryCouponNewList();'>奖励券</li>
      </ul>
    </div>
    <div class="red-envelope" v-if='sele==1'>
      <ul ref="ulWap">
        <li v-for="(item,index) in redList" :key='index'  @click="_redEnvelopeCashBack(item.status,item.activityType,item.id,item.awardMoney,index)">
          <h3 class="borderBottom-1px">{{item.activityType}}<span class="envelope-money">{{item.awardMoney}}</span><span>元</span></h3>
          <div class='red-status'>
            <img v-if="item.status=='EXPIRE'" src="./my_welfare_expire.png" alt="">
            <img v-if="item.status=='USED'||item.status=='ACTIVING'||item.status=='FREEZE'" src="./my_welfare_used.png" alt="">
            <img v-if="item.status=='UNUSED'||item.status=='LOCK'" src="./weishiyong.png" alt="">
            <img v-if="(item.status=='UNUSED'||item.status=='LOCK')&&item.activityType=='现金红包'" src="./weilingqu.png" alt="">
          </div>
          <div class='instructions'>
            <div class='cash-bonus' v-if="item.activityType=='现金红包'">
              <img src="./Cashbonus.png" alt="">
            </div>
            <div class='instructions-con'>
              <p v-if="item.activityType=='现金红包'">拆红包，现金即刻到帐</p>
              <p>有效期至： {{item.expireDate}}</p>
              <p v-if="item.activityType!='现金红包'">使用项目： {{item.useruleProductType}}</p>
              <p v-if="item.activityType!='现金红包'">使用要求： 单笔投标满{{item.useruleAmt}}元且投标期限满{{item.userulePeriod}}个月</p>
              <p v-if="item.activityType!='现金红包'">来源：  {{item.resourceType}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="reward-ticket" v-if='sele==2'>
      <router-link tag='div' to="rewardRecord" class="income">
        <p>已获奖励收益：{{couponEarningSum}}元</p>
        <p>奖励收益包含使用奖励券及投标奖励标的收益，点击查看明细<span class="iconfont icon-more"></span></p>
      </router-link>
      <ul ref="ulWap">
        <li v-for="(item,index) in couponList" :key='index'>
          <h3 class="borderBottom-1px">奖励<span class="envelope-money">{{item.PLUS_COUPON_PER}}</span><span>%</span></h3>
          <img v-if="item.STATUS=='EXPIRE'" src="./my_welfare_expire.png" alt="">
          <img v-if="item.STATUS=='USED'||item.STATUS=='ACTIVING'||item.STATUS=='FREEZE'" src="./my_welfare_used.png" alt="">
          <img v-if="item.STATUS=='UNUSED'||item.STATUS=='LOCK'" src="./weishiyong.png" alt="">
          <p>有效期至： {{item.END_DATE}}</p>
          <p>使用项目： {{item.PROD}}</p>
          <p>使用要求： 单笔投标满{{item.USERULE_AMT}}元且投标期限满{{item.USERULE_PERIOD}}个月</p>
          <p>奖励期限:  {{item.PLUS_COUPON_PERIOD_STR}}</p>
          <p>来源：  {{item.USE_SCENES_STR}}</p>
        </li>
      </ul>
    </div>
    <div class="RedEnvelopes" v-if="openRedEnvelopes">
      <div>
        <span></span>
        <span>现金红包砸中你</span>
        <span></span>
      </div>
      <div><span>{{awardMoney}}</span>元</div>
      <div>
        红包领取成功后，将提交银行处理
      </div>
      <div>预计15分钟到帐</div>
      <img src="./cha.png" alt="" @click="openRedEnvelopes=false">
    </div>
    <div class="screen_cover" v-if="openRedEnvelopes" @touchmove.prevent></div>
    <not-data v-if='noData'>
      <div slot='hint' class='noWelfare'>暂无{{`${sele==1?'红包':'奖励券'}`}}</div>
      <div slot='hint' class='noWelfare'>参与活动可获得，请密切关注平台活动</div>
    </not-data>
  </div>                     
</template>  

<script>

import mheader from '@/components/header/header.vue'
import notData from '../../components/common/notData/notData.vue'
import { queryRedEnvelopeList, queryCouponNewList, redEnvelopeCashBack } from "@/server/getData.js";
import { getStore } from "@/config/mUtils";

export default {
  data () {
    return {
      sele:1,
      redList:[],
      couponList:[],
      pageNum:1, //当前页
      loaded:true, // 加载完成
      noData:false,
      openRedEnvelopes:false,//拆红包
      couponEarningSum:'0',
      awardMoney:'',//红包金额
    };
  },
  mounted(){
    if(this.sele==1){
     this._queryRedEnvelopeList();
    }else if(this.sele==2){
      this._queryCouponNewList();
    }
    // window.addEventListener('scroll', this._loadMore);
  },
  methods:{
    _queryRedEnvelopeList(){
      let token, userId, pageSize, pageNum;
      // 我的投标列表
      queryRedEnvelopeList((token = getStore("token")),(userId = getStore('userId')),pageNum=this.pageNum,pageSize=20).then(res => {
          if(res.data.code==1){
            let len = this.redList.length;
            this.redList = this.redList.concat(res.data.data.redList);
            if (len == this.redList.length) {
              this.loaded = false;
            } else {
              this.loaded = true;
            }
          }
          if(this.redList.length==0){
            this.noData = true;
          }else {
            this.noData = false;
          }
      }).catch((error)=>{
          console.log(error); 
      });
    },
    _queryCouponNewList(){
      let token, userId, pageSize, pageNum;
      queryCouponNewList((token = getStore("token")),(userId = getStore('userId')),pageNum=this.pageNum,pageSize=20).then(res => {
          if(res.data.code==1){
            this.couponEarningSum = res.data.data.couponEarningSum;
            let len = this.couponList.length;
            this.couponList = this.couponList.concat(res.data.data.couponList);
            if (len == this.couponList.length) {
              this.loaded = false;
            } else {
              this.loaded = true;
            }
          }
          if(this.couponList.length==0){
            this.noData = true;
          }else {
            this.noData = false;
          }
      }).catch((error)=>{
          console.log(error); 
      });
    },
    _redEnvelopeCashBack(status,activityType,id,awardMoney,index){
      if((status=='UNUSED'||status=='LOCK')&&activityType=='现金红包'){
        let token, userId, redId;
        redEnvelopeCashBack((token = getStore("token")),(userId = getStore('userId')),redId=id).then(res => {
            if(res.data.code==1&&res.data.data.result==20){
              this.openRedEnvelopes = true;
              this.awardMoney = awardMoney;
              this.redList.splice(index,1);
            }else {
              alert(res.data.msg)
            }
        }).catch((error)=>{
            console.log(error); 
        });
      }
    },
    // _loadMore(){
    //   let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    //   let clientHeight = document.body.clientHeight;
    //   if(this.$refs.ulWap.offsetHeight-clientHeight<(Number(scrollTop)+10)&&this.loaded){
    //     this.loaded = false;
    //     this.pageNum++;
    //     if(this.sele==1){
    //       this._queryRedEnvelopeList();
    //     }else if(this.sele==2){
    //       this._queryCouponNewList();
    //     }
    //   }
    // }
  },
  components:{
    mheader,
    notData
  },
  // destroyed () {
  //   window.removeEventListener('scroll', this._loadMore)
  // },
}

</script>
<style lang='less' scoped>
.myWelfare {
  box-sizing: border-box;
  background: #f4f4f4;
  padding-top: 1.6rem;
  min-height: 100%;
  width: 100%;
}
.myWelfare-title {
  position: fixed;
  top: 0.8rem;
  left: 0;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.24rem;
  z-index: 1;
  ul {
    display: block;
    display: flex;
    height: 0.8rem;
    background: #fff;
    border-radius: 0.1rem;
    overflow: hidden;
    li {
      display: block;
      flex: 1;
      text-align: center;
    }
    li.colring {
      box-sizing: border-box;
      color: #FFB046;
      border-bottom: 1px solid #FFB046;
    }
  }
}
.myWelfare .red-envelope {
  font-size: 0.2rem;
  ul {
    margin-top: 0.2rem;
    li {
      position: relative;
      padding:0 0.23rem;
      background: #fff;
      background-image: url('./bolang.png');
      background-repeat: no-repeat;
      background-position: bottom;
      background-size: 100% 0.2rem;
      h3 {
        height: 0.8rem;
        line-height: 0.8rem;
        margin-bottom: 0.2rem;
        .envelope-money {
          font-size: 0.4rem;
          color: #FFB046;
          margin-left: 0.2rem;
        }
        span:last-child {
          color: #FFB046;
        }
      }     
      .cash-bonus {
        height:100%;
        width:0.8rem;
        margin-right:0.2rem;
        img {
          width:100%;
          height:auto;
          margin-bottom: 0.4rem;
        }
      }
      .instructions {
        display:block;
        display:flex;
        .instructions-con {
          display:block;
          flex:1;
          p {
          line-height: 0.4rem;
          color: #999;
           }
          p:last-child {
            padding-bottom: 0.4rem;
          }
        }
        
      }
      .red-status>img {
        position: absolute;
        top: 0;
        right: 0.23rem;
        width: 0.8rem;
        height: 0.4rem;
      }
    }
  }
}
.myWelfare .reward-ticket {
  font-size: 0.2rem;
  >.income {
    background: #fff;
    line-height: 0.3rem;
    margin-top: 0.2rem;
    padding: 0.2rem 0.23rem;
    span {
      font-size: 0.2rem;
    }
    p:first-child {
      font-weight: bold;
    }
    p:nth-child(2){
      color: #999;
    }
  }
  ul {
    margin-top: 0.2rem;
    li {
      position: relative;
      padding:0 0.23rem;
      background: #fff;
      background-image: url('./bolang.png');
      background-repeat: no-repeat;
      background-position: bottom;
      background-size: 100% 0.2rem;
      h3 {
        height: 0.8rem;
        line-height: 0.8rem;
        margin-bottom: 0.2rem;
        .envelope-money {
          font-size: 0.4rem;
          color: #FFB046;
          margin-left: 0.2rem;
        }
        span:last-child {
          color: #FFB046;
        }
      }
      p {
        line-height: 0.4rem;
        color: #999;
      }
      p:last-child {
        padding-bottom: 0.4rem;
      }
      >img {
        position: absolute;
        top: 0;
        right: 0.23rem;
        width: 0.8rem;
        height: 0.4rem;
      }
    }
  }
}
.noWelfare {
  font-size:0.2rem;
  color:#999;
  line-Height:0.3rem;
}
.RedEnvelopes {
  position: fixed;
  height: 8rem;
  width: 4.8rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-image: url('./hongbao.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  font-size: 0.3rem;
  z-index: 1002;
  text-align: center;
  >img {
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    right: 0.2rem;
    top: 1rem;
  }
  div:nth-child(1) {
    margin-top: 4.5rem;
    color: #FFB046;
    display: block;
    display: flex;
    span:nth-child(1), 
    span:nth-child(3), {
      display: block;
      flex: 1;
      border-bottom: 1px solid #FFB046;
      margin:0.15rem 0.2rem;
    }
    span:nth-child(1) {
      margin-left: 0.2rem;
    }
    span:nth-child(3) {
      margin-right: 0.35rem;
    }
  }
  div:nth-child(2) {
    margin-top: 0.5rem;
    color: #FFB046;
    span:nth-child(1){
      font-size: 0.8rem;
    }
  }
  div:nth-child(3) {
    margin-top: 0.5rem;
    font-size: 0.2rem;
    color: #fff;
  }
  div:nth-child(4) {
    margin-top: 0.2rem;
    font-size: 0.2rem;
    color: #fff;
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
</style>