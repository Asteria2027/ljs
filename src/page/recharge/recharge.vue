<template>
  <div class="recharge">
    <mheader headTitle='充值' :goBack="'true'" class="borderBottom-1px"></mheader>
    <div class="title">
      <span :class="{sele:sele==0}" @click="sele=0">快捷充值</span>
      <span :class="{sele:sele==1}" @click="sele=1">转账充值</span>
    </div>
    <div class="fast-recharge" v-if="sele==0">
      <div class="account-info">
        <div><img :src="accountInfo.bankImg" alt=""></div>
        <div>
          <p>{{accountInfo.bankName}}</p>
          <p>{{accountInfo.bankNo}}</p>
          <p>单笔限额<span class="money">{{accountInfo.singleQuota}}</span>元，日累计限额<span class="money">{{accountInfo.dayQuota}}</span>元</p>
        </div>
      </div>
      <div class="check-bankcard-limit"> <router-link to="bankCardQuota" style=" color: #ff654f;">查看银行卡限额</router-link></div>
      <div class="pay-money">
        <div>充值金额</div>
        <div><input type="number" v-model='payMoney' placeholder="充值金额100元起" autofocus="autofocus" oninput="if(value.length>15)value=value.slice(0,15);if(!/^-?\d+\.?\d{0,2}$/.test(value))value=value.slice(0,value.length-1)"></div>
      </div>
      <div class="pay-enter" @click="payNextStep" :style="{background:payClick?'#ff654f':'#999'}">下一步</div>
      <div class="pay-instructions">
        <h3>充值说明</h3>
        <p>1、快捷充值的资金当日不可投转让专区和提现，需下一个工作日银行清算后（预计13点）可投资，投非转让区产品不受影响。 </p>
        <p>2、转账充值的资金当日即可投所有产品，建议通过转账充值方式进行充值。</p>
        <p>3、根据监管政策要求，通过线下转账充值，转出账户必须使用存管开户绑定的银行卡（{{"****"+accountInfo.bankNo.slice(4,accountInfo.bankNo.length)}}），转入账户必须填写联金所在浙商银行开立的存管专用账户。</p>
        <p @click="staffService"> 人工客服 </p>
      </div>
    </div>
    <div class="transfer-recharge" v-else>
      <div class="transfer-info">
        <ul>
          <li class="borderBottom-1px">
            <div>收款方：<span>{{accountInfo.depositPayee}}</span></div>
            <div class="tag-read-company" :data-clipboard-text="accountInfo.depositPayee" style="color:red;line-height:0.35rem">复制</div>
          </li>
          <li class="borderBottom-1px">
            <div>开户支行：<span>{{accountInfo.depositAccountBranch}}</span></div>
            <div class="tag-read-bank" :data-clipboard-text="accountInfo.depositAccountBranch" style="color:red;line-height:0.35rem">复制</div>
          </li>
          <li class="borderBottom-1px">
            <div>存管账户：<span>{{accountInfo.depositAccountNo}}</span></div>
            <div class="tag-read-acount" :data-clipboard-text='accountInfo.depositAccountNo' style="color:red;line-height:0.35rem">复制</div>
          </li>
        </ul>
      </div>
      <div class="txt">
        <h3>充值说明</h3>
        <p>1、快捷充值的资金当日不可投转让专区和提现，需下一个工作日银行清算后（预计13点）可投资，投非转让区产品不受影响。 </p>
        <p>2、转账充值的资金当日即可投所有产品，建议通过转账充值方式进行充值。</p>
        <p>3、根据监管政策要求，通过线下转账充值，转出账户必须使用存管开户绑定的银行卡（{{"****"+accountInfo.bankNo.slice(4,accountInfo.bankNo.length)}}），转入账户必须填写联金所在浙商银行开立的存管专用账户。</p>  
      </div>
      <p @click="staffService"> 人工客服 </p>
    </div>
    <window-tips ref='windowTips'></window-tips>
    <remote-js jsUrl="https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_10152" ></remote-js>
  </div>
</template>

<script>

