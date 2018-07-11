<template>
  <div class="aboutUs">
    <mheader headTitle='关于我们' :goBack="'true'"  class="borderBottom-1px"></mheader>
      <nav class="aboutUs_nav">
        <ul>
          <li class="item" :class="{'active': isIntroduce}" @click="isIntroduce = true">
            <span>联金所介绍</span>
          </li>
          <li class="item" :class="{'active': !isIntroduce}" @click="isIntroduce = false">
            <span>管理团队</span>
          </li>
        </ul>
      </nav>

      <div class="aboutUs_introduce" v-if="isIntroduce">
        <div class="aboutUs_introduce_item">
          <h1>联金所介绍</h1>
          <p>联金所（www.uf-club.com）互联网金融平台于2013年11月1日上线，运营方为深圳前海联金所金融信息服务有限公司，实缴资本6800万元，高管团队由具有多年银行信贷、风控经验及互联网技术、运营专业人才组成。联金所秉承小额分散、规范透明的经营理念，坚持走推动金融改革创新的普惠金融之路，倾力为广大出借人与借款人提供优质便捷、安全可靠的网络借贷信息中介服务。
					联金所安全、稳健、快速的发展得到资本的积极追捧，其中2014年12月，深圳联合金融控股有限公司受让联金所40%股份跃居第一大股东；2015年11月，A股上市公司赫美集团收购联金所51%股权并成为联金所控股股东。在互联网金融迎来合规及上市热潮大背景下，2017年12月，联金所引入新的战略股东——佛山市新叶投资合伙企业（国内著名风投优势资本旗下）和上海闻玺投资咨询有限公司（其母公司为上海盈灿集团，国内知名P2P行业门户网贷之家控股股东）合计占股80%，至此形成“知名风投+上市公司+行业专家”的强大股东阵容，我们将会获得更多的资源和支持取得更好更快的发展，向互金领域的第一梯队目标前进。股权结构如下：</p>
        </div>
        <div class="aboutUs_introduce_item">
          <img src="./info_ljgk.jpg" alt="">
        </div>
        <div class="aboutUs_introduce_item">
          <h1>知名风投</h1>
          <p>佛山市新叶投资合伙企业，其执行方优势资本系国内著名风投。优势资本创立于2002年，为国内领先的股权投资机构，拥有专业的投资团队、雄厚的财团支持和产业战略投资者联盟，深耕擅长的细分领域互联网、通信、新能源等，管理规模达80亿、累计投资项目152个；其中，已上市项目中市值逾100亿企业10家。</p>
          <h1>行业专家</h1>
          <p>上海闻玺投资咨询有限公司系上海盈灿集团旗下，盈灿集团作为互联网金融领域顶级服务产业链集团，盈灿集团子公司网贷之家作为网贷行业最有影响力的资讯门户网站，是中国最大的P2P网贷行业流量、用户集散地和入口，未来将对联金所导入更多的资源和流量，促进公司发展及品牌价值提升。</p>
        </div>

        <div class="aboutUs_introduce_item">
          <h1>项目来源</h1>
          <p>联金所标的均来自正规持牌的小额贷款公司联金微贷，二者同属于赫美集团控股子公司，后者专注于小额分散的自然人经营及消费信贷服务。联金所30余家分支机构遍布于20余个大中城市，为平台挑选一流信贷资产。</p>
          <h1>风险管理</h1>
          <p>联金所采用“大数据+信贷工厂+慧健系统”立体风控模式，不良率控制能力属于行业优秀级别。平台不经手客户资金，客户充值、投资和提现全部由人民银行认证的第三方支付机构进行资金结算；第三方支付机构对平台的每笔交易资金进行严格监管，提现、转划均由“非人工干预”的系统实现，通过技术手段和操作规程为您的资金安全保驾护航</p>
        </div>

      </div>

      <div class="aboutUs_team" v-else>
        <ul>
          <li>
            <div class="aboutUs_team_top">
              <h1>首席执行官——刘哲</h1>
              <img src="./team_lz.jpg" alt="">
            </div>
            <p>
