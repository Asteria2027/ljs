<template>
<!-- 浙商银行委托扣款业务服务协议 -->
<div class="xy_cont">
    <mheader :headTitle = "'浙商银行委托扣款业务服务协议'" :goBack="'true'" class="borderBottom-1px"></mheader>

   <h3>浙商银行委托扣款业务服务协议</h3>
   <div>
      <table border="0" cellspacing="1" cellpadding="0" width="100%">
         <tbody><tr>
            <td width="25%" nowrap="nowrap"><p align="center">证件类型 </p></td>
            <td width="25%" nowrap="nowrap"></td>
            <td width="25%" nowrap="nowrap"><p align="center">证件号码 </p></td>
            <td width="25%" nowrap="nowrap" colspan="2"></td>
         </tr>
         <tr>
            <td nowrap="nowrap"><p align="center">客户名称 </p></td>
            <td nowrap="nowrap"></td>
            <td nowrap="nowrap"><p align="center">手机号码 </p></td>
            <td nowrap="nowrap" colspan="2"><p align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></td>
         </tr>
         <tr>
            <td nowrap="nowrap"><p align="center">扣款账户户名 </p></td>
            <td nowrap="nowrap"></td>
            <td nowrap="nowrap"><p align="center">账号 </p></td>
            <td nowrap="nowrap" colspan="2"></td>
         </tr>
         <tr>
            <td nowrap="nowrap"><p align="center">账户开户网点 </p></td>
            <td nowrap="nowrap"></td>
            <td ><p align="center">合同号/协议编号/会员号 </p></td>
            <td ><p align="center">&nbsp;</p></td>
         </tr>
         <tr>
            <td nowrap="nowrap"><p align="center">委托内容 </p></td>
            <td nowrap="nowrap" colspan="4"><p align="center">委托浙商银行接收联金所平台指令后扣款。 </p></td>
         </tr>
         <tr>
            <td nowrap="nowrap"><p align="center">申请种类 </p></td>
            <td nowrap="nowrap" colspan="4"><p align="center">开办　　 </p></td>
         </tr>
         </tbody></table>
   </div>
   <p>本人自愿授权浙商银行股份有限公司行（以下简称“贵行”）按上表授权委托内容中的平台（以下简称“该平台”）提供的金额，从上表所列扣款账户(以下简称“指定账户”)中以无卡（折）方式转账支付相关款项。 <br>
      授权声明： <br>
      一、本人理解并同意开通贵行委托扣款业务，即授权贵行在本人向该平台提交充值&nbsp;&nbsp;&nbsp;等交易后，即可通过贵行或第三方支付机构等渠道，向指定账户发起扣款指令，并从该指定账户扣取对应的款项至本人在贵行开立的账户;同一账户同时发生授权支付多笔款项时，贵行有权决定支付先后次序。 <br>
      二、指定账户在本人支付对应款项时应有足够的资金，若因存款不足导致扣款不成功，本人愿承担由此产生的责任，并授权贵行自动从指定账户中扣取该平台规定的滞纳金。 <br>
      三、若该平台与贵行终止委托扣款项目，本授权书自动失效。 <br>
      四、本人若对委托扣款项目的用户资料进行变更或终止授权，须由本人持有效证件到贵行指定网点（或电子银行渠道）办理变更或终止授权手续，贵行收到并受理变更或终止授权书（或数据报文）后生效。 <br>
      五、若因指定账户被挂失、冻结、止付、过期、超额度、销户、作废、余额不足及该平台的资料与本人在贵行的委托资料不符等导致扣款不成功，或因监管政策变化造成委托扣款不成功或项目终止，由此产生的责任由本人承担。 <br>
      六、本人如对委托扣款的金额有疑问，将直接与该平台联系，联系方式为：400-867-9888。 <br>
      七、授权贵行在本人使用委托扣款相关服务期间及服务终止后，有权保留本人在使用服务期间所形成的相关数据信息，该授权不可撤销。 <br>
      八、贵行可根据有关法律法规向政府部门、司法机关、征信机构等第三方提供所获得的本人全部数据信息；并可用于贵行市场分析、案例分享及产品推广等活动。 <br>
      本人对所填资料的真实性、准确性负责，并知悉本授权书所列所有授权声明事项。 </p>
   <p>本授权书通过电子银行渠道签订时：本授权书在客户通过校验<u>手机动态码</u>等方式确认后生效。 </p><br />
   <p>授权日期： <span id="span_year">{{new Date().getFullYear()}}</span> 年 <span id="span_month">{{new Date().getMonth() + 1}}</span> 月 <span id="span_day">{{new Date().getDate()}}</span> 日</p>

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

        .xy_cont{padding:0.1rem;
            padding-top: 1.3rem;
        }
      .xy_cont p{font-size:0.26rem; line-height:0.5rem; color:#666;}
      .xy_cont p strong{font-size:14px;}
      .xy_cont h3{font-size:15px; color:#333; text-align: center; padding-bottom:20px;}
      .xy_cont table{background:#ccc; margin:5px 0;}
      .xy_cont table tr td{background:#fff; font-size:12px;}
      .xy_cont table tr td p{font-size:12px;}
</style>