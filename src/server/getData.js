import axios from 'axios'
import qs from 'qs'

import {
  baseUrl
} from '../config/env'

axios.defaults.withCredentials = true;
// 首页轮播
export const getIndexBanner = () => (axios.post(`${baseUrl}/wap/getIndexBanner`))
// 首页头部会员数据
export const headDate = () => (axios.post(`${baseUrl}/wap/headDate`))
// 首页新手标
export const indexNewHandInfo = () => (axios.post(`${baseUrl}/wap/indexNewHandInfo`))
// 首页个人专区车贷标
export const indexCheDaiInfo = () => (axios.post(`${baseUrl}/wap/indexCheDaiInfo`))
// 首页企业专区
export const indexLjqyInfo = () => (axios.post(`${baseUrl}/wap/indexLjqyInfo`))
// 首页散标
export const indexLjtcInfo = () => (axios.post(`${baseUrl}/wap/indexLjtcInfo`))
// 首页标集合
// export const wapIndexData = () => (axios.post(`${baseUrl}/wap/wapIndexData`))


// 首页推荐标
export const getRecommendBorrow = (token, userId) => (axios.post(`${baseUrl}/wap/getRecommendBorrow`, {
  userId },{ headers: { token }}
))


// 首页标的数据
export const indexBorrowDataInfo = () => (axios.post(`${baseUrl}/wap/indexBorrowDataInfo`))


// 投标列表 散标专区
export const gotoWapBorrowList = (pageSize, pageNum) => (axios.post(`${baseUrl}/wap/gotoWapBorrowList`, {
  pageSize, pageNum
}))
// 投标列表 个人专区
export const gotoWapCheDaiList = (pageSize, pageNum) => (axios.post(`${baseUrl}/wap/gotoWapCheDaiList`, {
  pageSize, pageNum
}))
// 投标列表 企业专区
export const wapLjqyList = (pageSize, pageNum) => (axios.post(`${baseUrl}/wap/wapLjqyList`, {
  pageSize, pageNum
}))
// 投标列表 转让专区
export const wapZrzqList = (pageSize, pageNum, orderType, deadlineFlag, auctionbasepriceFlag, paymentmode, paymentDay ) => (axios.post(`${baseUrl}/wap/wapZrzqList`, {
  pageSize, pageNum, orderType, deadlineFlag, auctionbasepriceFlag, paymentmode, paymentDay
}))
// 投标列表 新手专区
export const gotoWapNewHandList = (pageSize, pageNum) => (axios.post(`${baseUrl}/wap/gotoWapNewHandList`, {
  pageSize, pageNum
}))
// 投标列表 推荐
export const allWapBorrowList = (pageSize, pageNum, rate, period) => (axios.post(`${baseUrl}/wap/allWapBorrowList`, {
  pageSize, pageNum, rate, period
}))

// 登录
export const wapLogin = (userName, password, platForm) => (axios.post(`${baseUrl}/wap/login`,{
    userName, password, platForm
  }
))
// 注册 校验手机号
export const regCheckPhone = (phoneNum) => (axios.post(`${baseUrl}/wap/regCheckPhone`,{
  phoneNum
}))
// 注册 生成图形验证码
export const textCode = `${baseUrl}/wap/textCode`
// 注册 校验图形验证码
export const checkCode = (pageId, textCode) => (axios.post(`${baseUrl}/wap/checkCode`, {
  pageId, textCode
}))
// 获取凭证
export const tokenCode = (pageId, textCode) => (axios.post(`${baseUrl}/wap/tokenCode`))
// 注册 获取注册协议
export const querytipM = (pageId, textCode) => (axios.post(`${baseUrl}/wap/querytipM`))
// 修改手机号 修改交易密码 修改登录密码 更换银行卡 获取短信验证码
export const SendSMS = (token, userId, phone, send_type, pageId, imgCode) => (axios.post(`${baseUrl}/wap/SendSMS`, {
  userId, phone, send_type, pageId, imgCode
}, { headers: { token }}))
// 注册 忘记密码 获取短信验证码
// export const SendSMS2 = (phone, send_type, pageId, imgCode) => (axios.post(`${baseUrl}/wap/SendSMS2`, {
//   phone, send_type, pageId, imgCode
// }))
export const SendSMS2 = (phone, send_type, tokenCode) => (axios.post(`${baseUrl}/wap/SendSMS2`, {
  phone, send_type, tokenCode
}))
// 注册 保存用户
export const register = (code, mobile, password, platForm, refferee, send_type) => (axios.post(`${baseUrl}/wap/register`, {
  code, mobile, password, platForm, refferee, send_type
}))