毕业于中山大学。联金所创始员工，曾就职于深圳赫美小额贷款股份有限公司，历任公司业务部负责人、金融市场部负责人，主办过亿元级企业融资，具有开放的互联网思维及全面的金融理论基础，对网络理财产品运作模式理解深刻。有丰富的运营规划和管理经验。
            </p>
          </li>

          <li>

            <div  class="aboutUs_team_top">
              <h1>首席技术官——赵永</h1>
              <img src="./team_zy.jpg" alt="">
            </div>
            <p>华南理工大学工商管理硕士，曾任职于多家国内外软件上市公司，服务客户包括瑞士银行、中国银行、华为等大型公司以及初创型互联网金融公司。 十二年互联网及软件咨询、设计和管理从业经历，对提供安全可靠的互联网金融解决方案及研发管理有着丰富的理论研究和实践经验。</p>
          </li>

          <li>

            <div  class="aboutUs_team_top">
              <h1>首席财务官——潘宇明</h1>
              <img src="./team_pym.jpg" alt="">
            </div>
            <p>华南理工大学工商管理学院企管研究生学历，熟悉国家会计法规、税务法规，多年企业财务会计负责人管理工作经验，严谨的管理思维，擅长企业财务内控建设、财务体系建立、企业财务风险管理，2015年初正式加入深圳联金所。</p>

          </li>

          <li>
            <div class="aboutUs_team_top">
              <h1>首席运营官——康萍萍</h1>
              <img src="./team_kpp.jpg" alt="">
            </div>
            <p>毕业于武汉大学经济与管理学院数理金融实验班，经济学学士，工商管理硕士。曾任职于交通银行深圳分行，负责会计核算和风险控制等工作。于2011年投身于互联网金融领域，硕士论文的研究方向即为互联网金融，在互联网金融行业有着丰富的理论知识和长期的实践经验。作为广东某互联网金融平台的联合创始人，有五年互金运营管理经验、三年互金创业经验。现任联金所首席运营官。</p>

          </li>
        </ul>
      </div>

  </div>
</template>

<script>
import mheader from "@/components/header/header.vue";
export default {
  data () {
    return {
      isIntroduce: true
    };
  },
  components: {
    mheader
  }
}

</script>
<style lang='less' scoped>
  .aboutUs {
    font-size: 0.24rem;
    padding-top: 1.6rem;
    nav {
        position: fixed;
        top: 0.8rem;
        left: 0;
        overflow-x: auto;
        white-space: nowrap;
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        background-color: #F2F2F2;
        font-size: 0.24rem;
        z-index: 20;
      ul {
        li.item {
          width: 50%;
          padding-bottom: 1px;
          color: #7c7c7c;
          display: inline-block;
          text-align: center;
          span {
            display: inline-block;
            position: relative;
          }
          &.active{
            span:after {
              content: '';
              display: inline-block;
              position: absolute;
              bottom: 0px;
              left: 0px;
              width: 100%;
              height: 2px;
              background-color: #ed5b00;
            }
          }

        }
      }
    }
    .aboutUs_introduce {
      padding: 0 0.1rem;
      .aboutUs_introduce_item {
        padding: 0.2rem 0;
        border-bottom: 1px solid #ddd;
        font-size: 0.26rem;
        line-height: 0.5rem;
        h1 {
          color: #222;
          padding: 0.1rem 0;
        }
        P {
          color: #999;
        }
        img {
          width: 100%;
        }
      }
    }
    .aboutUs_team {
      padding: 0.2rem 0.1rem 0.5rem;
      .aboutUs_team_top {
        height: 2rem;
        h1 {
          font-weight: bold;
          font-size: 0.28rem;
          line-height: 2rem;
          float: left;
        }
        img {
          width: 2rem;
          float: right;
        }

      }
      p {
        text-align: left;
        text-indent: 2em;
        color: #999;
        font-size: 0.26rem;
        line-height: 0.5rem;
      }
    }

  }

</style>
