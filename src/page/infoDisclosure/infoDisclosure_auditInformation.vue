<template>

    <div class="audit_information clearfix" ref="audit_information">
        <p class="appShow appShow_audit" id="appShow">请在浏览器查看报告</p>
        <ul>
            <li>
                <a href="https://www.uf-club.com/static/auditReport/2016年前海审计报告.pdf" target="_blank"><img src="./images/reviewInformation_2016.png" alt=""/></a>
                <p>2016年度财务审计报告</p>
            </li>
            <li>
                <a href=""><img src="./images/reviewInformation_fdj2.png" alt=""/></a>
                <p>2017年度财务审计报告</p>
            </li>
            <li>
                <a href=""><img src="./images/reviewInformation_fdj3.png" alt=""/></a>
                <p>重点环节审计结果</p>
            </li>
            <li>
                <a href=""><img src="./images/reviewInformation_fdj4.png" alt=""/></a>
                <p>合规报告</p>
            </li>
        </ul>
        <div class="legalPerson_signature audit">
            <img src="./images/legalPerson_signature.png" alt="">
        </div>

        <!--  联金所底部 -->
        <div class="xxpl_ljsLogo">
            <img src="./images/OrganizationInfo_ljsLogo.png" alt="">
        </div>
    </div>


</template>

<script>
export default {
  data () {
    return {
    };
  },
    mounted() {
        this.setAuditInformationHeight();
    },
    methods: {
        setAuditInformationHeight() {
            const winH = document.body.clientHeight;
            const fontSize = parseFloat(document.documentElement.style.fontSize);
            this.$refs.audit_information.style.height = winH/fontSize - 0.6 + "rem";
        }
    }

}

</script>
<style lang='less' scoped>
  @import "./infoDis.less";
    .audit_information {
        overflow-y: auto;
    }
</style>