// 忘记密码
export const forgetPassword = (cellPhone, password, code, send_type) => (axios.post(`${baseUrl}/wap/forgetPassword`, {
  cellPhone, password, code, send_type
}))


/* 获取标投标详情 */

// 获取散标投标详情
export const wapLjtcInvestDetail = (borrowId, userId, type) => (axios.post(`${baseUrl}/wap/wapLjtcInvestDetail`, {
  borrowId, userId, type
}))
// 获取个人投标详情
export const wapCheDaiInvestDetail = (borrowId, userId, type) => (axios.post(`${baseUrl}/wap/wapCheDaiInvestDetail`, {
  borrowId, userId, type
}))
// 获取企业投标详情
export const wapLjqyInvestDetail = (borrowId, userId, type) => (axios.post(`${baseUrl}/wap/wapLjqyInvestDetail`, {
  borrowId, userId, type
}))
// 获取转让投标详情
export const wapZrzqDetail = (zrId, userId) => (axios.post(`${baseUrl}/wap/wapZrzqDetail`, {
  zrId, userId
}))
// 获取新手投标详情
export const wapNewHandInvestDetail = (borrowId, userId, type) => (axios.post(`${baseUrl}/wap/wapNewHandInvestDetail`, {
  borrowId, userId, type
}))
// 散标/车贷/新手专区 投标记录
export const getInvestList = (pageSize, pageNum, borrowId, userId, token) => (axios.post(`${baseUrl}/wap/getInvestList`, {
  pageSize, pageNum, borrowId , userId
}, { headers: { token }}))
//  散标借款人详情 / 风险管理
export const wapLjtcBorrowerDetail = (borrowId, userId, token) => (axios.post(`${baseUrl}/wap/wapLjtcBorrowerDetail`, {
 borrowId , userId
}, { headers: { token }}))
//  新手/个人 借款人详情   -- 项目信息
export const wapChedaiProjectDetail = (borrowId, userId, token) => (axios.post(`${baseUrl}/wap/wapChedaiProjectDetail`, {
 borrowId , userId
}, { headers: { token }}))
//  企业 借款人详情   -- 项目信息
export const wapLjqyBorrowerDetail = (borrowId, userId, token) => (axios.post(`${baseUrl}/wap/wapLjqyBorrowerDetail`, {
 borrowId , userId
}, { headers: { token }}))
//  转让专区借款人详情   / 风险管理
export const wapZrzqBorrowerDetail = (borrowId, userId, debtId, token) => (axios.post(`${baseUrl}/wap/wapZrzqBorrowerDetail`, {
  borrowId, userId, debtId
}, { headers: { token }}))

// 收益计算
export const calcIncome = (borrowId, investAmt, investId) => (axios.post(`${baseUrl}/wap/calcIncome`, {
  borrowId, investAmt, investId
}))

//  电子签章
export const updateCaAuthorization = (userId, token) => (axios.post(`${baseUrl}/wap/updateCaAuthorization`, {userId,}, { headers: { token }}))


//  预期收益
export const getExpectEarningsAmt = (token, userId, borrowId, plusCouponId, investAmt) => (axios.post(`${baseUrl}/wap/getExpectEarningsAmt`, {
  userId, borrowId, plusCouponId, investAmt
}, { headers: { token }}))

//  资金存管投标非转让标
export const fundBlock = (token, userId, id, amount, wealType, couponId, redEnvelopId, awardMoney, platForm, callBackURL) => (axios.post(`${baseUrl}/wap/invest/fundBlock`, {
  userId, id, amount, wealType, couponId, redEnvelopId, awardMoney, platForm, callBackURL
}, { headers: { token }}))
//  资金存管投标非转让标查询
export const queryInvestResult = (token, userId, orderNo) => (axios.post(`${baseUrl}/wap/invest/queryInvestResult`, {
  userId, orderNo
}, { headers: { token }}))

