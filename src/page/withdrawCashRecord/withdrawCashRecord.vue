<template>
  <div class="withdrawCashRecord">
    <mheader headTitle='提现记录' :goBack="'true'" class="borderBottom-1px"></mheader>
    <div class="title">
      <span>金额(元)</span>
      <span>手续费(元)</span>
      <span>申请时间(元)</span>
      <span>状态(元)</span>
    </div>
    <div ref="contentWrap" class="content-list-wrap" style="ovflow:hidden">
      <div class="content-list borderBottom-1px" v-for="(item,index) in withdrawList" :key="index">
        <span>{{item.sum}}</span>
        <span>{{item.poundage}}</span>
        <span>{{item.applyTime}}</span>
        <span>{{item.status}}</span>
      </div>
    </div>
    <not-data v-if='noData'>
      <div slot='hint' style='font-size: 0.23rem; text-align: center;color: #9d9d9d;'>暂无相关记录</div>
    </not-data>
    <div v-if='isLoaded&&withdrawList.length>0' class="loaded">已全部加载完成</div>
  </div>
</template>

<script>
import mheader from '@/components/header/header.vue'  
import notData from '../../components/common/notData/notData.vue'
import { queryWithdrawList } from "@/server/getData.js";
import { getStore } from '@/config/mUtils';

  export default {
    data () {
      return {
        withdrawList:[],
        noData:false,//无数据
        loaded: true,// 加载完成
        curPage:1,//当前页
        isLoaded:false,//判断加载是否完成
      }
    },
    mounted(){
      setTimeout(() => {
        if(!this.$store.state.userInfo){
          this.$router.push('login');
          return;
        }
      }, 2000);
      this._queryWithdrawList();
      window.addEventListener('scroll', this.queryWithdrawList_loadMore);
    },
    methods:{
      _queryWithdrawList(){
        // 提现记录
        let token, userId, curPage, pageSize
        queryWithdrawList(token=getStore('token'), userId=getStore('userId'), curPage=this.curPage, pageSize=20).then(res => { 
          if(res.data.code==1){
            let len = this.withdrawList.length;
            if(res.data.data&&res.data.data.withdrawList){
              this.withdrawList = this.withdrawList.concat(res.data.data.withdrawList);
            }
            if(len==this.withdrawList.length) {
              this.loaded = false;
              this.isLoaded = true;
            }else {
              this.loaded = true;
            }
            if(this.withdrawList.length==0){
              this.noData = true;
            }else {
              this.noData = false;
            }
          }else {
            this.noData = true;
          }
        }).catch(function (error) {
          this.noData = true;
          console.log(error);
        });
      },
      queryWithdrawList_loadMore(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.body.clientHeight;
        if(this.$refs.contentWrap.offsetHeight-clientHeight<(Number(scrollTop)+10)&&this.loaded){
          this.loaded = false;
          this.curPage++;
          this._queryWithdrawList();
        }
      }
    },
    components: {
      mheader,
      notData
    },
    destroyed () {
      window.removeEventListener('scroll', this.queryWithdrawList_loadMore)
    },
  }
</script>

<style lang='less' scope>
.withdrawCashRecord {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  background: #f4f4f4;
  padding-top: 1.6rem;
  .title {
    display: block;
    display: flex;
    position: fixed;
    top: 0.8rem;
    left: 0;
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.23rem;
    text-align: center;
    background: #ffffff;
    >span {
      display: block;
      flex: 1;
    }
  }
  .content-list {
    display: block;
    display: flex;
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.23rem;
    text-align: center;
    background: #ffffff;
    >span:nth-child(1), 
    >span:nth-child(2), 
    >span:nth-child(4), {
      display: block;
      flex:1;
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
