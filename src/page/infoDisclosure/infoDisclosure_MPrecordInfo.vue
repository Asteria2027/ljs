
<template>

  <div>

        <div class="xxpl_menu partners" id="xxpl_menu">
            <ul class="clearfix">
                <li data-id="#cooperation" @click="jump('info')">
                <img src="./images/MPrecordInfo_menu_01.png" alt="">
                <span>备案信息</span>
                </li>
                <li data-id="#related"  @click="jump('progress')">
                <img src="./images/MPrecordInfo_menu_02.png" alt="">
                <span>备案进程</span>
                </li>
            </ul>
        </div>

 <anchor-scroll ref="anchorScroll" :scrollTop = "scrollTop">

        <div class="xxpl_box xxpl_MPrecordInfo">

            <div class="common_title" id="info" ref="info">
                <p class="p_title2"> <span>备案信息</span> </p>
            </div>
            <ul>
                <li>
                    <div>金融办备案信息</div>
                    <div>完成备案后披露</div>
                </li>
                <li>
                    <div>资金存管银行全称</div>
                    <div>浙商银行股份有限公司</div>
                </li>
                <li>
                    <div>银行存管上线时间</div>
                    <div>2017年4月份</div>
                </li>
                <li>
                    <div>电信业务经营备案信息</div>
                    <div>粤ICP备14046625号</div>
                </li>

                <li>
                    <div>电信业务经营许可信息</div>
                    <div>无</div>
                </li>

                <li>
                    <div>公安机关核发的网址备案图标及编号</div>
                    <div>完成备案后披露</div>
                </li>
                <li>
                    <div>信息安全等级保护证明</div>
                    <div>已通过专业测评机构的“三级等保”测评咨询</div>
                </li>

            </ul>


            <div class="xxpl_MPrecordInfo_Img">
                <router-link to='/messageDetial/7548' tag="a">
                    <img src="./images/MPrecordInfo_safety.jpg" alt=""/>
                </router-link>
                <router-link to='/infoDisclosure/riskManagement/risk' tag="a">
                    <img src="./images/MPrecordInfo_risk.jpg" alt=""/>
                </router-link>
            </div>

            <div class="common_title" id="progress" ref="progress">
                <p class="p_title2"> <span>备案进程</span> </p>
            </div>

            <div class="xxpl_MPrecordInfo_progress">
                <img src="./images/MPrecordInfo_progress.jpg" alt=""/>
            </div>


            <div class="legalPerson_signature">
                <img src="./images/legalPerson_signature.png" alt="">
            </div>

        </div>
        <!--  联金所底部 -->
        <div class="xxpl_ljsLogo">
            <img src="./images/OrganizationInfo_ljsLogo.png" alt="">
        </div>
  </anchor-scroll>

  </div>
</template>

<script>
import AnchorScroll from '@/components/common/anchorScroll/anchorScroll'
export default {
  data () {
    return {
      scrollTop: 0
    };
  },
  methods: {
    jump (ref) {
      this.scrollTop = this.$refs[ref].offsetTop;
    }
  },

  components: {
    AnchorScroll
  }
}

</script>
<style lang='less' scoped>
  @import "./infoDis.less";


</style>


