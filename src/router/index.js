import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const invest = r => require.ensure([], () => r(require('../page/invest/invest')), 'invest')
const account = r => require.ensure([], () => r(require('../page/account/account')), 'account')
const myAssets = r => require.ensure([], () => r(require('../page/myAssets/myAssets')), 'myAssets')
const withdrawCash = r => require.ensure([], () => r(require('../page/withdrawCash/withdrawCash')), 'withdrawCash')
const withdraw = r => require.ensure([], () => r(require('../page/withdraw/withdraw')), 'withdraw')
const withdrawCashRecord = r => require.ensure([], () => r(require('../page/withdrawCashRecord/withdrawCashRecord')), 'withdrawCashRecord')
const recharge = r => require.ensure([], () => r(require('../page/recharge/recharge')), 'recharge')
const rechargeFast = r => require.ensure([], () => r(require('../page/rechargeFast/rechargeFast')), 'rechargeFast')
const bankCardQuota = r => require.ensure([], () => r(require('../page/bankCardQuota/bankCardQuota')), 'bankCardQuota')
const news = r => require.ensure([], () => r(require('../page/news/news')), 'news')
const investDetail = r => require.ensure([], () => r(require('../page/investDetail/investDetail')), 'investDetail')
const investDetailTransaction = r => require.ensure([], () => r(require('../page/investDetailTransaction/investDetailTransaction')), 'investDetailTransaction')
const seleRewardList = r => require.ensure([], () => r(require('../page/seleRewardList/seleRewardList')), 'seleRewardList')
const investDetailTransactionSucess = r => require.ensure([], () => r(require('../page/investDetailTransactionSucess/investDetailTransactionSucess')), 'investDetailTransactionSucess')
const tenderRecord = r => require.ensure([], () => r(require('../page/tenderRecord/tenderRecord')), 'tenderRecord')
const projectDetails = r => require.ensure([], () => r(require('../page/projectDetails/projectDetails')), 'projectDetails')
const BorrowerinfoAndRiskManage = r => require.ensure([], () => r(require('../page/BorrowerinfoAndRiskManage/BorrowerinfoAndRiskManage')), 'BorrowerinfoAndRiskManage')
const riskManage = r => require.ensure([], () => r(require('../page/riskManage/riskManage')), 'riskManage')
const commonProblem = r => require.ensure([], () => r(require('../page/commonProblem/commonProblem')), 'commonProblem')
const riskWarning = r => require.ensure([], () => r(require('../page/riskWarning/riskWarning')), 'riskWarning')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const changePwd = r => require.ensure([], () => r(require('../page/changePwd/changePwd')), 'changePwd')
const transactionDetails = r => require.ensure([], () => r(require('../page/transactionDetails/transactionDetails')), 'transactionDetails')
const inviteFriends = r => require.ensure([], () => r(require('../page/inviteFriends/inviteFriends')), 'inviteFriends')
const InviteFriendsToGifts = r => require.ensure([], () => r(require('../page/InviteFriendsToGifts/InviteFriendsToGifts')), 'InviteFriendsToGifts')
const myFriends = r => require.ensure([], () => r(require('../page/myFriends/myFriends')), 'myFriends')
const rebatesDetails = r => require.ensure([], () => r(require('../page/rebatesDetails/rebatesDetails')), 'rebatesDetails')
const rebatesRank = r => require.ensure([], () => r(require('../page/rebatesRank/rebatesRank')), 'rebatesRank')
const myRebates = r => require.ensure([], () => r(require('../page/myRebates/myRebates')), 'myRebates')
const myRebatesBannerPage = r => require.ensure([], () => r(require('../page/myRebatesBannerPage/myRebatesBannerPage')), 'myRebatesBannerPage')
const myWelfare = r => require.ensure([], () => r(require('../page/myWelfare/myWelfare')), 'myWelfare')
const rewardRecord = r => require.ensure([], () => r(require('../page/rewardRecord/rewardRecord')), 'rewardRecord')
const depositAccount = r => require.ensure([], () => r(require('../page/depositAccount/depositAccount')), 'depositAccount')
const returnedMoneyCalendar = r => require.ensure([], () => r(require('../page/returnedMoneyCalendar/returnedMoneyCalendar')), 'returnedMoneyCalendar')
const returnedMoneyCalendar_first = r => require.ensure([], () => r(require('../page/returnedMoneyCalendar/returnedMoneyCalendar_first')), 'returnedMoneyCalendar_first')
const returnedMoneyCalendar_second = r => require.ensure([], () => r(require('../page/returnedMoneyCalendar/returnedMoneyCalendar_second')), 'returnedMoneyCalendar_second')

