<template>
  <div class="myRebatesBannerPage">
    <div class="banner">
      <img src="./fanlibanner.jpg" alt="">
    </div>
    <div class="rules">
      <div class="rules-con">
        <div class="title">
          <span>高端用户返利规则<i></i></span>
        </div>
        <div class="table">
          <div>
            <span>代收本金（X）</span>
            <span>返利系数（年化）</span>
          </div>
          <div>
            <span>10万&le;X&lt;20万</span>
            <span>0.15%</span>
          </div>
          <div>
            <span>20万&le;X&lt;50万</span>
            <span>0.4%</span>
          </div>
          <div>
            <span>50万&le;X&lt;100万</span>
            <span>0.6%</span>
          </div>
          <div>
            <span>100万&le;X&lt;300万</span>
            <span>0.8%</span>
          </div>
          <div>
            <span>300万&le;X&lt;1000万</span>
            <span>1.2%</span>
          </div>
          <div>
            <span>X&ge;1000万</span>
            <span>1.5%</span>
          </div>
        </div>
        <div class="txt">
          <p>1、高端用户返利系数与个人待收本金相关，个人待收本金取两个版本（普通版和存管版）的待收本金之和（每天00:30更新返利系数）。</p>
          <p>2、投资时间在2018年2月1日以后的投资参与返利。</p>
          <p>3、返利适用所有产品（转让区除外）， 即：符合返利条件的待收本金 = 待收本金 - 投资转让区的待收本金。</p>
          <p>4、返利收益计算: 返利收益 = 符合返利条件的待收本金 * 返利系数/365。</p>
          <p>5、返利收益在各自版本按日每天发放。</p>
          <p>6、待活动结束后是否调整返利系数将根据市场行业情况及平台运营成本综合考虑，届时以平台官网公告为准。</p>
          <p>此活动最终解释权归联金所所有</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    components: {

    }
  }
</script>

<style lang='less' scope>
.myRebatesBannerPage {
  box-sizing: border-box;
  background: #F7E5B5;
  min-height: 100%;
  width: 100%;
  padding-bottom: 1rem;
  .banner {
    height: 5.49rem;
    width: 100%;
    margin-bottom: 0.3rem;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .rules {
    background: #fff;
    padding: 0.3rem;
    .rules-con {
      min-height: 11.44rem;
      border: 0.05rem solid #F7E5B5;
      .title {
        font-size: 0.35rem;
        text-align: center;
        padding: 0.1rem 0;
        margin: 0.3rem 0;
        >span {
          position: relative;
          font-weight: bold;
          >i {
            font-weight: 300;
            position: absolute;
            height: 0.05rem;
            width: 100%;
            left: 0;
            bottom: -0.25rem;
            border-top: 1px solid #999;
            border-bottom: 1px solid #999;
          }
        }
        >span::before {
          width: 0.1rem;
          height: 0.1rem;
          border-radius: 50%;
          background: #DAD2A3;
          position: absolute;
          top: 0.15rem;
          left: -0.3rem;
          content: "";
        }
        >span::after {
          width: 0.1rem;
          height: 0.1rem;
          border-radius: 50%;
          background: #DAD2A3;
          position: absolute;
          top: 0.15rem;
          right: -0.3rem;
          content: "";
        }
      }
      .table {
        margin: 0.8rem 0.3rem;
        border: 1px solid #000;
        border-radius: 0.2rem;
        div {
          display: block;
          display: flex;
          border-top: 1px solid #000;
          >span {
            display: block;
            flex: 1;
            text-align: center;
            font-size: 0.23rem;
            padding: 0.2rem;
          }
          >span:first-child {
            border-right: 1px solid #000;
          }
        }
        div:nth-child(2n){
          background: #FFFCD7;
        }
        div:nth-child(2n+1){
          background: #F7E5B5;
        }
        div:first-child{
          border-top: 0;
          background: #FFF100;
          border-top-left-radius: 0.2rem;
          border-top-right-radius: 0.2rem;
        }
        div:last-child {
          border-bottom-left-radius: 0.2rem;
          border-bottom-right-radius: 0.2rem;
        }
      }
      .txt {
        font-size: 0.23rem;
        line-height: 0.3rem;
        padding: 0 0.23rem;
        p {
          padding-bottom:0.2rem; 
        }
        p:last-child {
          font-size: 0.2rem;
          color: #999;
          text-align: right;
          margin:0.2rem 0 0.6rem;
        }
      }
    }
  }
}
 
</style>