//  资金存管投标转让标
export const debtTransfer = (token, userId, debtId, amount,  platForm) => (axios.post(`${baseUrl}/wap/transfer/debtTransfer`, {
  userId, debtId, amount,  platForm
}, { headers: { token }}))
//  资金存管投标转让标查询
export const queryTransferResult = (token, userId, orderNo) => (axios.post(`${baseUrl}/wap/transfer/queryTransferResult`, {
  userId, orderNo
}, { headers: { token }}))


/* 账户 */

// 获取用户信息
export const myHomeDate = (token, userId) => (axios.post(`${baseUrl}/wap/myHomeDate`, {userId}, { headers: { token } }
))

// 我的资产
export const histogram = (token, userId) => (axios.post(`${baseUrl}/wap/histogram`, {userId}, { headers: { token } }
))

// 我的资产收益统计表
export const wapMyProperty = (token, userId) => (axios.post(`${baseUrl}/wap/wapMyProperty`, {userId}, { headers: { token } }
))



/* 充值 */

// 刷新余额
export const queryCommonBalance = (token, userId) => (axios.post(`${baseUrl}/wap/balanceTransfer/queryCommonBalance`, {userId}, { headers: { token } }
))

// 全部转移
export const balanceTrransfer = (token, userId, amount, password,platForm) => (axios.post(`${baseUrl}/wap/balanceTransfer/balanceTrransfer`, {userId, amount, password,platForm}, { headers: { token } }
))

// 充值发送短信
export const requestSmsCodeJson = (token, userId, amount, smsType) => (axios.post(`${baseUrl}/wap/sms/requestSmsCode`, {userId, amount, smsType}, { headers: { token } }
))

// 充值
// export const deductPayRequest = (token, userId, amount, mobileCode) => (axios.post(`${baseUrl}/wap/recharge/deductPayRequest`, {userId, amount, mobileCode}, { headers: { token } }
// ))
export const deductPayRequest = (token, userId, amount, platForm,callBackURL) => (axios.post(`${baseUrl}/wap/recharge/deductPayRequest`, { userId, amount, platForm,callBackURL}, { headers: { token } }
))

export const queryTransRechargeResult = (token, userId, orderNo, platForm) => (axios.post(`${baseUrl}/wap/recharge/queryTransRechargeResult`, { userId, orderNo, platForm }, { headers: { token } }

))

/* 提现 */

// 提现记录
export const queryWithdrawList = (token, userId, curPage, pageSize) => (axios.post(`${baseUrl}/wap/queryWithdrawList`, {userId, curPage, pageSize}, { headers: { token } }
))

// 提现
export const withdrawRequest = (token, userId, amount,platForm, callBackURL) => (axios.post(`${baseUrl}/wap/withdrawRequest`, {userId, amount, platForm, callBackURL}, { headers: { token } }
))

// 提现查询
export const queryTransWithdrawResult = (token, userId, orderNo, platForm) => (axios.post(`${baseUrl}/wap/queryTransWithdrawResult`, {userId, orderNo, platForm}, { headers: { token } }
))


// 存管开户
export const openDepositAcco = (token, userId, accountName, idNo, mobile, callBackURL, platForm) => (axios.post(`${baseUrl}/wap/openAcco/openDepositAcco`, {userId, accountName, idNo, mobile, callBackURL, platForm}, { headers: { token } }
))

// 查询存管开户
export const queryDepositAcco = (token, userId, orderNo) => (axios.post(`${baseUrl}/wap/openAcco/queryDepositAcco`, {userId, orderNo}, { headers: { token } }
))



/* 我的投标 */
// 投标列表
export const newMyInvestList = (token, status, investType, pageNum, pageSize, userId) => (axios.post(`${baseUrl}/wap/newMyInvestList`,{
  status, investType, pageNum, pageSize, userId
},{ headers: { token }}))
// 转让请求
export const zrDebt = (userId, token, investPWD, discountDebtAmt, investId, discountRate, debtSum, smsCode, cellPhone) => (axios.post(`${baseUrl}/wap/zrDebt`, {
  userId,
  investPWD,
  discountDebtAmt,
  investId,
  discountRate,
  debtSum,
  smsCode,
  cellPhone
}, {
  headers: {
    token
  }
}))
// 转让限制10条
export const checkDebtSize = (userId, token, ) => (axios.post(`${baseUrl}/wap/checkDebtSize`, {
  userId
}, {
  headers: {
    token
  }
}))


// 撤销转让
export const cancelZRDebt = (userId, token, debtId) => (axios.post(`${baseUrl}/wap/cancelZRDebt`, {
  userId,
  debtId
}, {
  headers: {
    token

  }
}))


