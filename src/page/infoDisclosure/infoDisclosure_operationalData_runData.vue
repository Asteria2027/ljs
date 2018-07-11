
<template>
        <!-- 运营数据 -->
    <div class="Operational_data" id="Operational_data">
        <div class="Operational_data_detail">
            <div class="runData_banner">
                <p class="p_head">定期更新数据 信息披露更透明</p>
                <p class="p_time">最后更新时间：{{operationalData.sysdate
}} 07:00:00</p>
            </div>
            <div class="runData_con summary clearfix">
                <h3 class="tip">数据概要</h3>
                <ul>
                    <li>
                        <img src="./images/summary1.png" alt="">
                        <p class="p_top">安全运营天数</p>
                        <p class="p_bottom">
                            <span>{{operationalData.safeRunYearsStr}}</span>年
                            <span>{{operationalData.safeRunDaysStr}}</span>天
                        </p>
                    </li>
                    <li>
                        <img src="./images/summary2.png" alt="">
                        <p class="p_top">累计交易总额</p>
                        <p class="p_bottom">{{operationalData.jyAmount}}</p>
                    </li>
                    <li>
                        <img src="./images/summary3.png" alt="">
                        <p class="p_top">累计交易笔数</p>
                        <p class="p_bottom">{{platManageData.transactionNumber}}笔</p>
                    </li>

                    <li>
                        <img src="./images/summary4.png" alt="">
                        <p class="p_top">累计注册人数</p>
                        <p class="p_bottom">{{platManageData.registerNumber}}人</p>
                    </li>

                    <li>
                        <img src="./images/summary5.png" alt="">
                        <p class="p_top">累计为出借人赚取收益</p>
                        <p class="p_bottom">{{operationalData.totalsaveamount}} </p>
                    </li>

                    <li>
                        <img src="./images/summary6.png" alt="">
                        <p class="p_top">借贷余额（待收余额）</p>
                        <p class="p_bottom">{{operationalData.noreceviemoney}} </p>
                    </li>
                </ul>
            </div>
            <div class="runData_con borrow">
                <h3 class="tip">出借人数据</h3>
                <div class="borrow_box">
                    <div class="borrow_box_detial top">
                        <p class="p_top">累计出借人数</p>
                        <p class="p_bottom">{{platManageData.totalLenders}}人</p>
                        <img src="./images/zb1.png" alt="">
                        <div class="right_message">
                            <p>最大单一出借人</p>
                            <p>待收余额占比</p>
                            <p>{{platManageData.dueinRate}}</p>
                        </div>
                    </div>
                    <div class="borrow_box_detial down">
                        <p class="p_top">当前出借人数</p>
                        <p class="p_bottom">{{platManageData.currentLenders}}人</p>
                        <img src="./images/zb1.png" alt="">
                        <div class="right_message">
                            <p>前10大出借人</p>
                            <p>待收余额占比</p>
                            <p>{{platManageData.dueinmoreRate}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="runData_con borrow">
                <h3 class="tip">借款人数据</h3>
                <div class="borrow_box">
                    <div class="borrow_box_detial top">
                        <p class="p_top">累计借款人数</p>
                        <p class="p_bottom">{{platManageData.totalBorrower}}人</p>
                        <img src="./images/zb1.png" alt="">
                        <div class="right_message">
                            <p>最大单一借款人</p>
                            <p>待还余额占比</p>
                            <p>{{platManageData.repayRate}}</p>
                        </div>
                    </div>
                    <div class="borrow_box_detial down">
                        <p class="p_top">当前借款人数</p>
                        <p class="p_bottom">{{platManageData.currentBorrower}}人</p>
                        <img src="./images/zb1.png" alt="">
                        <div class="right_message">
                            <p>前10大借款人</p>
                            <p>待还余额占比</p>
                            <p>{{platManageData.repaymoreRate}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="runData_con overdue">
                <h3 class="tip">逾期数据</h3>
                <div class="overdue_detail">
                    <ul class="clearfix">
                        <li>
                            <p class="p_top">
                                逾期金额
                            </p>
                            <p class="p_bottom">
                                {{platManageData.overdueAmount}}元
                            </p>
                        </li>
                        <li>
                            <p class="p_top">
                                逾期90天（不含）以上的金额
                            </p>
                            <p class="p_bottom">
                                {{platManageData.ninetyAmount}}元
                            </p>
                        </li>
                        <li>
                            <p class="p_top">
                                代偿金额
                            </p>
                            <p class="p_bottom">
                               {{platManageData.compensatoryAmount}}元
                            </p>
                        </li>
                    </ul>
                    <ul class="clearfix">
                        <li>
                            <p class="p_top">
                                逾期笔数
                            </p>
                            <p class="p_bottom">
                                {{platManageData.overdueNumber}}笔
                            </p>
                        </li>
                        <li>
                            <p class="p_top">
                                逾期90天（不含）以上的笔数
                            </p>
                            <p class="p_bottom">
                                {{platManageData.ninetyNumber}}笔
                            </p>
                        </li>
                        <li>
                            <p class="p_top">
                                代偿笔数
                            </p>
                            <p class="p_bottom">
                                {{platManageData.compensatoryNumber}}笔
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="legalPerson_signature signatureOperationalData">
                <img src="./images/legalPerson_signature.png" alt="">
            </div>
        </div>

        <!--  联金所底部 -->
        <div class="xxpl_ljsLogo">
            <img src="./images/OrganizationInfo_ljsLogo.png" alt="">
        </div>
    </div>

</template>

<script>
import { getOperationalData } from '@/server/getData.js'


export default {
  data () {
    return {
        operationalData: {},
        platManageData: {}
    };
  },
  mounted() {
    getOperationalData().then(res => {
      this.operationalData = res.data.data;
      this.platManageData = res.data.data.platManageData;
    }).catch(function (error) {
      console.log(error);
    });
  }
  

}

</script>
<style lang='less' scoped>
</style>