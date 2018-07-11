<template>
  <div class="registerSuccess">
    <mheader style='z-index:0;background-color:rgba(0,0,0,0);position:relative'>
      <span slot='logo' class="head_logo"></span>
    </mheader>
    <p>恭喜您，注册成功</p>
    <p>668元红包已经放入您的红包账户</p>
    <p>可在“<router-link to='/account'>会员中心</router-link>—<router-link to='/myWelfare'>我的福利</router-link>”中查看</p>
    <p>
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.usky.ljspro">点击下载APP</a>
    </p>
    <div>
      <img src="./wap_reg_suc_img.jpg">
    </div>
  </div>
</template>

<script>

import mheader from '@/components/header/header.vue'

export default {
  data () {
    return {
      
    }
  },
  components:{
    mheader
  }
}

</script>
<style lang='less' scoped>

.registerSuccess {
  position: relative;
  z-index: 1;
  box-sizing:border-box; 
  background:#ed0c3d;
  min-height: 100%;
  max-width: 6.4rem;
  margin: 0 auto;
  background-image: url('./register3_bg.jpg');
  background-repeat: no-repeat;
  background-position:center top;  
  background-size: 6.4rem;
  overflow: hidden;
  .head_logo {
    width: 4.84rem;
    height: 0.59rem;
    background-image: url('./wap_hb_logo.png');
    background-repeat: no-repeat;
    background-size: 2.95rem 0.46rem;
    background-position:left center;
    position: absolute;
    top: 50%;
    left:0.5rem;
  }
  >p {
    font-size: 0.4rem;
    text-align: center;
    color: #fff;
    &:nth-child(2) {
      margin-top: 1rem;
      margin-bottom: 0.4rem;
    }
    &:nth-child(3) {
      font-size: 0.35rem;
      margin-bottom: 0.4rem;
    }
    &:nth-child(4) {
      font-size: 0.3rem;
      margin-bottom: 0.5rem;
      a {
        color: #fff;
        border-bottom: 1px solid #fff;
        font-weight: bold;
      }
    }
    &:nth-child(5) {
      font-size: 0.35rem;
      margin-bottom: 0.5rem;
      a {
        color: #fff;
        display: block;
        margin: 0 auto;
        width: 2.5rem;
        padding: 0.2rem 0.3rem;
        border: 1px solid #fff;
        border-radius: 0.1rem;
      }
    }
  }
  >div {
    img {
      display: block;
      margin: 0 auto;
      width: 6.02rem;
      height: 4.75rem;
    }
  }
}

</style>