const securityCenter = r => require.ensure([], () => r(require('../page/securityCenter/securityCenter')), 'securityCenter')
const idVerified = r => require.ensure([], () => r(require('../page/idVerified/idVerified')), 'idVerified')
const bankCard = r => require.ensure([], () => r(require('../page/bankCard/bankCard')), 'bankCard')
const replaceBankCard = r => require.ensure([], () => r(require('../page/replaceBankCard/replaceBankCard')), 'replaceBankCard')
const modifyDealPwd = r => require.ensure([], () => r(require('../page/modifyDealPwd/modifyDealPwd')), 'modifyDealPwd')
const modifyLogin = r => require.ensure([], () => r(require('../page/modifyLogin/modifyLogin')), 'modifyLogin')
const modifyBankPhone = r => require.ensure([], () => r(require('../page/modifyBankPhone/modifyBankPhone')), 'modifyBankPhone')
const bindNewPhone = r => require.ensure([], () => r(require('../page/bindNewPhone/bindNewPhone')), 'bindNewPhone')
const bindNewPhoneSecond = r => require.ensure([], () => r(require('../page/bindNewPhoneSecond/bindNewPhoneSecond')), 'bindNewPhoneSecond')
const automaticBid = r => require.ensure([], () => r(require('../page/automaticBid/automaticBid')), 'automaticBid')
const automaticBidrules = r => require.ensure([], () => r(require('../page/automaticBidrules/automaticBidrules')), 'automaticBidrules')
const register = r => require.ensure([], () => r(require('../page/register/register')), 'register')
const registerPrize = r => require.ensure([], () => r(require('../page/registerPrize/registerPrize')), 'registerPrize')
const registerSuccess = r => require.ensure([], () => r(require('../page/registerSuccess/registerSuccess')), 'registerSuccess')
const myTender = r => require.ensure([], () => r(require('../page/myTender/myTender')), 'myTender')
const myTenderDetail = r => require.ensure([], () => r(require('../page/myTenderDetail/myTenderDetail')), 'myTenderDetail')
const loanAgreement = r => require.ensure([], () => r(require('../page/Agreement/loanAgreement')), 'loanAgreement')

const regitsterAgreement = r => require.ensure([], () => r(require('../page/Agreement/regitsterAgreement')), 'regitsterAgreement')

const IntermediaryServiceAgreement = r => require.ensure([], () => r(require('../page/Agreement/IntermediaryServiceAgreement')), 'IntermediaryServiceAgreement')

const riskDisclosure = r => require.ensure([], () => r(require('../page/Agreement/riskDisclosure')), 'riskDisclosure')

const electronicSealAuthorizationAgreement = r => require.ensure([], () => r(require('../page/Agreement/electronicSealAuthorizationAgreement')), 'electronicSealAuthorizationAgreement')
const ZSBentrust = r => require.ensure([], () => r(require('../page/Agreement/ZSBentrust')), 'ZSBentrust')

const ZSBdeposit = r => require.ensure([], () => r(require('../page/Agreement/ZSBdeposit')), 'ZSBdeposit')
const debtAssignmentAgreement = r => require.ensure([], () => r(require('../page/Agreement/debtAssignmentAgreement')), 'debtAssignmentAgreement')
const autoInvestAgreement = r => require.ensure([], () => r(require('../page/Agreement/autoInvestAgreement')), 'autoInvestAgreement')





