// 我的投标详情 回款时期
export const investRepaymentDetails = (token, userId, prdCode, investCode, investId, status, pageNum, pageSize, debtId) => (axios.post(`${baseUrl}/wap/investRepaymentDetails`,{
  userId, prdCode, investCode, investId, status, pageNum, pageSize, debtId
},{ headers: { token }}))

// 交易明细
export const newQueryFundrecord = (token, userId, tradeType, curPage) => (axios.post(`${baseUrl}/wap/newQueryFundrecord`,{
  userId, tradeType, curPage
},{ headers: { token }}))

/* 回款日历 */
export const queryPayDateAmtDetails = (token, userId, dateStr) => (axios.post(`${baseUrl}/wap/queryPayDateAmtDetails`, {userId, dateStr}, { headers: { token } }))

export const queryMonthPayDateAmtSum = (token, userId, dateMonth) => (axios.post(`${baseUrl}/wap/queryMonthPayDateAmtSum`, {userId,dateMonth}, {headers: {token}}))

export const queryInvestAmountInfo = (token, userId, dateStr, dateEnd, pageNum, pageSize) => (axios.post(`${baseUrl}/wap/queryInvestAmountInfo`, { userId, dateStr, dateEnd, pageNum, pageSize}, {headers: {token}}))

// 指定某日的回款数据
export const queryDayInvestAmountInfo = (token, userId, date) => (axios.post(`${baseUrl}/wap/queryDayInvestAmountInfo`, {
  userId,
  date
}, {
  headers: {
    token
  }
}))



// 邀请好友初始化
export const inviteFriendInit = (token, userId) => (axios.post(`${baseUrl}/wap/inviteFriendInit`,{
  userId
},{ headers: { token }}))

// 邀请记录--好友列表
export const queryFriendNewList = (token, userId, pageNum, pageSize) => (axios.post(`${baseUrl}/wap/queryFriendNewList`,{
  userId, pageNum, pageSize
},{ headers: { token }}))

// 邀请记录--返佣记录
export const queryCommissionNewList = (token, userId, pageNum, pageSize) => (axios.post(`${baseUrl}/wap/queryCommissionNewList`,{
  userId, pageNum, pageSize
},{ headers: { token }}))

// 返佣排行
export const queryCommissionNewRankList = (token, userId, dateType, pageNum, pageSize) => (axios.post(`${baseUrl}/wap/queryCommissionNewRankList`,{
  userId, dateType, pageNum, pageSize
},{ headers: { token }}))

// 我的返利
export const myMemberBonus = (token, userId, pageNum, pageSize) => (axios.post(`${baseUrl}/wap/myMemberBonus`,{
  userId, pageNum, pageSize
},{ headers: { token }}))

/* 信息披露 */

// 获取运营数据
export const getOperationalData = () => (axios.post(`${baseUrl}/wap/xxplOperationalData`, {
}, {
  headers: {

  }
}))
// 运营报告列表
export const getReportListShow = () => (axios.post(`${baseUrl}/wap/reportListShow`, {}, {

  headers: {

  }
}))

/* 我的福利 */

// 红包 取消了懒加载
export const queryRedEnvelopeList = (token, userId, pageNum, pageSize) => (axios.post(`${baseUrl}/wap/queryRedEnvelopeList`,{
  userId
},{ headers: { token }}))

// 奖励券 取消了懒加载
export const queryCouponNewList = (token, userId, pageNum, pageSize) => (axios.post(`${baseUrl}/wap/queryCouponNewList`,{
  userId
},{ headers: { token }}))

// 收益奖励记录
export const queryUserPlusIncomeList = (token, userId, pageNum, pageSize) => (axios.post(`${baseUrl}/wap/queryUserPlusIncomeList`,{
  userId, pageNum, pageSize
},{ headers: { token }}))

// 领取现金红包
export const redEnvelopeCashBack = (token, userId, redId) => (axios.post(`${baseUrl}/wap/redEnvelopeCashBack`,{
  userId, redId
},{ headers: { token }}))


/* 安全中心 */

// 获取存管用户信息
export const depositAccoutInfo = (token, userId) => (axios.post(`${baseUrl}/wap/depositAccoutInfo`, {
  userId
}, { headers: { token } }))

