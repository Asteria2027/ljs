<template>
  <div class="calendar">
   <mheader headTitle='回款日程' :goBack="'true'" class="borderBottom-1px">
     <template slot="calendar_logo">
       <div class="calendar_logo" @click="switchPage()">
        <i class="iconfont icon-rili" v-show="this.pageLocation == 'first'"></i>
        <i class="iconfont icon-rili-" v-show="this.pageLocation == 'second'"></i>
       </div>
     </template>
   </mheader>

    <router-view class="calendar_page">
    </router-view>
 
  </div>
</template>

<script>
import mheader from '@/components/header/header.vue'   
import { queryPayDateAmtDetails } from '@/server/getData.js'
import { getStore } from "@/config/mUtils";

export default {
  data () {
    return {
      pageLocation: "first",
      dateStr: '2018-05-30'
    };
  },
  mounted() {
    if(this.$route.path == "/returnedMoneyCalendar/second") {
      this.pageLocation = "second"
    }

    let userId, dateStr, token;
    queryPayDateAmtDetails(token=getStore('token'),userId=getStore('userId'), dateStr=this.dateStr).then(res => {
      // console.log(res);
    }).catch((error)=>{
      console.log(error);
    });

  },
  methods: {
    switchPage() {
      if(this.pageLocation == "first") {
        this.pageLocation = "second"
        this.$router.replace("/returnedMoneyCalendar/second")
      }else {
        this.pageLocation = "first"
        this.$router.replace("/returnedMoneyCalendar")
      }

    }
  },

  components: {
    mheader
  }
}

</script>
<style lang='less' scoped>
.calendar_logo {
  position: absolute;
  top: 0;
  right: 0.4rem;
  line-height: 0.8rem;
  font-size: 0.18rem;
  color: #222;

}
.calendar_page {
  padding-top: 0.8rem;
}

</style>