const notFound = r => require.ensure([], () => r(require('../staticPage/404/404.vue')), 'notFound')

const infoDisclosureIndex = r => require.ensure([], () => r(require('../page/infoDisclosure/infoDisclosure_index')), 'infoDisclosureIndex')
const organizationInfo = r => require.ensure([], () => r(require('../page/infoDisclosure/infoDisclosure_organizationInfo')), 'organizationInfo')
const MPrecordInfo = r => require.ensure([], () => r(require('../page/infoDisclosure/infoDisclosure_MPrecordInfo')), 'MPrecordInfo')
const confirmInformation = r => require.ensure([], () => r(require('../page/infoDisclosure/infoDisclosure_confirmInformation')), 'confirmInformation')
const auditInformation = r => require.ensure([], () => r(require('../page/infoDisclosure/infoDisclosure_auditInformation')), 'auditInformation')
const partners = r => require.ensure([], () => r(require('../page/infoDisclosure/infoDisclosure_partners')), 'partners')
const operationalData = r => require.ensure([], () => r(require('../page/infoDisclosure/infoDisclosure_operationalData')), 'operationalData')
const runReports = r => require.ensure([], () => r(require('../page/infoDisclosure/infoDisclosure_operationalData_runReports')), 'runReports')
const runData = r => require.ensure([], () => r(require('../page/infoDisclosure/infoDisclosure_operationalData_runData')), 'runData')
const charges = r => require.ensure([], () => r(require('../page/infoDisclosure/infoDisclosure_operationalData_charges')), 'charges')
const riskTips = r => require.ensure([], () => r(require('../page/infoDisclosure/infoDisclosure_riskTips')), 'riskTips')
const riskManagement = r => require.ensure([], () => r(require('../page/infoDisclosure/infoDisclosure_riskManagement')), 'riskManagement')
const bankDepository = r => require.ensure([], () => r(require('../page/infoDisclosure/infoDisclosure_riskManagement_bankDepository')), 'bankDepository')
const risk = r => require.ensure([], () => r(require('../page/infoDisclosure/infoDisclosure_riskManagement_risk')), 'risk')
const ESignature = r => require.ensure([], () => r(require('../page/infoDisclosure/infoDisclosure_riskManagement_ESignature')), 'ESignature')
const onlineService = r => require.ensure([], () => r(require('../page/onlineService/onlineService')), 'onlineService')
const message = r => require.ensure([], () => r(require('../page/message/message')), 'message')
const messageDetial = r => require.ensure([], () => r(require('../page/message/messageDetial')), 'messageDetial')
const putonPage = r => require.ensure([], () => r(require('../page/putonPage/putonPage')), 'putonPage')

const find = r => require.ensure([], () => r(require('../page/find/find')), 'find')
const find_newAct = r => require.ensure([], () => r(require('../page/find/find_newAct')), 'find_newAct')
const find_aboutUs = r => require.ensure([], () => r(require('../page/find/find_aboutUs')), 'find_aboutUs')





