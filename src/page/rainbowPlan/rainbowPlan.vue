<template>
  <div class="rainbowPlan">
      <img src="./rainbow_wap_01.jpg" alt="">
      <img src="./rainbow_wap_02.jpg" alt="">
      <img src="./rainbow_wap_03.jpg" alt="">
      <img src="./rainbow_wap_04.jpg" alt="">
      <img src="./rainbow_wap_05.jpg" alt="">
      <div class="rainbowPlan_img6">
        <img class="conImg" src="./rainbow_wap_06.jpg" alt="">
        <div class="rainbowPlan_img6_share">
            <img @click='evokeFooter' src="./weixin.png" alt="">
            <img @click="evokeFooter" src="./weibo.png" alt="">
            <!-- <img @click="wxOtherShare('qq')" src="./qq.png" alt=""> -->
            <!-- <img src="./qqzone.png" alt=""> -->
            <img @click="evokeFooter" src="./copy.png" alt="">
        </div>
      </div>
      <img src="./rainbow_wap_07.jpg" alt="">
    <shareOtherFooter ref="share_other_footer"></shareOtherFooter>

  </div>

  
</template>

<script>
import shareOtherFooter from '@/components/common/shareOtherFooter/shareOtherFooter.vue';

export default {
  data () {
    return {
    };
  },
  methods: {
    evokeFooter(){
        this.$refs.share_other_footer.showFooter();
      },
  },
    components:{
        shareOtherFooter
    }
}

</script>
<style lang='less' scoped>

    .rainbowPlan {
        >img {
            width: 100%;
        }
        .rainbowPlan_img6 {
            .conImg {
                width: 100%;
            }
            position: relative;
            .rainbowPlan_img6_share {
                position: absolute;
                top: 4rem;
                left: 1rem;
                background-color: #fff;
                height: 0.8rem;
                width: 5rem;
                img {
                    height: 100%;
                }
            }
        }
        
    }
</style>