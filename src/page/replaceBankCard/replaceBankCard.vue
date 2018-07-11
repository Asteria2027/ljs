<template>
  <div class="replaceBankCard">
    <mheader headTitle='更换银行卡' :goBack="'true'" class="borderBottom-1px"></mheader>
    <div class="person-info">
      <ul>
        <li class="borderBottom-1px">
          <div>姓名</div>
          <div>{{accountName}}</div>
        </li>
        <li class="borderBottom-1px" style="marginBottom:0.2rem;">
          <div>旧银行卡</div>
          <div>{{oldbankNo}}</div>
        </li>
        <li class="borderBottom-1px">
          <div>新银行卡号</div>
          <div><input type="text" placeholder="请输入银行卡号" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" v-model='newBankNo' autocomplete="off" maxlength="24"></div>
        </li>
        <li class="account-bank" @click='bank_select()'>
          <div>银行名称</div>
          <div><span>{{bankName?bankName:'请选择银行名称'}}<i class="iconfont icon-more"></i></span></div>
        </li>
      </ul>
      <ul>
      </ul>
      <div class="Account-opening-address">
        <div @click='province_select()'>
          {{provinceName?provinceName:'银行卡开户省份'}}
          <i class="iconfont icon-moreunfold"></i>
        </div>
        <div @click='cityList_select()'>
         {{cityName?cityName:'银行开户城市'}}
          <i class="iconfont icon-moreunfold"></i>
        </div>
      </div>
      <ul>
        <li class="borderBottom-1px" @click="pubBankList_select()">
          <div>开户支行</div>
          <div><span style="color:#756f6e;">{{pubBankListName?pubBankListName:'请选择银行支行'}}<i class="iconfont icon-more"></i></span></div>
        </li>
        <li class="account-bank borderBottom-1px">
          <div>银行预留手机号</div>
          <div><input type="text" placeholder="请输入银行卡预留手机号"  v-model='bankMobile' autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="11" disabled="disabled"> </div>
        </li>
        <!-- <li class="SMS-verification-code">
          <div>手机验证码</div>
          <div><input ref='inputVerify' type="text" placeholder="请输入验证码"  v-model='reservedPhoneCode' autocomplete="off" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="8"><span @click="getPhoneCode">{{countdown}}</span></div>
        </li> -->
      </ul>
      <div class="comfirm" @click="goUpdateAccno" :style="{background:payClick?'#ff654f':'#999'}">下一步</div>
    </div>
     <div class="screen_cover" @touchmove.prevent v-show="bank_selectList||province_selectList||cityList_selectList||pubBankList_selectList"></div>

     <!-- 银行卡弹窗 -->
    <div class="bank-select-list" v-show='bank_selectList'>
      <div class="bank-select-list-title">
        <div @click='bank_selectList=false'>取消</div>
        <div>请选择银行</div>
        <div @click="getActiveIndex('bank')">确认</div>
      </div>
      <ul class="bank-select-list-content">
        <div class="active_line"></div>
        <div class="bank-swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in bankList" :key="index">{{item.name}}</div>
            </div>
        </div>
      </ul>
    </div>
     <!-- 银行开户省份弹窗 -->
    <div class="province-select-list" v-show='province_selectList'>
      <div class="province-select-list-title">
        <div @click='province_selectList=false'>取消</div>
        <div>请选择银行开户省份</div>
        <div @click="getActiveIndex('province')">确认</div>
      </div>
      <ul class="province-select-list-content">
        <div class="active_line"></div>
        <div class="province-swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in provinList" :key="index">{{item.proName}}</div>
            </div>
        </div>
      </ul>
    </div>
     <!-- 银行开户城市弹窗 -->
    <div class="cityList-select-list" v-show='cityList_selectList'>
      <div class="cityList-select-list-title">
        <div @click='cityList_selectList=false'>取消</div>
        <div>请选择银行开户城市</div>
        <div @click="getActiveIndex('cityList')">确认</div>
      </div>
      <ul class="cityList-select-list-content">
        <div class="active_line"></div>
        <div class="cityList-swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in ctList" :key="index">{{item.cityName}}</div>
            </div>
        </div>
      </ul>
    </div>
     <!-- 开户支行弹窗 -->
    <div class="pubBankList-select-list" v-show='pubBankList_selectList'>
      <div class="pubBankList-select-list-title">
        <div @click='pubBankList_selectList=false'>取消</div>
        <div>请选择银行开户城市</div>
        <div @click="getActiveIndex('pubBankList')">确认</div>
      </div>
      <ul class="pubBankList-select-list-content">
        <div class="active_line"></div>
        <div class="pubBankList-swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in pbBankList" :key="index">{{item.cyzName}}</div>
            </div>
        </div>
      </ul>
    </div>

    <window-tips ref='windowTips'></window-tips>
  </div>
