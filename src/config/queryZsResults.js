import { getStore, removeStore } from "./mUtils";
import { queryTransRechargeResult,updateAccnoStatus, queryDepositAcco,queryTransWithdrawResult,queryModifyBankMobile, queryUserBidSetStatus,queryResetPwdStatus } from '@/server/getData';
import {
  baseUrl
} from '../config/env'


var queryZs = {
  methods: {
    queryZsResult(zsCallback) {
      console.log('zsCallback',zsCallback);
      if(zsCallback=='recharge'){ 
        // 充值返回
        this.queryRecharge();
      }else if(zsCallback=='depositAccount'){ 
        // 开户返回
        this.queryDepositAccount();
      }else if(zsCallback=='replaceBankCard'){ 
        // 更换银行卡返回
        console.log('--modifyBankPhoneOrderNo--',getStore('modifyBankPhoneOrderNo'))
        this.queryReplaceBankCard();
      }else if(zsCallback=='modifyBankPhone'){ 
        // 更换银行卡预留手机号返回
        this.queryModifyBankPhone();
      }else if(zsCallback=='withdrawCash'){ 
        // 提现返回
        this.queryWithdrawCash();
      }else if(zsCallback=='autoBidSet'){ 
        // 自动投标授权返回
        this.queryautoBidSet();
      }else if(zsCallback=='DepositResetPwd'){ 
        // 浙商密码重置
        this.queryDepositResetPwd();
      }
    },
    // 充值返回
    queryRecharge(){ 
      if(!getStore('rechargeOrderNo')){return;}
      let token, userId, orderNo, platForm;
      queryTransRechargeResult(token=getStore('token'), userId=getStore('userId'), orderNo=getStore('rechargeOrderNo'), platForm='3').then((res) => {
        removeStore('rechargeOrderNo');
        if(res.data.code==20){
          this.$refs.windowTips.sendStatus('success',res.data.msg);
        }else if(res.data.code==10||res.data.code==40){
          this.$refs.windowTips.sendStatus('processing',res.data.msg);
        }else if(res.data.code==0||res.data.code==30){
          this.$refs.windowTips.sendStatus('error',res.data.msg);
        }else {
          this.$refs.windowTips.sendStatus('processing','请稍后查询');
        }  
       }).catch((error) => {
         console.log(error)
       });
    },
    // 开户返回
    queryDepositAccount(){
      if(!getStore('depositAccountOrderNo')){return;}
      let token, userId, orderNo;
      queryDepositAcco(token=getStore('token'), userId=getStore('userId'), orderNo=getStore('depositAccountOrderNo')).then((res) => {
        removeStore('depositAccountOrderNo');
        if(res.data.code==20){
          this.$refs.windowTips.sendStatus('success',res.data.msg);
        }else if(res.data.code==10||res.data.code==40){
          this.$refs.windowTips.sendStatus('processing',res.data.msg);
        }else if(res.data.code==0||res.data.code==30){
          this.$refs.windowTips.sendStatus('error',res.data.msg);
        }else {
          this.$refs.windowTips.sendStatus('processing','请稍后查询');
        }  
       }).catch((error) => {
         console.log(error)
       });
    },
    // 更换银行卡返回
    queryReplaceBankCard(){
      if(!getStore('replaceBankCardOrderNo')){return;}
      let token, userId, orderNo;
      updateAccnoStatus(token=getStore('token'), userId=getStore('userId'), orderNo=getStore('replaceBankCardOrderNo')).then(res => { 
        removeStore('replaceBankCardOrderNo');
        if(res.data.code==20){
          this.$refs.windowTips.sendStatus('success',res.data.msg);
        }else if(res.data.code==10||res.data.code==40){
          this.$refs.windowTips.sendStatus('processing',res.data.msg);
        }else if(res.data.code==0||res.data.code==30){
          this.$refs.windowTips.sendStatus('error',res.data.msg);
        }else {
          this.$refs.windowTips.sendStatus('processing','请稍后查询');
        }  
      }).catch((error)=>{
        console.log(error);
      });
    },
    // 更换银行卡预留手机号返回
    queryModifyBankPhone(){
      if(!getStore('modifyBankPhoneOrderNo')){return;}
      let token, userId, orderNo, platForm;
      queryModifyBankMobile(token=getStore('token'), userId=getStore('userId'), orderNo=getStore('modifyBankPhoneOrderNo'), platForm='3').then((res) => {
        removeStore('modifyBankPhoneOrderNo');
        if(res.data.code==20){
          this.$refs.windowTips.sendStatus('success',res.data.msg);
        }else if(res.data.code==10||res.data.code==40){
          this.$refs.windowTips.sendStatus('processing',res.data.msg);
        }else if(res.data.code==0||res.data.code==30){
          this.$refs.windowTips.sendStatus('error',res.data.msg);
        }else {
          this.$refs.windowTips.sendStatus('processing','请稍后查询');
        }  
      }).catch((error) => {
         console.log(error)
      });
    },
    // 提现返回
    queryWithdrawCash(){
      if(!getStore('withdrawCashOrderNo')){return;}
      let token, userId, orderNo, platForm;
      queryTransWithdrawResult(token=getStore('token'), userId=getStore('userId'), orderNo=getStore('withdrawCashOrderNo'), platForm='3').then((res) => {
        removeStore('withdrawCashOrderNo');
        if(res.data.code==20){
          this.$refs.windowTips.sendStatus('success',res.data.msg);
        }else if(res.data.code==10||res.data.code==40){
          this.$refs.windowTips.sendStatus('processing',res.data.msg);
        }else if(res.data.code==0||res.data.code==30){
          this.$refs.windowTips.sendStatus('error',res.data.msg);
        }else {
          this.$refs.windowTips.sendStatus('processing','请稍后查询');
        }  
      }).catch((error) => {
         console.log(error)
      });
    },
    // 自动投标授权返回
    queryautoBidSet(){
      if(!getStore('autoBidSetOrderNo')){return;}
      let token, userId, orderNo;
      queryUserBidSetStatus(token=getStore('token'), userId=getStore('userId'), orderNo=getStore('autoBidSetOrderNo')).then((res) => {
        removeStore('autoBidSetOrderNo');
        if(res.data.code==20){
          this.$refs.windowTips.sendStatus('success',res.data.msg);
        }else if(res.data.code==10||res.data.code==40){
          this.$refs.windowTips.sendStatus('processing',res.data.msg);
        }else if(res.data.code==0||res.data.code==30){
          this.$refs.windowTips.sendStatus('error',res.data.msg);
        }else {
          this.$refs.windowTips.sendStatus('processing','请稍后查询');
        }  
      }).catch((error) => {
         console.log(error)
      });
    },
    // 浙商密码重置
    queryDepositResetPwd(){
      if(!getStore('DepositResetPwdOrderNo')){return;}
      let token, userId, orderNo;
      queryResetPwdStatus(token=getStore('token'), userId=getStore('userId'), orderNo=getStore('autoBidSetOrderNo')).then((res) => {
        removeStore('DepositResetPwdOrderNo');
        if(res.data.code==20){
          this.$refs.windowTips.sendStatus('success',res.data.msg);
        }else if(res.data.code==10||res.data.code==40){
          console.log('processing');
          this.$refs.windowTips.sendStatus('processing',res.data.msg);
        }else if(res.data.code==0||res.data.code==30){
          this.$refs.windowTips.sendStatus('error',res.data.msg);
        }else {
          this.$refs.windowTips.sendStatus('processing','请稍后查询');
        }  
      }).catch((error) => {
         console.log(error)
      });
    }
  }
}

export default queryZs;