import mheader from '@/components/header/header.vue'
import { depositAccoutInfo, queryCommonBalance,deductPayRequest, balanceTrransfer, getXiaoNeng } from "@/server/getData.js";
import { getStore, formSubmit,setStore } from '@/config/mUtils';
import queryZs from '@/config/queryZsResults';
import { encryptByDES } from '@/config/des_encryption.js'
import windowTips from '@/components/common/windowTips/windowTips.vue'
import RemoteJs from '@/components/common/remoteJs/remoteJs'
import Clipboard from 'clipboard';

  export default {
    mixins:[queryZs],
    data () {
      return {
        sele:0,//快捷充值 0 ，转账充值 1
        accountInfo:'',//账户信息
        payMoney:'',//充值金额
        // payPWD:'',//交易密码
        // commonBalance:'',//可转移金额
        NTKF_PARAM: {},  //小能客服参数
        clipboardCompany:null,
        clipboardAcount:null,
        payClick:true,//支付节流
      }
    },
    mounted(){
      this.queryZsResult(this.$route.query.zsCallback);
      setTimeout(() => {
        if(!this.$store.state.userInfo){
          this.$router.push('login');
          return;
        }
      }, 2000);
      this.getXiaoNeng();
      this.getDepositAccoutInfo();
      this._queryCommonBalance();
      this.clipboardCompany = new Clipboard('.tag-read-company')
      this.clipboardCompany.on('success', e => {
        alert('复制成功')
      })
      this.clipboardCompany.on('error', e => {
        // 不支持复制
        alert('该浏览器不支持自动复制, 请手动复制');
        // 释放内存
        this.clipboardCompany.destroy();
      })
      this.clipboardreadAcount = new Clipboard('.tag-read-acount')
      this.clipboardreadAcount.on('success', e => {
        alert('复制成功')
      })
      this.clipboardreadAcount.on('error', e => {
        // 不支持复制
        alert('该浏览器不支持自动复制, 请手动复制');
        // 释放内存
        this.clipboardreadAcount.destroy();
      })
      this.clipboardAcount = new Clipboard('.tag-read-bank')
      this.clipboardAcount.on('success', e => {
        alert('复制成功')
      })
      this.clipboardAcount.on('error', e => {
        // 不支持复制
        alert('该浏览器不支持自动复制, 请手动复制');
        // 释放内存
        this.clipboardAcount.destroy();
      })
    },
    methods:{
      //人工客服
      staffService(){
        let NTKF_PARAM = {
          siteid:"kf_10152",                    //企业ID，为固定值，必填
          settingid:"kf_10152_1518147916778",   //接待组ID，为固定值，必填
          uid:"",                         //用户ID，未登录可以为空，但不能给null，uid赋予的值在显示到小能客户端上
          uname:"",             //用户名，未登录可以为空，但不能给null，uname赋予的值显示到小能客户端上
          isvip:"",                           //是否为vip用户，0代表非会员，1代表会员，取值显示到小能客户端上
          userlevel:"",                       //网站自定义会员级别，0-N，可根据选择判断，取值显示到小能客户端上
          erpparam:"",                      //erpparam为erp功能的扩展字段，可选，购买erp功能后用于erp功能集成
          //  itemid:"696",              //(必填)商品ID
          itemparam:""           //(选填)itemparam为商品接口扩展字段，用于商品接口特殊要求集成
        }
        NTKF.im_openInPageChat(this.NTKF_PARAM.settingid);
      },
      getXiaoNeng() {
        let token,userId;
        getXiaoNeng(token=getStore('token'), userId=getStore('userId')).then((res) => {
          if(res.data.code==1){
            this.NTKF_PARAM = res.data.data;
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      getDepositAccoutInfo(){
        //获取存管账户
        let token, userId;
        depositAccoutInfo(token=getStore('token'), userId=getStore('userId')).then(res => {
          if(res.data.code==1){
            this.accountInfo=res.data.data;
          }else {
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      _queryCommonBalance(info){
        //刷新余额
        let token, userId;
        queryCommonBalance(token=getStore('token'), userId=getStore('userId')).then(res => {
          if(res.data.code==1){
            if(info==1){
              this.$refs.windowTips.toast('刷新成功');
            }
            this.commonBalance = res.data.data.commonBalance;
          }else {
            if(info==1){
              this.$refs.windowTips.toast('刷新失败，请稍后再试');
            }
            // this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      payNextStep(){
        if(!this.payMoney){
          this.$refs.windowTips.toast('请输入充值金额');
          return;
        }
        if(Number(this.payMoney)<100){
          this.$refs.windowTips.toast('充值金额100元起');
          return;
        }
        if(!this.payClick){
          return;
        }
        this.payClick = false;
        let token, userId, amount, platForm,callBackURL;
        deductPayRequest(token=getStore('token'), userId=getStore('userId'), amount=this.payMoney,platForm='3',callBackURL=`wapfront/account?zsCallback=recharge`).then(res => {
          if(res.data.code==1){
            this.payClick = true;
            setStore('rechargeOrderNo',res.data.data.orderNo);
            formSubmit(res.data.data.zsUrl,{reqMsg:res.data.data.reqMsg});
          }else {
            this.payClick = true;
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch((error)=>{
          this.payClick = true;
          console.log(error);
        });
      },
    },
    components: {
      mheader,
      windowTips,
      RemoteJs
    },
    destroyed(){
      this.clipboardCompany.destroy();
      this.clipboardreadAcount.destroy();
      this.clipboardAcount.destroy();
    }
  }

</script>

<style lang='less' scope>
.recharge {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  background: #f4f4f4;
  padding-top: 0.8rem;
  .title {
    display: block;
    display: flex;
    height: 0.6rem;
    width: 60%;
    padding:0 20%;
    line-height: 0.6rem;
    margin: 0.2rem 0;
    span {
      display: block;
      flex: 1;
      font-size: 0.25rem;
      text-align: center;
      border:1px solid #f4f4f4;
      background: #fff;
    }
    span:nth-child(1){
      border-top-left-radius: 0.15rem;
      border-bottom-left-radius: 0.15rem;
      border-right: 0;
    }
    span:nth-child(2){
      border-top-right-radius: 0.15rem;
      border-bottom-right-radius: 0.15rem;
      border-left: 0;
    }
    span.sele {
      color: #fff;
      background: #fe9a15;
    }
  }
  .fast-recharge {
    .account-info {
      display: block;
      display: flex;
      background: #fff;
      padding: 0.3rem 0 0.5rem;
      >div:nth-child(1) {
        width: 1.3rem;
        height: 1rem;
        text-align: center;
        img {
          width: 0.8rem;
          height: 0.8rem;
        }
      }
      >div:nth-child(2){
        p:nth-child(1),
        p:nth-child(2) {
          font-size: 0.25rem;
          line-height: 0.35rem;
          font-weight: 700;
        }
        p:nth-child(3) {
          color: #999;
          font-size: 0.23rem;
          line-height: 0.4rem;
          span.money {
            color: #ff654f;
          }
        }
      }
    }
    .check-bankcard-limit {
      font-size: 0.23rem;
      padding: 0.25rem 0.23rem;
      color: #ff654f;
    }
    .pay-money {
      display: block;
      display: flex;
      height: 0.4rem;
      padding: 0.2rem;
      font-size: 0.23rem;
      background: #fff;
      >div:nth-child(1) {
        width: 1.2rem;
        text-align: center;
        line-height: 0.4rem;
      }
      >div:nth-child(2) {
        display: block;
        flex: 1;
        input {
          height: 0.4rem;
          line-height: 0.4rem;
          width: 100%;
          text-align: right;
        }
      }
    }
    .pay-enter {
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.3rem;
      text-align: center;
      color: #ffffff;
      margin: 0.6rem 0.24rem 0.2rem;
      border-radius: 0.7rem;
      background: #ff654f;
    }
    .pay-instructions {
      padding: 0.2rem;
      font-size: 0.2rem;
      color: #999;
      line-height: 0.3rem;
      h3 {
        padding: 0.3rem 0;
        font-size: 0.25rem;
      }
      p:last-child {
        margin-top: 0.8rem;
        text-align: center;
        color: #8FD1FF;
      }
    }
  }
  .transfer-recharge {
    .transfer-info {
      background: #fff;
      ul>li {
        display: block;
        display: flex;
        padding: 0.35rem 0.23rem;
        font-size: 0.24rem;
        >div:nth-child(1){
          display: block;
          flex: 1;
          line-height: 0.35rem;
          span {
            color: #999;
            font-size: 0.2rem;
          }
        }
      }
    }
    .txt {
      font-size: 0.2rem;
      color: #999;
      h3 {
        padding: 0.3rem 0.23rem;
        font-size: 0.25rem;
      }
      p {
        padding: 0 0.23rem;
        line-height: 0.35rem;
      }
    }
    .account-info {
      background: #fff;
      line-height: 0.5rem;
      padding: 0.25rem 0;
      p:nth-child(1){
        font-size: 0.23rem;
        color: #999;
        padding-left: 0.23rem;
      }
      p:nth-child(2){
        font-size: 0.25rem;
        padding-left: 0.35rem;
        font-weight: 700;
      }
      p:nth-child(3){
        font-size: 0.3rem;
        padding-left: 0.35rem;
        font-weight: 700;
      }
    }
    .updata-overage {
      margin-top: 0.2rem;
      font-size: 0.23rem;
      background: #fff;
      padding: 0.35rem 0;
      >div:nth-child(1) {
        font-size: 0.23rem;
        line-height: 0.3rem;
        color: #999;
        padding-left: 0.23rem;
        padding-right: 0.23rem;
        padding-bottom: 0.3rem;
      }
      >div:nth-child(2) {
        display: block;
        display: flex;
        font-size: 0.23rem;
        color: #999;
        padding:0.6rem 0.23rem;
        span:nth-child(1) {
          display: block;
          flex: 1;
          i {
            color: #ff654f;
          }
        }
        span:nth-child(2) {
          color: #8FD1FF;
        }
      }
      .pay-pwd {
        display: block;
        display: flex;
        padding-top: 0.3rem;
        padding-left: 0.23rem;
        font-size: 0.2rem;
        color: #999;
        >div {
          height: 0.4rem;
          line-height: 0.4rem;
        }
        >div:nth-child(2){
          display: block;
          flex: 1;
          padding-left: 0.35rem;
          input {
            height: 0.4rem;
            line-height: 0.4rem;
            width: 90%;
            border: 1px solid #999;
            border-radius: 0.05rem;
          }
        }
      }
      .transfer-enter {
        height: 0.7rem;
        line-height: 0.7rem;
        font-size: 0.3rem;
        text-align: center;
        color: #ffffff;
        margin: 0.6rem 0.24rem 0.2rem;
        border-radius: 0.7rem;
        background: #ff654f;
      }
    }
    >p:last-child{
      text-align: center;
      font-size: 0.23rem;
      color:#8FD1FF;
      padding: 0.8rem 0 0.2rem;
    }
  }
}

</style>
