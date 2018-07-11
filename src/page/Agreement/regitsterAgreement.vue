<template>


  <!-- 联金所注册协议 -->
  <div class="agreement">
    <mheader :headTitle = 'title' :goBack="'true'" class="borderBottom-1px"></mheader>
      <div class="agreement_con" v-html="content">

      </div>
  </div>
</template>


<script>
import mheader from "@/components/header/header.vue";

import { querytipM } from '@/server/getData.js'

export default {
  data () {
    return {
      title: '',
      content: ''
    };
  },
  mounted() {
    querytipM().then((res) => {
      let data = res.data.data;
      this.title = data[0].title;
      this.content = data[0].conent;

    }).catch(function (error) { 
      console.log(error);
     })
  },
  components: {
    mheader
  }
}

</script>
<style lang='less' scoped>
  .agreement {
    font-size: 0.24rem;
    .agreement_con {
      padding:  1.3rem 0.1rem 0.5rem;
    }
  }

</style>