<template>
  <div class='invest'>
    <div v-if='!filterSele'>
      <div @click='investMenuShow=!investMenuShow' class="mheader_wap">
        <mheader :headTitle="curTitle" :fold="investMenuShow" :headlineArrow="true"></mheader>
      </div>
      <div style='height:0.2rem;' v-if='curTitle=="推荐"'></div>
      <div class="title-supplement" v-if='curTitle=="散标专区"'>期限短，100元起投，等额本息/按月付息，到期还本</div>
      <div class="title-supplement" v-if='curTitle=="个人专区"'>期限短，100元起投，等额本息/按月付息，到期还本</div>
      <div class="title-supplement" v-if='curTitle=="企业专区"'>期限短，100元起投</div>
      <div class="title-supplement-trans borderTop-1px" v-if='curTitle=="转让专区"'>
        <ul>
          <li @click="transfer_filter('money')">转让金额<i class="iconfont icon-jiantou-1 icon_up" :class="{'transfer_sele':tranSele=='1'}"></i><i class="iconfont icon-jiantou- icon_down" :class="{'transfer_sele':tranSele=='2'}"></i></li>
          <li @click="transfer_filter('data')">剩余期限<i class="iconfont icon-jiantou-1 icon_up" :class="{'transfer_sele':tranSele=='5'}"></i><i class="iconfont icon-jiantou- icon_down" :class="{'transfer_sele':tranSele=='6'}"></i></li>
          <li @click="filterSele=true">筛选</li>
        </ul> 
      </div>
      <div class="title-supplement" v-if='curTitle=="新手专区"'>期限短，100元起投，等额本息/按月付息，到期还本</div>
      <transition name="invest-menu-fade" mode="out-in">
        <div class="invest_more_icon" style="display: block;" v-if="investMenuShow">
          <div class="borderBottom-1px" :class="item==curTitle? 'sele': ''" @click="investMenuSelect(item)" v-for="(item,index) in titles" :key="index" >{{item}}</div>
        </div>
      </transition>
      <div class="screen_cover" v-if="investMenuShow" @click="investMenuShow=!investMenuShow" @touchmove.prevent></div>
      <!--investAttr 1推荐 2 个人专区 3 散标专区 4 企业专区 5 转让专区 6 新手专区 7 推荐 -->
      <div ref='cardWrap' class="cardWrap">
        <investment-card :investList='tender.list' investAttr='1'></investment-card>
        <investment-card :investList='tender.carLoanList' investAttr='2'></investment-card>
        <investment-card :investList='tender.borrowList' investAttr='3'></investment-card>
        <investment-card :investList='tender.enterpriseLoanList' investAttr='4'></investment-card>
        <investment-card :investList='tender.ZrzqLoanList' investAttr='5'></investment-card>
        <investment-card :investList='tender.NewLoanList' investAttr='6'></investment-card>
        <div v-if='isLoaded&&(tender.borrowList.length>0||tender.carLoanList.length>0||tender.enterpriseLoanList.length>0||tender.ZrzqLoanList.length>0||tender.NewLoanList.length>0||tender.list.length>0)' class="loaded">已全部加载完成</div>
        <not-data v-if='tender.borrowList.length<=0&&tender.carLoanList.length<=0&&tender.enterpriseLoanList.length<=0&&tender.ZrzqLoanList.length<=0&&tender.NewLoanList.length<=0&&tender.list.length<=0'>
          <div slot='hint' style='font-size: 0.23rem; text-align: center;color: #9d9d9d;'>标的被抢光了</div>
        </not-data>
      </div>
      <foot-guide></foot-guide>
    </div>
     <!-- <transition name="transferFilter-fade" mode="out-in"> -->
      <div class="transferFilter" v-if="filterSele">
        <header>
          <section class="head_goback" @click="filterSele=false">
              <i class="iconfont icon-back"></i>
          </section>
          <section class="title_head omitted">
              <span class="title_text">转让专区筛选</span>
          </section>
        </header>
        <div class="filter-con">
          <ul>
            <h3>剩余期限</h3>
            <li :class="{'sele':filterParam.deadlineFlag=='0'}" @click="filterParam.deadlineFlag='0'">全部</li>
            <li :class="{'sele':filterParam.deadlineFlag=='1'}" @click="filterParam.deadlineFlag='1'">1-3个月</li>
            <li :class="{'sele':filterParam.deadlineFlag=='2'}" @click="filterParam.deadlineFlag='2'">4-6个月</li>
            <li :class="{'sele':filterParam.deadlineFlag=='3'}" @click="filterParam.deadlineFlag='3'">7-12个月</li>
            <li :class="{'sele':filterParam.deadlineFlag=='4'}" @click="filterParam.deadlineFlag='4'">12个月以上</li>
          </ul>
          <ul>
            <h3>转让价格</h3>
            <li :class="{'sele':filterParam.auctionbasepriceFlag=='0'}" @click="filterParam.auctionbasepriceFlag='0'">全部</li>
            <li :class="{'sele':filterParam.auctionbasepriceFlag=='1'}" @click="filterParam.auctionbasepriceFlag='1'">10-3000元</li>
            <li :class="{'sele':filterParam.auctionbasepriceFlag=='2'}" @click="filterParam.auctionbasepriceFlag='2'">3000-10000元</li>
            <li :class="{'sele':filterParam.auctionbasepriceFlag=='3'}" @click="filterParam.auctionbasepriceFlag='3'">10000-50000元</li>
            <li :class="{'sele':filterParam.auctionbasepriceFlag=='4'}" @click="filterParam.auctionbasepriceFlag='4'">50000元以上</li>
          </ul>
          <ul>
            <h3>还款方式</h3>
            <li :class="{'sele':filterParam.paymentmode=='0'}" @click="filterParam.paymentmode='0'">全部</li>
            <li :class="{'sele':filterParam.paymentmode=='1'}" @click="filterParam.paymentmode='1'">等额本息</li>
            <li :class="{'sele':filterParam.paymentmode=='2'}" @click="filterParam.paymentmode='2'">按月付息，到期还本</li>
          </ul>
          <ul>
            <h3>结息日</h3>
            <li :class="{'sele':filterParam.paymentDay=='0'}" @click="filterParam.paymentDay='0'">全部</li>
            <li :class="{'sele':filterParam.paymentDay!='0'}" @click="dataSele=true;filterParam.paymentDay=[]"><i class="iconfont icon-huikuanric"></i><span class="sele-data">{{showSeleData?showSeleData:'请选择日期'}}</span></li>
          </ul>
        </div>
        <div class="data-sele" v-show='dataSele'>
            <div class="data-con">
              <h3 class="data-con-title"><span>请选择结息日</span><i class="iconfont icon-close" @click='dataSeleClose'></i></h3>
              <ul>
                <li v-for="(item,index) in 31" :key="index" :class="{'sele':dataLiSele[Number(index)+1]==Number(index)+1}" @click='seleData(index)'>{{index+1}}</li>
              </ul>
            </div>
          </div>
        <div class="filter-submit">
          <div @click="filterParamInit">重置</div>
          <div @click='filterSubmit'>确定</div>
        </div>
      </div>
     <!-- </transition> -->
  </div>
