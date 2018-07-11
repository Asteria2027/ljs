
<template>
  <div class="partners_outDiv" ref="partners_outDiv">

    <div class="xxpl_menu partners" id="xxpl_menu">
      <ul class="clearfix">
        <li data-id="#cooperation" @click="jump('cooperation')">
          <img src="./images//partner_menu_01.png" alt="">
          <span>合作机构</span>
        </li>
        <li data-id="#related"  @click="jump('related')">
          <img src="./images//partner_menu_02.png" alt="">
          <span>关联方担保情况</span>
        </li>
      </ul>
    </div>

      <anchor-scroll ref="anchorScroll" :scrollTop = "scrollTop">

          <div class="xxpl_box xxpl_cooperation" id="cooperation" ref="cooperation">
          <div class="common_title platInfo_complaintChannel">
            <p class="p_title2"> <span>合作机构</span> </p>
          </div>
          <div class="xxpl_cooperation_detail">
            <img src="./images//partners_logo_01.jpg?2018.7.9" alt=""/>
            <div class="tips">
            </div>
            <p>优势资本系国内知名风投，由海内外资深投资银行专家和知名投资机构于2002年联合创立，为中国领先的从事私募股权投资和风险投资业务的私募股权投资机构，是最早进入中国的以拟上市(Pre- IPO)企业私募股权为主要投资对象的投资机构之一。优势资本凭借专业的投资团队、雄厚的财团LP支持、丰富的资本运作经验以及产业战略投资者联盟，为众多拟在境内外上市融资的优秀企业，提供扩张和增长的优势资金,并提供专业的投资管理服务。深耕擅长的细分领域互联网、通信、新能源等，管理规模达80亿、累计投资项目152个；其中，已上市项目中市值逾100亿企业10家。</p>
          </div>

          <div class="xxpl_cooperation_detail">
            <img src="./images//partners_logo_02.jpg?2018.7.9" alt=""/>
            <div class="tips">
            </div>
            <p>盈灿咨询隶属于盈灿集团旗下，是一家致力于为互联网金融企业提供全方位服务的公司，提供运营、品牌、公信力、资本等多维度的咨询服务，全面为互联网金融企业提供赋能。盈灿咨询前身为网贷之家研究院具备国内互联网金融领域最前沿的影响力，最权威的数据库、最深度的模型库。盈灿咨询已成立6年，现有50余名互联网金融领域专家、服务200余家平台，是互联网金融咨询服务的创领者。</p>
          </div>

          <div class="xxpl_cooperation_detail">
            <img src="./images//partners_logo_03.jpg" alt=""/>
            <div class="tips">
              <span>联金所资金存管合作银行</span>
            </div>
            <p>浙商银行股份有限公司（以下简称“浙商银行”）是中国银监会批准的12家全国性股份制商业银行之一，总行设在浙江省杭州市。截至2016年末，浙商银行已在北京、天津、辽宁、上海、江苏、山东、湖北、广东、重庆、四川、陕西、甘肃等13个省市和浙江省内全部省辖市设立了170家分支机构，实现了对长三角、环渤海、珠三角以及部分中西部地区的有效覆盖，同时，积极推进香港分行筹建，加快国际化布局步伐。在英国《银行家》杂志2016年公布的“全球银行业1000强”榜单中按一级资本位列第158位，按总资产位列第117位。中诚信国际给予浙商银行金融机构评级中最高等级AAA主体信用评级。同时荣膺多家知名机构或权威部门评选的“最佳企业流动性服务银行”“最受投标者尊重的投行”“最佳财富管理品牌”“网络金融创新奖”“浙商最信赖金融机构”“最佳社会责任金融机构奖”等荣誉。</p>
          </div>

          <div class="xxpl_cooperation_detail">
            <img src="./images//partners_logo_04.jpg" alt=""/>
            <div class="tips">
              <span>会员单位</span>
            </div>
            <p>广东互联网金融协会是全国首家由政府批准成立的省级互联网金融行业社会组织。它的成立，预示着此前央行提出的对互联网金融实行五大监管原则在广东省真正落地。团体成员主要分布在大珠三角以及经济发达城市。协会秉承推动广东互联网金融业创新发展、规范发展、健康发展，加快广东区域现代金融中心建设的成立目的，结合广东金融业发展特点，重点突出在建设健康安全的互联网金融等具有强烈现代信息特色的金融行业的服务。</p>
          </div>

          <div class="xxpl_cooperation_detail">
            <img src="./images//partners_logo_05.jpg" alt=""/>
            <div class="tips">
              <span>副会长单位</span>
            </div>
            <p>深圳市互联网金融协会是深圳最大的互联网金融的行业性组织，在深圳市委市政府支持下于2015年7月28日成立。由深圳地区有代表性和影响力的金融机构、互联网企业、互联网金融企业、以及相关配套服务机构组成的行业自律组织。协会具有社会团体法人资格，指导单位为深圳市人民政府金融发展服务办公室、驻深一行三会监管部门。协会的宗旨是：为会员搭建公共服务平台，推动互联网金融行业创新、自律，服务实体经济，规范市场行为，加强交流合作，维护合法权益，推动互联网金融创新发展、健康发展。</p>
          </div>


          <div class="xxpl_cooperation_detail">
            <img src="./images//partners_logo_06.jpg" alt=""/>
            <div class="tips">
              <span>原联金所第一大股东</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>赫美微贷原始发起人</span>
            </div>
            <p>深圳联合金融控股有限公司（简称联合金控）是一家以金融外包服务、互联网金融、产业园孵化、投资为核心业务的大型金融控股集团公司，旗下拥有30余家子（分）公司。控股公司及下属子公司延续了近20年发展所积累的技术及专业优势，在金融服务外包领域取得了业界瞩目的成就，业务涵盖金融后台服务基地、信息技术、金融物流、语音呼叫、金融培训、数据处理、网点管理、顾问咨询等多个金融服务外包领域，服务对象已拓展至银行、证券、保险、基金等金融机构。公司已建成上海嘉定、东莞松山湖、珠海横琴等金融服务产业园基地</p>
          </div>


          <div class="xxpl_cooperation_detail">
            <img src="./images//partners_logo_07.jpg" alt=""/>
            <div class="tips">
              <span>联金所平台项目合作方</span>
            </div>
            <p>深圳赫美智慧科技有限公司（简称赫美智科）成立于2012年8月13日，，在全国40余大中城市设有50余家分支机构，主营单笔30万元以下、期限一年及以上、微型自然人分期贷款，即行业通称的“微贷”业务。旗下拥有子公司深圳赫美小额贷款股份有限公司、深圳赫美电子商务有限公司、深圳前海联金所金融信息服务有限公司，今后发展的重点方向是消费分期、供应链金融等。其中，深圳赫美小额贷款股份有限公司成立于2012年4月，注册资本2亿元，是正规持牌的小额贷款服务机构。 </p>
          </div>



          <div class="xxpl_cooperation_detail">
            <img src="./images//partners_logo_09.jpg" alt=""/>
            <div class="tips">
              <span>会员单位</span>
            </div>
            <p>国金联合会是一个由具有国资或上市公司为背景的优质互联网金融企业自愿结成发起的全国性、行业性、非营利性团体组织。于2015年5月应武汉东湖高新自主创新示范区邀请，目前已发展成为有22家国资系和上市系领军平台成员的互联网金融企业联盟。国金联合会旨在搭建现代金融优质同业之间的交流合作平台，通过平台间的资源整合和优势互补，塑造互联网金融核心竞争力，为实体产业的发展贡献力量。优质平台抱团合规发展也可以为行业树立正向模型，为市场注入正能量，通过加深与投资人的互动，从而提升行业公信力，引导行业转向良性发展。</p>
          </div>


          <div class="xxpl_cooperation_detail">
            <img src="./images//partners_logo_10.jpg" alt=""/>
            <div class="tips">
              <span>会员单位</span>
            </div>
            <p>广东省金融消费权益保护联合会经广东省民政厅依法注册登记，成立于2014年12月，属联合类、非营利性、公益性社会团体法人。联合会的业务指导单位是中国人民银行广州分行和广东省金融办，并接受广东省民政厅的指导、监督和管理。联合会的宗旨和职能是保护金融消费合法权益，发展普惠金融、民生金融，构建互利共盈金融消费关系，维护金融稳定与社会和谐，促进金融业行业科学发展</p>
          </div>


          <div class="xxpl_cooperation_detail">
            <img src="./images//partners_logo_11.jpg" alt=""/>
            <div class="tips">
              <span>第三方支付合作机构</span>
            </div>
            <p>深圳市快付通金融网络科技服务有限公司（简称快付通）成立于2009年9月，是深圳金融电子结算中心有限公司为适应电子商务与支付结算的融合发展趋势，在整合原有网络支付和代收付业务基础上发起的专业从事第三方支付服务的实体企业。</p>
            <p>作为获得央行颁发的首批支付牌照企业之一，快付通在深圳金融电子结算中心有限公司的业务指导下，联合各商业银行建设快捷、安全、可信赖的网络支付通道，全力打造以网络支付与小额便民支付服务为核心，以B2B交易、基金、商旅、保险等多项行业应用为经营方向的电子商务基础服务平台，为电子商务、城市民生和公共服务领域提供全方位第三方支付服务。</p>
          </div>
        </div>

        <!-- 关联方担保情况 -->
        <div class="xxpl_box xxpl_cooperation" id="related" ref="related">
          <div class="common_title">
            <p class="p_title2"> <span>关联方担保情况</span> </p>
          </div>

          <div class="xxpl_cooperation_detail">
            <p>赫美智科为联金所平台推荐借款项目的合作机构之一，若其推荐的借款项目出现逾期，则赫美智科承担代偿责任。赫美智科持有联金所20%股份，为联金所平台的关联担保方。</p>
            <img src="./images//partners_logo_12.jpg" alt=""/>
            <div class="tips">
              <span>联金所平台项目合作方</span>
            </div>
            <p>深圳赫美智慧科技有限公司（简称赫美智科）成立于2012年8月13日，是A股上市公司赫美集团（股票代码：002356）控股企业，在全国40余大中城市设有57家分支机构，主营单笔30万元以下、期限一年及以上、微型自然人分期贷款，即行业通称的“微贷”业务。 旗下拥有子公司深圳赫美电子商务有限公司、深圳前海联金所金融信息服务有限公司，今后发展的重点方向是消费分期、供应链金融等。</p>

          </div>

          <div class="legalPerson_signature">
            <img src="./images//legalPerson_signature.png" alt=""/>
          </div>
          
        </div>
        <!--  联金所底部 -->
        <div class="xxpl_ljsLogo">
          <img src="./images//OrganizationInfo_ljsLogo.png" alt="">
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
  .partners_outDiv {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }



</style>