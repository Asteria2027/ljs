<template>

  <!-- 风险揭示书 -->
  <div class="agreement">
    <mheader :headTitle = 'title' :goBack="'true'" class="borderBottom-1px"></mheader>
      <div class="agreement_con" v-html="content">

      </div>

      <div class="agreement_time">
           <p>授权日期： <span id="span_year">2016</span> 年 <span id="span_month">12</span> 月 <span id="span_day">1</span> 日</p>
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
      this.title = data[2].title;
      this.content = data[2].conent;
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
    font-size: 0.28rem;
    line-height: 0.5rem;
    .agreement_con {
      padding:  1.3rem 0.1rem 0.5rem;
    }
    .agreement_time {
      text-align: right;
      color: #666;
      padding-bottom: 0.2rem;
    }
  }

</style>