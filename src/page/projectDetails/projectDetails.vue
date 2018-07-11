<template>
  <div class="projectDetails">
  <mheader headTitle='项目详情' :goBack="'true'"></mheader>

    <!-- 个人专区 -->
    <div class="loan-information infomation" v-if="($route.query.subjectType==5)||personal">
      <div class="title">
        <h3 class="borderBottom-1px">基本信息</h3>
      </div>
      <ul>
        <li>
          <div>姓名</div>
          <div>{{borrowUserMap.realname}}</div>
        </li>
        <li>
          <div>性别</div>
          <div>{{borrowUserMap.sex}}</div>
        </li>   
        <li>
          <div>年龄</div>
          <div>{{borrowUserMap.age}}</div>
        </li>
        <li>
          <div>身份证号码</div>
          <div>{{borrowUserMap.idno}}</div>
        </li>
        <li>
          <div>学历</div>
          <div>{{borrowUserMap.highestEdu}}</div>
        </li>
        <li>
          <div>婚姻状况</div>
          <div>{{borrowUserMap.marriageStatus}}</div>
        </li>
        <li>
          <div>月收入</div>
          <div>{{borrowUserMap.monthIncome}}</div>
        </li>
        <li>
          <div>负债情况</div>
          <div>{{borrowDetailMap.debtsituation?borrowDetailMap.debtsituation:'一般'}}</div>
        </li>
        <li>
          <div>其他网络平台借款</div>
          <div>{{borrowDetailMap.borrowersborrowingstatus?borrowDetailMap.borrowersborrowingstatus:'有，风险等级较低'}}</div>
        </li>
        <li>
          <div>截止借款前6个月征信报告中的逾期情况</div>
          <div>{{borrowDetailMap.isoverdue?borrowDetailMap.isoverdue:'无'}}</div>
        </li>
      </ul>
    </div>
    <div class="corporate-information infomation" v-if="$route.query.subjectType==5||personal">
      <div class="title">
        <h3 class="borderBottom-1px">借款信息</h3>
      </div>
      <ul>
        <li>
          <div>借款金额</div>
          <div>{{borrowDetailMap.borrowAmount}}</div>
        </li>
        <li>
          <div>借款期限</div>
          <div>{{borrowDetailMap.deadline}}</div>
        </li>
        <li>
          <div>历史年化</div>
          <div>{{borrowDetailMap.annualRate}}</div>
        </li>
        <li>
          <div>还款方式</div>
          <div>{{borrowDetailMap.paymentMode==1?'等额本息':borrowDetailMap.paymentMode==2?'按月付息，到期还本':borrowDetailMap.paymentMode==3?'等本等息':borrowDetailMap.paymentMode==4?'一次性还本付息':'******'}}</div>
        </li>
        <!-- <li>
          <div>逾期期数</div>
          <div>{{borrowUserMap.lateCount}}</div>
        </li>
        <li>
          <div>车辆型号</div>
          <div>{{borrowUserMap.carModel}}</div>
        </li>
        <li>
          <div>车牌号</div>
          <div>{{borrowUserMap.carNum}}</div>
        </li>
        <li>
          <div>评估价格</div>
          <div>{{borrowUserMap.carPrice}}</div>
        </li>
        <li>
          <div>行驶里程</div>
          <div>{{borrowUserMap.drivingKm}}</div>
        </li> -->
      </ul>
    </div>
    <div class="infomation" v-if="$route.query.subjectType==5||personal">
      <div class="title">
        <h3 class="borderBottom-1px">借款用途</h3>
      </div>
      <p>{{borrowDetailMap.borrowRemark}}</p>
    </div>
    <div class="infomation" v-if="$route.query.subjectType==5||personal">
      <div class="title">
        <h3 class="borderBottom-1px">还款来源</h3>
      </div>
      <p>{{borrowDetailMap.paySourse}}</p>
    </div>

    <!-- 企业专区 -->
    <div class="loan-information infomation" v-if="$route.query.subjectType==7||enterprise">
      <div class="title">
        <h3 class="borderBottom-1px">借款信息</h3>
      </div>
      <ul>
        <li>
          <div>借款金额</div>
          <div>{{borrowDetailMap.borrowAmount}}元</div>
        </li>
        <li>
          <div>借款期限</div>
          <div>{{borrowDetailMap.deadline}}个月</div>
        </li>
        <li>
          <div>历史年化</div>
          <div>{{borrowDetailMap.annualRate}}%</div>
        </li>
        <li>
          <div>还款方式</div>
          <div>{{borrowDetailMap.paymentMode==1?'等额本息':borrowDetailMap.paymentMode==2?'按月付息，到期还本':borrowDetailMap.paymentMode==3?'等本等息':borrowDetailMap.paymentMode==4?'一次性还本付息':'******'}}</div>
        </li>
        <li>
          <div>所属行业</div>
          <div>{{borrowDetailMap.orgindustrycontent}}</div>
        </li>
        <li>
          <div>月收入</div>
          <div>{{borrowUserMap.monthIncome}}</div>
        </li>
        <li>
          <div>负债情况</div>
          <div>{{borrowDetailMap.debtsituation?borrowDetailMap.debtsituation:'一般'}}</div>
        </li>
        <li>
          <div>其他网络平台借款</div>
          <div>{{borrowDetailMap.borrowersborrowingstatus?borrowDetailMap.borrowersborrowingstatus:'有，风险等级较低'}}</div>
        </li>
        <li>
          <div>截止借款前6个月征信报告中的逾期情况</div>
          <div>{{borrowDetailMap.isoverdue?borrowDetailMap.isoverdue:'无'}}</div>
        </li>
      </ul>
    </div>
    <div class="corporate-information infomation" v-if="$route.query.subjectType==7||enterprise">
      <div class="title">
        <h3 class="borderBottom-1px">企业信息</h3>
      </div>
      <ul>
        <li>
          <div>企业名称</div>
          <div>{{borrowDetailMap.enterpriseName}}</div>
        </li>
        <li>
          <div>注册资本</div>
          <div>{{borrowDetailMap.registeredCapital}}</div>
        </li>
      </ul>
      <!-- <p>该借款企业主要经营普通种植材料：城镇绿化苗种植、批零兼营；园林器具批发、零售；花卉租赁；蔬菜种植、销售；果树（不含种苗）种植；水果、初级食用农产品批发、零售；花卉（不含种苗）种植、销售；盆景（不含种苗）种植、销售；农作物种植、销售；粮油批发、零售。<br/>普通种植材料：城镇绿化苗种植、批零兼营；园林器具批发、零售；花卉租赁；蔬菜种植、销售；果树（不含种苗）种植；水果、初级食用农产品批发、零售；花卉（不含种苗）种植、销售；盆景（不含种苗）种植、销售；农作物种植、销售；粮油批发、零售。</p> -->
    </div>
    <div class="infomation" v-if="$route.query.subjectType==7||enterprise">
      <div class="title">
        <h3 class="borderBottom-1px">借款用途</h3>
      </div>
      <p>{{borrowDetailMap.borrowRemark}}</p>
    </div>
    <div class="infomation" v-if="$route.query.subjectType==7||enterprise">
      <div class="title">
        <h3 class="borderBottom-1px">还款来源</h3>
      </div>
      <p>{{borrowDetailMap.paySourse}}</p>
    </div>

    <div class="screen_cover" @touchmove.prevent v-if="fullPicShow" @click="fullPicShow=!fullPicShow"></div>

    <!-- 图片资料 -->
    <div class="picture-information infomation">
      <div class="title">
        <h3 class="borderBottom-1px">图片资料</h3>
      </div>
      <!-- Swiper1 -->
      <div class="swiper-container pic-info-content">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in pics" :key="index" @click='goFullPic(index)'>
            <img :src="item.DLSURL" alt="">
          </div>
        </div>
      </div>
      <!-- Swiper2 -->
      <div class="swiper-container pic-info-content-fullScreen" v-show="fullPicShow">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in pics" :key="index">
            <img :src="item.DLSURL" alt="">
          </div>
        </div>
        <div class="swiper-pagination fullScreen-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import mheader from '@/components/header/header.vue'
