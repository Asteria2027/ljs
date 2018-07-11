
<template>
  <div>
      <div class="xxpl_menu operationalData" id="xxpl_menu">
        <ul class="clearfix">
            <router-link tag="li" :to="'/infoDisclosure/operationalData/runReports'" replace>
                <img src="./images/operationalData_menu01.png" alt="">
                <span ohref="#staffAppearance">运营报告</span>
            </router-link>

            <router-link tag="li" :to="'/infoDisclosure/operationalData/runData'" replace>
                <img src="./images/operationalData_menu02.png" alt="">
                <span ohref="#staffAppearance">运营数据</span>
            </router-link>
            
            <router-link tag="li" :to="'/infoDisclosure/operationalData/charges'" replace>
                <img src="./images/operationalData_menu03.png" alt="">
                <span ohref="#staffAppearance">收费标准</span>
           </router-link>
        </ul>
    </div>

    <div class="routerBox">
        <transition name="router-fade" mode="out-in">
            <router-view>
            </router-view>
        </transition>
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


    .routerBox {
        position: absolute;
        top: 1.67rem;
        left: 0;
        right: 0;
        bottom: 0;
    }


</style>