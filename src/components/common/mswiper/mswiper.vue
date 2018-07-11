<template>
  <header class="slide">
    <div class="swiper-container">
        <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for="(item, index) in bannerData" :key="index" @click='goUrl(item.pageUrl)'>
              <img :src="item.imgUrl" alt="">
            </li>
        </ul>
        <div class="swiper-pagination" id="indexPagination"></div>
      </div>
  </header>
</template>

<script type="text/ecmascript-6">

import Swiper from 'swiper'
import '@/style/swiper.min.css'

export default {
  props: {
    bannerData: {
      type: Array,
      default: []
    }
  },
  watch:{
    bannerData(newVal ,oldVal){
       if(newVal!=null){
         this.$nextTick(()=>{
          this._initSwiper();
         });
       } 
    }
  },
  methods:{
    _initSwiper(){
      var mySwiper =  new Swiper ('.swiper-container', {
        autoplay: 4000,//可选选项，自动滑动
        autoplayDisableOnInteraction : false,
        loop: true,
        pagination : '.swiper-pagination',
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true//修改swiper的父元素时，自动初始化swiper
      });
    },
    goUrl(url){
      top.location.href = url;
    }
  }
}

</script>
<style lang='less' scoped>

.slide .swiper-container {
      width: 100%;
      height: 3rem;
      position: relative;
      background: #fff;
      ul {
        height: 100%;
        li {
          width: 100%;
          height: 100%;
          float: left;
          img {
            display: block;
            display: inline-block;
            height:100%;
            width:100%;
          }
        }
      }
      #indexPagination>span.swiper-pagination-bullet {
        display: block;
        display: inline-block;
        width: 0.08rem;
        height: 0.08rem;
        background: #FFFFFF;
        opacity: 0.3;
      }
      #indexPagination>span.swiper-pagination-bullet-active {
        display: block;
        display: inline-block;
        opacity: 1;
        background: #fff;
      }
  }

</style>