<template>
  <div class="automaticBidrules">
    <mheader headTitle='自动投标说明' :goBack="'true'"  class="borderBottom-1px"></mheader>
    <div>
      <p>1、自动投标功能适用于除新手标、转让专区外的标的；散标发新标时触发自动投标；</p>
      <p>2、自动投标成交的金额为用户在自动投标设置的最大金额、账户可用余额、项目可投金额三者中的最小值；</p>
      <p>3、排队规则：</p>
      <p>A、系统根据用户设置自动投标时间的先后顺序为用户排队投标。</p>
      <p>B、系统为用户自动投资单个项目成功后，用户将重新进入排队。</p>
      <p>C、若用户账户余额小于其设置的最小金额，在自动投标运行到该用户时，该用户将会被自动排到队尾；若项目不符合用户设置的规则，则用户保持在原有队列中位置。</p>
      <p>4、每个用户默认可设置1个自动投标；当用户待收本金≥20万时，可设置2个自动投标；当用户待收本金≥50万时，可设置3个自动投标。当用户待收本金减少时，其原有设置的2个或3个自动投标个数不减少，自动投标的设置个数只要求在设置时是否符合待收本金条件。</p>
      <p>5、自动投标不能使用其他福利。</p>
      <p>6、通过自动投标投出去的债权额外奖励0.2%，奖励期限为整个债权持有期间。</p>
    </div>
  </div>
</template>

<script>
import mheader from '@/components/header/header.vue'
  export default {
    data () {
      return {

      }
    },
    components: {
      mheader
    }
  }
</script>

<style lang='less' scope>
.automaticBidrules {
  box-sizing: border-box;
  background: #f4f4f4;
  padding-top: 0.8rem;
  min-height: 100%;
  width: 100%;
  >div {
    background: #fff;
    padding-bottom: 0.25rem;
    p {
      font-size: 0.22rem;
      padding: 0.25rem 0.2rem 0;
      line-height: 0.35rem;
      color: #999;
    }
  }
}
 
</style>
