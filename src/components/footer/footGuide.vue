<template>
    <section id='foot_guide'>
        <router-link tag="div" to="/home" class="guide_item">
            <i class="iconfont icon-shouye-n icon_not"></i>
            <i class="iconfont icon-shouye-h icon_sele" ></i>
            <span>首页</span>
        </router-link>
        <router-link tag="div" to="/invest" class="guide_item">
            <i class="iconfont icon-touzhi-n icon_not"></i>
            <i class="iconfont icon-touzhi-h icon_sele"></i>
            <span>投标</span>
        </router-link>
        <router-link tag="div" :to="'/find'"  class="guide_item guide_find">
            <i class="iconfont icon-faxianweidianji icon_not"></i>
            <i class="iconfont icon-faxiandianji icon_sele" ></i>
            <span>发现</span>
        </router-link>
        <router-link tag="div" :to="'/account'"  class="guide_item">
            <i class="iconfont icon-zhuanghu-n icon_not"></i>
            <i class="iconfont icon-zhuanghu-h icon_sele" ></i>
            <span>账户</span>
        </router-link>
         <a class="guide_item guide_putongban" @click="goCommonPage">
            <i class="iconfont icon-putongban" ></i>
            <span>回普通版</span>
        </a>
    </section>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'
    import { getStore,setStore, cookie } from '@/config/mUtils';
    import { ssoLogin } from '@/server/getData.js'


    export default {
      data(){
            return{
                userId: '',
                token: ''
            }
        },
        mounted(){
            this.userId = getStore("userId");
            this.token = getStore("token");
        },
        computed: {
            ...mapState([
                'address','telphone','userInfo'
            ])
        },
        methods: {
            goCommonPage(){
                let userId, token;
                let ParamUserId = getStore("userId");
                ssoLogin( userId = ParamUserId, token = getStore("token") ).then( (res) => {
                    let data = res.data.data;
                    window.location.href = "https://" +  data.redirectUrl;
                } ).catch(function (error) {
                    console.log(error);
                 })
            },
        },
    }

</script>

<style lang="less" scoped>
    #foot_guide{
      background-color: #fff;
      position: fixed;
      z-index: 100;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 0.87rem;
      display: flex;
      box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    }
    .guide_item {
        display: block;
        flex: 1;
        height: 0.87rem;
        text-align: center;
        &.guide_putongban {
            background: url('./beijing_puton@3x.png') no-repeat center left;
            background-size: 1.6rem 1.6rem;
        }
        &.guide_find {
            i {
                font-size: 0.4rem;
            }
        }
        span {
          display: block;
          width: 100%;
          height: 0.4rem;
          line-height: 0.35rem;
          font-size: 0.18rem;
          color: #666;
        }
        i {
          display: block;
          width: 100%;
          height: 0.47rem;
          line-height: 0.6rem;
          font-size: 0.55rem;
          color: #666;
        }
        .icon_sele {
            display: none;
        }
        .icon-putongban {
            font-size: 0.38rem;
        }

    }
    .guide_item.router-link-active {
      span {
        color: #e25353;
      }
      .icon_sele {
        color: #e25353;
        display: block;
      }
      .icon_not {
        display: none;
      }
    }


</style>