import Swiper from 'swiper'
import '@/style/swiper.min.css'
import {mapState} from 'vuex'
import { wapChedaiProjectDetail, wapLjqyBorrowerDetail} from "@/server/getData.js";
import { getStore } from "@/config/mUtils";

export default {
  data () {
    return {
      enterprise:false,
      personal:false,
      borrowDetailMap:{},
      borrowUserMap:{},
      pics:[
        // {
        //   imgSrc:require('./projectDetails_1.jpg')
        // },
        // {
        //   imgSrc:require('./projectDetails_2.jpg')
        // },
        // {
        //   imgSrc:require('./projectDetails_3.jpg')
        // },
        // {
        //   imgSrc:require('./projectDetails_4.jpg')
        // },
        // {
        //   imgSrc:require('./projectDetails_5.jpg')
        // }
      ],
      fullPicShow:false
    };
  },
  mounted(){
    setTimeout(() => {
      if(!this.$store.state.userInfo||getStore('userId')==null){
        this.$router.push('login');
        return;
      }
      if(!this.$route.query.borrowId){
        this.$router.push('home');
        return;
      }
    }, 2000);
    if(this.$route.query.subjectType==5||this.$route.query.subjectType==6){
     this._wapChedaiProjectDetail();
    }else if(this.$route.query.subjectType==7){
      this._wapLjqyBorrowerDetail();
    }
    this.$nextTick(()=>{
      let swiper1 = new Swiper('.pic-info-content',{
        speed: 300,
        freeMode : true,
        freeModeMomentum : true,
        slidesPerView:3,
        centeredSlides: false,
        freeModeSticky :false,
        spaceBetween: 10,
        observer:true,
        observeParents:true
      });
    })
  },
  methods:{
    _wapChedaiProjectDetail(){
      let borrowId, userId, token;
      wapChedaiProjectDetail(borrowId=this.$route.query.borrowId, userId=getStore('userId'), token=getStore("token")).then(res => {
        if(res.data.code==1){
          this.borrowDetailMap = res.data.data.borrowDetailMap;
          this.borrowUserMap = res.data.data.borrowUserMap;
          this.pics = res.data.data.userSubJectDlsList;
          if(this.borrowDetailMap.prdCode!='LJQY'){
            this.personal = true;
          }else {
            this.enterprise = true;
          }
        }else {
          alert(res.data.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    _wapLjqyBorrowerDetail(){
      let borrowId, userId, token;
      wapLjqyBorrowerDetail(borrowId=this.$route.query.borrowId, userId=getStore('userId'), token=getStore("token")).then(res => {
        if(res.data.code==1){
          this.borrowDetailMap = res.data.data.borrowDetailMap;
          this.borrowUserMap = res.data.data.borrowUserMap;
          this.pics = res.data.data.userSubJectDlsList;
          if(this.borrowDetailMap.prdCode!='LJQY'){
            this.personal = true;
          }else {
            this.enterprise = true;
          }
        }else {
          alert(res.data.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    goFullPic(index){
      this.fullPicShow = true;
      var self = this;
      setTimeout(() => {
        var mySwiper2 =  new Swiper ('.pic-info-content-fullScreen', {
          loop: true,
          pagination : '.fullScreen-pagination',
          paginationType : 'fraction',
          onDoubleTap: function(swiper){
              self.fullPicShow = false;
          }
        });
        mySwiper2.slideTo(index+1, 1000, false);
      }, 20);
    }
  },
  computed: {
    ...mapState([
        'userInfo'
    ]),
  },
  components:{
    mheader,
  }
}

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
.projectDetails {
  min-height: 100%;
  width: 100%;
  box-sizing:border-box; 
  background: #f4f4f4;
  padding-top: 0.8rem;
}
.projectDetails .infomation {
  margin-top: 0.2rem;
  background: #fff;
  >.title {
    >h3 {
      font-size: 0.25rem;
      color: #2d2d2d;
      margin:0 0.24rem;
      padding:0.2rem 0;
    }
  }
  >ul {
    font-size: 0.2rem;
    padding-left: 0.24rem;
    >li {
      display: block;
      display: flex;
      height: 0.7rem;
      line-height: 0.7rem;
      >div {
        display: block;
        
      }
      >div:nth-child(1){
        color: #666;
        flex: 1;
      }
      >div:nth-child(2){
        padding-right: 0.3rem;
      }
    }
  }
  >p {
    font-size: 0.18rem;
    padding:0.1rem 0.24rem 0.2rem;
    line-height: 0.3rem;
    color: #666;
  }
}
.projectDetails .pic-info-content {
  height: 1.5rem;
  width: 100%;
  >.swiper-wrapper {
    height: 100%;
    >.swiper-slide {
      height: 100%;
      >img {
        display: block;
        height: 100%;
        width: 100%;
      }
    }
  }
}
.projectDetails .pic-info-content-fullScreen {
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: auto;
  width: 100%;
  >.swiper-wrapper {
    height: auto;
    >.swiper-slide {
      width: 100%;
      margin: auto 0;
      overflow: hidden;
      >img {
        display: block;
        width: 100%;
        height: auto;
      }
    }
  }
  .fullScreen-pagination {
    font-size: 0.3rem;
    color: #fff;
  }
}
</style>