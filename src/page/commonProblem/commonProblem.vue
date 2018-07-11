<template>
  <div class="commonProblem">
    <mheader headTitle='常见问题' :goBack="'true'"></mheader>
    <div class="problem">
      <!-- 新手标 -->
      <div v-if="$route.query.subjectType==6" v-for="(item,index) in newHandList" :key="index"> 
        <ul  @click='showLi=index'>
          <li class="borderBottom-1px" >{{item.q}}</li>
            <li v-if='index==showLi'>{{item.a}}<span></span></li>
        </ul>
      </div>
      <!-- 个人标 -->
      <div v-if="$route.query.subjectType==5" v-for="(item,index) in personalList" :key="index"> 
        <ul  @click='showLi=index'>
          <li class="borderBottom-1px" >{{item.q}}</li>
            <li v-if='index==showLi'>{{item.a}}<span></span></li>
        </ul>
      </div>
      <!-- 企业标 -->
      <div v-if="$route.query.subjectType==7" v-for="(item,index) in BusinessList" :key="index"> 
        <ul  @click='showLi=index'>
          <li class="borderBottom-1px" >{{item.q}}</li>
            <li v-if='index==showLi'>{{item.a}}<span></span></li>
        </ul>
      </div>
      <!-- 转让标 -->
      <div v-if="$route.query.subjectType==4" v-for="(item,index) in transferList" :key="index"> 
        <ul  @click='showLi=index'>
          <li class="borderBottom-1px" >{{item.q}}</li>
            <li v-if='index==showLi'>{{item.a}}<span></span></li>
        </ul>
      </div>
      <!-- 散标 -->
      <div v-if="$route.query.subjectType==3" v-for="(item,index) in ScatteredList" :key="index"> 
        <ul  @click='showLi=index'>
          <li class="borderBottom-1px" >{{item.q}}</li>
            <li v-if='index==showLi'>{{item.a}}<span></span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import mheader from '@/components/header/header.vue'

