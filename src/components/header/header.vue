<template>
   <header id='head_top'>
        <slot name='logo'></slot>
        <slot name='back'></slot>
        <section class="head_goback" v-if="goBack" @click="back(goBack)">
            <i class="iconfont icon-back"></i>
        </section>
        <section class="title_head omitted" v-if="headTitle">
            <span class="title_text">
              {{headTitle}}
              <i class="iconfont icon-moreunfold" v-if="!fold&&headlineArrow"></i>
              <i class="iconfont icon-less" v-if="fold&&headlineArrow"></i>
            </span>
        </section>
        <slot name="home_register"></slot>
        <slot name="menu"></slot>
        <slot name="InstructionsForuse"></slot>
        <slot name='myTender_filter'></slot>
        <slot name="calendar_logo"></slot>
        <slot name='right'></slot>
    </header>
</template>

<script type="text/ecmascript-6">
import {mapState, mapActions} from 'vuex'
    export default {
      props: {
        headTitle: {
          type:String,
          default:''
        },
        headlineArrow: {
          type:Boolean,
          default:false
        },
        fold: { // 箭头是否展开
          type:Boolean,
          default:false
        },
        goBack: {
          type:String,
          default:''
        }
      },
      methods:{
        back(goback){
          if(!goback){ return; }
          if(goback=='true'){
            if (window.history.length <= 1) {
              // console.log('<=1')
              this.$router.push('/')
            }else {
              // console.log('/',window.history.length)
              this.$router.go(-1);
            }
          }else {
            this.$router.push(goback);
          }
        }
      }
    }
</script>
<style lang='less' scoped>
    #head_top{
      background-color: #ffffff;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 0.8rem;
    }
    .head_goback{
      font-size: 0.35rem;
      width: 0.6rem;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
    }   
    .title_head{
      position: absolute;
      height: 0.8rem;
      line-height: 0.8rem;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 50%;
      text-align: center;
      .title_text{
          display: block;
          height: 0.8rem;
          font-size: 0.26rem;
          text-align: center;
          font-weight: bold;
          i {
            height: 100%;
            font-size: 0.23rem;
          }
      }
    }
</style>