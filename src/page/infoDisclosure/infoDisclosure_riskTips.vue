
<template>
  <div class="riskTips_outDiv">
      
        <div class="xxpl_menu riskTips" id="xxpl_menu">
        <ul class="clearfix">
            <li data-id="#riskTips" @click="jump('riskTips')">
            <img src="./images/riskTips_menu_01.png" alt="">
            <span>网络借贷<br/>风险提示</span>
            </li>
            <li data-id="#forbid" @click="jump('forbid')">
            <img src="./images/riskTips_menu_02.png" alt="">
            <span>禁止性<br/>行为揭示</span>
            </li>
            <li data-id="#legalRelation" @click="jump('legalRelation')">
            <img src="./images/riskTips_menu_03.png" alt="">
            <span>法律关系<br/>解读</span>
            </li>
            <li data-id="#regulatoryPolicy"  @click="jump('regulatoryPolicy')">
            <img src="./images/riskTips_menu_04.png" alt="">
            <span>监管政策</span>
            </li>
        </ul>
        </div>

        <anchor-scroll ref="anchorScroll" :scrollTop = "scrollTop">
            <!-- 网络借贷风险提示 -->
            <div class="xxpl_box xxpl_riskTips" id="riskTips" ref="riskTips">

            <div class="xxpl_riskTips_borrowTips">
                <div class="common_title platInfo_title">
                <p class="p_title2">
                    <span>网络借贷风险提示</span>
                </p>
                </div>

            </div>

            <div class="xxpl_riskTips_detail">
                <p class="first">联金所平台作为网络借贷信息中介平台，不以任何形式承诺本息保障，不承担任何网络借贷违约风险。为保障您的资金安全及相关合法权益，联金所平台依据《中华人民共和国反洗钱法》、《促进互联网金融健康发展的指导意见》、《网络借贷信息中介机构业务活动管理暂行办法》等相关法律法规制定本揭示书，向您充分揭示网络借贷风险，请您在联金所平台进行任何操作前仔细阅读以下内容。</p>

                <h4>法律风险</h4>
                <p>网络借贷活动禁止一切违法犯罪行为，若您用于出借的资金非来源合法的自有资金，或出现交易异常、大额可疑交易等行为，或利用联金所平台从事洗钱等违法犯罪活动的，联金所平台将立即终止您已发生或正在发生的所有交易，将您的违法行为依据相关法律规定报送监管机构，并将您的违法信息及证据移交司法机关处理。您应当自行承担因此造成的资金损失及相应法律后果，造成联金所平台或第三人损失的还应承担完全的赔偿责任。</p>

                <h4>政策风险</h4>
                <p>因国家宏观政策、财政政策、货币政策、监管导向、行业政策、地区发展政策等因素引起的风险</p>

                <h4>信用风险</h4>
                <p>当借款人短期或者长期丧失还款能力，包括但不限于财产状况发生变化、出现人身意外、患病、死亡等，或借款人的还款意愿发生变化时，出借人出借的资金可能无法按时回收。联金所作为信息中介平台，不承诺本息保障。</p>

                <h4>流标风险</h4>

                <p>当您在联金所平台募集资金或进行投标、债权转让时，联金所平台不能确保每个借款人借款需求均能在募集期限内被充分满足、每个出借人资金出借成功或在规定期限内成功转让债权，届时可能借款人借款失败，出借人的资金出借失败。</p>

                <h4>市场风险</h4>
                <p>因市场资金面紧张或利率波动、行业不景气、企业效益下滑等因素引起的风险。</p>

                <h4>技术风险</h4>
                <p>由于无法控制和不可预测的系统故障、设备故障、通讯故障、电力故障、网络故障、黑客或计算机病毒攻击以及其它因素导致联金所平台出现非正常运行，可能导致您无法及时进行查询、出借、提现等操作。</p>

                <h4>操作风险</h4>
                <p>如果您缺乏必要的互联网经验，可能出现因操作不当导致资金交易失败或失误。如果用户未能谨慎保管自己的账号和密码，或者设置的密码简单导致密码被破解，以及您在进行资金交易时未能确保所使用的操作终端、网络以及周围环境的安全，导致账号和密码泄露或被他人盗取、使用的，可能导致出现违反您本人意愿的资金交易以及资金损失。联金所平台以账号和密码进行身份识别，一切以您认证方式进行的操作均被视为您本人行为，用户将对此发生的一切后果自行承担全部责任。</p>

                <h4>不可抗力风险</h4>
                <p>由于战争、动乱、自然灾害等不可抗力因素的出现而可能导致出借资金损失的风险。</p>



                <div class="bottom">
                <p>本揭示书旨在向您揭示网络借贷风险，并帮助您评估和确定自身风险承受能力。本揭示书披露了网络借贷可能存在的主要风险因素，但无法穷尽所有风险，您应根据自身的风险承受能力、投标经验、财务状况等自行决定是否参与网络借贷。</p>
                </div>



                <div class="legalPerson_signature">
                <img src="./images/legalPerson_signature.png" alt=""/>
                </div>
            </div>

            </div>

            <!-- 禁止性行为揭示 -->
            <div class="xxpl_box xxpl_forbid" id="forbid" ref="forbid">
            <div class="xxpl_riskTips_borrowTips">
                <div class="common_title platInfo_title">
                <p class="p_title2">
                    <span>禁止性行为揭示</span>
                </p>
                </div>

            </div>


            <div class="xxpl_forbid_detail">
                <p>
                作为参与网络借贷的出借人与借款人，您被禁止利用联金所平台或联金所平台服务从事信用卡充值套现、洗钱、非法集资等违法行为或进行侵犯他人权益的活动，否则，您应对您在联金所平台的任何违法行为独立承担全部法律责任。
                </p>
                <h4>借款人禁止行为及义务</h4>
                <p class="p_head">
                <span>（一）</span>提供真实、准确、完整的用户信息及融资信息；
                </p>
                <p class="p_head">
                <span>（二）</span>提供在所有网络借贷信息中介机构未偿还借款信息；
                </p>
                <p class="p_head">
                <span>（三）</span>保证融资项目真实、合法，并按照约定用途使用借贷资金，不得用于出借等其他目的；
                </p>
                <p class="p_head">
                <span>（四）</span>按照约定向出借人如实报告影响或可能影响出借人权益的重大信息；
                </p>
                <p class="p_head">
                <span>（五）</span>确保自身具有与借款金额相匹配的还款能力并按照合同约定还款；
                </p>
                <p class="p_head">
                <span>（六）</span>借贷合同及有关协议约定的其他义务。
                </p>

                <div class="wordBox">
                <p>同时，您还须承诺并确认您在参与网络借贷过程中不存在任一下列行为：</p>
                <p class="p_head">
                    <span>（一）</span>通过故意变换身份、虚构融资项目、夸大融资项目收益前景等形式的欺诈借款；
                </p>
                <p class="p_head">
                    <span>（二）</span>同时通过多个网络借贷信息中介机构，或者通过变换项目名称、对项目内容进行非实质性变更等方式，就同一融资项目进行重复融资；
                </p>
                <p class="p_head">
                    <span>（三）</span>在网络借贷信息中介机构以外的公开场所发布同一融资项目的信息；
                </p>
                <p class="p_head">
                    <span>（四）</span>法律法规和网络借贷有关监管规定禁止从事的其他活动。
                </p>
                </div>


                <h4>出借人禁止行为及义务</h4>
                <p>作为参与网络借贷的出借人，应当在具备投标风险意识、风险识别能力、拥有非保本类金融产品投标的经历并熟悉互联的同时严格履行下列义务：</p>
                <p class="p_head">
                <span>（一）</span>提供真实、准确、完整的用户信息及融资信息；
                </p>
                <p class="p_head">
                <span>（二）</span>向网络借贷信息中介机构提供真实、准确、完整的身份等信息；
                </p>
                <p class="p_head">
                <span>（三）</span>出借资金为来源合法的自有资金；
                </p>
                <p class="p_head">
                <span>（四）</span>了解融资项目信贷风险，确认具有相应的风险认知和承受能力；
                </p>
                <p class="p_head">
                <span>（五）</span>自行承担借贷产生的本息损失；
                </p>
                <p class="p_head">
                <span>（六）</span>借贷合同及有关协议约定的其他义务。
                </p>

                <div class="wordBox">
                <p>联金所平台一旦发现您在联金所平台从事违法活动，有权采取包括但不限于下列措施：不经通知而立即停止您对联金所平台的全部或部分功能的使用、警告当事人立即停止违法行为、向有关部门举报或报案等。</p>
                </div>



                <div class="legalPerson_signature" style="margin-top: 10px">
                <img src="./images/legalPerson_signature.png" alt=""/>
                </div>
            </div>

            </div>

            <!-- 法律关系解读 -->
            <div class="xxpl_box xxpl_legalRelation" id="legalRelation"  ref="legalRelation">

                <div class="common_title platInfo_title">
                <p class="p_title2">
                    <span>法律关系解读</span>
                </p>
                </div>

                <div class="xxpl_legalRelation_detail">
                <h4>投标人与借款人之间的民间借贷法律关系</h4>
                <p>民间借贷是指自然人之间、非金融企业之间或者相互之间的借贷行为。具体分为两类：一是自然人与自然人之间的民间借贷；二是自然人与非金融企业之间的民间借贷。依据我国《合同法》第一百九十六条规定：借款合同是借款人向贷款人借款，到期返还借款并支付利息的合同。民间借贷合同可约定利息，合法的民间借贷关系受法律保护。故投标人通过联金所平台获取借款人的利息收益为合法收益，受法律保护。</p>
                <h4>联金所平台与投标人/借款人之间的居间法律关系</h4>
                <p>根据我国《合同法》第四百二十四条之规定：居间合同是居间人向委托人报告订立合同的机会或者提供订立合同的媒介服务，委托人支付报酬的合同。联金所平台作为依法设立的信息中介服务机构，为促成投标人与借款人之间的借贷关系提供了居间服务，该居间活动真实、合法、有效。</p>
                <div class="legalPerson_signature" style="margin-top: 10px">
                    <img src="./images/legalPerson_signature.png" alt=""/>
                </div>
                </div>

            </div>

            <!-- 政策监管 -->
            <div class="xxpl_box Regulatory_policy" id="regulatoryPolicy" ref="regulatoryPolicy">
            <div class="common_title grow_title">
                <p class="p_title">
                <span>政策监管</span>
                </p>
                <p class="p_bottom">借款人、出借人教育——与您分享网络借贷基础知识、监管动态，学会识别分享，理性决策。</p>
            </div>


            <a href="http://www.gov.cn/zhengce/content/2016-10/13/content_5118471.htm"><span>1、国务院办公厅关于印发互联网金融风险专项整治工作实施方案的通知 国办发〔2016〕21号</span><span></span></a>
            <a href="http://www.cbrc.gov.cn/chinese/home/docDOC_ReadView/D934AAE7E05849D185CD497936D767CF.html"><span>2、中国银行业监督管理委员会 中华人民共和国工业和信息化部 中华人民共和国公安部国家互联网信息办公室令 2016年第1号</span><span></span></a>
            <a href="http://www.cbrc.gov.cn/chinese/home/docDOC_ReadView/D81B52D3D20A49A99522C48FA8F1C752.html"><span>3、关于印发《P2P网络借贷风险专项整治工作实施方案》的通知 银监发〔2016〕11号</span><span></span></a>
            <a href="http://www.cbrc.gov.cn/govView_4201EF03472544038242EED1878597CB.html"><span>4、中国银监会办公厅关于印发网络借贷资金存管业务指引的通知</span><span></span></a>
            <a href="http://www.cbrc.gov.cn/govView_C8D68D4C980A4410B9F4E21BA593B4F2.html"><span>5、中国银监会办公厅关于印发网络借贷信息中介机构业务活动信息披露指引的通知</span><span></span></a>
            <a href="http://www.gd.gov.cn/govpub/rdzt/hlwjr/sfa/201610/t20161013_240678.htm"><span>6、广东省人民政府办公厅关于印发广东省互联网金融风险专项整治工作实施方案的通知</span><span></span></a>
            <a href="http://www.jr.sz.gov.cn/sjrb/xxgk/tzgg/201801/t20180119_10677880.htm"><span>7、关于进一步做好全市网络借贷信息中介机构整改有关事项的通知</span><span></span></a>
            <a href="https://www.wdzj.com/news/yc/1887300.html"><span>8、广东发布158条P2P网贷整改验收指引</span><span></span></a>
            <a href="https://www.wdzj.com/news/yc/1817168.html"><span>9、深圳发布P2P平台106条整改验收细则(附全文)</span><span></span></a>
            <div class="legalPerson_signature" style="margin-top: 10px;margin-right: 10px;">
                <img src="./images/legalPerson_signature.png" alt=""/>
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

import AnchorScroll from '@/components/common/anchorScroll/anchorScroll.vue'

export default {
  data () {
    return {
        scrollTop: 0
    };
  },

  methods: {
    jump (ref) {
      this.scrollTop =  this.$refs[ref].offsetTop;
    }
  },
  components: {
      AnchorScroll
  }
}

</script>
<style lang='less' scoped>
    @import "./infoDis.less";

    .riskTips_outDiv {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }

</style>