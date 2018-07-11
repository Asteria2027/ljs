<template>
          <!-- 电子签名授权书 -->
  <div class="agreement">
      <mheader :headTitle = "'电子签名授权书'" :goBack="'true'" class="borderBottom-1px"></mheader>
      <div class="agreement_title">
          电子签名授权书
      </div>
        <div class="agreement_con">
          <p>为响应监管要求，提升合规水平，深圳前海联金所金融信息服务有限公司（下称“联金所平台”）已正式上线电子签名，作为平台出借人或借款人，您需要同意如下条款才能继续使用平台服务。</p>
          <p>1. 您确认授权联金所平台将您在平台的注册信息（包含身份证件类型、证件号码、手机号码等）提供至深圳法大大网络科技有限公司合作的CA机构( 证书授权中心)用于申请电子签名。</p>
          <p>2. 您确认授权联金所平台通过深圳法大大网络科技有限公司为您申请电子签名，您通过平台进行所有交易行为将通过电子签名进行确认， 您确认授权联金所平台在相关电子协议文本中使用您的电子签名，以保障您的合法权益。</p>
          <p class="p_right">深圳前海联金所金融信息服务有限公司</p>
    </div>

  </div>
</template>

<script>
import mheader from "@/components/header/header.vue";
export default {
  data () {
    return {
    };
  },
  components: {
    mheader
  }
}

</script>
<style lang='less' scoped>
    .agreement {
        font-size: 0.24rem;
        padding-top: 1.3rem;
        .agreement_title {
          text-align: center;
          font-size: 0.28rem;
          line-height: 0.6rem; 
        }
        .agreement_con  {
          padding: 0.1rem;
          p {
            font-size: 0.26rem;
            line-height: 0.5rem;
            padding: 0.1rem 0;
            &.p_right {
              text-align: right;
            }
          }
        }
    }


</style>