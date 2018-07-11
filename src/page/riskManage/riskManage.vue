<template>
  <div class="riskManage">
    <mheader headTitle='风险管理' :goBack="'true'"></mheader>
    <section class="RiskManage tabConten">
      <div class="title">
        <h3 class="borderBottom-1px">信息认证</h3>
      </div>
      <p>该信息由<span>赫美微贷</span>在<label>{{realNameDate}}</label><span>审核通过</span></p>
      <div class="info-identification-content">
        <div><img src="./hmwd_logo.jpg" alt="赫美微贷"></div>
        <div>
          <ul>
            <li><span><i class="iconfont icon-shenfenxinxi"></i>身份信息</span><span><i class="iconfont icon-renzheng"></i>认证通过</span></li>
            <li><span><i class="iconfont icon-work"></i>工作证明</span><span><i class="iconfont icon-renzheng"></i>认证通过</span></li>
            <li><span><i class="iconfont icon-xinyongqia1"></i>信用报告</span><span><i class="iconfont icon-renzheng"></i>认证通过</span></li>
            <li><span><i class="iconfont icon-qitashouru"></i>收入证明</span><span><i class="iconfont icon-renzheng"></i>认证通过</span></li>
          </ul>
        </div>
      </div>
      <div class="title">
        <h3 class="borderBottom-1px">信用等级</h3>
      </div>
      <div class="info-identification-content">
        <div class="grade">
          <span>
            {{borrowDetailMap.creditLevel}}
          </span>
        </div>
        <div>
          <ul>
            <li class="risk-des">{{approved}}</li>
          </ul>
        </div>
      </div>
      <div class="title">
        <h3 class="borderBottom-1px">风险管理</h3>
      </div>
      <div class="info-identification-content">
        <div><img src="./hmwd_logo.jpg" alt="赫美微贷"></div>
        <div>
          <ul>
            <li class="risk-des">若借款人出现还款违约，深圳赫美小额贷款股份有限公司有权受让债权。深圳赫美小额贷款股份有限公司（简称赫美微贷）成立于2012年4月，注册资本2亿元，上市公司赫美集团（证券代码：002356）持股51%，是正规持牌的小额贷款服务机构，专注小额分散个人信贷融资服务。</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">

import mheader from '@/components/header/header.vue'
import {mapState} from 'vuex'
import { wapLjtcBorrowerDetail, wapZrzqBorrowerDetail } from "@/server/getData.js";
import { getStore } from "@/config/mUtils";

export default {
  data(){
    return {
      realNameDate:'',
      approved:'',
      borrowDetailMap:{},
    }
  },
  mounted(){
    setTimeout(() => {
      if(!this.$store.state.userInfo||getStore('userId')==null){
        this.$router.push('login');
        return;
      }
    }, 2000);
    if(this.$route.query.subjectType==4){
     this._wapZrzqBorrowerDetail();
    }else if(this.$route.query.subjectType==3){
      this._wapLjtcBorrowerDetail();
    }
  },
  methods:{
    _wapLjtcBorrowerDetail(){
      let borrowId, userId, token;
      wapLjtcBorrowerDetail(borrowId=this.$route.query.borrowId, userId=getStore('userId'), token=getStore("token")).then(res => {
        if(res.data.code==1){
          this.realNameDate = res.data.data.realNameDate;
          this.approved = res.data.data.approved;
          this.borrowDetailMap = res.data.data.borrowDetailMap;
          // this.borrowDetailMap = res.data.data.borrowDetailMap;
        }else {
          alert(res.data.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    _wapZrzqBorrowerDetail(){
        let borrowId, userId, debtId, token;
        wapZrzqBorrowerDetail(borrowId=this.$route.query.bid, userId=getStore('userId'), debtId=this.$route.query.borrowId, token=getStore("token")).then(res => {
          if(res.data.code==1){
            this.realNameDate = res.data.data.realNameDate;
            this.approved = res.data.data.approved;
            this.borrowDetailMap = res.data.data.borrowDetailMap;
            // this.borrowUserMap = res.data.data.borrowUserMap;
          }else {
            alert(res.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
    }
  },
  computed: {
    ...mapState([
        'userInfo'
    ]),
  },
  components: {
    mheader,
  }
}

</script>

<style lang="less" scoped>
.riskManage {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing:border-box; 
  background: #f4f4f4;
  padding-top: 0.8rem;
  padding-bottom: 0.4rem;
}

.tabConten {
  // margin:0.15rem;
  >.title {
    margin-top: 0.2rem;
    >h3 {
      font-size: 0.25rem;
      color: #2d2d2d;
      padding: 0.2rem 0.24rem 0.2rem 0.23rem;
      background: #fff;
      width: 100%;
    }
  }
  >p {
    text-indent: 2em;
    font-size: 0.24rem;
    padding:0.1rem 0.24rem 0.2rem;
    line-height: 0.3rem;
    color: #666;
    background: #fff;
    >span {
      color: #333;
    }
    >label {
      color: #63b97c;
    }
  }
  .info-identification-content{
    display: block;
    display: flex;
    font-size: 0.2rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    background: #fff;
    div:nth-child(1){
      width: 2rem;
      img {
        display: block;
        margin: 0.2rem auto 0;
        width: 1.51rem;
      }
    }
    div:nth-child(2){
      flex: 1;
      line-height: 0.5rem;
      i {
        font-size: 0.3rem;
        margin-right: 0.15rem;
      }
      li span:nth-child(1) {
        margin-right: 0.5rem;
        color: #999;
      }
      li span:nth-child(2) i{
        color: #63b97c; 
      }
    }
    .grade {
      position: relative;
      font-size: 1rem;
      color: #4d90fe;
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
    .risk-des {
      padding-right: 0.23rem;
      line-height: 0.3rem;
      color: #999;
    }
  }
}
</style>