// 所有银行
export const getBankList = (token, userId) => (axios.post(`${baseUrl}/wap/subBranch/bankList`))
// 获取所有省份
export const provinceList = (token, userId) => (axios.post(`${baseUrl}/wap/subBranch/provinceList`))
// 获取省下所有市
export const cityList = ( proNo ) => (axios.post(`${baseUrl}/wap/subBranch/cityList`,{
  proNo
}))
// 获取开户支行
export const pubBankList = ( bankNo,  cityNo ) => (axios.post(`${baseUrl}/wap/subBranch/pubBankList`,{
  bankNo,  cityNo
}))
// 发送验证码  投标发送验证码（未开通自动投标）
export const requestSmsCode = (token, userId, smsType, mobile, otherAccNo, bindSerialNo) => (axios.post(`${baseUrl}/wap/sms/requestSmsCode`, {
  userId, smsType, mobile, otherAccNo, bindSerialNo
}, { headers: { token } }))

// 更换银行卡
export const updateAccno = (token,userId,orderNo,otherAccno, bankCode, provinceId, cityId, bankName, branchName, branchNo,callBackURL) => (axios.post(`${baseUrl}/wap/updateAccno`, {
  userId, orderNo, otherAccno, bankCode, provinceId, cityId, bankName, branchName, branchNo,callBackURL
}, { headers: { token } }))
// 更换银行卡查询
export const updateAccnoStatus = (token,userId,orderNo) => (axios.post(`${baseUrl}/wap/updateAccnoStatus`, {
  userId, orderNo
}, { headers: { token } }))

// 同步银行卡
export const sync = (token, userId) => (axios.post(`${baseUrl}/wap/sync`, {
  userId
}, { headers: { token } }))

// 修改手机第一步
export const updateCellphoneFirst = (token, userId, cellphone, send_type, checkCode) => (axios.post(`${baseUrl}/wap/updateCellphoneFirst`, {
  userId, cellphone, send_type, checkCode
}, { headers: { token } }))

// 修改手机第二步
export const updateCellphoneSecond = (token, userId, cellphone, send_type, checkCode) => (axios.post(`${baseUrl}/wap/updateCellphoneSecond`, {
  userId, cellphone, send_type, checkCode
}, { headers: { token } }))

// 设置交易密码浙商
export const DepositResetPwd = (token, userId, callBackURL) => (axios.post(`${baseUrl}/wap/pwdReset/DepositResetPwd`, {
  userId, callBackURL
}, { headers: { token } }))
// 设置交易密码浙商查询
export const queryResetPwdStatus = (token, userId, orderNo) => (axios.post(`${baseUrl}/wap/pwdReset/queryResetPwdStatus`, {
  userId, orderNo
}, { headers: { token } }))

// 设置交易密码
export const setNewDealPasswordByPhoneNew = (token, userId, cellphone, send_type, checkCode, newPassword) => (axios.post(`${baseUrl}/wap/setNewDealPasswordByPhoneNew`, {
  userId, cellphone, send_type, checkCode, newPassword
}, { headers: { token } }))

// 设置登录密码
export const setNewPasswordByPhone = (token, userId, cellphone, send_type, checkCode, newPassword) => (axios.post(`${baseUrl}/wap/setNewPasswordByPhone`, {
  userId, cellphone, send_type, checkCode, newPassword
}, { headers: { token } }))

// 修改银行预留手机号
export const updateBankMobile = (token, userId, oriMobile, newMobile, platForm, callBackURL) => (axios.post(`${baseUrl}/wap/updateBankMobile`, {
  userId, oriMobile, newMobile, platForm, callBackURL
}, { headers: { token } }))
// 修改银行预留手机号查询
export const queryModifyBankMobile = (token, userId, orderNo, platForm) => (axios.post(`${baseUrl}/wap/queryModifyBankMobile`, {
  userId, orderNo, platForm
}, { headers: { token } }))

