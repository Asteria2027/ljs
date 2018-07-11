<template>
  <!-- 借款协议 -->
  <div class="agreement">
        <mheader :headTitle = "'借款协议'" :goBack="'true'" class="borderBottom-1px"></mheader>
        <div class="content-header">
        <div class="tips">
        <p></p>
        <div align="center">
          <h2 style="margin-top:0.2rem;margin-bottom:0.2rem;">
            <strong style="font-family: 'SimSun';font-size:0.4rem;">
              借款协议
            </strong>
          </h2>
        </div>
        <b>
          <span style="font-size:0.2rem;line-height:0.2rem;font-family: 'SimSun';float: right;">协议编号：_________
            <span></span>
          </span>
        </b>
        <br/>
        <p style="text-align:left;" align="left">
          <b>
            <span >甲方（出借人）:
              <span></span>
            </span>
          </b>
        </p>
        <table style="width:100.0%;border-collapse:collapse;border:solid gray 1.0pt;" cellpadding="0" cellspacing="0" border="1">
          <tbody>
            <tr>
              <td>
                <p style="text-align:center;" align="center">
                  <b>
                    <span style="font-size:0.2rem;font-family: 'SimSun';">出借人</span>
                  </b>
                </p>
              </td>
              <td>
                <p style="text-align:center;" align="center">
                  <b>
                    <span style="font-size:0.2rem;font-family: 'SimSun';">出借金额
                      <span></span>
                    </span>
                  </b>
                </p>
              </td>
              <td>
                <p style="text-align:center;" align="center">
                  <b>
                    <span style="font-size:0.2rem;font-family: 'SimSun';">借款期限
                      <span></span>
                    </span>
                  </b>
                </p>
              </td>
              <td>
                <p style="text-align:center;" align="center">
                  <b>
                    <span style="font-size:0.2rem;font-family: 'SimSun';">年利率
                      <span></span>
                    </span>
                  </b>
                </p>
              </td>
              <td>
                <p style="text-align:center;" align="center">
                  <b>
                    <span style="font-size:0.2rem;font-family: 'SimSun';">借款开始日
                      <span></span>
                    </span>
                  </b>
                </p>
              </td>
              <td>
                <p style="text-align:center;" align="center">
                  <b>
                    <span style="font-size:0.2rem;font-family: 'SimSun';">借款到期日
                      <span></span>
                    </span>
                  </b>
                </p>
              </td>
            </tr>
              <tr>
                <td>
                  <p style="text-align:center;" align="center"> &nbsp;
                    <span style="font-size:9.0pt;font-family: 'SimSun';color:#333333;">
                    </span>
                  </p>
                </td>
                <td>
                  <p style="text-align:center;" align="center">
                    <span style="font-size:9.0pt;font-family: 'SimSun';color:#333333;"></span>
                    <span style="font-size:9.0pt;font-family: 'SimSun';color:#333333;">
                      <span></span>
                    </span>
                  </p>
                </td>
                <td>
                  <p style="text-align:center;" align="center">
                    <span style="font-size:9.0pt;font-family: 'SimSun';color:#333333;"></span>
                    <span style="font-size:9.0pt;font-family: 'SimSun';color:#333333;">
                      <span></span>
                    </span>
                  </p>
                </td>
                <td>
                  <p style="text-align:center;" align="center">
                    <span style="font-size:9.0pt;font-family: 'SimSun';color:#333333;"></span>
                  </p>
                </td>
                <td>
                  <p style="text-align:center;" align="center">
                    <span style="font-size:9.0pt;font-family: 'SimSun';color:#333333;"></span>
                  </p>
                </td>
                <td>
                  <p style="text-align:center;" align="center">
                    <span style="font-size:9.0pt;font-family: 'SimSun';color:#333333;"></span>
                  </p>
                </td>
              </tr>
          </tbody>
        </table>
        <p style="line-height: 150%">
          <strong>
            <span >
              <span>注：上述借款开始日及借款到期日供参考，实际以出借款项发放成功日为借款开始日，出借款项发放成功日加借款期限为借款到期日。</span>
            </span>
          </strong>
        </p>
        <div style="position:relative;">
          <div style="position:relative; top:0.05rem; left:0rem;">
            <p style="text-align:left;" align="left">
              <b>
                <span >&nbsp;</span>
              </b>
            </p>
            <p style="text-align:left;" align="left">
              <b>
                <span >乙方（借款人）：
                  <span></span>
                </span>
              </b>
            </p>
            <p style="text-align:left;" align="left">
              <b>
                <span >统一社会信用代码/身份证号：
                  <span></span>
                </span>
              </b>
            </p>
            <p style="text-align:left;" align="left">
              <b>
                <span >联系电话：
                  <span></span>
                </span>
              </b>
            </p>
            <p style="text-align:left;" align="left">
              <b>
                <span >电子邮箱：
                  <span></span>
                </span>
              </b>
            </p>
            <p style="text-align:left;" align="left">
              <b>
                <span >联系地址：
                  <span></span>
                </span>
              </b>
            </p>
            <p>&nbsp;</p>
            <p style="text-align:left;" align="left">
              <b>
                <span >丙方（平台运营商）：深圳前海联金所金融信息服务有限公司（以下简称“联金所”）
                  <span></span>
                </span>
              </b>
            </p>
            <p style="text-align:left;" align="left">
              <b>
                <span >住所：深圳市前海深港合作区前湾一路63号前海企业公馆B单元25栋2楼整层
                  <span></span>
                </span>
              </b>
            </p>
            <p>&nbsp;</p>
          </div>
        </div>
      
        <p style="text-align:left;" align="left">
          <b>
            <span style=";font-family: 'SimSun';">鉴于：</span>
          </b>
          <span style=";font-family: 'SimSun';">
            <span></span>
          </span>
        </p>
        <p >
          <span >1.</span>
          <span >&nbsp;
            <span style="font-family:宋体">丙方是一家在深圳市依法成立并有效存续的有限责任公司，其</span>
          </span>
          <span >
            <span>运营管理的联金所平台（包括域名为</span>
          </span>
          <a href="http://www.uf-club.com">
            <span style="text-decoration:underline;">
              <span>www.uf-club.com</span>
            </span>
          </a>
          <span>
            <span style="font-family:宋体">的网站和</span>
          </span>
          <span>“</span>
          <span >
            <span style="font-family:宋体">联金所</span>
          </span>
          <span >”APP</span>
          <span>
            <span style="font-family:宋体">，以下简称：联金所平台），是专门为借款人</span>
          </span>
          <span>
            <span style="font-family:宋体">与出借人实现直接借贷提供信息搜集、信息公布、资信评估、信息交互、借贷撮合等服务的网络借贷信息中介机构</span>
          </span>
          <span>
            <span style="font-family:宋体">。</span>
          </span>
        </p>
        <p>
          <span>2.
            <span style="font-family:宋体">乙方基于自身的借款资金需求通过丙方向甲方申请借款，甲方亦同意出借，甲乙双方经充分了解后，自主达成借贷意向。</span>
          </span>
        </p>
        <p>
          <span>
            <span style="font-family:宋体">为规范各方权利义务关系，依据《中华人民共和国合同法》及其他相关法律法规之规定，各方于【</span> &nbsp;&nbsp;
            <span style="font-family:宋体">】年【</span> &nbsp;&nbsp;
            <span style="font-family:宋体">】月【</span> &nbsp;&nbsp;
            <span style="font-family:宋体">】日特订立本协议，以兹共同遵照履行。</span>
          </span>
        </p>
        <p style="text-align:left;" align="left">
          <b>
            <span style=";font-family: 'SimSun';">&nbsp;</span>
          </b>
        </p>
        <p style="text-align:left;" align="left">
          <b>
            <span style=";font-family: 'SimSun';">第一条 借款金额及期限
              <span></span>
            </span>
          </b>
        </p>
        <p style="text-align:left;" align="left">
          <b>
            <span>
              <span>&nbsp;&nbsp;&nbsp; </span>
            </span>
          </b>
          <span style=";font-family: 'SimSun';">
            乙方自愿通过联金所平台向甲方借款，甲方同意通过联金所平台向乙方发放借款，具体标的借款情况如下：
            <span></span>
          </span>
          <span></span>
        </p>
        <p style="text-align:left;" align="left">
          <span style=";font-family: 'SimSun';">&nbsp;</span>
        </p>
       <p>
         <img src="./table.png" alt="" width="100%">
       </p>
        <p style="line-height: 150%">
          <strong>
            <span style="">
              <span style="">注：上述借款起止日期以借款项发放成功日为借款开始日，出借款项发放成功日加借款期限为借款到期日。</span>
            </span>
          </strong>
        </p>
        <br/>
        <p>
          <span style="font-family:'SimSun';color:#000000;"></span>
        </p>
        <p>
          <span style="font-family:Calibri;font-size:0.14rem">&nbsp;</span>
        </p>
      </div>
    </div>  

    <div class="agreement_bottom" v-html="content">

    </div>
  </div>
</template>

<script>
import mheader from "@/components/header/header.vue";
import { showWapBorrowProtocol } from '@/server/getData.js'
export default {
  data () {
    return {
      title: '',
      content: ''
    };
  },
  mounted() {
    showWapBorrowProtocol().then( (res) => {
      let data = res.data.data;
      this.content = data.content;
    }).catch(function (error) { 
      console.log(error);
    })

  },
  components:  {
    mheader
  }
}

</script>
<style lang='less' scoped>
  .agreement {
    padding: 1.3rem 0.1rem;
      font-size: 16px;
      line-height: 32px;
    .content-header {

    }
  }

</style>