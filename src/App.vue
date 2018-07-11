<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { setStore, removeStore, getUrlParam } from './config/mUtils.js';
import './config/mustRequirements';

export default {
  name: "App",
  mounted() {
    // const ua = window.navigator.userAgent.toLowerCase();
    // if(ua.match(/MicroMessenger/i) == 'micromessenger'&&/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //   if(window.location.pathname=='/wapfront'||window.location.pathname=='/wapfront/'){
    //     setStore('weiChatUrl',window.location.origin+'/wapfront/home');
    //   }else {
    //     setStore('weiChatUrl',window.location.href);
    //   }
    // }

    let token = getUrlParam("token");
    let userId = getUrlParam("userId");
    if(userId && token ){
        if(userId == 'null' && userId == 'null'){
          removeStore('userId');
          removeStore('token');
          this.Exit();
        }else {
          setStore('userId', userId);
          setStore('token', token);
        }
        if(!(location.pathname.split('/wapfront/')[1]=='account')){
          this.getUserInfo().catch((err)=>{
            console.log('AppGetUserInfo',err);
            this.Exit();
          });
        }
        if(getUrlParam("borrowId")&&getUrlParam("subjectType")){
          this.$router.replace(`${location.pathname.split('/wapfront/')[1]}?borrowId=${getUrlParam("borrowId")}&subjectType=${getUrlParam("subjectType")}`);
        }else {
          this.$router.replace(location.pathname.split('/wapfront/')[1]);
        }
    } else {
      this.getUserInfo().catch((err)=>{
        console.log('AppGetUserInfo',err);
        this.Exit();
      })
    }
  },
  
  methods: {
    ...mapActions(["getUserInfo"],["Exit"]),
    // ...mapMutations([
    //   'OUT_LOGIN'
    // ]),
  }
};
</script>

<style>
@import url("./style/reset.css");
@import url("./font/iconfont.css");
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
#app {
  height: 100%;
  width: 100%;
}



</style>
