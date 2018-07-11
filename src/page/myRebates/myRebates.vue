<template>
  <div class="myRebates">
    <mheader headTitle='我的返利' :goBack="'true'" class="borderBottom-1px"></mheader>
    <div class="fixed-con">
      <div class="banner-img" @click="$router.push('myRebatesBannerPage')">
        <img src="./banner.jpg" alt="">
      </div>
      <div class="rebates">
        <span>已赚返利<i> {{memberBonusCount}}元</i></span>
        <span>
          <span v-if="!todayRate">今日无返利资格</span>
          <span v-if="todayRate">今日返利系数{{todayRate}}</span>
          <i @click="instruct=!instruct">?</i>
          <span v-show="instruct" class="instruct">每天00:30更新当日返利系数</span>
          <img src="./sanjiao.png" v-show="instruct" alt="">
        </span>
      </div>
    </div>
    <div class="line" style="height:0.25rem;width:100%;position:fixed;top:4.55rem;z-index:1;background:#f5f5f5;"></div>
    <div class="rebates-detail">
      <div class="rebates-detail-title borderBottom-1px">
        <span>返利时间</span>
        <span>返利金额 (元)</span>
      </div>
      <div class="rebates-detail-con">
        <ul ref="rebatesDetailCon">
          <li v-for="(item,index) in memberBonusList" :key="index">
            <div>{{item.payDate}}</div>
            <div>{{item.bonusAmt}}</div>
          </li>
        </ul>
      </div>
      <div v-if='isLoaded&&memberBonusList.length>0' class="loaded">已全部加载完成</div>
      <not-data v-if='memberBonusList.length<=0'>
        <div slot='hint' style='font-size: 0.23rem; text-align: center;color: #9d9d9d;'>暂无返利数据</div>
      </not-data>
    </div>
  </div>
</template>

<script>
import mheader from '@/components/header/header.vue'
import notData from '../../components/common/notData/notData.vue'
import { myMemberBonus } from '@/server/getData.js'
import { getStore } from '@/config/mUtils';


  export default {
    data () {
      return {
        instruct:false,//弹窗
        memberBonusList:[],//返利明细
        pageNum:1, //当前页 
        loaded: true, // 加载完成
        noData:false,//暂无相关记录
        isLoaded:false,//判断加载是否完成
        memberBonusCount:'*',//返利总额
        todayRate:'',//返利系数
      } 
    },
    mounted(){
      this.getMyMemberBonus();
      window.addEventListener("scroll", this._loadMore);
    },
    methods:{
      getMyMemberBonus(){
         let token,userId, pageNum, pageSize;
        myMemberBonus(token=getStore('token'), userId=getStore('userId'), pageNum=this.pageNum, pageSize=10).then(res => { 
          if(res.data.code==1){
            this.memberBonusCount = res.data.data.memberBonusCount;
            this.todayRate = res.data.data.todayRate;
            let len = this.memberBonusList.length;
            this.memberBonusList = this.memberBonusList.concat(res.data.data.memberBonusList);
            if (len == this.memberBonusList.length) {
              this.loaded = false;
              this.isLoaded = true;
            } else {
              this.loaded = true;
            }
          }
          if(this.memberBonusList.length==0){
            this.noData = true;
          } else {
            this.noData = false;
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      _loadMore() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.body.clientHeight;
        if(this.$refs.rebatesDetailCon.offsetHeight-clientHeight<(Number(scrollTop)+5)&&this.loaded){
          this.loaded = false;
          this.pageNum++;
          this.getMyMemberBonus();
        }
      },
    },
    components: {
      mheader,
      notData
    },
    destroyed(){
      window.removeEventListener("scroll", this._loadMore);
    }
  }
</script>

<style lang='less' scope>
.myRebates {
  box-sizing: border-box;
  background: #f4f4f4;
  padding-top:4.8rem;
  min-height: 100%;
  width: 100%;
  .banner-img {
    width: 100%;
    height: 3rem;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .rebates {
    display: block;
    display: flex;
    font-size: 0.23rem;
    padding: 0.25rem 0.23rem;
    background: #fff;
    margin-bottom: 0.2rem;
    >span {
      display: block;
      flex: 1;
    }
    >span:nth-child(1){
      i {
        color: #ef5146;
      }
    }
    >span:nth-child(2){
      position: relative;
      text-align: right;
      >i {
        margin-left: 0.2rem;
        display: inline-block;
        height: 0.25rem;
        line-height: 0.25rem;
        width: 0.25rem;
        text-align: center;
        color: #8FD1FF;
        border: 1px solid #8FD1FF;
        border-radius: 50%;
      }
      >.instruct {
        position: absolute;
        top: 0.4rem;
        right: 0rem;
        width: 1.5rem;
        padding: 0.1rem;
        min-height: 0.4rem;
        color: #8FD1FF;
        border-radius: 0.05rem;
        background: #fff;
        z-index: 100;
        border: 1px solid #8FD1FF;
        text-align: left;
      }
      >img {
        position: absolute;
        top: 0.322rem;
        right: 0.1rem;
        height: 0.1rem;
        width: 0.2rem;
        z-index: 101;
      }
    }
  }
  .rebates-detail {
    width: 100%;
    padding-top: 0.8rem;
    .rebates-detail-title {
      position: fixed;
      top: 4.8rem;
      left: 0;
      width: 100%;
      display: block;
      display: flex;
      font-size: 0.23rem;
      padding: 0.25rem 0;
      background: #fff;
      z-index: 1;
      >span {
        display: block;
        flex: 1;
        text-align: center;
      }
    }
    .rebates-detail-con {
      width: 100%;
      background: #fff;
      ul {
        overflow: hidden;
      }
      li {
        display: block;
        display: flex;
        font-size: 0.23rem;
        padding: 0.25rem 0;
        color: #999;
        >div {
          display: block;
          flex: 1;
          text-align: center;
        }
      }
    }
  }
  .fixed-con {
    position: fixed;
    z-index: 100;
    top: 0.8rem;
    width: 100%;
  }
}
.loaded {
  font-size: 0.18rem;
  text-align: center;
  line-height: 0.3rem;
  height: 0.4rem;
}
</style>
