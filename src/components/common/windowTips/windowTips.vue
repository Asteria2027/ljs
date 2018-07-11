<template>
  <div>
    <transition name="tip-fade" mode="out-in">
      <div class="windowTips" v-if='txt' @touchmove.prevent>
        <div>{{txt}}</div>
      </div>
      <div v-if="status" class="rechargeStatus" @touchmove.prevent>
        <div v-if="status=='success'">
          <img src="./success.png" alt="">
          <p>{{text}}</p>
        </div>
        <div v-if="status=='processing'">
          <img src="./processing.png" alt="">
          <p>{{text}}</p>
        </div>
        <div v-if="status=='error'">
          <img src="./error.png" alt="">
          <p>{{text}}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      txt:'',
      status:0,
      text:'',
    };
  },
  methods:{
    toast(txt){
      this.txt = txt;
      setTimeout(() => {
        this.txt = '';
      }, 1500);
    },
    sendStatus(status,text){
      this.status = status;
      this.text = text;
      setTimeout(() => {
        this.status = '';
      }, 1500);
    }
  }
}

</script>

<style lang='less' scoped>

.tip-fade-enter-active, .tip-fade-leave-active {
  transition: opacity 0.3s;
}
.tip-fade-enter, .tip-fade-leave-active {
  opacity: 0;
}

.windowTips {
    position: fixed;
    top:0;
    left:0;
    height:100%;
    width: 100%;
    background: transparent;
    font-size: 0.24rem;
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    div {
      display: block;
      padding: 0.2rem 0.4rem;
      max-width: 3rem;
      word-wrap:break-word;
      word-break:break-all;
      border-radius: 0.05rem;
      min-height: 0.3rem;
      line-height: 0.35rem;
      text-align: center;
      background: rgba(1, 1, 1, 0.5);
      color: #FFFFFF;
    }
  }
  .rechargeStatus {
    position: fixed;
    top:0;
    left:0;
    height:100%;
    width: 100%;
    background: rgba(1, 1, 1, 0.4);
    font-size: 0.24rem;
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    div {
      text-align: center;
      background: #fff;
      padding: 0.4rem 1.2rem;
      border-radius: 0.1rem;
      img {
        height: 0.5rem;
        width: 0.5rem;
        padding-bottom: 0.2rem;
      }
    }
  }
</style>