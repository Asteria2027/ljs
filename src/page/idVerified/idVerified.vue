<template>
  <div class="idVerified">
    <mheader headTitle='实名认证' :goBack="'true'"></mheader>
    <div class="idVerified-list">
      <router-link tag='div' to='idVerified' class="borderBottom-1px">
        <span>姓名</span>
        <span>{{userInfo&&userInfo.realName?userInfo.realName:'--'}}</span>
      </router-link>
      <div class="borderBottom-1px">
        <span>身份证</span>
        <span>{{userInfo&&userInfo.idNo?userInfo.idNo:'--'}}</span>
      </div>
    </div>
  </div>
</template>

<script>

import mheader from '@/components/header/header.vue'
import { mapState } from 'vuex';

export default {
  data () {
    return {
      realName:'',//名字
      idNo:'',//银行账户
    };
  },
  computed: {
    ...mapState([
        'userInfo'
    ]),
  },
  components: {
    mheader
  }
}


</script>
<style lang='less' scoped>

.idVerified {
  min-height: 100%;
  width: 100%;
  box-sizing:border-box; 
  background: #f4f4f4;
  padding-top: 0.8rem;
  padding-bottom: 1.97rem;
}
.idVerified-list {
  margin-top: 0.2rem;
  background: #ffffff;
  >div {
    display: block;
    display: flex;
    height: 0.88rem;
    line-height: 0.88rem;
    >span:nth-child(1){
      display: block;
      padding-left: 0.24rem;
      font-size: 0.24rem;
      color: #222;
    }
    >span:nth-child(2){
      display: block;
      padding-right: 0.24rem;
      flex: 1;
      font-size: 0.22rem;
      color: #999;
      text-align: right;
      i {
        padding-left: 0.3rem;
        font-size: 0.22rem;
      }
    }
  }
}
</style>