export default [
    //地址为空时跳转home页面
    {
      path: '',
      redirect: '/home'
    },
    // 首页
    {
      path: '/',
      component: home
    },
    // 首页
    {
      path: '/home',
      component: home
    },

    //投标
    {
      path: '/invest',
      component: invest
    },
    //投标详情页
    {
      name:'investDetail',
      path: '/investDetail',
      component: investDetail,
      // meta: { keepAlive: true },
    },
    //投标详情交易页面
    {
      name:'investDetailTransaction',
      path: '/investDetailTransaction',
      component: investDetailTransaction,
      meta: { keepAlive: true },
    },
    //投标详情交易选择红包奖励券页面
    {
      name:'seleRewardList',
      path: '/seleRewardList',
      component: seleRewardList,
    },
    //投标详情交易成功页面
    {
      name:'investDetailTransactionSucess',
      path: '/investDetailTransactionSucess',
      component: investDetailTransactionSucess,
    },
    //个人账户
    {
      name: 'account',
      path: '/account',
      component: account
    },
    {
      path: '/account/:token/:userId',
      component: account
    },



    //我的资产
    {
      path: '/myAssets',
      component: myAssets
    },
    //提现1
    {
      path: '/withdrawCash',
      component: withdrawCash
    },
    //提现2
    {
      path: '/withdraw',
      component: withdraw
    },
    //提现记录
    {
      path: '/withdrawCashRecord',
      component: withdrawCashRecord
    },
    //充值
    {
      path: '/recharge',
      component: recharge
    },
    //快捷充值第二步
    {
      path: '/rechargeFast',
      component: rechargeFast
    },
    //银行卡限额
    {
      path: '/bankCardQuota',
      component: bankCardQuota
    },
    //新闻
    {
      path: '/news',
      component: news
    },
    //投标记录
    {
      path: '/tenderRecord',
      component: tenderRecord
    },
    //项目详情
    {
      path: '/projectDetails',
      component: projectDetails
    },
    //投标人信息
    {
      path: '/BorrowerinfoAndRiskManage',
      component: BorrowerinfoAndRiskManage
    },
    //风险管理
    {
      path: '/riskManage',
      component: riskManage
    },
    //常见问题
    {
      path: '/commonProblem',
      component: commonProblem
    },
    //风险提示书
    {
      name:'riskWarning',
      path: '/riskWarning',
      component: riskWarning
    },
    //登录
    {
      path: '/login',
      component: login
    },
    //忘记密码
    {
      path: '/changePwd',
      component: changePwd
    },
    //注册
    {
      name:'register',
      path: '/register',
      component: register,
      meta: { keepAlive: true },
    },
    //注册
    {
      name:'registerPrize',
      path: '/registerPrize',
      component: registerPrize,
      meta: { keepAlive: true },
    },
    //注册成功着陆页
    {
      path: '/registerSuccess',
      component: registerSuccess
    },
    //交易明细
    {
      path: '/transactionDetails',
      component: transactionDetails
    },
    //我的投标
    {
      path: '/myTender',
      component: myTender
    },
    //我的投标详情
    {
      path: '/myTenderDetail',
      component: myTenderDetail
    },
    //邀请好友
    {
      path: '/inviteFriends',
      component: inviteFriends
    },
    //邀请好友 banner页面
    {
      path: '/InviteFriendsToGifts',
      component: InviteFriendsToGifts
    },
    //我的好友
    {
      path: '/myFriends',
      component: myFriends
    },
    //返佣明细
    {
      path: '/rebatesDetails',
      component: rebatesDetails
    },
    //返佣排行
    {
      path: '/rebatesRank',
      component: rebatesRank
    },
    //我的返利
    {
      path: '/myRebates',
      component: myRebates
    },
    //我的返利专题页
    {
      path: '/myRebatesBannerPage',
      component: myRebatesBannerPage
    },
    //我的福利
    {
      path: '/myWelfare',
      component: myWelfare
    },
    //奖励收益记录
    {
      path: '/rewardRecord',
      component: rewardRecord
    },
    //开通存管账户
    {
      name:'depositAccount',
      path: '/depositAccount',
      component: depositAccount,
      meta: { keepAlive: true },
    },
    //回款日程
    {
      path: '/returnedMoneyCalendar',
      component: returnedMoneyCalendar,
      children:[
        {
          path: '',
          component: returnedMoneyCalendar_first
        },
        {
          path: '/returnedMoneyCalendar/second',
          component: returnedMoneyCalendar_second         
        }
      ]
    },
    //安全中心
    {
      path: '/securityCenter',
      component: securityCenter
    },
    //实名认证
    {
      path: '/idVerified',
      component: idVerified
    },
    //银行卡
    {
      path: '/bankCard',
      component: bankCard
    },
    //更换银行卡
    {
      path: '/replaceBankCard',
      component: replaceBankCard
    },
    //修改交易密码
    {
      path: '/modifyDealPwd',
      component: modifyDealPwd
    },
    //修改登录密码
    {
      path: '/modifyLogin',
      component: modifyLogin
    },
    //修改银行预留手机号
    {
      path: '/modifyBankPhone',
      component: modifyBankPhone
    },
    //绑定新手机
    {
      path: '/bindNewPhone',
      component: bindNewPhone
    },
    //绑定新手机
    {
      path: '/bindNewPhoneSecond',
      component: bindNewPhoneSecond
    },
    //自动投标
    {
      name:'automaticBid',
      path: '/automaticBid',
      component: automaticBid
    },
    //自动投标规则说明
    {
      name:'automaticBidrules',
      path: '/automaticBidrules',
      component: automaticBidrules
    },
    // 信息披露首页
    {
      path: '/infoDisclosure',
      redirect: 'infoDisclosure/organizationInfo',
      component: infoDisclosureIndex,
      children: [
        // 组织信息
        {
          path: 'organizationInfo',
          component: organizationInfo
        },
         // 备案信息
        {
          path: 'MPrecordInfo',
          component: MPrecordInfo
        },
        // 审核信息
        {
          path: 'auditInformation',
          component: auditInformation
        },

        // 信披确认函
        {
          path: 'confirmInformation',
          component: confirmInformation
        },
        // 合作机构
        {
          path: 'partners',
          component: partners
        },
        // 运营信息
        {
          path: 'operationalData',
          component: operationalData,
          children: [
            {
              path: 'runReports',
              component: runReports,
            },
            {
              path: 'runData',
              component: runData,

            },
            {
              path: 'charges',
              component: charges,
            },
          ]
        },
        // 风险提示
        {
          path: 'riskTips',
          component: riskTips
        },
        // 风险管理
        {
          path: 'riskManagement',
          component: riskManagement,
          children: [
            {
              path: 'risk',
              component: risk
            },
            {
              path: 'bankDepository',
              component: bankDepository
            },
            {
              path: 'ESignature',
              component: ESignature
            }

          ]
        },
      ]

    },
    // 《借款协议》
    {
      name:'loanAgreement',
      path: '/Agreement/loanAgreement',
      component: loanAgreement
    },
    // 联金所注册协议
    {
      name:'regitsterAgreement',
      path: '/Agreement/regitsterAgreement',
      component: regitsterAgreement
    },
    // 债权转让协议
    {
      name:'debtAssignmentAgreement',
      path: '/Agreement/debtAssignmentAgreement',
      component: debtAssignmentAgreement
    },

    // 居间服务协议
    {
      name:'IntermediaryServiceAgreement',
      path: '/Agreement/IntermediaryServiceAgreement',
      component: IntermediaryServiceAgreement
    },
    // 风险揭示书
    {
      name:'riskDisclosure',
      path: '/Agreement/riskDisclosure',
      component: riskDisclosure
    },
    // 电子签章授权书
    {
      path: '/Agreement/electronicSealAuthorizationAgreement',
      component: electronicSealAuthorizationAgreement
    },
    // 浙商银行委托扣款业务服务协议
    {
      name:'ZSBentrust',
      path: '/Agreement/ZSBentrust',
      component: ZSBentrust
    },
    {
      name:'ZSBdeposit',
      path: '/Agreement/ZSBdeposit',
      component: ZSBdeposit
    },

    // 自动投标协议
    {
      name: 'autoInvestAgreement',
      path: '/Agreement/autoInvestAgreement',
      component: autoInvestAgreement
    },


    // 在线客服
    {
      path: '/onlineService',
      component: onlineService
    },
    // 消息
    {
      name: 'message',
      path: '/message',
      component: message,
      meta: {
        keepAlive: true
      },

    },
    {
      name: 'messageDetial',
      path: '/messageDetial/:id',
      component: messageDetial
    },


    // 模拟的普通版页面
    {
      path: '/putonPage',
      component: putonPage
    },


   /** 发现 **/
   // 发现首页
    {
      path: '/find',
      component: find
    },
  // 最新活动
    {
      path: '/find_newAct',
      component: find_newAct
    },
  // 关于我们
    {
      path: '/find_aboutUs',
      component: find_aboutUs
    },
    
    
    {
      path: '*',
      component: notFound
    }
]
