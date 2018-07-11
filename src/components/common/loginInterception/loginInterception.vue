<template>
    <div class="loginInterception">
      <div></div>
      <router-link tag="p" to="/login"><span>登录</span>后显示</router-link>
    </div>
</template>
<style lang="less" scoped>
  .loginInterception {
    display: block;
    position: fixed;
    height:100%;
    width: 100%;
    background: #F5F5F5;
    font-size: 0.13rem;
    color: #ACACAC;
    text-align:center;
    z-index: 9999;
    div {
      margin: 0 auto;
      overflow: hidden;
      padding-top: 2.5rem;
      margin-bottom: 0.2rem;
      width: 1.4rem;
      height: 2.4rem;
      background: url("./nont_img.jpg") no-repeat  center bottom;
      background-size:100%;
    }
    p {
      font-size: 0.24rem;
      span {
        color: #007aff;
      }
    }
  }
</style>
