<template>
  <div class="automaticBid">
    <mheader headTitle='自动投标' :goBack="'true'"  class="borderBottom-1px">
      <router-link tag='div' to='automaticBidrules' slot='right' class="right">规则</router-link>
    </mheader>
     <window-tips ref='windowTips'></window-tips>
    <div class="title-award">
      <p>自动投标额外奖励 {{autoPlusPer}}%</p>
    </div>
    <div class="automaticBid-list" v-if="!isShowSet">
      <div class="usable-amount borderBottom-1px">
        <span>可用余额：</span>
        <span>{{userInfo&&userInfo.usableAmount?userInfo.usableAmount:'--'}}元</span>
      </div>
      <div class="show-bid">
        <ul v-for="(item,index) in autoInvestList" :key="index">
          <li class="borderBottom-1px">
            <span>投标金额：</span>
            <span>{{item.settingMin}}-{{item.settingMax}}元</span>
          </li>
          <li class="borderBottom-1px">
            <span>年利率：</span>
            <span>{{item.monthRates}}</span>
          </li>
          <div class="bid-btns">
            <div @click="_getAutoInvest(item.id)">修改设置</div>
            <div @click="_delAutoInvest(index,item.id)">删除设置</div>
          </div>
        </ul>
      </div>
      <p class="add">
        <span>您最多可以保存{{setCnt}}条自动投标设置</span>
        <span v-if="setCnt>1"  @click="addAutoBid"><i class="icon-jia iconfont"></i> 新增</span>
      </p>
    </div>
    <div class="input-automaticBid" v-if="isShowSet">
      <div class="input-single-money">
        单笔投标金额 :
        <input type="number" v-model="minMoney" autofocus="autofocus" oninput="if(value.length>15)value=value.slice(0,15);if(!/^-?\d+\.?\d{0,2}$/.test(value))value=value.slice(0,value.length-1)">
        -
        <input type="number" v-model="maxMoney" autofocus="autofocus" oninput="if(value.length>15)value=value.slice(0,15);if(!/^-?\d+\.?\d{0,2}$/.test(value))value=value.slice(0,value.length-1)">
        元
      </div>
      <div class="choose-annual-interest-rate">
        <ul>
          <h3 class="borderBottom-1px">年利率 : (可多选)</h3>
          <li class="borderBottom-1px" v-for="(item,index) in autoInvestPrdList" :key="index" @click="selePro(index,item.id)">
            <i class="iconfont icon-weixuanzhongyuanquan" :class="{'icon-selected':item.id==selePrdList[index],'icon-weixuanzhongyuanquan':item.id!=selePrdList[index]}"></i> 
            {{item.rate}}% {{item.month}}
          </li>
          <p>( 此为参考利率，以实际利率为主 )</p>
        </ul>
      </div>
      <div class="save-enter" @click='saveAutoBid'>保存</div>
      <div class="agreement"><i @click='agree=!agree' class="iconfont" :class="{'icon-selected':agree,'icon-weixuanzhongyuanquan':!agree}"></i>我已阅读并同意 <router-link to="/Agreement/autoInvestAgreement" tag='span'>《自动投标授权委托书》</router-link></div>
    </div>
  </div>
</template>

