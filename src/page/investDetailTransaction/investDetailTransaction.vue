<template>
  <div class="investDetailTransaction">
    <mheader :headTitle='title' :goBack="'true'" class="borderBottom-1px"></mheader>
    <div class="investment-input" >
      <ul class="account-money" :class="{marbottom:$route.query.subjectType!=4}">
        <li class="borderBottom-1px">
          <div>可用余额&nbsp;&nbsp;<span class="money">{{DetailData.usableSum}}元</span></div>
          <div @click="$router.push('recharge')"><span>去充值</span></div>
        </li>
      </ul>
      <ul class="account-transaction">
         <li v-if='$route.query.subjectType!=4' class="borderBottom-1px">
          <span>标的剩余可投</span> <span class="money">{{mathInvestAmount}}元</span>
        </li>
        <li v-if='$route.query.subjectType!=4' class="borderBottom-1px">
          <div>投标金额: </div>
          <div>
            <input type="number" @input="reWordfilter" v-model="InputMoney" placeholder="起投金额100，以10的整数倍递增" autofocus="autofocus" oninput="if(value.length>15)value=value.slice(0,15);if(!/^-?\d+\.?\d{0,2}$/.test(value))value=value.slice(0,value.length-1)">
          </div>
        </li>
        <li v-if='$route.query.subjectType==4' class="borderBottom-1px">
          <span>转让金额</span> <span class="money">{{DetailData.auctionBasePrice}}元</span>
        </li>
        <p v-if='$route.query.subjectType!=4' style="font-size:0.14rem;text-align:right;padding:0.25rem 0.23rem;">
          预期:<i style="color:#FFAD05;">{{interest.earnAmount?interest.earnAmount:0}}</i>元
          <span v-if="Number(interest.plusCounponSum)>0">+奖励: <i style="color:#FFAD05;">{{interest.plusCounponSum}}</i> 元</span>
          <span v-if="Number(interest.couponInterestSum)>0">+奖励: <i style="color:#FFAD05;">{{interest.couponInterestSum}}</i> 元</span>
          <span v-if="Number(interest.couponInterestSum)>0||Number(interest.plusCounponSum)>0">=
            <i style="color:#FFAD05;">{{(Number(interest.earnAmount)+Number(interest.plusCounponSum)+Number(interest.couponInterestSum)).toFixed(2)}}</i> 元</span>
        </p>
        <li class="sele-welfare borderBottom-1px" v-if="$route.query.subjectType!=4&&$route.query.subjectType!=6">
          <div @click="switchBenefits('redenvelope')">
            红包 <i class="iconfont" :class="{'icon-weixuanzhongyuanquan':sele_welfare=='rewardTicket'||sele_welfare=='','icon-selected':sele_welfare=='redenvelope'}"></i>
          </div>
          <div @click="switchBenefits('rewardTicket')">
            奖励券 <i class="iconfont" :class="{'icon-weixuanzhongyuanquan':sele_welfare=='redenvelope'||sele_welfare=='','icon-selected':sele_welfare=='rewardTicket'}"></i>
          </div>
        </li>
        
        <li v-if="$route.query.subjectType!=4&&$route.query.subjectType!=6&&sele_welfare!=''" class="available-redenvelopes borderBottom-1px" @click="selectBenefits()">
          <div>{{sele_welfare=='redenvelope'?'红包':sele_welfare=='rewardTicket'?'奖励券':'可用福利'}}</div>
          <div>
            <span>{{selectBenefitsCon}}<i class="iconfont icon-more"></i></span>
          </div>
        </li>
        <li class=" borderBottom-1px" v-if="autoBidSetStatus==1">
          <div>交易密码</div>
          <div>
             <input type="password" placeholder="请输入交易密码" v-model="investpwd" autofocus="autofocus" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" oninput="if(value.length>18)value=value.slice(0,18)">
          </div>
        </li>
        <!-- <li class="inputVcode borderBottom-1px" v-else>
          <div>手机验证码</div>
          <div>
             <input type="text" placeholder="请输入验证码" ref="inputInvestVerify" v-model="code_vertify" autofocus="autofocus" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" oninput="if(value.length>13)value=value.slice(0,13)">
             <span @click="investRequestSmsCode">{{investCountdown}}</span>
          </div>
        </li> -->
      </ul>
      <p class="agree" v-if='$route.query.subjectType!=4'>
        <i @click="agree=!agree" class="iconfont" :class="{'icon-selected':agree,'icon-weixuanzhongyuanquan':!agree}"></i>
        我已阅读并同意
        <router-link tag='span' to='Agreement/loanAgreement'>《借款协议》</router-link>
        和
        <router-link tag='span' to='riskWarning'>《风险提示书》</router-link>
      </p>
      <p class="agree" v-if='$route.query.subjectType==4'>
        <i @click="agree=!agree" class="iconfont" :class="{'icon-selected':agree,'icon-weixuanzhongyuanquan':!agree}"></i>
        我已阅读并同意
        <router-link tag='span' to='Agreement/loanAgreement'>《借款协议》</router-link>
        和
        <router-link tag='span' to='Agreement/debtAssignmentAgreement'>《债权转让协议》</router-link>
        、<router-link tag='span' to='riskWarning'>《风险提示书》</router-link> 
      </p>
      <div class="btn-footer">
        <p class="welfare" v-if='$route.query.subjectType!=4'>实际支付: <span>{{actualPayment}}元</span></p>
        <p class="welfare" v-if='$route.query.subjectType==4'>&nbsp; 实际支付: <span>{{DetailData.auctionBasePrice}}元</span></p>
        <div class="investment-transaction" @click='ImmediateInvestment' :style="{background:payClick?'#ff654f':'#999'}">
          立即投标
        </div>
        <p class="tip">网贷有风险，出借需谨慎</p>
      </div>
    </div>
     <transition name="rechargeTips-fade" mode="out-in">
      <div class="rechargeTips" v-if="rechargeTip" @click='rechargeTip=false'>
        <div>
          <p @click="$router.push('recharge')"></p>
          <span @click='rechargeTip=false'></span>
        </div>
      </div>
    </transition>
    <window-tips ref='windowTips'></window-tips>
  </div>
