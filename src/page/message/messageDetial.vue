<template>
  <div class="mesageDetail">
    <mheader headTitle='消息' :goBack="'true'" class="borderBottom-1px">
      <router-link tag='div' :to='`/message?readedId=${newId}`' slot='right' class="right" v-if="$route.query.fromHome==1">消息列表</router-link>
    </mheader>
      <div class="mesageDetail_title">
        <h1>{{title}}</h1>
        <p class="mesageDetail_title_time">{{publishTime}}</p>
        </div>
      <div class="mesageDetail_con" v-html="content">
      </div>
  </div>
</template>

<script>
import mheader from '@/components/header/header.vue' 
import { frontNewsDetails } from '@/server/getData.js'
import { getStore, setStore } from "@/config/mUtils";
let userId, newId, readedIdStore;
export default {  
  data () {
    return {
      content: '',
      title: '',
      publishTime: '',
      newId:''
    };
  },
  mounted() {
    this.frontNewsDetails();
  },
  methods: {
    frontNewsDetails() {
      this.newId = this.$route.params.id
      frontNewsDetails( newId = this.$route.params.id).then((res)=>{
        let data = res.data.data
        this.content = data.paramMap.content;
        this.title =  data.paramMap.title;
        this.publishTime =  data.paramMap.publishTime;
      }).catch(function (error) { 
        console.log(error);
      })
    },

  },
  components: {
    mheader
  }
}

</script>
<style lang='less' scoped>
  .mesageDetail {
    padding-top: 0.8rem;
    font-size: 0.24rem;
    .mesageDetail_title {
      padding: 0.3rem 0 0.5rem;
      text-align: center;
      h1 {
        font-size: 0.28rem;
        line-height: 0.6rem;
        font-weight: bold;
      }
      .mesageDetail_title_time {
        font-size: 0.24rem;
        line-height: 0.3rem;        
        color: #999;
      }
    }
    .mesageDetail_con {
      padding: 0.1rem;
      font-size: 0.24rem;
      line-height: 28px;
    }
  }
  .right {
  font-size: 0.2rem;
  position: absolute;
  top:0;
  right:0.4rem;
  line-height: 0.8rem;
  color: #222;
} 

</style>