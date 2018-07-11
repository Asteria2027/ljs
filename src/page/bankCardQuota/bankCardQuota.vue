<template>
  <div class="bankCardQuota">
    <mheader headTitle='银行卡限额' :goBack="'true'" class="borderBottom-1px"></mheader>
    <div class="title">
      <span>行别</span>
      <span>单笔限额</span>
      <span>日累计限额</span>
    </div>
    <div class="content borderBottom-1px" v-for="(item,index) in bankList" :key="index">
      <span>{{item.name}}</span>
      <span>{{item.singleQuota}}</span>
      <span>{{item.dayQuota}}</span>
    </div>
  </div>
</template>

<script>
import mheader from '@/components/header/header.vue'   
import { getBankList } from "@/server/getData.js";
  export default {
    data () {
      return {
        bankList:''
      }
    },
    mounted(){
      this._getBankList();
    },
    methods:{
      _getBankList(){
      // 获取所有的银行卡
        getBankList().then(res => {
          if(res.data.code==1){
            this.bankList = res.data.data;
          }
        }).catch((error)=>{
          console.log(error); 
        });
      },
    },
    components: {
      mheader
    }
  }
</script>

<style lang='less' scope>
.bankCardQuota {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  background: #f4f4f4;
  padding-top: 0.8rem;
  .title {
    display: block;
    display: flex;
    font-size: 0.25rem;
    padding: 0.25rem 0;    
    span {
      text-align: center;
      display: block;
      width: 33%;
    }
  }
  .content {
    display: block;
    display: flex;
    font-size: 0.25rem;
    padding: 0.25rem 0.2rem;    
    background: #fff;
    span {
      text-align: center;
      display: block;
      width: 33%;
      word-break:normal;
      white-space:pre-wrap;
      overflow:hidden;
    }
  }
}
 
</style>