<script>
import mheader from '@/components/header/header.vue'
import windowTips from '@/components/common/windowTips/windowTips.vue'  
import { getAutoInvestPrdList, saveAutoInvest, getAutoInvestList, delAutoInvest, getAutoInvestInfo, updateAutoInvestStatus, getAutoInvest } from "@/server/getData.js";
import { getStore } from '@/config/mUtils';
import {mapState} from 'vuex'

  export default {
    data () {
      return {
        autoInvestList:[],// 用户的自动投标
        autoInvestPrdList:[],// 自动投标的产品
        selePrdList:{},// 被选中的产品
        agree:false,// 协议
        minMoney:'',
        maxMoney:'',
        isShowSet:true,
        isAdd:0,//是否能够添加自动投标(0:否，1：是)
        setCnt:'',//最多能保存自动投标条数
        autoPlusPer:0.2,//自动投标加息百分比
        id:'',//修改自动投标id
      }
    },
    mounted(){
      this._getAutoInvestPrdList();
      this._getAutoInvestList();
      this._getAutoInvestInfo();
    },
    computed: {
      ...mapState([
        'userInfo'
      ]),
    },
    methods:{
      selePro(index,id){
        if(this.selePrdList[index]==''||this.selePrdList[index]==null){
          this.$set(this.selePrdList,index,id)
        }else {
          this.$set(this.selePrdList,index,'');
        }
      },
      addAutoBid(){//新增自动投标
        if(this.autoInvestList.length<this.setCnt){
          this.isAdd=1;
        }else {
          this.$refs.windowTips.toast('已达到保存自动投标的上限');
          return;
        }
        this.isShowSet=true;
        this.selePrdList={};
        this.agree=false;
        this.minMoney='';
        this.maxMoney='';
      },
      _delAutoInvest(index, Id){ //删除自动投标  
        let token, userId, id;
        delAutoInvest(token=getStore('token'),userId=getStore('userId'),id=Id).then(res => {
          if(res.data.code==1){
            this.autoInvestList.splice(index, 1);
            this.$refs.windowTips.toast('删除成功');
            if(this.autoInvestList.length==0){
              setTimeout(()=>{
                this.$router.push('account');
              },1500)
            }
          }else {
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch((error) => {
          console.log(error);
        });
        if(this.autoInvestList.length<this.setCnt){
          this.isAdd=1;
        }
      },
      // _updateAutoInvestStatus(Id, Status){//修改自动投标
        
      // },
      _getAutoInvest(Id){//获取自动投标信息（修改）
        let token, userId, id;
        getAutoInvest(token=getStore('token'),userId=getStore('userId'), id=Id).then(res => {
          if(res.data.code==1){
            this.selePrdList={};
            this.agree=true;
            this.minMoney=res.data.data.settingMin;
            this.maxMoney=res.data.data.settingMax;
            let rateIds = res.data.data.rateIds;
            this.id = res.data.data.id;
            rateIds = String(rateIds).split(',');
            this.autoInvestPrdList.forEach((val,index)=>{
              rateIds.forEach((rateId)=>{
                if(rateId==val.id){
                  this.$set(this.selePrdList,index,val.id);
                }
              });
            });
            this.isShowSet=true;
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      _getAutoInvestList(){
        let token, userId;
        getAutoInvestList(token=getStore('token'),userId=getStore('userId')).then(res => {
          if(res.data.code==1){
            this.autoInvestList = res.data.data;
            this.isShowSet = this.autoInvestList.length==0?true:false;
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      _getAutoInvestInfo(){//获取是否能够添加自动投标
        let token, userId;
        getAutoInvestInfo(token=getStore('token'),userId=getStore('userId')).then(res => {
          if(res.data.code==1){
            this.isAdd=res.data.data.isAdd;
            this.setCnt=res.data.data.setCnt;
            this.autoPlusPer=res.data.data.autoPlusPer?res.data.data.autoPlusPer:'0.2';  
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      _getAutoInvestPrdList(){
        let token, userId;
        getAutoInvestPrdList(token=getStore('token'),userId=getStore('userId')).then(res => {
          if(res.data.code==1){
            this.autoInvestPrdList = res.data.data;
          }
        }).catch((error) => {
          console.log(error);
        });
      },
      saveAutoBid(){
        if(!this.minMoney) {
          this.$refs.windowTips.toast('请输入投标金额下限');
          return;
        }
        if(!this.maxMoney) {
          this.$refs.windowTips.toast('请输入投标金额上限');
          return;
        }
        if(this.minMoney%10!=0||this.maxMoney%10!=0){
          this.$refs.windowTips.toast('输入金额必须是10的倍数');
          return;
        }
        if(Number(this.minMoney)>Number(this.maxMoney)){
          this.$refs.windowTips.toast('投标金额的最大值必须大于最小值');
          return;
        }
        if(!this.agree) {
          this.$refs.windowTips.toast('请同意投资协议');
          return;
        }
        let str='';
        for(let variable in this.selePrdList){ 
          str += this.selePrdList[variable]+','
        }
        str = str.replace(/(^\,*)|(\,*$)/g, "");
        str=str.replace(new RegExp(',+',"gm"),','); 
        if(!str) {
          this.$refs.windowTips.toast('请选择年利率');
          return;
        }
        let token, userId, investSettingMax, investSettingMin, investSettingMonthRate, id;
        saveAutoInvest(token=getStore('token'),userId=getStore('userId'), investSettingMax=this.maxMoney, investSettingMin=this.minMoney, investSettingMonthRate=str, id=this.id?this.id:'').then(res => {
          if(res.data.code==1){
            this.$refs.windowTips.toast('保存成功');
            this.isShowSet = false;
            this._getAutoInvestList();
          }else {
            this.$refs.windowTips.toast(res.data.msg);
          }
        }).catch((error) => {
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

<style lang='less' scope>
.automaticBid {
  box-sizing: border-box;
  background: #f4f4f4;
  padding-top: 0.8rem;
  min-height: 100%;
  width: 100%;
  .title-award {
    height: 1.3rem;
    width: 100%;
    text-align: center;
    font-size: 0.2rem;
    line-height: 1.9rem;
    background: url('./autotend-logo.png') no-repeat;
    background-position: center top;
    background-size: contain;
    color: #fff;
  }
  .automaticBid-list {
    .usable-amount {
      margin: 0.2rem 0;
      font-size: 0.2rem;
      padding: 0.25rem 0.23rem;
      background: #fff;
    }
    .show-bid {
      ul{
        margin-bottom: 0.2rem;
        >li {
          font-size: 0.2rem;
          padding: 0.25rem 0.23rem;
          background: #fff;
          line-height: 0.35rem;
        }
      }
    }
    .add {
      font-size: 0.2rem;
      background: #fff;
      display: block;
      display: flex;
      padding: 0.25rem 0.2rem;
      >span:nth-child(1) {
        display: block;
        flex: 1;
      }
      i {
          font-size: 0.2rem;
        }
    }
    .bid-btns {
      display: block;
      display: flex;
      background: #fff;
      padding: 0.15rem 0.1rem;
      >div {
        display: block;
        flex: 1;
        padding: 0.2rem 0;
        margin: 0 0.7rem;
        font-size: 0.2rem;
        color: #fff;
        text-align: center;
        border-radius: 0.5rem;
        background: #ff6f4e;
      }

    }
  }
  .input-single-money {
    margin-top: 0.1rem;
    font-size: 0.2rem;
    padding: 0.15rem 0.23rem;
    background: #fff;
    input {
      height: 0.4rem;
      width: 1.5rem;
      border: 1px solid #999;
      border-radius: 0.05rem;
      padding-left: 0.1rem;
    }
  }
  .choose-annual-interest-rate {
    margin-top: 0.2rem;
    font-size: 0.2rem;
    padding:0 0.23rem;
    background: #fff;
    h3,p {
      display: block;
      padding: 0.25rem 0.2rem;
      font-size: 0.2rem;
      color: #999;
    }
    li {
      padding: 0.25rem 0.2rem;
      i {
        color: #5BE750;
        font-size: 0.25rem;
        padding-right: 0.3rem;
      }
    }
  }
  .Rank {
    font-size: 0.23rem;
    text-align: center;
    background: #fff;
    padding: 0.3rem;
    color: #999;
    span {
      color: #ff6f4e;
      font-size: 0.25rem;
    }
  }
  .save-enter {
    height: 0.76rem;
    line-height: 0.76rem;
    font-size: 0.3rem;
    text-align: center;
    color: #ffffff;
    margin: 0.3rem 0.24rem 0.2rem;
    border-radius: 0.76rem;
    background: #ff654f;
  }
  .agreement {
    padding-left: 0.24rem;
    font-size: 0.16rem;
    i {
      font-size: 0.23rem;
      padding-right: 0.2rem;
      color: #ff654f;
    }
    span {
      color: #007aff;
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
 
</style>