</template>

<script>
import footGuide from '@/components/footer/footGuide.vue'
import mheader from '@/components/header/header.vue'
import investmentCard from '@/components/common/investmentCard/investmentCard.vue'
import notData from '../../components/common/notData/notData.vue'
import { gotoWapBorrowList, gotoWapCheDaiList, wapLjqyList, wapZrzqList, gotoWapNewHandList, allWapBorrowList } from '@/server/getData.js'
import {setStore, getStore, removeStore} from '@/config/mUtils'

export default {
  data () {
    return {
      titles:['推荐','个人专区','散标专区','企业专区','转让专区','新手专区'],
      curTitle:'推荐',
      investMenuShow:false,
      tender:{
        borrowList:[],
        carLoanList:[],
        enterpriseLoanList:[],
        ZrzqLoanList:[],
        NewLoanList:[],
        list:[]
      },
      pageNum:1, //当前页
      loaded:true, // 加载完成
      isLoaded:false,//判断加载是否完成
      tranSele:'1',//筛选
      filterSele:false,
      filterParam:{
        deadlineFlag:'0',
        auctionbasepriceFlag:'0',
        paymentmode:'0',
        paymentDay:'0'
      }, //转让专区筛选过滤参数
      dataLiSele:{},
      showSeleData:'', //选择日期展示
      dataSele:false //结息日期选择
    }
  },
  mounted(){
    if(getStore('curTitle')) {
      this.investMenuSelect(getStore('curTitle'))
    }else {
       this.getInvestList();
    }
    window.addEventListener('scroll', this._loadMore)
  },
  methods:{
    filterParamInit(){
      this.filterParam={
        deadlineFlag:'0',
        auctionbasepriceFlag:'0',
        paymentmode:'0',
        paymentDay:'0'
      }
      this.dataLiSele = {};
      this.showSeleData = '';
    },
    seleData(index){
      if(this.dataLiSele[index+1]==null||this.dataLiSele[index+1]==''){
        this.$set(this.dataLiSele,index+1,index+1)
      }else {
        this.$set(this.dataLiSele,index+1,'')
      }
    },
    dataSeleClose(){
      this.dataSele = false;
      let str='';
      for(let variable in this.dataLiSele){ 
        str += this.dataLiSele[variable]+','
      }
      str = str.replace(/(^\,*)|(\,*$)/g, "");
      str=str.replace(new RegExp(',+',"gm"),','); 
      this.showSeleData = str;
      this.filterParam.paymentDay = this.showSeleData;
    },
    filterSubmit(){
      this.filterSele = false;
      this.pageNum=1;//初始化
      //每页的记录数  当前页  微信用户的openId
      let pageSize, pageNum, openId, orderType, deadlineFlag, auctionbasepriceFlag, paymentmode, paymentDay;
      orderType = this.tranSele;
      this.tender = {
        borrowList:[],
        carLoanList:[],
        enterpriseLoanList:[],
        ZrzqLoanList:[],
        NewLoanList:[],
        list:[]
      };
      deadlineFlag = this.filterParam.deadlineFlag;
      auctionbasepriceFlag = this.filterParam.auctionbasepriceFlag;
      paymentmode = this.filterParam.paymentmode;
      paymentDay = this.filterParam.paymentDay;
      wapZrzqList(pageSize=10,pageNum=this.pageNum, orderType, deadlineFlag, auctionbasepriceFlag, paymentmode, paymentDay).then(res => {
        if(res.data.code==1){
          let len = this.tender.ZrzqLoanList.length;
          this.tender.ZrzqLoanList = this.tender.ZrzqLoanList.concat(res.data.data.ZrzqLoanList);
          if(len==this.tender.ZrzqLoanList.length) {
            this.loaded = false;
            this.isLoaded = true;
          }else {
            this.loaded = true;
            this.isLoaded = false;
          }
        }
      }).catch( (error)=>{
        console.log(error);
        this.isLoaded = true;
      });
    },
    investMenuSelect(title) {
      this.curTitle = title;
      setStore('curTitle',this.curTitle);
      this.pageNum=1;//初始化
      this.tender = {
        borrowList:[],
        carLoanList:[],
        enterpriseLoanList:[],
        ZrzqLoanList:[],
        NewLoanList:[],
        list:[]
      };
      // this.titles.splice(0,1,...this.titles.splice(index,1,this.titles[0]));
      this.investMenuShow = false;
      this.getInvestList();
      this.filterParamInit();
    },
    transfer_filter(e){//过滤
      this.pageNum=1;//初始化
      this.tender = {
        borrowList:[],
        carLoanList:[],
        enterpriseLoanList:[],
        ZrzqLoanList:[],
        NewLoanList:[],
        list:[]
      };
      if(e=='money'){
        this.tranSele=='1'?this.tranSele='2':this.tranSele=='2'?this.tranSele='1':this.tranSele='1';
      }else if(e=='data') {
        this.tranSele=='5'?this.tranSele='6':this.tranSele=='6'?this.tranSele='5':this.tranSele='5';
      }
      //每页的记录数  当前页  微信用户的openId
      let pageSize, pageNum, openId, orderType, deadlineFlag, auctionbasepriceFlag, paymentmode, paymentDay;
      orderType = this.tranSele;
      deadlineFlag = this.filterParam.deadlineFlag;
      auctionbasepriceFlag = this.filterParam.auctionbasepriceFlag;
      paymentmode = this.filterParam.paymentmode;
      paymentDay = this.filterParam.paymentDay;
      wapZrzqList(pageSize=10,pageNum=this.pageNum, orderType, deadlineFlag, auctionbasepriceFlag, paymentmode, paymentDay).then(res => {
        if(res.data.code==1){
          let len = this.tender.ZrzqLoanList.length;
          this.tender.ZrzqLoanList = this.tender.ZrzqLoanList.concat(res.data.data.ZrzqLoanList);
            if(len==this.tender.ZrzqLoanList.length) {
              this.loaded = false;
              this.isLoaded = true;
            }else {
              this.loaded = true;
              this.isLoaded = false;
            }
        }
      }).catch((error)=>{
        console.log(error);
        this.isLoaded = true;
      });
    },
    getInvestList(){
      this.showSeleData = '';
      let title = this.curTitle;
      let pageSize;//每页的记录数
      let pageNum;//当前页
      let openId; // 微信用户的openId
      if(title == '散标专区'){
          gotoWapBorrowList(pageSize=10,pageNum=this.pageNum).then(res => {
            if(res.data.code==1){
              let len = this.tender.borrowList.length;
              this.tender.borrowList = this.tender.borrowList.concat(res.data.data.borrowList);
               if(len==this.tender.borrowList.length) {
                 this.loaded = false;
                 this.isLoaded = true;
               }else {
                 this.loaded = true;
                 this.isLoaded = false;
               }
            }
          }).catch( (error)=>{
            console.log(error);
            this.isLoaded = true;
          });
      }else if(title =='个人专区'){
          gotoWapCheDaiList(pageSize=10,pageNum=this.pageNum).then(res => {
            if(res.data.code==1){
              let len = this.tender.carLoanList.length;
              this.tender.carLoanList = this.tender.carLoanList.concat(res.data.data.carLoanList);
               if(len==this.tender.carLoanList.length) {
                 this.loaded = false;
                 this.isLoaded = true;
               }else {
                 this.loaded = true;
                 this.isLoaded = false;
               }
            }
          }).catch( (error)=>{
            console.log(error);
            this.isLoaded = true;
          });
      }else if(title == '企业专区'){
          wapLjqyList(pageSize=10,pageNum=this.pageNum).then(res => {
            if(res.data.code==1){
               let len = this.tender.enterpriseLoanList.length;
              this.tender.enterpriseLoanList = this.tender.enterpriseLoanList.concat(res.data.data.enterpriseLoanList);
               if(len==this.tender.enterpriseLoanList.length) {
                 this.loaded = false;
                 this.isLoaded = true;
               }else {
                 this.loaded = true;
                 this.isLoaded = false;
               }
            }
          }).catch( (error)=>{
            console.log(error);
            this.isLoaded = true;
          });
      }else if(title == '转让专区'){
        // this.filterParam = {
        //   deadlineFlag:'0',
        //   auctionbasepriceFlag:'0',
        //   paymentmode:'0',
        //   paymentDay:'0'
        // }
        let orderType, deadlineFlag, auctionbasepriceFlag, paymentmode, paymentDay;
        orderType = this.tranSele;
        orderType = this.tranSele;
        deadlineFlag = this.filterParam.deadlineFlag;
        auctionbasepriceFlag = this.filterParam.auctionbasepriceFlag;
        paymentmode = this.filterParam.paymentmode;
        paymentDay = this.filterParam.paymentDay;
        wapZrzqList(pageSize=10,pageNum=this.pageNum, orderType, deadlineFlag, auctionbasepriceFlag, paymentmode, paymentDay).then(res => {
          if(res.data.code==1){
            let len = this.tender.ZrzqLoanList.length;
            this.tender.ZrzqLoanList = this.tender.ZrzqLoanList.concat(res.data.data.ZrzqLoanList);
              if(len==this.tender.ZrzqLoanList.length) {
                this.loaded = false;
                this.isLoaded = true;
              }else {
                this.loaded = true;
                this.isLoaded = false;
              }
          }
        }).catch( (error)=>{
          console.log(error);
          this.isLoaded = true;
        });
      }else if(title == '新手专区'){
          gotoWapNewHandList(pageSize=10,pageNum=this.pageNum).then(res => {
            if(res.data.code==1){
              let len = this.tender.NewLoanList.length;
              this.tender.NewLoanList = this.tender.NewLoanList.concat(res.data.data.NewLoanList);
               if(len==this.tender.NewLoanList.length) {
                 console.log(this.tender.NewLoanList)
                 this.loaded = false;
                 this.isLoaded = true;
               }else {
                 this.loaded = true;
                 this.isLoaded = false;
               }
            }
          }).catch((error)=>{
            console.log(error);
            this.isLoaded = true;
          });
      }else if(title == '推荐'){
        let rate, period;
        allWapBorrowList(pageSize=10,pageNum=this.pageNum, rate, period).then(res => {
            if(res.data.code==1&&res.data.data.list){
              let len = this.tender.list.length;
              this.tender.list = this.tender.list.concat(res.data.data.list);
               if(len==this.tender.list.length) {
                 this.loaded = false;
                 this.isLoaded = true;
               }else {
                 this.loaded = true;
                 this.isLoaded = false;
               }
            }
          }).catch((error)=>{
            console.log(error);
            this.isLoaded = true;
          });
      }
    },
    _loadMore(){
      if(this.filterSele) return;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.body.clientHeight;
      if(this.$refs.cardWrap.offsetHeight-clientHeight<(Number(scrollTop)+10)&&this.loaded){
        this.loaded = false;
        this.pageNum++;
        this.getInvestList();
      }
    }
  },
  components: {
    footGuide,
    mheader,
    investmentCard,
    notData,
  },
  destroyed () {
    window.removeEventListener('scroll', this._loadMore)
  },
}

