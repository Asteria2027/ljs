<template>
  <div class="myTender">
    <mheader headTitle='我的投标'>
       <span slot='back' class="back" @click="back"> <i class="iconfont icon-back"></i></span>
      <span slot='myTender_filter' class="myTender_filter" @click='showTenderArea=true'><i class="iconfont icon-shaixuan"></i>{{
        investType==''?'全部':investType=='CDYCD'?'个人专区':investType=='SB'?'散标专区':investType=='LJQY'?'企业专区':investType=='ZRB'?'转让专区':'新手专享'
      }}</span>
    </mheader>
    <div class="TenderArea" v-if="showTenderArea">
      <ul>
        <li :class="{'se':investType==''}" @click='investType="";showTenderArea=false;getMytender("init")'>全部</li>
        <li :class="{'se':investType=='CDYCD'}" @click='investType="CDYCD";showTenderArea=false;getMytender("init")'>个人专区</li>
        <li :class="{'se':investType=='SB'}" @click='investType="SB";showTenderArea=false;getMytender("init")'>散标专区</li>
        <li :class="{'se':investType=='LJQY'}" @click='investType="LJQY";showTenderArea=false;getMytender("init")'>企业专区</li>
        <li :class="{'se':investType=='ZRB'}" @click='investType="ZRB";showTenderArea=false;getMytender("init")'>转让专区</li>
        <li :class="{'se':investType=='XSZX'}" @click='investType="XSZX";showTenderArea=false;getMytender("init")'>新手专享</li>
      </ul>
    </div>
    <div class="screen_cover" v-if="showTenderArea" @click="showTenderArea=!showTenderArea" @touchmove.prevent></div>
    <div class="myTender-list-title">
      <span :class="{'sele':tenderStatus=='TBZ'}" @click='tenderStatus="TBZ";getMytender("init")'>投标中({{myTenderData.TBZ?(myTenderData.TBZ>99?'99+':myTenderData.TBZ):myTenderData.TBZ==0?'0':'-'}})</span>
      <span :class="{'sele':tenderStatus=='CYZ'}" @click='tenderStatus="CYZ";getMytender("init")'>持有中({{myTenderData.CYZ?(myTenderData.CYZ>99?'99+':myTenderData.CYZ):'-'}})</span>
      <span :class="{'sele':tenderStatus=='ZRZ'}" @click='tenderStatus="ZRZ";getMytender("init")'>转让中({{myTenderData.ZRZ?(myTenderData.ZRZ>99?'99+':myTenderData.ZRZ):'-'}})</span>
      <span :class="{'sele':tenderStatus=='END'}" @click='tenderStatus="END";getMytender("init")'>已结清({{myTenderData.END?(myTenderData.END>99?'99+':myTenderData.END):'-'}})</span>
    </div>
    <not-data v-if='noData'>
      <div slot='hint' style='font-size: 0.23rem; text-align: center;color: #9d9d9d;'>暂无相关记录</div>
      <span slot='hint' @click='$router.push("/invest")'>去投标</span>
    </not-data>
    <div ref='myTenderLists' class="myTenderLists">
      <div class="myTender-list" v-if='investList.length>0&&(!countdownObj[index]||countdownObj[index]>0)' v-for="(item,index) in investList" :key="index" @click='goMyTenderDetail(index)'>
        <h3> 
          <span class="omitted">{{item.borrowTitle}}</span> 
          <span v-if='item.redPacketAmt>0'>{{`${item.redPacketAmt}元红包`}}</span>
          <span v-if='item.plusCouponPeriod>0&&item.plusCouponPer>0'>{{`奖励${item.plusCouponPer}%${item.plusCouponPeriod}个月`}}</span>
          <span v-if='item.plusCouponPerJxb>0&&item.plusCouponPeriodJxb>0'>{{`奖励${item.plusCouponPerJxb}%${item.plusCouponPeriodJxb}个月`}}</span>
          <span v-if='item.plusCouponPerAuto>0&&item.plusCouponPeriodAuto>0'>{{`奖励${item.plusCouponPerAuto}%${item.plusCouponPeriodAuto}个月`}}</span>
        </h3>
        <ul>
          <li>
            <div>
              <div>{{item.rate}}%</div>
              <p>历史年化</p>
            </div>
             <div v-if="tenderStatus=='TBZ'&&item.countdown&&item.countdown>0">
              <div>1000</div>
              <p>锁定金额</p>
            </div>
            <div v-else>
              <div>{{item.investTime}}</div>
              <p>交易时间</p>
            </div>
            <div v-if="tenderStatus!='TBZ'">
              <div>{{(tenderStatus=='CYZ'||tenderStatus=='END')?`${item.investAmt}元`:`${item.waitedPI}元`}}</div>
              <p>{{(tenderStatus=='CYZ'||tenderStatus=='END')?'投标金额':'代收本金'}}</p>
            </div>
            <div v-if="tenderStatus=='ZRZ'">
              <div>{{`${item.discountRate}%`}}</div>
              <p>打折奖励</p>
            </div>
          </li>
          <li>
            <div>
              <div>{{`${item.deadline}个月`}}</div>
              <p>投标期限</p>
            </div>
             <div v-if="tenderStatus=='TBZ'&&item.countdown&&item.countdown>0">
              <div>{{countdownTimeObj[index]}}</div>
              <p>锁定倒计时</p>
            </div>      
            <div v-else>
              <div>{{tenderStatus=='TBZ'?`${item.investAmt}元`:item.expiryTime}}</div>
              <p>{{tenderStatus=='TBZ'?'投标金额':'到期时间'}}</p>
            </div>
            <div v-if="tenderStatus!='TBZ'">
              <div>{{tenderStatus=='CYZ'?(item.sumPlusIncome>0?`${item.intAmt}元`:`${item.intAmt}元`):tenderStatus=='ZRZ'?`${item.notReceiveInteRest}元`:tenderStatus=='END'?`${item.intAmt}元`:''}}<span class="add-money" v-if="(tenderStatus=='CYZ'||tenderStatus=='END')&&item.sumPlusIncome>0">{{`+${item.sumPlusIncome}元`}}</span></div>
              <p>{{tenderStatus=='CYZ'?'预期收益':tenderStatus=='ZRZ'?'代收收益':tenderStatus=='END'?'到帐收益':''}}</p>
            </div>
            <div v-if="tenderStatus=='ZRZ'">
              <div>{{`${item.discountSum}元`}}</div>
              <p>折让金额</p>
            </div>
          </li>
          <li>
            <div>
              <div>{{item.paymentModeTxt}}</div>
              <p>还款方式</p>
            </div>
            <div v-if="tenderStatus=='TBZ'&&item.countdown&&item.countdown>0" class="boder-cir"><span>完成投标</span></div>
            <div v-if="tenderStatus=='CYZ'||tenderStatus=='ZRZ'">
              <div>{{item.beginTime}}</div>
              <p>计息时间</p>
            </div>
            <div v-if="tenderStatus=='CYZ'&&item.zrStatus=='N'">
              <div>{{item.zrTime}}</div>
              <p>锁定期至</p>
            </div>
            <div class="boder-cir" v-if="tenderStatus=='CYZ'&&item.zrStatus=='Y'">
              <span @click.stop="transter(item)">转让</span>
            </div>
            <div class="boder-cir" v-if="tenderStatus=='ZRZ'">
              <span @click.stop="debtId =item.debtId; iscancelWin = true">撤销转让</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
     <div v-if='!loaded&&(investList.length>3)' class="loaded">已全部加载完成</div>
    <div class="agree-tip">查看协议请登录官网</div>


    <!-- 转让弹窗 -->
    <div class="myTender_win" v-if="isTransferWin">
        <div class="title">
            转让<i class="iconfont icon-guanbi" @click="closeTranferWin"></i>
        </div>
        <div class="con">
          <div class="con_tips">
            申请转让有效期为2天，有效期内未交易成功，系统将自动撤销
          </div>
          <ul>
            <li class="con_li con_discount"> 
              <div class="con_li_left">打折转让</div>
              <div class="con_li_right">
                  <i @click="reduceRate" class="iconfont icon-jian reduce"></i>
                  <input class="mum" type="number" @input="inputRate" oninput="if(value.length>15)value=value.slice(0,15);if(!/^-?\d+\.?\d{0,2}$/.test(value))value=value.slice(0,value.length-1)" v-model="transterData.discountRate">
                  <i @click="addRate" class="iconfont icon-jia add"></i>  <span class="percent">%</span>  
              </div>
            </li>
            <li class="con_li con_show"> 
              <div class="con_li_left">待收本金</div>
              <div class="con_li_right">{{transterData.waitPri}}元</div>
            </li>
            <li class="con_li con_show"> 
              <div class="con_li_left">当期应收收益</div>
              <div class="con_li_right">{{transterData.waitInt}}元</div>
            </li>
            <li class="con_li con_show"> 
              <div class="con_li_left">折让金额</div>
              <div class="con_li_right">-{{transterData.discountDebtAmt}}元</div>
            </li>
            <li class="con_li con_show"> 
              <div class="con_li_left">手续费</div>
              <div class="con_li_right">0元</div>
            </li>
            <li class="con_li con_show"> 
              <div class="con_li_left">转让后到账金额</div>
              <div class="con_li_right">{{transterData.debtSum}}元</div>
            </li>
            <li class="con_li con_pwd" style="height:0.65rem;margin-top:0.1rem;"> 
              <div class="con_li_left" style="line-height: 0.65rem;">图形验证码</div>
              <div class="img-code">
                <input type="text" placeholder="请输入图形验证码" autocomplete="off" v-model="imgCode" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')" maxlength="6">
                <span @click='getImgCode'><img :src="imgCodeSrc" style="display:block;height:100%;width:100%;margin-right:10%;"></span>
                </div>
            </li>
            <li class="con_li con_pwd"> 
              <div class="con_li_left">交易密码</div>
              <div class="con_li_right"><input type="password" v-model="transterData.investPWD" placeholder="请输入交易密码"></div>
            </li>
            <li class="con_li con_verificationCode"> 
              <div class="con_li_left">验证码</div>
              <div class="con_li_right">
                <input type="text" placeholder="请输入验证码" v-model="transterData.smsCode">
                <span class="getCode" @click="getVerificationCode">{{transterData.verificationCodeTip}}</span>  
              </div>
            </li>
          </ul>
          <div class="con_agreement">
            <i @click="transterData.isAgree=!transterData.isAgree" class="iconfont" :class="{'icon-selected':transterData.isAgree,'icon-weixuanzhongyuanquan':!transterData.isAgree}"></i>
            我同意 <router-link :to="'/Agreement/debtAssignmentAgreement'">《联金所转让协议》</router-link>
          </div>
          <div class="con_sure" @click="_zrDebt">确定</div>
        </div>
    </div>

    <div class="myTender_mark" @click="closeTranferWin" v-if="isTransferWin"></div>

  <window-tips ref='windowTips'></window-tips>

  <!-- 撤销转让弹窗 -->
  <Dialog v-if="iscancelWin" class="myTender_cancelWin" @leftBtn ='iscancelWin = false' @tapMark='iscancelWin = false' @rightBtn='_cancelZRDebt'>
    <div class="myTender_cancelWin_con" >
      <p>你确定撤销此次转让?</p>
    </div>
  </Dialog>

  </div>
