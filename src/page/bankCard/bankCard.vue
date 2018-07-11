<template>
  <div class="bankCard">
    <mheader headTitle='银行卡' :goBack="'true'" class="borderBottom-1px"></mheader>
    <div class="bankCard-list">
      <div>
        <div>
          <img :src="bankImg" alt="">
        </div>
        <div>
          <div>{{bankName}}</div>
          <div>{{bankNo}}</div>
        </div>
        <div>
          <span style='color: #ff6f4e;;' @click="_sync">同步</span>
          <router-link tag='span' to='replaceBankCard' style='paddingLeft:0.2rem;color: #ff6f4e;' v-if="updateAcc==1">更换</router-link>
        </div>
      </div>
      <div class="bank-depositAccount">
        <div>
          <img src="./logo.png" alt="">
        </div>
        <div class="zs-depositAccount">
          <div>浙商银行存管开户成功</div>
        </div>
      </div>
    </div>
    <div class="explanation">
        <p>绑定的银行卡将用于充值、提现。</p>
        <p>存管电子账户资金将用于投标。</p>
        <p>账户余额为0，并且无未结清的投标时，您可直接解绑提现卡，如有疑问请咨询平台客服。</p>
    </div>
    <window-tips ref='windowTips'></window-tips>
  </div>
</template>

<script>  

import mheader from '@/components/header/header.vue'
import windowTips from '@/components/common/windowTips/windowTips.vue'
import { depositAccoutInfo, sync } from '@/server/getData.js'
import { getStore } from '@/config/mUtils';

export default {
  data () {
    return {
      bankImg:'',//银行卡图标
      bankName:'',//银行名字
      bankNo:'',//银行账户
      eCardNo:'',//电子账户
      updateAcc:'',//变更存管账户
    }
  },
  mounted(){
    this.getDepositAccoutInfo();
  },
  methods:{
    _sync(){
      //更换银行卡
      let token, userId;
      sync(token=getStore('token'), userId=getStore('userId')).then(res => { 
        if(res.data.code==1){
          this.bankName = res.data.data.bankName;
          this.bankNo = res.data.data.bankCardNo;
          this.$refs.windowTips.toast('同步成功');
        }else {
          this.$refs.windowTips.toast(res.data.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    getDepositAccoutInfo(){
      let token, userId;
      depositAccoutInfo(token=getStore('token'), userId=getStore('userId')).then(res => { 
        if(res.data.code==1){
          this.bankImg=res.data.data.bankImg;
          this.bankName=res.data.data.bankName;
          this.bankNo=res.data.data.bankNo;
          this.eCardNo=res.data.data.eCardNo;
          this.updateAcc=res.data.data.updateAcc;
        }else {
          this.$refs.windowTips.toast(res.data.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  components: {
    mheader,
    windowTips
  }
}

</script>
<style lang='less' scoped>
.bankCard {
  min-height: 100%;
  width: 100%;
  box-sizing:border-box; 
  background: #f4f4f4;
  padding-top: 0.8rem;
  .bankCard-list {
    >div{
      display: block;
      display: flex;
      height: 1.5rem;
      overflow: hidden;
      background: #fff;
      >div:nth-child(1) {
        width: 1.2rem;
        img {
          display: block;
          margin:0.35rem auto 0;
          width: 0.72rem;
          height: 0.72rem;
        }
      }
      >div:nth-child(2) {
        display: block;
        flex: 1;
        font-size: 0.25rem;
        margin-top: 0.4rem;
        line-height: 0.35rem;
      }
      >div:nth-child(3) {
        font-size: 0.23rem;
        line-height: 1.5rem;
        padding-right: 0.23rem;
      }
    }
    .bank-depositAccount {
      margin-top: 0.2rem;
      .zs-depositAccount {
        margin-top: 0.55rem;
      }
    }
  }
  .explanation {
    padding: 0.2rem 0.23rem 0;
    font-size: 0.2rem;
    line-height: 0.3rem;
    color: #999;
  }
}
</style>