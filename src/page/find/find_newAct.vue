<template>
  <div class="newAct">
    <mheader headTitle='最新活动' :goBack="'true'"  class="borderBottom-1px"></mheader>
    <div @click="goDetail(item)" v-for="(item, index) in latestEventList" class="newAct_con" :key="index">
        <div class="newAct_con_item">
            <div class="banner">
                <img :src="item.picSrc" alt="">
            </div>
            <div class="word">
                <h1>{{item.title}}</h1>
                <p>{{item.intro}}</p>
            </div>
        </div>
    </div>
    <not-data v-if='latestEventList.length==0'>
      <div slot='hint' style='font-size: 0.23rem; text-align: center;color: #9d9d9d;'>暂无最新活动</div>
    </not-data>
  </div>
</template>

<script>

import mheader from "@/components/header/header.vue";
import notData from '../../components/common/notData/notData.vue'
import { latestEventInit } from '@/server/getData.js'


export default {
  data () {
    return {
      latestEventList:[]
    };
  },
  mounted() {
    this._latestEventInit();
  },
  methods: {
    _latestEventInit () {
      latestEventInit().then((res) => {

        if(res.data.code == 1) {
          let data = res.data.data;
          this.latestEventList = data.latestEventList;
        }
      }).catch(

      )
      
    },
    goDetail(item){
      window.location.href = item.mobileHref;
    }
  },
  components:  {
    mheader,
    notData
  }
}

</script>
<style lang='less' scoped>
    .newAct {
      font-size: 0.24rem;
      padding-top: 0.8rem;
      .newAct_con {
        margin: 0.36rem 0.24rem;
        .newAct_con_item {
          box-shadow: 0px 0px 5px #ddd;
          border-radius: 0.15rem;
          .banner {
            height: 3.27rem;
            width: 5.92rem;
            border-top-left-radius: 0.15rem;
            border-top-right-radius: 0.15rem;
            img {
              width: 100%;
              border-top-left-radius: 0.15rem;
              border-top-right-radius: 0.15rem;
            }
          }
          .word {
            padding: 0.24rem 0.09rem;
            border-top: 0;
            border-bottom-left-radius: 0.15rem;
            border-bottom-right-radius: 0.15rem;
            h1 {
              font-size: 0.26rem;
              line-height: 0.44rem;
              color: #222;
            }
            p {
              color: #999;
              font-size: 0.2rem;
              line-height: 0.38rem;
            }
          }

        }
      }
    }

</style>