</template>

<script>
import mheader from "@/components/header/header.vue";
import notData from '../../components/common/notData/notData.vue'
import windowTips from '../../components/common/windowTips/windowTips.vue'
import Dialog from '../../components/common/dialog/dialog.vue'
import { newMyInvestList, zrDebt, SendSMS, cancelZRDebt, checkDebtSize, textCode } from "@/server/getData.js";
import { encryptByDES } from '@/config/des_encryption.js'
import { mapState } from 'vuex';
import { getStore, setStore } from "@/config/mUtils";

let userId , token;
export default {
  data() {
    return {
      showTenderArea: false, //投标专区展示
      investType: "", //投标产品类型
      tenderStatus: "CYZ",
      pageNum: 1, //当前页
      loaded: true, // 加载完成
      myTenderData: {}, //投标数据
      investList: [], //投标数组
      loaded: true, // 加载完成
      noData:false,//暂无相关记录
      isTransferWin: false,// 是否显示转让弹窗
      iscancelWin: false, // 是否显示取消转让的弹窗
      debtId: '', // 撤销转让标的的id
      
      transterData: {
        waitInt: '',// 当期收益 
        waitPri: '', // 待收本金
        discountRate: '0', // 折让率
        discountDebtAmt: '0.00', // 折让金额
        debtSum: '',   // 折后到账金额
        smsCode: '',  // 短信验证码
        verificationCodeTip: "获取验证码",
        cellPhone: '', // 手机号
        investId: '', // 投资ID
        investPWD: '', // 密码
        isAgree: false// 是否同意协议
      },  // 转让的数据
      initTransterData: {} ,// 保存transterData 的最初的值
      imgCode:'',
      imgCodeSrc:'',
      countdownObj:{},
      countdownTimeObj:{},
    };
  },
  mounted() {
    this.getMytender();
    window.addEventListener("scroll", this.myTenderloadMore);
    this.initTransterData = Object.assign( {},this.transterData )
    this.getImgCode();
  },
  computed: {
    ...mapState([
        'userInfo'
    ]),
  },
  watch: {
    'transterData.discountRate': function () {
        this.transterData.discountDebtAmt =  ((this.transterData.waitPri + this.transterData.waitInt) * this.transterData.discountRate * 0.01).toFixed(2);
        this.transterData.debtSum = ( (this.transterData.waitPri + this.transterData.waitInt) * (1- this.transterData.discountRate * 0.01)).toFixed(2)
    }
  },
  methods: {
    _countdown(){
      this.investList.forEach((val,index)=>{
        if(val.countdown&&val.countdown>0){
          this.$set(this.countdownObj,index,val.countdown);
          this._countdownTime(val,index);
        }
      });
    },
    _countdownTime(val,index){
      setTimeout(()=>{
        if(this.countdownObj[index]>0){
          this._countdownTime(val,index);
        }else {
          this.myTenderData.TBZ--;
          if(this.myTenderData.TBZ==0){
            this.noData=true;
          }
        }
        this.$set(this.countdownObj,index,this.countdownObj[index]-1000);
      },1000);
      this.$set(this.countdownTimeObj,index,`${this.countdownObj[index]/1000/60<1?'':Math.floor(this.countdownObj[index]/1000/60)+'分'}${this.countdownObj[index]/1000%60>9?this.countdownObj[index]/1000%60+'秒':'0'+this.countdownObj[index]/1000%60+'秒'}`)
    },
    getMytender(init) {
      if(init=='init'){
        // this.myTenderData={};
        this.investList=[];
        this.pageNum= 1;
        this.loaded= true;
      }
      let status, investType, pageNum, pageSize;
      //我的投标列表
      newMyInvestList(
        (token = getStore("token")),
        (status = this.tenderStatus),
        (investType = this.investType),
        (pageNum = this.pageNum),
        (pageSize = 20),
        (userId = getStore('userId')),
      ).then(res => {
          if (res.data.code == 1&&res.data.data.investList) {
            this.myTenderData = res.data.data;
            if(this.tenderStatus=='TBZ'){
              res.data.data.investList[0].countdown = 10000;
              // res.data.data.investList[2].countdown = 40000;
              // res.data.data.investList[1].countdown = 50000;
              // res.data.data.investList[3].countdown = 80000;
              // res.data.data.investList[4].countdown = 13000;
            }
            let len = this.investList.length;
            this.investList = this.investList.concat(res.data.data.investList);
            this._countdown();
            if (len == this.investList.length) {
              this.loaded = false;
            } else {
              this.loaded = true;
            }
            if(this.investList.length==0){
              this.noData = true;
            }else {
              this.noData = false;
            }
          }else{
            this.noData = true;
          }
        }).catch((error)=>{
          this.noData = true;
          console.log(error);
        });
    },
    myTenderloadMore() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let clientHeight = document.body.clientHeight;
      if (this.$refs.myTenderLists.offsetHeight-clientHeight <Number(scrollTop)+10&&this.loaded) {
        this.loaded = false;
        this.pageNum++;
        this.getMytender();
      }
    },
    goMyTenderDetail(index){
      let investDetailObj = {
        indexdetail:this.investList[index],
        type:this.tenderStatus
      }
      setStore('investDetailObj', JSON.stringify(investDetailObj));
      this.$router.push({path:'myTenderDetail'});
    },
    back(){
      this.$router.push('account');
    },
    // 点击转让按钮后弹窗
    transter(item){
      
      checkDebtSize(userId = getStore("userId"), token=getStore('token') ).then((res) => {
        
        console.log(res.data.code);
        if(res.data.code == 1){
          this.transterData =  Object.assign( {}, this.initTransterData);
          this.isTransferWin = true;
          this.transterData.waitInt = item.waitInt; 
          this.transterData.waitPri = item.waitPri; 
          this.transterData.debtSum = item.waitInt + item.waitPri;
          this.transterData.investId = item.investId;
        }
        if(res.data.code == 0){
           this.$refs.windowTips.toast(res.data.msg);
        }

      }).catch(function (error) { 
        console.log(error);
      })



    },
    // 关闭弹窗
    closeTranferWin() {
      this.isTransferWin = false;
    },
    reduceRate () {
      if(parseFloat(this.transterData.discountRate) > 0 ){
        this.transterData.discountRate = (parseFloat(this.transterData.discountRate) - 0.1).toFixed(1);
      }
    },
    addRate() {
      if(parseFloat(this.transterData.discountRate) < 5) {
        this.transterData.discountRate = (parseFloat(this.transterData.discountRate) + 0.1).toFixed(1);
      }else {
          this.$refs.windowTips.toast('转让率不能大于5%');
      }
    },
    inputRate(){
        if(this.transterData.discountRate > 5) {
          this.transterData.discountRate  = 5;
          this.$refs.windowTips.toast('转让率不能大于5%');
        }
        const dotIndex = String(this.transterData.discountRate).indexOf('.') + 1;
        // 小数点位数
        const count = String(this.transterData.discountRate).length - dotIndex;
        if(count > 1) {
          this.transterData.discountRate = parseFloat(this.transterData.discountRate).toFixed(1);
          this.$refs.windowTips.toast('只能输入一位小数');          
        }
    },
    // 获取验证码
    getVerificationCode() {
      if(!this.imgCode) {
        this.$refs.windowTips.toast('图片验证码为空，请输入验证码');
        return;
      }
      if(this.transterData.verificationCodeTip != '获取验证码') {
        return;
      }
      let token, userId, phone, send_type, pageId, imgCode;
      SendSMS(token=getStore('token'), userId=getStore('userId'), phone, send_type='debt_assignment', pageId='wapDebtAssignment', imgCode=this.imgCode).then((res) => {
        if(res.data.code == 1) {
          this.$refs.windowTips.toast('验证码发送成功');
          let num = 60;
          let tiemrId = setInterval( () => { 
            num--;
            if(num == 0) {
              this.transterData.verificationCodeTip = '获取验证码';
              clearInterval(tiemrId)
            }else {
              this.transterData.verificationCodeTip = num + 's';
            }
          }, 1000)
        }else {
          this.$refs.windowTips.toast(res.data.msg);
          this.getImgCode();
        }
      }).catch((error)=>{ 
        this.getImgCode();
      })
    },
    // 请求转让
    _zrDebt() {

      if( !this.formValidation()) {
        return;
      }

      let investPWD, discountDebtAmt, investId, discountRate, debtSum, smsCode, cellPhone;
        investPWD =  encryptByDES(this.transterData.investPWD);
        discountDebtAmt = this.transterData.discountDebtAmt;
        investId = this.transterData.investId;
        discountRate = this.transterData.discountRate;
        debtSum = this.transterData.debtSum;
        smsCode = this.transterData.smsCode;
        cellPhone = this.$store.state.userInfo.cellphone;
      zrDebt( userId = getStore("userId"), token = getStore("token"), investPWD,discountDebtAmt, investId,  discountRate, debtSum, smsCode, cellPhone).then((res) => {
        if(res.data.code == 1) {
          this.isTransferWin = false;
          this.getMytender("init");
        }
        this.$refs.windowTips.toast(res.data.msg);
        
      }).catch(function (error) { 
        console.log(error);
      })
    },
    // 转让表单验证 
    formValidation() {
      if(this.transterData.investPWD == ''){
        this.$refs.windowTips.toast('交易密码不能为空');
        return false;
      }
      if(this.transterData.smsCode == '') {
        this.$refs.windowTips.toast('验证码不能为空');
        return false;        
      }
      if( !this.transterData.isAgree) {
        this.$refs.windowTips.toast('请勾选联金所转让协议');
        return false;        
      }
      return true;
    },
    // 撤销转让
    _cancelZRDebt() {
      let debtId;
      cancelZRDebt( userId = getStore("userId"), token = getStore("token"), debtId = this.debtId ).then((res) => {
        if(res.data.code == 1) {
          this.getMytender("init");
        }
        this.$refs.windowTips.toast(res.data.msg);
        this.iscancelWin = false;
    }).catch(function (error) { 
      console.log(error);
      })
    },
    getImgCode(){
      this.imgCodeSrc = `${textCode}?pageId=wapDebtAssignment&d=${(new Date()).getTime().toString()}`;
    },
  },
  components: {
    mheader,
    notData,
    windowTips,
    Dialog
  },
  destroyed() {
    window.removeEventListener("scroll", this.myTenderloadMore);
  }
};
</script>
<style lang='less' scoped>
.screen_cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 998;
}
.myTender {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  background: #f4f4f4;
  padding-top: 0.8rem;
  .back {
    position: relative;
    display: block;
    height: 0.8rem;
    width: 0.8rem;
    i {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      padding-left: 0.15rem;
    }
  }
  .TenderArea {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    width: 100%;
    overflow: hidden;
    font-size: 0.2rem;
    background: #fff;
    ul > li {
      height: 0.8rem;
      width: 25%;
      float: left;
      line-height: 0.8rem;
      text-align: center;
      &.se {
        color: red;
      }
    }
  }
  .agree-tip {
    width: 100%;
    text-align: center;
    font-size: 0.16rem;
    background: #f4f4f4;
    height: 0.3rem;
    line-height: 0.3rem;
    position: fixed;
    bottom: 0;
  }
}
.myTender_filter {
  position: absolute;
  top: 0;
  right: 0.4rem;
  line-height: 0.8rem;
  font-size: 0.18rem;
  color: #222;
  i {
    font-size: 0.18rem;
    margin-right: 0.12rem;
  }
}
.myTender-list-title {
  position: fixed;
  z-index: 2;
  top: 0.8rem;
  width: 100%;
  display: block;
  display: flex;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.2rem;
  text-align: center;
  background: #fff;
  span {
    display: block;
    flex: 1;
    font-size: 0.2rem;
  }
  .sele {
    box-sizing: border-box;
    color: red;
    border-bottom: 1px solid red;
  }
}
.myTenderLists {
  padding-top: 0.8rem;
}
.myTender-list {
  width: 100%;
  background: #fff;
  overflow: hidden;
  margin: 0.2rem 0;
  > h3 {
    color: #7a7a7a;
    font-size: 0.23rem;
    margin: 0.1rem 0 0.1rem 0.24rem;
    display: block;
    display: flex;
    span:nth-child(1) {
      // word-wrap: break-word;
      // word-break: break-all;
      // white-space: pre-wrap !important;
      line-height: 0.4rem;
      margin-right: 0.2rem;
      display: block;
      overflow: hidden; 
      text-overflow: ellipsis; 
      -o-text-overflow: ellipsis;
      white-space:nowrap;
    }
    span:nth-child(2) {
      display: block;
      height: 0.2rem;
      line-height: 0.23rem;
      font-size: 0.16rem;
      padding: 0.04rem 0.05rem;
      margin-right: 0.2rem;
      background: #ffb524;
      border-radius: 0.1rem;
      color: #fff;
       white-space: nowrap;  /*强制span不换行*/
      display: inline-block; 
    }
    span:nth-child(3) {
      display: block;
      height: 0.2rem;
      line-height: 0.23rem;
      font-size: 0.16rem;
      padding: 0.04rem 0.05rem;
      margin-right: 0.2rem;
      background: #ffb524;
      border-radius: 0.1rem;
      color: #fff;
      white-space: nowrap;  /*强制span不换行*/
      display: inline-block; 
    }
    span:nth-child(4) {
      display: block;
      height: 0.2rem;
      line-height: 0.23rem;
      font-size: 0.16rem;
      padding: 0.04rem 0.05rem;
      margin-right: 0.2rem;
      background: #ffb524;
      border-radius: 0.1rem;
      color: #fff;
      white-space: nowrap;  /*强制span不换行*/
      display: inline-block; 
    }
  }
  > ul {
    display: block;
    display: flex;
    font-size: 0.2rem;
    li {
      display: block;
      flex: 1;
      > div {
        > div {
          margin-bottom: 0.2rem;
        }
        > p {
          font-size: 0.18rem;
          color: #999999;
          padding-bottom: 0.2rem;
        }
      }
    }
    li:first-child {
      padding-left: 0.24rem;
      text-align: left;
    }
    li:nth-child(2) {
      text-align: center;
    }
    li:last-child {
      padding-right: 0.24rem;
      text-align: right;
    }
    .boder-cir {
      position: relative;
      span {
        position: absolute;
        text-align: center;
        right: 0;
        width: 80%;
        line-height: 0.5rem;
        border: 1px solid #ef5146;
        color: #ef5146;
        border-radius: 0.5rem;
      }
    }
    .boder-cir-comple {
        position: relative;
        span {
          position: absolute;
          text-align: center;
          right: 0;
          width: 70%;
          height: 0.45rem;
          line-height: 0.46rem;
          color: #fff;
          background: #ef5146;
          border-radius: 0.4rem;
        }
    }
  }
}
.myTenderLists {
  overflow: hidden;
}
.notData {
  span:nth-child(3) {
    font-size: 0.23rem;
    text-align: center;
    margin-top: 0.5rem;
    padding: 0.2rem 1rem;
    border: 1px solid #ef5146;
    border-radius: 0.5rem;
    color: #ef5146;
    background: #fff;
  }
}
.loaded {
  font-size: 0.18rem;
  text-align: center;
  line-height: 0.3rem;
  height: 0.4rem;
  margin-bottom: 0.3rem;
}
.add-money {
  color: #ef5146;
}
.myTender_win {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 90%;
    transform: translateX(-50%) translateY(-50%);
    background-color: #fff;
    border-radius: 4px;
    z-index: 1002;
    font-size: 0.2rem;
    .title {
      position: relative;
      color: #222222;
      line-height: 0.6rem;
      text-align: center;
      border-bottom: 1px solid #f2f1f1;
      .iconfont {
        position: absolute;
        top: 0;
        right: 0;
        color: #d6d6d6;  
        line-height: 0.35rem; 
        padding: 0.1rem;   
        font-size: 0.35rem;
      }
    }
    .con {
      padding: 0 0.2rem;
      .con_tips {
        color: #222222;
        font-size: 0.22rem;
        line-height: 0.3rem;
        padding-top: 0.1rem;
      } 
      .con_li {
        color: #111;
        display: block;
        display: flex;
        line-height: 0.4rem;
        .con_li_left {
          flex: 1;
        }
        .con_li_right {
          float: right;
        }
        .img-code {
          display: block;
          display: flex;
          width: 3.5rem;
          height: 0.5rem;
          line-height: 0.5rem;
          border: 1px solid #666666;
          border-radius: 0.06rem;
          padding: 0 0.1rem;
          input {
            display: block;
            flex: 1;
            text-align: left;
          }
          >span {
            width: 1rem;
            height: 100%;
          }
        }
        &.con_discount {
          padding: 0.2rem 0;
          .con_li_right {
            text-align: center;
            .reduce, .add {
              display: inline-block;
              background-color: #fff;
              font-size: 0.4rem;
              line-height: 0.4rem;
            }
            .mum {
              text-align: center;              
              border: 1px solid #666666;
              border-radius: 0.08rem;
              width: 0.5rem;
              height: 0.35rem;
              margin: 0 0.1rem;
              font-size: 0.2rem;
              line-height: 0.35rem;
              vertical-align: top;
            }
            .percent {
              line-height: 0.4rem;
              vertical-align: top;
            }
          }
        }
        &.con_show {
          line-height: 0.4rem;
        }
        &.con_pwd {
            line-height: 0.75rem;                      
          .con_li_right {
            input {
              width: 3.5rem;
              line-height: 0.5rem;
              border: 1px solid #666666;
              border-radius: 0.06rem;
              padding: 0 0.1rem;              
              
              &::placeholder {
                text-align: right;
                padding-right: 0.1rem;
              }
            }

          }
        }
        &.con_verificationCode {
          line-height: 0.75rem;                    
          .con_li_right {
            position: relative;
            input {
              width: 3.5rem;  
              line-height: 0.5rem;
              border: 1px solid #666666;
              border-radius: 0.06rem;
              padding: 0 0.1rem;              
            }
            .getCode {
              position: absolute;
              color: #f15748;
              top: 0;
              right:0.1rem;
            }
          }
        }
      }
    }

    .con_agreement {
      font-size: 0.2rem;
      line-height: 0.8rem;
      i {
        font-size: 0.2rem;
        padding-right: 0.05rem;
        color: #ff654f; 
      }
    }
    .con_sure {
      height: 0.6rem;
      margin-bottom: 0.25rem;
      border-radius: 0.3rem;   
      text-align: center;               
      line-height: 0.6rem;
      font-size: 0.24rem;
      color: #fff;
      background-color: #ff654f;
    }
   

}
.myTender_mark {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1001;
}

.myTender_cancelWin_con {
  padding: 0.5rem 0;
  p {
    font-size: 0.26rem;
    line-height: 0.5rem;
    text-align: center;
  }

}

</style>