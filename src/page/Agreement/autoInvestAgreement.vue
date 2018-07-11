<template>
  <div class="agreement">
      <mheader :headTitle = "'自动投标授权委托书'" :goBack="'true'" class="borderBottom-1px"></mheader>
      
      <div class="agreement_top">
        <p>委托人（出借人）：{{userName}}</p>
        <p>身份证号码：{{IDNO}}</p>
        <p>联金所平台用户名：{{REALNAME}}</p>
        <p>受托人：深圳前海联金所金融信息服务有限公司</p>
        <p>住所：深圳市前海深港合作前湾一路63号前海企业公馆B单元25栋2楼整层</p>

      </div>
        <div class="agreement_con" v-html="CONTENT">
            
        </div>
  </div>
</template>

<script>
import mheader from "@/components/header/header.vue";
import { getStore } from '../../config/mUtils';
import { getAutoDelegation } from '@/server/getData.js'


export default {
  data () {
    return {
        userName: '',
        IDNO: '',
        REALNAME: '',
        CONTENT: ''
    };
  },
  mounted() {
    this._getAutoDelegation();
  },
  methods: {
      _getAutoDelegation(){
          
          let userId = getStore('userId');
          let token = getStore('token');
          getAutoDelegation(userId, token).then(res => {
            if(res.data.code == 1) {
                this.userName = res.data.data.userName;
                this.IDNO = res.data.data.IDNO;
                this.REALNAME = res.data.data.REALNAME;
                this.CONTENT = res.data.data.CONTENT;
            }    
          }).catch(function (error) { 
              console.log(error);
        })
      }
  },
  components: {
      mheader
  }
}

</script>
<style lang='less' scoped>
    .agreement {
        font-size: 0.26rem;
        padding: 1rem 0.1rem;
        line-height: 0.5rem;
        .agreement_top {
            padding-bottom: 0.2rem;
        }
        .agreement_con {
            text-indent: 2em;
        }
    }


</style>