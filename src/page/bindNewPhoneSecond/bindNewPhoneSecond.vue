<template>
  <div class="bindNewPhoneSecond">
    <mheader headTitle='绑定新手机' :goBack="'true'" class="borderBottom-1px"></mheader>
    <window-tips ref='windowTips'></window-tips>
    <div class="bindNewPhoneSecond-input">
      <ul>
        <li>
          <label>新手机号</label>
          <div class="borderBottom-1px">
            <input @keyup.13="bindNewPhoneSecondcheck" type="number" placeholder="请输入新手机号" v-model='phone' autocomplete="off" oninput="if(value.length>11)value=value.slice(0,11);if(!/^-?\d+\.?\d{0,2}$/.test(value))value=value.slice(0,value.length-1)">
          </div>
        </li>
      </ul>
    </div>
    <div class="bindNewPhoneSecond-enter" @click='bindNewPhoneSecondcheck'>下一步</div>
    <p class="hint2">绑定手机后，您的登录手机账号将会变成新绑定的手机号</p>
  </div>
</template>

<script>
import mheader from '@/components/header/header.vue'
import windowTips from '@/components/common/windowTips/windowTips.vue'  
import { regCheckPhone } from '@/server/getData.js'
import { encryptByDES } from '@/config/des_encryption.js'
import { mapState } from 'vuex';
import { getStore } from '@/config/mUtils';

export default {
  data () {
    return {
      phone:'',
    };
  },
  computed: {
    ...mapState([
        'userInfo'
    ]),
  },
  methods:{
    bindNewPhoneSecondcheck(){
      if(!this.phone){
        this.$refs.windowTips.toast('请输入新手机号');
        return;
      }
      let phoneNum;
      regCheckPhone(phoneNum=encryptByDES(this.phone)).then(res => { 
        if(res.data.code==1){
          this.$router.push(`bindNewPhone?newPhone=${this.phone}`);
        }else {
          this.$refs.windowTips.toast(res.data.msg);
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  components: {
    mheader,
    windowTips
  }
}

</script>

<style lang='less' scoped>

.bindNewPhoneSecond {
  min-height: 100%;
  width: 100%;
  box-sizing:border-box; 
  background: #f4f4f4;
  padding-top: 0.8rem;
  .bindNewPhoneSecond-input {
    margin-top: 0.24rem;
    background: #fff;
    li {
      display: block;
      display: flex;
      height: 0.8rem;
      line-height: 0.8rem;
      >label {
        display: block;
        height: 100%;
        font-size: 0.2rem;
        padding:0 0.2rem;
        width: 2rem;
      }
      >div {
        display: block;
        width: 100%;
        display: flex;
        font-size: 0.24rem;
        input {
          display: block;
          width: 100%;
          height: 100%;
          line-height: 0.8rem;
        }
        span {
          display: block;
          height: 100%;
          width: 2.8rem;
          text-align: center;
          color: #ff654f;
          position: relative;
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50% ,-50%);
          }
          i {
            font-size: 0.16rem;
            color: #666;
          }
        }
      }
    }
  }
  .bindNewPhoneSecond-enter {
    height: 0.76rem;
    line-height: 0.76rem;
    font-size: 0.3rem;
    text-align: center; 
    color: #ffffff;
    margin: 0.3rem 0.24rem 0.2rem;
    border-radius: 0.76rem;
    background: #ff654f;
  }
  p.hint2 {
    color: #999;
    font-size: 0.18rem;
    text-align: center;
  }
}
</style>