</template>

<script>

import mheader from '@/components/header/header.vue'
import windowTips from '@/components/common/windowTips/windowTips.vue'
import { encryptByDES } from '@/config/des_encryption.js'
import { getExpectEarningsAmt, requestSmsCode, fundBlock, debtTransfer } from '@/server/getData.js'
import { getStore, setStore, removeStore,formSubmit } from "@/config/mUtils";
import { mapState } from 'vuex';

 export default {
   data () {
     return {
       title:'',
       DetailData:{},
       mathInvestAmount:'',
       InputMoney:'',//输入金额
       sele_welfare:'',//选择福利类型
       redenvelopes:[],//红包集合
       rewardTickets:[],//加息券集合
       selectBenefitsCon:'',//福利选择结果
       agree:false,
       actualPayment:0,//实际支付
       BenefitsId:'',//选择福利的Id
       rechargeTip:false,//充值弹窗展示
       interest:'',//预期收益利息
       investpwd:'',//交易密码
      //  code_vertify:'',//短信验证码
       autoBidSetStatus:'',//是否开通了自动投标
      //  getSMScode:false, //节流
      //  investCountdown:'获取验证码',
       countTimer:null,//定时器
       payClick:true,//支付节流
     }
   },
   beforeRouteEnter(to, from, next){
    if((from.name== 'seleRewardList'&&to.name=='investDetailTransaction')||(from.name== 'riskWarning'&&to.name=='investDetailTransaction')||(from.name== 'loanAgreement'&&to.name=='investDetailTransaction')||(from.name== 'debtAssignmentAgreement'&&to.name=='investDetailTransaction')){
      next(vm=>{
        if(getStore('selectBenefitObj')){
          let type = JSON.parse(getStore('selectBenefitObj')).type?JSON.parse(getStore('selectBenefitObj')).type:'';
          let Id = JSON.parse(getStore('selectBenefitObj')).Id?JSON.parse(getStore('selectBenefitObj')).Id:'';
          let val = JSON.parse(getStore('selectBenefitObj')).val?JSON.parse(getStore('selectBenefitObj')).val:'';
          let activityType = JSON.parse(getStore('selectBenefitObj')).activityType?JSON.parse(getStore('selectBenefitObj')).activityType:'';
          vm.selectBenefitsId(type,Id,val,activityType);
        }
      });
    }else if(from.name== 'investDetailTransactionSucess'&&to.name=='investDetailTransaction'){
      next(vm=>{
        vm.$router.push('invest');
      });
    } else{
      next(vm=>{
        vm.InputMoney='';//输入金额
        vm.sele_welfare='';//选择福利类型
        vm.redenvelopes=[];//红包集合
        vm.rewardTickets=[];//加息券集合
        vm.selectBenefitsCon='';//福利选择结果
        vm.agree=false;
        vm.actualPayment=0;//实际支付
        vm.BenefitsId='';//选择福利的Id
        vm.rechargeTip=false;//选择福利的Id
        vm.interest='';//预期收益利息
        vm.investpwd='';//交易密码
        // vm.code_vertify='';//短信验证码
        vm.autoBidSetStatus='';//是否开通了自动投标
        // vm.getSMScode = false;
        // vm.investCountdown='获取验证码';
        vm.payClick=true;
        if(vm.countTimer!=null){
          clearInterval(vm.countTimer);
        }
        vm.investDetailTransaction_init();
        setTimeout(() => {
        if(vm.$store.state.userInfo&&vm.$store.state.userInfo.autoBidSetStatus){
          vm.autoBidSetStatus = vm.$store.state.userInfo.autoBidSetStatus;
        }
        }, 500);  
        if(vm.$store.state.userInfo&&vm.$store.state.userInfo.autoBidSetStatus){
          vm.autoBidSetStatus = vm.$store.state.userInfo.autoBidSetStatus;
        }
      });
    }
   }, 
   computed: {
    ...mapState([
        'userInfo'
    ]),
  },
   mounted(){
    if(getStore('selectBenefitObj')){
      removeStore('selectBenefitObj');
    }
    this.investDetailTransaction_init();
    setTimeout(() => {
      if(this.$store.state.userInfo&&this.$store.state.userInfo.autoBidSetStatus){
        this.autoBidSetStatus = this.$store.state.userInfo.autoBidSetStatus;
      }
    }, 500);  
    if(this.$store.state.userInfo&&this.$store.state.userInfo.autoBidSetStatus){
      this.autoBidSetStatus = this.$store.state.userInfo.autoBidSetStatus;
    }
   },
   methods:{
     investDetailTransaction_init(){
       if(getStore('DetailData')){
          this.DetailData = JSON.parse(getStore('DetailData'));
          if(this.DetailData.borrowDetailMap) {
            this.mathInvestAmount = this.DetailData.borrowDetailMap.mathInvestAmount;
          }
       }else {
        this.$router.go(-1);
       }
        // subjectType 3 散标专区、subjectType 4 转让专区、subjectType 5 个人专区、subjectType 6 新手专区、subjectType 7 企业专区
        if(this.$route.query.subjectType==3){ //散标专区
          this.title = '散标专区'; 
        }else if(this.$route.query.subjectType==4){ //转让专区
          this.title = '转让专区';    
        }else if(this.$route.query.subjectType==5){ //个人专区
          this.title = '个人专区';  
        }else if(this.$route.query.subjectType==6){ //新手专区
          this.title = '新手专区';
        }else if(this.$route.query.subjectType==7){ //企业专区
          this.title = '企业专区'
        }
     },
     getExpectedReturn(BenefitsId,InputMoney){ //获取预期收益
      if(this.$route.query.subjectType==4){
        return;
      }
      if(!InputMoney) {
        InputMoney = 0;
      }
      //非转让专区
      let token, userId, borrowId, plusCouponId, investAmt;
      getExpectEarningsAmt(token=getStore('token'),userId=getStore('userId'),borrowId=this.$route.query.borrowId, plusCouponId=BenefitsId, investAmt=InputMoney).then(res => {
        if(res.data.code==1){
          this.interest = res.data.data;
        }else {
          this.$refs.windowTips.toast(res.data.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
     },
     reWordfilter(){
      this.InputMoney = this.InputMoney.replace(/(^\s*)|(\s*$)/g, ""); 
      this.redenvelopes=[];
      this.rewardTickets=[];
      this.selectBenefitsCon = "";
      this.BenefitsId = '';
      this.actualPayment=this.InputMoney;
      if(!this.InputMoney){
        this.actualPayment = 0;
        if(this.sele_welfare=='redenvelope'){
          this.selectBenefitsCon = '无符合条件的红包';
        }else if(this.sele_welfare=='rewardTicket'){
          this.selectBenefitsCon = '无符合条件的奖励券';
        }
        this._setSelectBenefitObj(null);
        return;
      }
      if(this.DetailData.wealList&&this.DetailData.wealList.length>0){
        this.DetailData.wealList.map((value) => {
          if(value.flType=='HB'&&this.InputMoney>=value.useRuleAmt){
           this.redenvelopes.push(value);
          }
        });
        this.DetailData.wealList.map((value) => {
          if(value.flType=='JXJ'&&this.InputMoney>=value.useRuleAmt){
            this.rewardTickets.push(value);
          }
        });
        this.redenvelopes.sort((a,b)=>{
          return b.awardMoney-a.awardMoney;
        })
        this.rewardTickets.sort((a,b)=>{
          return b.couponRate-a.couponRate;
        })
        if(this.redenvelopes.length>0){
          this.sele_welfare = 'redenvelope';
          this.selectBenefitsCon = `${this.redenvelopes[0].awardMoney}元红包`;
          this.BenefitsId = this.redenvelopes[0].Id;
          if(this.redenvelopes[0].activityType != 'DKHB'){
            this.actualPayment = this.InputMoney;
          }else {
            this.actualPayment = this.InputMoney - this.redenvelopes[0].awardMoney;//实际支付金额
          }
          this._setSelectBenefitObj(this.sele_welfare, this.BenefitsId, this.redenvelopes[0].awardMoney, this.redenvelopes[0].activityType);
        }
        if(this.redenvelopes.length<=0&&this.rewardTickets.length>0){
          this.sele_welfare = 'rewardTicket';
          this.selectBenefitsCon = `${this.rewardTickets[0].couponRate}%奖励券`;
          this.BenefitsId = this.rewardTickets[0].Id;
          this._setSelectBenefitObj(this.sele_welfare, this.BenefitsId, this.rewardTickets[0].couponRate, this.rewardTickets[0].activityType);
        }
        if(this.sele_welfare=='redenvelope'&&this.redenvelopes.length==0){
          this.BenefitsId='';
          this.selectBenefitsCon = '无符合条件的红包';
          this.actualPayment = this.InputMoney;//实际支付金额
          this._setSelectBenefitObj(null);
        }
        if(this.sele_welfare=='rewardTicket'&&this.rewardTickets.length==0){
          this.BenefitsId='';
          this.selectBenefitsCon = '无符合条件的奖励券';
          this.actualPayment = this.InputMoney;//实际支付金额
          this._setSelectBenefitObj(null);
        }
      }else {
        this.actualPayment = this.InputMoney?this.InputMoney:0;
        this.sele_welfare = ''
        this.BenefitsId='';
        this.selectBenefitsCon = '';
        if(this.sele_welfare=='redenvelope'){
          this.selectBenefitsCon = '无符合条件的红包';
        }else if(this.sele_welfare=='rewardTicket'){
          this.selectBenefitsCon = '无符合条件的奖励券';
        }
        this._setSelectBenefitObj(null);
      }
      this.actualPayment=Number(this.actualPayment);
      if(this.InputMoney>=10){
        this.getExpectedReturn(this.BenefitsId,this.InputMoney);
      }else {
        this.interest = '';
      }
    },
    switchBenefits(type){//切换福利选择
      this.InputMoney = this.InputMoney?this.InputMoney:'';
      if(this.sele_welfare==type){
        this.sele_welfare = ''
        this.BenefitsId='';
        this.selectBenefitsCon = '';
        this.actualPayment = this.InputMoney?this.InputMoney:0;//实际支付金额
        this._setSelectBenefitObj(null);
        return;
      } else {
        this.sele_welfare = type;
      }
      if(type == 'redenvelope'){
        if(this.redenvelopes[0]&&this.redenvelopes[0].Id){
          this.BenefitsId=this.redenvelopes[0].Id;
          this.selectBenefitsCon = `${this.redenvelopes[0].awardMoney}元红包`;
          if(this.redenvelopes[0].activityType != 'DKHB'){
            this.actualPayment = this.InputMoney;
          }else {
             this.actualPayment = this.InputMoney - this.redenvelopes[0].awardMoney;//实际支付金额
          }
          this._setSelectBenefitObj(type, this.BenefitsId, this.redenvelopes[0].awardMoney, this.redenvelopes[0].activityType);
        }else {
          this.BenefitsId='';
          this.selectBenefitsCon = '无符合条件的红包';
          this.actualPayment = this.InputMoney?this.InputMoney:0;//实际支付金额
          this._setSelectBenefitObj(null);
        }
      }else if(type == 'rewardTicket'){
        if(this.rewardTickets[0]&&this.rewardTickets[0].Id){
          this.BenefitsId=this.rewardTickets[0].Id;
          this.selectBenefitsCon = `${this.rewardTickets[0].couponRate}%奖励券`;
          this.actualPayment = this.InputMoney;//实际支付金额
          this._setSelectBenefitObj(type, this.BenefitsId, this.rewardTickets[0].couponRate, this.rewardTickets[0].activityType);
        }else {
          this.BenefitsId='';
          this.selectBenefitsCon = '无符合条件的奖励券';
          this.actualPayment = this.InputMoney?this.InputMoney:0;//实际支付金额
          this._setSelectBenefitObj(null);
        }
      }
      if(this.InputMoney>=10){
        this.getExpectedReturn(this.BenefitsId,this.InputMoney);
      }
    },
    _setSelectBenefitObj(type, Id, val, activityType){//选择福利id
      if(!type) {
        if(getStore('selectBenefitObj')){removeStore('selectBenefitObj')}
        return;
      }
      let _selectBenefitObj;
      if(getStore('selectBenefitObj')){
        _selectBenefitObj = {
          type:type?type:JSON.parse(getStore('selectBenefitObj')).type, 
          Id:Id?Id:JSON.parse(getStore('selectBenefitObj')).Id, 
          val:val?val:JSON.parse(getStore('selectBenefitObj')).val, 
          activityType:activityType?activityType:JSON.parse(getStore('selectBenefitObj')).activityType,
        }
      }else {
        _selectBenefitObj = {
          type, Id, val, activityType
        }
      }
      setStore('selectBenefitObj',JSON.stringify(_selectBenefitObj));
    },
    selectBenefits(){
      if(this.sele_welfare==''){
        return;
      }
      if(this.BenefitsId){
        this._setSelectBenefitObj(this.sele_welfare, this.BenefitsId, '', '');
      }
      if(this.sele_welfare=='redenvelope'&&this.redenvelopes.length>0){
        removeStore('rewardTickets');
        setStore('redenvelopes',JSON.stringify(this.redenvelopes));
        setTimeout(() => {
          this.$router.push('seleRewardList');
        }, 200);
      }
      if(this.sele_welfare=='rewardTicket'&&this.rewardTickets.length>0){
        removeStore('redenvelopes');
        setStore('rewardTickets',JSON.stringify(this.rewardTickets));
        setTimeout(() => {
          this.$router.push('seleRewardList');
        }, 200);
      }
    },
    selectBenefitsId(type, Id, val, activityType){//选择福利类型与id
      // console.log('type',type);
      // console.log('Id',Id);
      // console.log('val',val);
      // console.log('activityType',activityType);
      if(type=='no'){
        this.BenefitsId='';
        this.selectBenefitsCon='不使用福利';
        this.actualPayment = this.InputMoney;//实际支付金额
      }
      if(type == 'redenvelope'){
        this.BenefitsId=Id;
        this.selectBenefitsCon = `${val}元红包`;
        if(activityType!='DKHB'){
          this.actualPayment = this.InputMoney;
        }else {
          this.actualPayment = this.InputMoney - val;//实际支付金额
        }
      }else if(type == 'rewardTicket'){
        this.BenefitsId=Id;
        this.selectBenefitsCon = `${val}%奖励券`;
        this.actualPayment=this.InputMoney;
      }
      if(this.InputMoney>=10){
        this.getExpectedReturn(this.BenefitsId,this.InputMoney);
      }
      this._setSelectBenefitObj(type, Id, val, activityType);
    },
    // investRequestSmsCode(){
    //   if(this.getSMScode){
    //     return;
    //   }
    //   let token, userId, smsType, mobile;
    //   requestSmsCode(token=getStore('token'), userId=getStore('userId'), smsType=2, mobile=this.$store.state.userInfo.cellphone).then(res => { 
    //     this.$refs.inputInvestVerify.focus();
    //     this.getSMScode = true;
    //     let seconds = 60;
    //     this.countTimer =  setInterval(() => {
    //       this.investCountdown = seconds--+'秒';
    //       if(this.investCountdown=='1秒'){
    //         this.getSMScode = false;
    //         this.investCountdown = '立即获取';
    //         clearInterval(this.countTimer);
    //       }
    //     }, 1000);
    //     if(res.data.code!=1){
    //       this.getSMScode = false;
    //       this.investCountdown = '立即获取';
    //       clearInterval(this.countTimer);
    //       this.$refs.windowTips.toast(res.data.msg);
    //     }
    //   }).catch(function (error) {
    //     console.log(error);
    //     this.$refs.windowTips.toast(error);
    //   });
    // },
    ImmediateInvestment(){ // 立即投标
      
      if(!this.agree){this.$refs.windowTips.toast('请先阅读并同意相关协议');return;}
      if(this.$route.query.subjectType!=4){ //非转让专区
        if(!this.InputMoney){this.$refs.windowTips.toast('请输入金额');return;}
        if(Number(this.InputMoney)<100){this.$refs.windowTips.toast('您输入的金额小于起投余额了，请重新输入！');return;}
        if(Number(this.InputMoney)%10!=0){this.$refs.windowTips.toast('输入的金额必须是10的整数倍，请重新输入！');return;}
        if(Number(this.InputMoney)>Number(this.mathInvestAmount)){this.$refs.windowTips.toast('您输入的金额大于可投余额了，请重新输入！');return;}
        if(!this.investpwd&&this.autoBidSetStatus==1){
          this.$refs.windowTips.toast('请输入密码');return;
        }
        // if(!this.code_vertify&&this.autoBidSetStatus!=1){
        //   this.$refs.windowTips.toast('请输入短信验证码');return;
        // }
        if(Number(this.DetailData.usableSum)<Number(this.InputMoney)){
          this.rechargeTip=true;
          return;
        }
        if(!this.payClick){
          return;
        }
        this.payClick = false;
        // 去投标
        let token, userId, id, amount, wealType, couponId, redEnvelopId, awardMoney, platForm, callBackURL;
        if(this.sele_welfare=='redenvelope'&&this.BenefitsId){
            wealType = 'HB';
            redEnvelopId=this.BenefitsId;
            awardMoney = Number(this.InputMoney)-Number(this.actualPayment);
        }else if(this.sele_welfare=='rewardTicket'&&this.BenefitsId){
            wealType = 'JXJ';
            couponId=this.BenefitsId;
        }
        fundBlock(token=getStore('token'), userId=getStore('userId'), id=this.$route.query.borrowId, amount=this.InputMoney, wealType, couponId, redEnvelopId, awardMoney, platForm=3, callBackURL=`wapfront/investDetailTransactionSucess?zsCallback=investDetailTransaction`).then(res => {
          if (res.data.code == 1) {
            if(!res.data.data.zsUrl) {
              this.$refs.windowTips.toast('投标成功！');
              setTimeout(()=>{
                this.$router.push(`investDetailTransactionSucess?subjectType=${this.$route.query.subjectType}`);
                this.payClick = true;
              },1500)
            }else {
              this.payClick = true;
              setStore('investDetailTransactionOrderNo',res.data.data.orderNo);
              formSubmit(res.data.data.zsUrl,{reqMsg:res.data.data.reqMsg});
            }
            
          }else {
            this.payClick = true;
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch((error)=>{
          this.payClick = true;
          console.log(error);
        });
      }
      if(this.$route.query.subjectType==4){ //转让专区
        if(Number(this.DetailData.auctionBasePrice)>Number(this.DetailData.usableSum)){
          this.rechargeTip=true;
          return;
        }
        if(!this.payClick){
          return;
        }
        this.payClick = false;
        let token, userId, debtId, amount,  platForm, callBackURL ;
        debtTransfer(token=getStore('token'), userId=getStore('userId'), debtId=this.$route.query.borrowId, amount=this.DetailData.auctionBasePrice, platForm=3, callBackURL=`wapfront/investDetailTransactionSucess?zsCallback=investDetailTransaction`).then(res => {
          if (res.data.code == 1) {
            if(!res.data.data.zsUrl) {
              this.$refs.windowTips.toast('投标成功！');
              setTimeout(()=>{
                this.$router.push(`investDetailTransactionSucess?subjectType=${this.$route.query.subjectType}`);
                this.payClick = true;
              },1500)
            }else {
              this.payClick = true;
              setStore('debtTransferTransactionOrderNo',res.data.data.orderNo);
              formSubmit(res.data.data.zsUrl,{reqMsg:res.data.data.reqMsg});
            }

          }else {
            this.payClick = true;            
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch(function(error) {
          this.payClick = true;
          console.log(error);
        });
      }
    },
   },
   components: {
     mheader,
     windowTips
   }
 }
</script>

<style lang='less' scope>

.rechargeTips-fade-enter-active,.rechargeTips-fade-leave-active {
  transition: opacity 0.3s;
}
.rechargeTips-fade-enter, .rechargeTips-fade-leave-active {
  opacity: 0;
}

// 充值弹窗
.investDetailTransaction .rechargeTips {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1003;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  >div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 4.5rem;
    width: 4.5rem;
    background: url('./goRechange.png') no-repeat;
    background-size: 100% 100%;
    p {
      height: 100%;
      width: 100%;
    }
    span {
      z-index: 1004;
      position: absolute;
      right: 0.2rem;
      top: 0.2rem;
      z-index: 1004;
      height: 0.5rem;
      width: 0.5rem;
      background: url('./goRechange_close.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}

.investDetailTransaction {
  min-height: 100%;
  width: 100%;
  box-sizing:border-box; 
  background: #f4f4f4;
  padding-top: 0.8rem;
  // padding-bottom: 3rem;
}
.investDetailTransaction .investment-input {
  background: #f4f4f4;
  .account-money {
    li {
      display: block;
      display: flex;
      padding: 0 0.24rem;
      font-size: 0.26rem;
      background: #fff;
      height: 1.2rem;
      line-height: 1.2rem;
      .money {
        color: #FFAD05;
        font-size: 0.3rem;
      }
      >div:nth-child(2) {
        display: block;
        flex: 1;
        text-align: right;
        color: #FFAD05;
        padding-right: 0.2rem;
        >span {
          display: block;
          margin: 0.3rem 0 0.3rem auto;
          height: 0.5rem;
          width: 1rem;
          color: #fff;
          background: #FFAD05;
          font-size: 0.2rem;
          line-height: 0.5rem;
          border-radius: 0.2rem;
          text-align: center;
        }
      }
    }
  }
  .account-transaction {
    li {
      display: block;
      display: flex;
      padding: 0 0.24rem;
      font-size: 0.24rem;
      background: #fff;
      height: 0.8rem;
      line-height: 0.8rem;
      .money {
        color: #FFAD05;
      }
      >div:nth-child(2) {
        display: block;
        flex: 1;
        color: #FFAD05;
        input {
          text-align: right;
          height: 100%;
          line-height: 0.8rem;
          width: 100%;
        }
      }
      >span {
        display: block;
        flex: 1;
      }
      >span:nth-child(2){
        text-align: right;
      }
    }
    .sele-welfare {
      div:nth-child(1){
        padding-right: 0.7rem;
        font-size: 0.25rem;
      }
      div:nth-child(2){
        text-align: left;
         font-size: 0.25rem;
         color: #000;
      }
      div i{
         font-size: 0.25rem;
         color: #ff654f;
      }
    }
    .available-redenvelopes {
      div:nth-child(2){
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
    .inputVcode {
      div:nth-child(2){
        display: block;
        display: flex;
        input {
          display: block;
          flex: 1;
          padding-right: 0.3rem;
        }
      }
    }
  }
  >p.agree {
    margin-top: 0.2rem;
    font-size: 0.16rem;
    padding-left: 0.24rem;
    line-height: 0.3rem;;
    i {
      font-size: 0.24rem;
      padding-right: 0.15rem;
      color: #ff654f;
    }
  }
  .btn-footer {
    // position: fixed;
    bottom: 0;
    left: 0;
    height: 2.5rem;
    width: 100%;
    // background: #fff;
    >p.welfare {
    padding-top: 0.5rem;
    font-size: 0.26rem;
    padding-left: 0.24rem;
    color: #FFAD05;
    text-align: center;
    }
    >p.tip {
      text-align: center;
      font-size: 0.18rem;
      color: #999;
      padding-bottom: 0.3rem;
    }
    .investment-transaction {
      height: 0.76rem;
      line-height: 0.76rem;
      font-size: 0.3rem;
      color: #ffffff;
      margin:0.3rem 0.24rem 0.22rem;
      border-radius: 0.76rem;
      text-align: center;
      background: #ff654f;
    }
  }
  
}

.right {
  font-size: 0.2rem;
  position: absolute;
  top:0;
  right:0.4rem;
  line-height: 0.8rem;
  color: #222;
}
.marbottom {
  margin-bottom: 0.2rem;
}
</style>
