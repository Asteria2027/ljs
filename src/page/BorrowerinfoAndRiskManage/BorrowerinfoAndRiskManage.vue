<template>
  <div class="BorrowerinfoAndRiskManage">
    <mheader headTitle='借款人信息' :goBack="'true'"></mheader>
    <section class="Borrowerinfo tabConten">
      <div class="title">
        <h3 class="borderBottom-1px">基本信息</h3>
      </div>
      <ul>
        <li>
          <div>性别</div>
          <div >{{borrowUserMap.sex}}</div>
        </li>
        <li>
          <div>年龄</div>
          <div >{{borrowUserMap.age}}</div>
        </li>
        <li>
          <div>身份证</div>
          <div >{{borrowUserMap.idno}}</div>
        </li>
        <li>
          <div>学历</div>
          <div>{{borrowUserMap.highestEdu}}</div>
        </li>
        <li>
          <div>婚姻状况</div>
          <div>{{borrowUserMap.marriageStatus}}</div>
        </li>
        <li>
          <div>子女状况</div>
          <div>{{borrowUserMap.childrenStatus}}</div>
        </li>
      </ul>
      <div class="title">
        <h3 class="borderBottom-1px">资产信息</h3>
      </div>
      <ul>
        <li>
          <div>房产</div>
          <div>{{borrowUserMap.houseStatus}}</div>
        </li>
        <li>
          <div>车产</div>
          <div>{{borrowUserMap.carStatus}}</div>
        </li>
        <li>
          <div>月收入水平</div>
          <div>{{borrowUserMap.monthIncome}}</div>
        </li>
        <li>
          <div>其他信用贷款</div>
          <div>{{borrowUserMap.otherLoan}}</div>
        </li>
      </ul>
      <div class="title">
        <h3 class="borderBottom-1px">工作信息</h3>
      </div>
      <ul>
        <li>
          <div>职位</div>
          <div>{{borrowUserMap.job}}</div>
        </li>
        <li>
          <div>工作城市</div>
          <div >{{borrowUserMap.workplace}}</div>
        </li>
        <li>
          <div>工作年限</div>
          <div>{{borrowUserMap.workYear}}</div>
        </li>
        <li>
          <div>公司行业</div>
          <div>{{borrowUserMap.orgIndustryContent}}</div>
        </li>
        <li>
          <div>公司性质</div>
          <div>{{borrowUserMap.orgTypeDesc}}</div>
        </li>
        <li>
          <div>公司规模</div>
          <div>{{borrowUserMap.orgScaleContent}}</div>
        </li>
      </ul>
      <!-- <div class="title">
        <h3 class="borderBottom-1px">借款信息</h3>
      </div>
      <ul>
        <li>
          <div>融资次数</div>
          <div>1div>
        </li>
        <li>
          <div>融资总额</div>
          <div>109641div>
        </li>
        <li>
          <div>逾期期数</div>
          <div>0div>
        </li>
        <li>
          <div>当前逾期金额</div>
          <div>0div>
        </li>
        <li>
          <div>信用等级</div>
          <div>Bdiv>
        </li>
      </ul> -->
    </section>
  </div>
</template>

<script type="text/ecmascript-6">

import mheader from '@/components/header/header.vue'
import { wapLjtcBorrowerDetail,wapZrzqBorrowerDetail } from "@/server/getData.js";
import {mapState} from 'vuex'
import { getStore } from "@/config/mUtils";

export default {
  data () {
    return {
      BorrowerDetail:null,
      borrowUserMap:{}
    };
  },
  mounted(){
    setTimeout(() => {
      if(!this.$store.state.userInfo||getStore('userId')==null){
      this.$router.push('login');
      return;
      }
      if(!this.$route.query.borrowId){
        this.$router.push('home');
        return;
      }
    }, 2000);
    this._wapLjtcBorrowerDetail();
  },
  computed: {
    ...mapState([
        'userInfo'
    ]),
  },
  methods:{
    _wapLjtcBorrowerDetail(){
      if(this.$route.query.subjectType==4){
        let borrowId, userId, debtId, token;
        wapZrzqBorrowerDetail(borrowId=this.$route.query.bid, userId=getStore('userId'), debtId=this.$route.query.borrowId, token=getStore("token")).then(res => {
          if(res.data.code==1){
            this.borrowUserMap = res.data.data.borrowUserMap;
          }else {
            alert(res.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      }else {
        let borrowId, userId, token;
        wapLjtcBorrowerDetail(borrowId=this.$route.query.borrowId, userId=getStore('userId'), token=getStore("token")).then(res => {
          if(res.data.code==1){
            this.borrowUserMap = res.data.data.borrowUserMap;
          }else {
            alert(res.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
      
    }
  },
  components: {
    mheader,
  }
}

</script>

<style lang="less" scoped>
.BorrowerinfoAndRiskManage {
  min-height: 100%;
  width: 100%;
  box-sizing:border-box; 
  background: #f4f4f4;
  padding-top: 0.8rem;
  padding-bottom: 0.4rem;
  .BAR-title {
    display: block;
    display: flex;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #929292;
    background: #fff;
    >div {
      display: block;
      flex: 1;
      text-align: center;
    }
    >div.redBorder {
      box-sizing: border-box;
      color: #e25353;
      border-bottom: 1px solid #e25353; 
    }
  }
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
  >ul {
    font-size: 0.2rem;
    padding-left: 0.24rem;
    background: #fff;
    >li {
      display: block;
      display: flex;
      height: 0.7rem;
      line-height: 0.7rem;
      >div {
        display: block;
        flex: 1;
      }
      >div:nth-child(1){
        color: #666;
      }
      >div:nth-child(2){
        text-align: right;
        padding-right: 0.3rem;
      }
    }
  }
  >p {
    text-indent: 2em;
    font-size: 0.24rem;
    padding:0.1rem 0.24rem 0.2rem;
    line-height: 0.3rem;
    color: #666;
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
  }
}
</style>