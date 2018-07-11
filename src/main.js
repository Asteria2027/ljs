import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store/'
import { routerMode } from './config/env'
import './config/rem.js'
import { getStore } from './config/mUtils'

Vue.config.productionTip = false

Vue.use(VueRouter)

//全局变量
Vue.prototype.novice_limit = '4万' //新手额度

const router = new VueRouter({
  base: '/wapfront/',
  routes,  
  mode: routerMode,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
});
// 登录拦截
router.beforeEach(function (to, from, next) { 
  if((to.path==='/investDetailTransaction'||to.path==='/investDetailTransactionSucess'||to.path==='/seleRewardList'||to.path==='/myAssets'||to.path==='/withdrawCash'||to.path==='/withdraw'||to.path==='/withdrawCashRecord'||to.path==='/recharge'||to.path==='/rechargeFast'||to.path==='/bankCardQuota'||to.path==='/tenderRecord'||to.path==='/projectDetails'||to.path==='/BorrowerinfoAndRiskManage'||to.path==='/transactionDetails'||to.path==='/myTender'||to.path==='/myTenderDetail'||to.path==='/inviteFriends'||to.path==='/myFriends'||to.path==='/rebatesDetails'||to.path==='/rebatesRank'||to.path==='/myWelfare'||to.path==='/rewardRecord'||to.path==='/depositAccount'||to.path==='/returnedMoneyCalendar'||to.path==='/securityCenter'||to.path==='/idVerified'||to.path==='/bankCard'||to.path==='/replaceBankCard'||to.path==='/modifyDealPwd'||to.path==='/modifyLogin'||to.path==='/modifyBankPhone'||to.path==='/bindNewPhone'||to.path==='/bindNewPhoneSecond'||to.path==='/automaticBid')&&!getStore('token')){
    next({path:'/login'});
  }else {
    next();
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})