export default {
  data(){
    return {
      showLi:'0',
      newHandList:[ //新手标
        {
          q:'Q :投新手标有何要求？',
          a:'新注册的用户新手标额度为20000元，投标有效期为30天。投新手标需满足加入金额100元起，且为10元的整数倍递增。'
        },
        {
          q:'Q :新手标的还款方式是什么？',
          a:'新手标采用按月付息，到期还本和一次性还本付息的还款方式。在投标期内，每月对应日偿还相应的还款。实际本息金额请参看还款计算器。'
        },
        {
          q:'Q :新手标什么时候开始计息？',
          a:'工作日当天满标，约1~2个工作日计息。'
        },
        {
          q:'Q :投新手标能转让吗？',
          a:'新手标不可以转让。'
        },
        {
          q:'Q :如何查看新手标的借款协议？',
          a:'点开"新手专享"投标按钮，在投标界面右上角即有《借款协议》，点击即可进行查看。'
        }
      ],
      personalList:[ //个人标
        {
          q:'Q :投个人专区借款项目有何要求？',
          a:'投个人专区需满足加入金额100元起，且为10元的整数倍递增。'
        },
        {
          q:'Q :个人专区的还款方式是什么？',
          a:'个人专区采用按月付息，到期还本和等额本息的还款方式。在投标期内，每月对应日偿还相应的还款。实际本息金额请参看还款计算器。 '
        },
        {
          q:'Q :个人标什么时候开始计息？ ',
          a:'工作日当天满标，约1~2个工作日计息。'
        },
        {
          q:'Q :投个人专区能转让吗？ ',
          a:'6月以内期限的产品不可转让；12月及以上期限的产品有加“可转”标志的在持有6个月后可转让，未加“可转”标志的不可转让。 '
        },
        {
          q:'Q :转让个人专区需要收取什么费用？ ',
          a:'不收费。 '
        },
        {
          q:'Q :如何查看个人专区的借款协议？',
          a:'点开"个人专区"投标按钮，在投标界面右上角即有《借款协议》，点击即可进行查看。 '
        },
      ],
      BusinessList:[ //企业标
        {
          q:'Q :投企业专区借款项目有何要求？',
          a:'投企业专区需满足加入金额100元起，且为10元的整数倍递增 '
        },
        {
          q:'Q :企业专区的还款方式是什么？',
          a:'企业专区采用一次性还本付息、按月付息，到期还本和等额本息的还款方式。在投标期内，每月对应日偿还相应的还款。实际本息金额请参看还款计算器。 '
        },
        {
          q:'Q :企业专区什么时候开始计息？ ',
          a:'工作日当天满标，约1~2个工作日计息。'
        },
        {
          q:'Q :投企业专区能转让吗？ ',
          a:'6月以内期限的产品不可转让；12月及以上期限的产品有加“可转”标志的在持有6个月后可转让，未加“可转”标志的不可转让。 '
        },
        {
          q:'Q :转让企业专区需要收取什么费用？ ',
          a:'不收费。 '
        },
        {
          q:'Q :如何查看企业专区的借款协议？ ',
          a:'点开"企业专区"投标按钮，在投标界面右上角即有《借款协议》，点击即可进行查看。'
        },
      ],
      transferList:[ //转让标
        {
          q:'什么是转让专区？ ',
          a:'转让专区是联金所平台为提高投标人资金流动性，针对随时转让的产品设立的属于投标人与投标人间的债权交易专区。 当您需要流动资金时，可通过转让专区发布您名下拥有的符合转让条件的债权信息，将债权转让给其他的投标人，并与受让人签订债权转让协议，收回本金及利息。 '
        },
        {
          q:'Q :转让专区的产品从何而来？',
          a:'转让专区的债权信息均为投标人自由发布，转让的债权金额等于转让的债权本金部分加上对应本金部分当月的应收利息。基础债权符合随时转让的产品规则。 联金所平台的借款项目均通过赫美微贷信贷工厂8道风控审核，单笔均值5万元以下，小额分散。 '
        },
        {
          q:'Q :购买转让标什么时候开始计息？',
          a:'购买成功即刻计息。'
        },
        {
          q:'Q :一般多久可以转让成功？ ',
          a:'债权转让速度取决于剩余期限、转让金额、打折力度等多方面因素，受欢迎的转让项目往往出现发布即秒的情况。温馨提示：转让时设置一定的打折奖励有助于提高您的成交速度。'
        }
      ],
      ScatteredList:[ //散标
        {
          q:'Q :投散标专区借款项目有何要求？ ',
          a:'投散标专区需满足加入金额100元起，且为10元的整数倍递增。'
        },
        {
          q:'Q :散标专区的还款方式是什么？ ',
          a:'散标专区采用等额本息的还款方式。在投标期内，每月对应日偿还同等数额的还款。实际本息金额请参看还款计算器。'
        },
        {
          q:'Q :散标什么时候开始计息？ ',
          a:'工作日下午4点前满标，可当天计息；下午4点以后满标，则次工作日计息。（周末与节假日不放款）'
        },
        {
          q:'Q :散标专区有哪些优势？ ',
          a:'散标专区年化收益高达12.8%，支持随时转让，高收益的同时兼顾您期限的灵活性。等额本息的还款方式，保证每月本金和利息的返回，投标人可自主选择继续投标或提现使用，回款资金使用更自由。'
        },
        {
          q:'Q :投散标专区有哪些风险管理措施? ',
          a:'项目优质： 投标标的小额分散，单笔均值5万元以下，通过赫美微贷信贷工厂8道风控审核。 资金安全： 1、平台不经手客户资金，客户充值、投标和提现全部由浙商银行进行资金结算； 2、浙商银行对平台的每笔交易资金进行严格监管，提现、转划均由“非人工干预”的系统实现，通过技术手段和操作规程为您的资金安全保驾护航； 3、若借款人出现还款违约，合作机构有权受让债权。 '
        },
        {
          q:'Q :转让散标专区需要收取什么费用？ ',
          a:'不收费。 '
        },
        {
          q:'Q :如何查看散标专区的借款协议？ ',
          a:'点开"散标专区"投标按钮，在投标界面右上角即有《借款协议》，点击即可进行查看。'
        },
      ],
    }
  },
  components: {
    mheader
  }
}

</script>

<style lang="less" scoped>
.commonProblem {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing:border-box; 
  background: #f4f4f4;
  padding-top: 0.8rem;
  padding-bottom: 0.4rem;
  .problem{
    margin-top: 0.2rem;
    >div>ul{
      font-size: 0.2rem;
      background: #fff;
      li {
        padding: 0.35rem 0.2rem;
      }
      li:nth-child(2){
        position: relative;
        background: #f4f4f4;
        line-height: 0.3rem;
        color: #999;
        span {
          position: absolute;
          top: -0.2rem;
          left: 0.9rem;
          width: 0.3rem;
          height: 0.18rem;
          background: url('./sanjiao.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  } 
}
</style>