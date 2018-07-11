
<template>
  <div>
      
    <div class="xxpl_menu riskManagement" id="xxpl_menu">
        <ul class="clearfix">
            <router-link tag="li" :to="'/infoDisclosure/riskManagement/risk'" replace>
                <img src="./images/riskManagement_menu_01.png" alt="">
                <span>风险管理</span>
            </router-link>

            <router-link tag="li" :to="'/infoDisclosure/riskManagement/bankDepository'" replace>
                <img src="./images/riskManagement_menu_02.png" alt="">
                <span>银行存管</span>
            </router-link>

            <router-link tag="li" :to="'/infoDisclosure/riskManagement/ESignature'" replace>
                <img src="./images/riskManagement_menu_03.png" alt="">
                <span>电子签章</span>
            </router-link>
        </ul>
    </div>  

    <div class="out_div"  style="padding-top:1.65rem;" >

        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  }
}

</script>
<style lang='less'>
    @import "./infoDis.less";


</style>