/* 自动投标 */
// 自动投标设置
export const autoBidSet = (token, userId, callBackURL, flag) => (axios.post(`${baseUrl}/wap/autoBidSet/autoBidSet`,{ userId, callBackURL, flag},{headers: { token }}))
// 自动投标授权查询
export const queryUserBidSetStatus = (token, userId, orderNo) => (axios.post(`${baseUrl}/wap/autoBidSet/queryUserBidSetStatus`,{ userId, orderNo},{headers: { token }}))
// 获取自动投标的产品
export const getAutoInvestPrdList = (token, userId) => (axios.post(`${baseUrl}/wap/getAutoInvestPrdList`,{ userId },{headers: { token }}))
// 保存用户的自动投标设置
export const saveAutoInvest = (token, userId, investSettingMax, investSettingMin, investSettingMonthRate, id) => (axios.post(`${baseUrl}/wap/saveAutoInvest`,{ userId, investSettingMax, investSettingMin, investSettingMonthRate, id},{headers: { token }}))
// 获取用户的自动投标
export const getAutoInvestList = (token, userId ) => (axios.post(`${baseUrl}/wap/getAutoInvestList`,{ userId },{headers: { token }}))
// 删除自动投标
export const delAutoInvest = (token, userId, id ) => (axios.post(`${baseUrl}/wap/delAutoInvest`,{ userId, id },{headers: { token }}))
// 修改自动投标的状态
export const updateAutoInvestStatus = (token, userId, id, status ) => (axios.post(`${baseUrl}/wap/updateAutoInvestStatus`,{ userId, id, status },{headers: { token }}))
// 获取是否能够添加自动投标
export const getAutoInvestInfo = (token, userId ) => (axios.post(`${baseUrl}/wap/getAutoInvestInfo`,{ userId },{headers: { token }}))
// 获取自动投标信息
export const getAutoInvest = (token, userId, id ) => (axios.post(`${baseUrl}/wap/getAutoInvest`,{ userId, id },{headers: { token }}))

/* 在线客服 */
// 问答类型
export const onlineServiceInit = (token, userId) => (axios.post(`${baseUrl}/wap/onlineServiceInit`, {
  userId,
}, {
  headers: {
    token
  }
}))
// 问答列表
export const onlineServiceList = (token, userId, questionType) => (axios.post(`${baseUrl}/wap/onlineServiceList`, {
  userId,
  questionType
}, {
  headers: {
    token
  }
}))
// 获取小能客服的参数
export const getXiaoNeng = (token, userId) => (axios.post(`${baseUrl}/wap/xiaoNeng`, {
  userId,
}, {
  headers: {
    token
  }
}))


/* 消息 */
// 首页公告 最新的消息id
export const queryLatestNews = (userId, token ) => (axios.post(`${baseUrl}/wap/queryLatestNews`, {
  userId
}, {
  headers: {
    token
  }
}))


// 消息公告列表
export const queryNewsList = ( pageNum, pageSize) => (axios.post(`${baseUrl}/wap/queryNewsList`, {
  pageNum,
  pageSize
}, {
  headers: {

  }
}))



// 消息公告详情
export const frontNewsDetails = ( newId) => (axios.post(`${baseUrl}/wap/frontNewsDetails`, {
  newId
}, {
  headers: {

  }
}))





// 借款协议
export const showWapBorrowProtocol = (token, userId) => (axios.post(`${baseUrl}/wap/showWapBorrowProtocol`, {
  userId
}, {
  headers: {
    token
  }
}))
// 债权转让协议
export const wapDebtProtocol = (token, userId, borrowId) => (axios.post(`${baseUrl}/wap/wapDebtProtocol`, {
  userId,
  borrowId
}, {
  headers: {
    token
  }
}))
// 自动投标协议
export const getAutoDelegation = ( userId, token) => (axios.post(`${baseUrl}/wap/getAutoDelegation`, {
  userId
}, {
  headers: {
  }
}))



/**
 * 发现页面
 */
// 获取最新活动的id
export const queryLatestEvent = (token, userId) => (axios.post(`${baseUrl}/wap/queryLatestEvent`, {
  userId
}, {
  headers: {
    token
  }
}))
// 获取活动列表
export const latestEventInit = (token, userId) => (axios.post(`${baseUrl}/wap/latestEventInit`, {
  userId
}, {
  headers: {
    token
  }
}))
// 联金论坛
export const bbsWapLogin = (userId ) => (axios.post(`${baseUrl}/wap/bbsWapLogin`, {
  userId,
}, {
    headers: {
    }
  }))


// 退出
export const wapExit = (userId, token) => (axios.post(`${baseUrl}/wap/logout`))

// 切换到普通版 的请求
export const ssoLogin = (userId, token) => (axios.post(`${baseUrl}/wap/ssoLogin`, {
  userId
}, {
  headers: {
    token
  }
}))