</template>

<script>

import mheader from '@/components/header/header.vue'   
import windowTips from '@/components/common/windowTips/windowTips.vue'
import { mapState } from 'vuex';
import Swiper from 'swiper'
import '@/style/swiper.min.css'
import { depositAccoutInfo, getBankList,  provinceList, cityList, pubBankList, requestSmsCode, updateAccno } from "@/server/getData.js";
import { getStore,setStore, formSubmit } from '@/config/mUtils';
import queryZs from '@/config/queryZsResults';

export default {
  mixins:[queryZs],
  data () {
    return {
      accountName:'',
      oldbankNo:'',
      bankList:[],
      provinList:[],
      ctList:[],
      pbBankList:[],
      bankSwiper:null,
      provinceSwiper:null,
      cityListSwiper:null,
      pubBankListSwiper:null,
      bank_selectList:false, //银行卡选择弹窗
      province_selectList:false,//银行开户省份弹窗
      cityList_selectList:false,//银行开户城市弹窗
      pubBankList_selectList:false,//开户支行弹窗
      bankName:'',//选中银行名字
      provinceName:'',//选中银行开户省份名字
      cityName:'',//选中银行开户城市名字
      pubBankListName:'',//选中银行开户支行名字
      proNo:'',//省份编号
      bankNo:'',//银行编号
      cityNo:'',//市编号
      branchNo:'',//联行号
      reservedPhone:'',//预留手机号
      // countdown:'获取验证码',
      // getSMScode:false, //节流
      newBankNo:'',//新银行卡号
      // reservedPhoneCode:'',//验证码
      bindSerialNo:'',//绑定协议号
      payClick:true,//支付节流
      bankMobile:'',//银行预留手机号

    };
  },
  mounted(){
    this.queryZsResult(this.$route.query.zsCallback);
    this.getDepositAccoutInfo();
    this._getBankList();
    this.getProvinceList();
  },
  computed: {
    ...mapState([
        'userInfo'
    ]),
  },
  methods:{
    initSwiper(type){
      if(type=='bank'){
          this.bankSwiper = new Swiper('.bank-swiper-container', {
          paginationClickable: true,//是否支持点击
          direction: 'vertical',//是否ֱ垂直居中
          centeredSlides: true,//是否显示居中
          initialSlide :0,//初始位置
          slideToClickedSlide:true,//是否点击居中
          observer:true,//修改swiper自己或子元素时，自动初始化swiper  
          observeParents:true,//修改swiper的父元素时，自动初始化swiper  
          speed: 300,
          slidesPerView:3,
        });
      }else if(type=='province'){
        this.provinceSwiper = new Swiper('.province-swiper-container', {
          paginationClickable: true,//是否支持点击
          direction: 'vertical',//是否ֱ垂直居中
          centeredSlides: true,//是否显示居中
          initialSlide :0,//初始位置
          slideToClickedSlide:true,//是否点击居中
          observer:true,//修改swiper自己或子元素时，自动初始化swiper  
          observeParents:true,//修改swiper的父元素时，自动初始化swiper  
          speed: 300,
          slidesPerView:3,
        });
      }else if(type=='cityList'){
        this.cityListSwiper = new Swiper('.cityList-swiper-container', {
          paginationClickable: true,//是否支持点击
          direction: 'vertical',//是否ֱ垂直居中
          centeredSlides: true,//是否显示居中
          initialSlide :0,//初始位置
          slideToClickedSlide:true,//是否点击居中
          observer:true,//修改swiper自己或子元素时，自动初始化swiper  
          observeParents:true,//修改swiper的父元素时，自动初始化swiper  
          speed: 300,
          slidesPerView:3,
        });
      }else if(type=='pubBankList'){
        this.pubBankListSwiper = new Swiper('.pubBankList-swiper-container', {
          paginationClickable: true,//是否支持点击
          direction: 'vertical',//是否ֱ垂直居中
          centeredSlides: true,//是否显示居中
          initialSlide :0,//初始位置
          slideToClickedSlide:true,//是否点击居中
          observer:true,//修改swiper自己或子元素时，自动初始化swiper  
          observeParents:true,//修改swiper的父元素时，自动初始化swiper  
          speed: 300,
          slidesPerView:3,
        });
      }
    },
    getActiveIndex(type){
      if(type=='bank'){
        let slideIndex = this.bankSwiper.activeIndex;
        this.bank_selectList = false;
        this.bankName = this.bankList[slideIndex].name;
        this.bankNo = this.bankList[slideIndex].platformCode;

        this.pbBankList = [];
        this.pubBankListName = '';
        if(this.bankNo&&this.cityNo){
          this.getPubBankList(this.bankNo,this.cityNo);
        }
      }else if(type=='province'){
        let slideIndex = this.provinceSwiper.activeIndex;
        this.province_selectList = false;
        this.provinceName = this.provinList[slideIndex].proName;
        this.proNo = this.provinList[slideIndex].proNo;

        this.ctList = [];
        this.cityName = '';
        this.pbBankList = [];
        this.pubBankListName = '';
        if(this.proNo){
          this.getCityList(this.proNo);
        } 
      }else if(type=='cityList'){
        let slideIndex = this.cityListSwiper.activeIndex;
        this.cityList_selectList = false;
        this.cityName = this.ctList[slideIndex].cityName;
        this.cityNo = this.ctList[slideIndex].cityNo;

        this.pbBankList = [];
        this.pubBankListName = '';
        if(this.bankNo&&this.cityNo){
          this.getPubBankList(this.bankNo,this.cityNo);
        }
      }else if(type=='pubBankList'){
        let slideIndex = this.pubBankListSwiper.activeIndex;
        this.pubBankList_selectList = false;
        this.pubBankListName = this.pbBankList[slideIndex].cyzName;
        this.branchNo = this.pbBankList[slideIndex].branchNo;
      }
    },
    _getBankList(){
      // 获取所有的银行卡
      getBankList().then(res => {
        if(res.data.code==1){
          this.bankList = res.data.data;
          this.$nextTick(()=>{
            this.initSwiper('bank');
          })
        }
      }).catch((error)=>{
        console.log(error); 
      });
    },
    getProvinceList(){
      // 获取所有的省份
      provinceList().then(res => {
        if(res.data.code==1){
          this.provinList = res.data.data;
          this.$nextTick(()=>{
            this.initSwiper('province');
          })
        }
      }).catch((error)=>{
        console.log(error); 
      });
    },
    getCityList(proid){ 
      //获取省下所有市
      let proNo;
      cityList( proNo = proid ).then(res => {
        if(res.data.code==1){
          this.ctList = res.data.data;
          this.$nextTick(()=>{
            this.initSwiper('cityList');
          })
          this.pbBankList = [];
          this.pubBankListName = '';
        }
      }).catch((error)=>{
        console.log(error); 
      });
    },
    getPubBankList(bN, cN){ 
      //获取开户支行
      if(!bN){
        this.$refs.windowTips.toast('请先选择银行');
        return;
      }
      if(!cN){
        this.$refs.windowTips.toast('请先选择开户城市');
        return;
      }
      let bankNo, cityNo;
      pubBankList( bankNo = bN, cityNo = cN ).then(res => {
        if(res.data.code==1){
          this.pbBankList = res.data.data;
          this.$nextTick(()=>{
            this.initSwiper('pubBankList');
          })
        }
      }).catch((error)=>{
        console.log(error); 
      });
    },
    getDepositAccoutInfo(){ 
      //获取帐户名与银行卡
      let token, userId;
      depositAccoutInfo(token=getStore('token'), userId=getStore('userId')).then(res => { 
        if(res.data.code==1){
          this.accountName=res.data.data.accountName;
          this.oldbankNo=res.data.data.bankNo;
          this.bindSerialNo=res.data.data.bindSerialNo;
          this.bankMobile=res.data.data.bankMobile;
        }else {
          this.$refs.windowTips.toast(res.data.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    bank_select(){
      this.bank_selectList=true;
      setTimeout(()=>{
        this.bankSwiper.update();
      },200);
    },
    province_select(){
      this.province_selectList=true;
      setTimeout(()=>{
        this.provinceSwiper.update();
      },200);
    },
    cityList_select(){
      if(!this.proNo) {
        this.$refs.windowTips.toast('请先选择银行卡开户省份');
        return;
      }
      if(this.ctList.length==0) {
        return;
      }
      this.cityList_selectList=true;
      setTimeout(()=>{
        this.cityListSwiper.update();
      },200);
    },
    pubBankList_select(){
      if(!this.bankNo) {
        this.$refs.windowTips.toast('请先选择银行');
        return;
      }
      if(!this.cityNo) {
        this.$refs.windowTips.toast('请先选择开户城市');
        return;
      }
      if(this.pbBankList.length==0) {
        return;
      }
      this.pubBankList_selectList=true;
      setTimeout(()=>{
        this.pubBankListSwiper.update();
      },200);
    },
    goUpdateAccno(){
      if(!this.newBankNo){
        this.$refs.windowTips.toast('请输入银行卡号');
        return;
      } 
      if(!this.bankNo){
        this.$refs.windowTips.toast('请选择银行');
        return;
      } 
      if(!this.proNo){
        this.$refs.windowTips.toast('请选择银行开户省份');
        return;
      } 
      if(!this.proNo){
        this.$refs.windowTips.toast('请选择开户城市');
        return;
      } 
      if(!this.pubBankListName){
        this.$refs.windowTips.toast('请选择开户支行');
        return;
      } 
      // if(!this.reservedPhoneCode){
      //   this.$refs.windowTips.toast('请输入手机验证码');
      //   return;
      // }     
      if(!this.payClick){
          return;
      }
      this.payClick = false;
      let token, userId,orderNo, mobileCode, otherAccno, bankCode, provinceId, cityId, bankName, branchName, branchNo,callBackURL;
      updateAccno(token=getStore('token'), userId=getStore('userId'),orderNo, otherAccno=this.newBankNo, bankCode=this.bankNo, provinceId=this.proNo, cityId=this.cityNo, bankName=this.bankName, branchName=this.pubBankListName, branchNo=this.branchNo,callBackURL=`wapfront/replaceBankCard?zsCallback=replaceBankCard`).then(res => { 
        if(res.data.code==1){
          this.payClick = true;
          debugger
          setStore('replaceBankCardOrderNo',res.data.data.orderNo);
          formSubmit(res.data.data.zsUrl,{reqMsg:res.data.data.reqMsg})
        }else {
          this.payClick = true;
          this.$refs.windowTips.toast(res.data.msg);
        }
      }).catch( (error)=>{
        this.payClick = true;
        console.log(error);
      });
    },
    
  },
  components:{
    mheader,
    windowTips
  }
}

</script>

<style lang='less' scoped>
.replaceBankCard {
  box-sizing: border-box;
  background: #f4f4f4;
  padding-top: 0.8rem;
  min-height: 100%;   
  width: 100%;
  .person-info {
    ul {
      font-size: 0.26rem;
    }
    ul>li {
      display: block;
      display: flex;
      height: 0.88rem;
      line-height: 0.88rem;
      background: #fff;
      >div:nth-child(1) {
        color: #222;
        padding-left: 0.24rem;
      }
      >div:nth-child(2) {
        display: block;
        flex: 1;
        padding-right: 0.24rem;
        text-align: right;
        input {
          display: block;
          height: 0.88rem;
          line-height: 0.88rem;
          width: 100%;
          text-align: right;
        }
      }
    }
    .account-bank {
      >div:nth-child(2) {
        display: block;
        flex: 1;
        color: #cdcdcd;
        padding-right: 0.24rem;
        input {
          background: #fff;
        }
        span {
          display: block;
          height: 0.88rem;
          width: 100%;
          text-align: right;
          color: #756f6e;
          i {
            height: 0.88rem;
            color: #756f6e;
          }
        }
      }
    }
    .Account-opening-address {
      display: block;
      display: flex;
      height: 0.88rem;
      line-height: 0.88rem;
      font-size: 0.26rem;
      div {
        display: block;
        flex: 1;
      }
      div:nth-child(1){
        padding-left: 0.24rem;
      }
      div:nth-child(2){
        padding-right: 0.24rem;
        text-align: right;
      }
    }
    li.SMS-verification-code {
      >div:nth-child(2) {
        display: block;
        display: flex;
        color: #cdcdcd;
        padding-right: 0.24rem;
        input {
          flex: 1;
          height: 0.88rem;
          line-height: 0.88rem;
          text-align: left;
          padding-left: 0.42rem;
        }
        span {
          display: block;
          width: 1.5rem;
          text-align: center;
          height: 0.6rem;
          line-height: 0.6rem;
          margin-top: 0.13rem;
          color: #F05141;
          border-radius: 0.2rem 0.2rem;
        }
      }
    }
    .comfirm {
      height: 0.76rem;
      line-height: 0.76rem;
      font-size: 0.3rem;
      text-align: center;
      color: #ffffff;
      margin: 0.6rem 0.24rem 0.26rem;
      border-radius: 0.76rem;
      background: #ff654f;
    }
  }
  .bank-select-list {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 5rem;
    background: #fff;
    width: 100%;
    z-index: 1002;
    .bank-select-list-title {
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.2rem;
      display: block;
      display: flex;
      padding: 0 0.23rem;
      background: #f5f5f5;
      >div {
        display: block;
        flex: 1;
      }
      >div:nth-child(2) {
        text-align: center;
      }
      >div:nth-child(3) {
        text-align: right;
      }
    }
    .bank-select-list-content {
      background: #fff;
      height: 2.3rem;
      width: 100%;
      font-size: 0.2rem;
      .bank-swiper-container {
        height: 2.3rem;
        overflow: hidden;
      }
      .swiper-slide {
        text-align: center;
        background: #fff;
        color:gray;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }
      .swiper-slide-active{
        color:black;
        font-size: 0.25rem;
      }
      .swiper-slide-prev{
        font-size: 0.25rem;
      }
      .swiper-slide-next{
        font-size: 0.25rem;
      }
      .active_line {
        position: absolute;
        width: 90%;
        left: 5%;
        top: 30%;
        margin-top: 0.08rem;
        height: 0.5rem;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        z-index: 9;
      }
    }
  }
  .province-select-list {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 5rem;
    background: #fff;
    width: 100%;
    z-index: 1002;
    .province-select-list-title {
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.2rem;
      display: block;
      display: flex;
      padding: 0 0.23rem;
      background: #f5f5f5;
      >div {
        display: block;
        flex: 1;
      }
      >div:nth-child(2) {
        text-align: center;
      }
      >div:nth-child(3) {
        text-align: right;
      }
    }
    .province-select-list-content {
      background: #fff;
      height: 2.3rem;
      width: 100%;
      font-size: 0.2rem;
      .province-swiper-container {
        height: 2.3rem;
        overflow: hidden;
      }
      .swiper-slide {
        text-align: center;
        background: #fff;
        color:gray;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }
      .swiper-slide-active{
        color:black;
        font-size: 0.25rem;
      }
      .swiper-slide-prev{
        font-size: 0.25rem;
      }
      .swiper-slide-next{
        font-size: 0.25rem;
      }
      .active_line {
        position: absolute;
        width: 90%;
        left: 5%;
        top: 30%;
        margin-top: 0.08rem;
        height: 0.5rem;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        z-index: 9;
      }
    }
  }
  .cityList-select-list {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 5rem;
    background: #fff;
    width: 100%;
    z-index: 1002;
    .cityList-select-list-title {
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.2rem;
      display: block;
      display: flex;
      padding: 0 0.23rem;
      background: #f5f5f5;
      >div {
        display: block;
        flex: 1;
      }
      >div:nth-child(2) {
        text-align: center;
      }
      >div:nth-child(3) {
        text-align: right;
      }
    }
    .cityList-select-list-content {
      background: #fff;
      height: 2.3rem;
      width: 100%;
      font-size: 0.2rem;
      .cityList-swiper-container {
        height: 2.3rem;
        overflow: hidden;
      }
      .swiper-slide {
        text-align: center;
        background: #fff;
        color:gray;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }
      .swiper-slide-active{
        color:black;
        font-size: 0.25rem;
      }
      .swiper-slide-prev{
        font-size: 0.25rem;
      }
      .swiper-slide-next{
        font-size: 0.25rem;
      }
      .active_line {
        position: absolute;
        width: 90%;
        left: 5%;
        top: 30%;
        margin-top: 0.08rem;
        height: 0.5rem;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        z-index: 9;
      }
    }
  }
  .pubBankList-select-list {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 5rem;
    background: #fff;
    width: 100%;
    z-index: 1002;
    .pubBankList-select-list-title {
      height: 0.7rem;
      line-height: 0.7rem;
      font-size: 0.2rem;
      display: block;
      display: flex;
      padding: 0 0.23rem;
      background: #f5f5f5;
      >div {
        display: block;
        flex: 1;
      }
      >div:nth-child(2) {
        text-align: center;
      }
      >div:nth-child(3) {
        text-align: right;
      }
    }
    .pubBankList-select-list-content {
      background: #fff;
      height: 2.3rem;
      width: 100%;
      font-size: 0.2rem;
      .pubBankList-swiper-container {
        height: 2.3rem;
        overflow: hidden;
      }
      .swiper-slide {
        text-align: center;
        background: #fff;
        color:gray;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }
      .swiper-slide-active{
        color:black;
        font-size: 0.25rem;
      }
      .swiper-slide-prev{
        font-size: 0.25rem;
      }
      .swiper-slide-next{
        font-size: 0.25rem;
      }
      .active_line {
        position: absolute;
        width: 90%;
        left: 5%;
        top: 30%;
        margin-top: 0.08rem;
        height: 0.5rem;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        z-index: 9;
      }
    }
  }
}
.screen_cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

</style>