</script>
<style lang='less' scoped>
.invest-menu-fade-enter-active, .invest-menu-fade-leave-active {
  transition: .5s;
  transform: translateY(0);
}
.invest-menu-fade-enter, .invest-menu-fade-leave-active {
  transform: translateY(-100%);
}

.transferFilter-fade-enter-active, .transferFilter-fade-leave-active {
  transition: .5s;
  transform: translateX(0);
}
.transferFilter-fade-enter, .transferFilter-fade-leave-active {
  transform: translateX(100%);
}

.invest {
  box-sizing:border-box; 
  min-height: 100%;
  width: 100%;
  background: #f4f4f4;
  padding-top: 0.8rem;
  padding-bottom: 0.87rem;
}
.title-supplement {
  font-size: 0.18rem;
  text-align: center;
  height: 0.7rem;
  line-height: 0.7rem;
}
.title-supplement-trans {
  font-size: 0.22rem;
  text-align: center;
  height: 0.8rem;
  line-height: 0.8rem;
  background: #fff;
  margin-bottom: 0.2rem;
  ul {
    display: block;
    display: flex;
    height: 0.8rem;
    li {
      display: block;
      flex: 1;
      position: relative;
      i {
        font-size: 0.18rem;
        position: absolute;
        margin-left: 0.05rem;
        color: #c2c2c2;
      }
      i.icon_up {
        top: -0.06rem;
      }
      i.icon_down {
        bottom: -0.06rem;
      }
    }
  }
  .transfer_sele {
    color: #FFD072;
  }
}
.sele {
  background-color:#e2e5ea;
}
.screen_cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 998;
}
.mheader_wap {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 0.75rem;
}
.invest_more_icon {
    position: fixed;
    right: 0px;
    top: 0.75rem;
    background: #fff; 
    width: 100%;
    display: none;
    z-index: 999;
    >div {
      width: 100%;
      font-size: 0.18rem;
      color: #484848;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
    }
}
.loaded {
  font-size: 0.18rem;
  text-align: center;
  line-height: 0.3rem;
  height: 0.4rem;
}
.noData {
  font-size: 0.18rem;
  text-align: center;
  line-height: 0.3rem;
  height: 0.4rem;
  line-height: 0.4rem;
}
.cardWrap {
  overflow: hidden;
}
.transferFilter {
  // position: fixed;
  // z-index: 1;
  // left: 0;
  // top: 0;
  width: 100%;
  height: 100%;
  header {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 0.8rem;
    background: #fff;
  }
  .head_goback{
    font-size: 0.35rem;
    width: 0.6rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
  }   
  .title_head{
    position: absolute;
    height: 0.8rem;
    line-height: 0.8rem;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    text-align: center;
    .title_text{
      display: block;
      height: 0.8rem;
      font-size: 0.26rem;
      text-align: center;
      font-weight: bold;
    }
  }
  .filter-con {
    ul {
      background: #fff;
      overflow: hidden;
      margin-bottom: 0.2rem;
      h3 {
        height: 0.7rem;
        font-size: 0.26rem;
        line-height: 0.7rem;
        padding-left: 4%;
        color: #999;
      }
      li {
        box-sizing:border-box; 
        font-size: 0.23rem;
        float: left;
        width: 28%;
        margin-left: 4%;
        margin-bottom: 0.2rem;
        text-align: center;
        height: 0.6rem;
        line-height: 0.6rem;
        border: 1px solid #ddd;
        color: #333;
      }
      li.sele {
        background: #f05141;
        color: #fff;
      }
    }
    ul:nth-child(3){
      li {
        width: 44%;
      }
    }
    ul:nth-child(4){
      li {
        width: 44%;
      }
      li:nth-child(3) {
        display: block;
        display: flex;
        span {
          width: 80%;
          overflow: hidden;  
          text-overflow: ellipsis;  
          white-space: nowrap;  
        }
        i {
          font-size: 0.4rem;
          line-height: 0.5rem;
        }
      }
    }
  }
  .filter-submit {
    background-color: #fff;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 0.87rem;
    line-height: 0.87rem;
    text-align: center;
    display: block;
    display: flex;
    font-size: 0.26rem;
    div {
      display: block;
      flex: 1;
    }
    div:nth-child(1){
      border-right: 1px solid #ddd;
    }
  }
  .data-sele {
    z-index: 1002;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.2);
    .data-con {
      width: 90%;
      margin: 5rem auto 0;
      height: 4rem;
      border-radius: 0.1rem;
      overflow: hidden;
      background-color: #FFFFFF;
      .data-con-title {
        display: block;
        display: flex;
        font-size:0.26rem;
        height:0.7rem;
        line-height:0.7rem;
        padding-left:0.23rem;
        color: #fff;
        background: #ff6f4e;
        i {
          width: 0.6rem;
          text-align: center;
        }
        span {
          display: block;
          flex: 1;
        }
      }
      ul {
        margin-top:0.2rem;
        li {
          box-sizing:border-box; 
          width: 10.5%;
          margin: 0.02rem;
          margin-left: 1.5%;
          margin-top: 0.05rem;
          height: 0.6rem;
          line-height: 0.6rem;
          text-align: center;
          font-size: 0.26rem;
          float: left;
        }
        li.sele {
          border-radius: 50%;
          color: #ffffff;
          background: #ff6f4e;
        }
      }
    }
  }
}
</style>