<template>
  <div class="notFound">
    <div>对不起，没有找到您要的网页</div>
    <div class="logo"></div>
    <div @click='goHome'>返回首页</div>
  </div>
</template>

<script>
  export default {
  methods:{
    goHome(){
      this.$router.push({path:'/home'});
    }
  }
}
</script>

<style lang='less' scoped>
.notFound {
  font-size: 0.24rem;
  text-align: center;
  line-height: 2.6rem;
  color: sandybrown;
  .logo {
    margin: 0 auto;
    overflow: hidden;
    margin-bottom: 0.2rem;
    width: 1.4rem;
    height: 2.4rem;
    background: url("./nont_img.jpg") no-repeat  center bottom;
    background-size:100%;
  }
  div:nth-child(3) {
    color: #fe6246;;
  }
}

</style>