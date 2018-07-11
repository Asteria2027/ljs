<template>
  <div class="login">
    <mheader headTitle='登录' :goBack="'home'"></mheader>
    <div class='login-input'>
      <div class="borderBottom-1px">
        <input @keyup.13="enter" type="text" placeholder="手机/邮箱/用户名" v-model="user.name" autocomplete="off" maxlength="20">
      </div>
      <div>
        <input @keyup.13="enter" type="password" placeholder="密码" maxlength="25" v-model="user.pwd" autocomplete="off" onpaste="return false" onkeyup="this.value=this.value.replace(/^ +| +$/g,'')">
        <p class="forgetpwd"><router-link to='/changePwd'>忘记密码</router-link></p>
      </div>
    </div>
    <div class="login-enter" @click='enter'>登录</div>
    
    <div class="register"><router-link to='/register'>注册送668元红包及高收益特权</router-link></div>
    <window-tips ref='windowTips'></window-tips>
  </div>
</template>

<script type="text/ecmascript-6">

import mheader from '@/components/header/header.vue'
import windowTips from '@/components/common/windowTips/windowTips.vue'
import {mapMutations} from 'vuex'
import { wapLogin } from '@/server/getData.js'
import { encryptByDES } from '@/config/des_encryption.js'
import {setStore} from '@/config/mUtils'

export default {
  data () {
    return {
      user:{name:'',pwd:''}
    };
  },
  methods:{
    enter(){
      if(this.user.name==''){
        this.$refs.windowTips.toast('请输入账号');
        return
      }
      if(this.user.pwd==''){
        this.$refs.windowTips.toast('请输入密码');
        return
      }
      this.user.name = this.user.name.replace(/(^\s*)|(\s*$)/g, ""); 
      this.user.pwd = this.user.pwd.replace(/(^\s*)|(\s*$)/g, ""); 
      let openId ;
      let userName = encryptByDES(this.user.name);
      let password = encryptByDES(this.user.pwd);
      // let platForm = 'web_wap';
      let platForm = '3';
      //登录
      wapLogin(userName, password, platForm).then(res => {
        if(res.data.code==1){
          setStore('token',res.data.data.token);
          setStore('userId',res.data.data.userId);
          setStore('isOpenAcc',res.data.data.isOpenAcc);
          this.$router.push({path:'/account'});
        }else {
          this.$refs.windowTips.toast(res.data.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  components:{
    mheader,
    windowTips
  }
}

</script>

<style lang='less' scoped>

.login {
  box-sizing:border-box; 
  background: #f4f4f4;
  padding-top: 0.8rem;
  min-height: 100%;
  width: 100%;
  .login-input {
    margin-top: 0.24rem;
    background: #fff;
    >div {
      height: 0.8rem;
      margin-left: 0.24rem;
      line-height: 0.8rem;
      font-size: 0.24rem;
      input {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 0.8rem;
      }
    }
    >div:nth-child(2){
      height: 0.8rem;
      margin-left: 0.24rem;
      line-height: 0.8rem;
      font-size: 0.24rem;
      display: block;
      display: flex;
      input {
        display: block;
        flex: 1;
        height: 100%;
        line-height: 0.8rem;
      }
    }
  }
  .login-enter {
    height: 0.76rem;
    line-height: 0.76rem;
    font-size: 0.3rem;
    text-align: center;
    color: #ffffff;
    margin: 0.5rem 0.24rem 0.3rem;
    border-radius: 0.76rem;
    background: #ff654f;
  }
  .forgetpwd {
    text-align: right;
    padding-right: 0.24rem;
    font-size: 0.24rem;
    a {
      color: #4a97d2;
    }
  }
  .register {
    padding: 0.45rem 0.24rem 0;
    text-align: center;
    a {
      display: block;
      color: #ff5a21;
      font-size: 0.24rem;
    }
  }
}

</style>