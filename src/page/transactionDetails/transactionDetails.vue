<template>
  <div class="transactionDetails">
    <mheader headTitle='交易明细' :goBack="'true'" class="borderBottom-1px"></mheader>
    <div class="transactionDetails-title borderBottom-1px">
      <ul>
        <li :class="{'colring':tradeType=='0'}" @click='tradeType="0";curPage=1;fundrecordList=[];_newQueryFundrecord();'>全部</li>
        <li :class="{'colring':tradeType=='1'}" @click='tradeType="1";curPage=1;fundrecordList=[];_newQueryFundrecord();'>充值</li>
        <li :class="{'colring':tradeType=='2'}" @click='tradeType="2";curPage=1;fundrecordList=[];_newQueryFundrecord();'>提现</li>
        <li :class="{'colring':tradeType=='3'}" @click='tradeType="3";curPage=1;fundrecordList=[];_newQueryFundrecord();'>投标</li>
        <li :class="{'colring':tradeType=='4'}" @click='tradeType="4";curPage=1;fundrecordList=[];_newQueryFundrecord();'>回款</li>
        <li :class="{'colring':tradeType=='5'}" @click='tradeType="5";curPage=1;fundrecordList=[];_newQueryFundrecord();'>其他</li>
      </ul>
    </div>
    <div class="transactionDetails-content" ref="transactionDetails_content">
      <ul>
        <div v-if='tradeType=="1"&&totalHandleSum'>充值总额：{{totalHandleSum}}元</div>
        <div v-if='tradeType=="3"&&totalHandleSum'>投标总额：{{totalHandleSum}}元</div>
        <div v-if='tradeType=="2"&&totalHandleSum'>提现总额：{{totalHandleSum}}元</div>
        <div class="repayment" v-if='tradeType=="4"&&totalHandleSum'>
          <div>
            <span>本金总额</span>
            <span>利息总额</span>
          </div>
          <div>
            <span>{{totalHandleSum}}元</span>
            <span>{{amt}}元</span>
          </div>
        </div>
        <li class="borderBottom-1px" v-for="(item,index) in fundrecordList" :key='index'>
          <div>
            <div>{{item.tradeDesc}}</div>
            <div class="money">{{item.handleSum}}元</div>
          </div>
          <div>
            <div>{{item.recordTime}}</div>
            <div>{{item.operatorObj}}</div>
          </div>
        </li>
      </ul>
    </div>
    <not-data v-if='notData'>
      <div slot='hint' style='font-size: 0.23rem; text-align: center;color: #9d9d9d;'>暂无相关记录</div>
    </not-data>
    <div v-if='isLoaded&&fundrecordList.length>0' class="loaded">已全部加载完成</div>
  </div>
</template>

<script>
import mheader from '@/components/header/header.vue'
import notData from '../../components/common/notData/notData.vue'
import { newQueryFundrecord } from '@/server/getData.js'
import { getStore } from "@/config/mUtils";

export default {
  data () {
    return {
      tradeType:0,
      curPage:1,//当前页
      fundrecordList:[],//交易明细数据
      totalHandleSum:'',//本金总额/投标总额/提现总额/充值总额
      amt:'',//利息总额
      loaded: true,// 加载完成
      notData:false,//无数据
      isLoaded:false,//判断加载是否完成
    };
  },
  mounted(){
    this._newQueryFundrecord();
    window.addEventListener('scroll', this.transactionDetails_loadMore);
  },
  methods:{
    _newQueryFundrecord(){
      this.totalHandleSum = '';
      this.amt = '';
      //交易明细
      let userId, tradeType, curPage, token;
      newQueryFundrecord(token=getStore('token'),userId=getStore('userId'), tradeType=this.tradeType, curPage=this.curPage).then(res => {
        if(res.data.code==1){
          this.totalHandleSum = (res.data.data&&res.data.data.totalHandleSum)?res.data.data.totalHandleSum:'';
          this.amt = (res.data.data&&res.data.data.amt)?res.data.data.amt:'';
          let len = this.fundrecordList.length;
          if(res.data.data&&res.data.data.fundrecordList){
            this.fundrecordList = this.fundrecordList.concat(res.data.data.fundrecordList);
          }
          if(len==this.fundrecordList.length) {
            this.loaded = false;
            this.isLoaded = true;
          }else {
            this.loaded = true;
          }
          if(this.fundrecordList.length==0){
            this.notData = true;
          }else {
            this.notData = false;
          }
        }else {
          this.notData = true;
        }
      }).catch((error)=>{
        this.notData = true;
        console.log(error);
      });
    },
    transactionDetails_loadMore(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.body.clientHeight;
      if(this.$refs.transactionDetails_content.offsetHeight-clientHeight<(Number(scrollTop)+10)&&this.loaded){
        this.loaded = false;
        this.curPage++;
        this._newQueryFundrecord();
      }
    }
  },
  components:{
    mheader,
    notData
  },
  destroyed () {
    window.removeEventListener('scroll', this.transactionDetails_loadMore)
  },
}

</script>
<style lang='less' scoped>

.transactionDetails {
  box-sizing: border-box;
  background: #f4f4f4;
  padding-top: 1.6rem;
  min-height: 100%;
  width: 100%;
}
.transactionDetails-title {
  position: fixed;
  z-index: 1;
  top: 0.8rem;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.24rem;
  background: #fff;
  ul {
    display: block;
    display: flex;
    li {
      display: block;
      flex: 1;
      text-align: center;
    }
    li.colring {
      position: relative;
      z-index: 1;
      box-sizing: border-box;
      color: #e25353;
      border-bottom: 1px solid #e25353;
    }
  }
}
.transactionDetails-content {
  >ul {
    >div {
      font-size: 0.2rem;
      color: #3b73af;
      height: 0.7rem;
      line-height: 0.7rem;
      padding-left: 0.3rem;
    }
    .repayment {
      padding: 0.1rem 1rem;
      height: 0.8rem;
      >div {
        height: 0.4rem;
        line-height: 0.4rem;
        display: block;
        display: flex;
        text-align: center;
        span {
          flex: 1;
        }
      }
    }
    >li {
      >div {
        display: block;
        display: flex;
        padding: 0 0.23rem;
        background: #fff;
        padding-top: 0.3rem;
        height: 0.4rem;
        font-size: 0.23rem;
        >div:nth-child(2){
          display: block;
          flex: 1;
          text-align: right;
        }
      }
      >div:nth-child(2){
        padding-top: 0;
        color: #999;
        font-size: 0.18rem;
      }
      .money {
        color: #e25353;
      }
    }
  }
}
.loaded {
  font-size: 0.18rem;
  text-align: center;
  line-height: 0.4rem;
  height: 0.4rem;
}

</style>