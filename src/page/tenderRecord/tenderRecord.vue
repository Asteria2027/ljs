<template>
  <div class="tenderRecord">
    <mheader headTitle='投标记录' :goBack="'true'"></mheader>
    <div class="Placeholder"></div>
    <div class="tender-list-title" >
      <span>投标人</span>
      <span>投标时间</span>
      <span>投标金额</span>
    </div>
    <div class="tender-list">
      <ul>
        <li v-for="(item,index) in investListb" :key="index" class="borderTop-1px">
          <div>{{item.username}}</div>
          <div>{{item.investTime}}</div>
          <div class="gold">¥{{item.investAmount}}<br/><span class="lock">锁定中</span></div>
        </li>
      </ul>
      <not-data v-if='investListb.length==0'>
        <div slot='hint' style='font-size: 0.23rem; text-align: center;color: #9d9d9d;'>暂无相关记录</div>
      </not-data>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import mheader from '@/components/header/header.vue'
import notData from '../../components/common/notData/notData.vue'
import {mapState} from 'vuex'
import { getInvestList } from '@/server/getData.js'
import { getStore } from "@/config/mUtils";

export default {
  data () {
    return {
      investListb:[],
      pageNum:1, //当前页
    };
  },
  mounted(){
    if(getStore('userId')==null){
      this.$router.push('login');
      return;
    }
    if(!this.$route.query.borrowId){
      this.$router.push('home');
      return;
    }
    this._getInvestList();
  },
  computed: {
    ...mapState([
        'userInfo'
    ]),
  },
  methods:{
    _getInvestList(){
      let pageSize, pageNum, borrowId, userId, token;
      getInvestList(pageSize=20, pageNum=this.pageNum, borrowId=this.$route.query.borrowId, userId=getStore('userId'), token=getStore("token")).then(res => {
          if(res.data.code==1){
            this.investListb = res.data.data.investListb;
          }
        }).catch(function (error) {
          console.log(error);
        });
    }
  },
  components:{
    mheader,
    notData
  }
}

</script>
<style lang='less' scoped>
  .tenderRecord {
    min-height: 100%;
    width: 100%;
    box-sizing:border-box; 
    background: #f4f4f4;
    .Placeholder {
      position: fixed;
      top: 0;
      height: 1.8rem;
      width: 100%;
      background: #f4f4f4;
      z-index: 2;
    }
  }
  .tender-list-title {
    position: fixed;
    z-index: 10;
    top: 1rem;
    left: 0;
    width: 100%;
    display: block;
    display: flex;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.20rem;
    text-align: center;
    background: #fff;
    span:nth-child(1),
    span:nth-child(3){
      display: block;
      min-width: 20%;
      padding: 0 0.1rem;
    }
    span:nth-child(2) {
      display: block;
      flex: 1;
    }
  }
  .tender-list {
    padding-top: 1.8rem;
    ul>li {
      padding: 0.35rem 0;
      width: 100%;
      display: block;
      display: flex;
      text-align: center;
      background: #fff;
      div {
        display: block;
        font-size: 0.24rem;
        .lock {
          transform: translateX(-50%);
          font-size: 0.12rem;
          padding: 0.015rem 0.1rem;
          background: #ff654f;
          color: #fff;
          border-radius: 0.15rem;
        }
      }
      div:nth-child(1),
      div:nth-child(3){
        min-width: 20%;
        padding: 0 0.1rem;
      }
      div:nth-child(2) {
        flex: 1;
      }
    }
  }
  .gold {
    color: #ffd351;
  }
</style>