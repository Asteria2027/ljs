<template>
  <div class="find">
      <div class="find_banenr" @click="goPageUrl">
        <img :src="imgUrl"  alt="">
      </div>
      <div class="find_nav">
        <div class="find_nav_item find_nav_bbs" @click="gobbs">
          论坛
        </div>
        <router-link class="find_nav_item find_nav_runReport" tag="div"  to="/infoDisclosure/operationalData/runReports" >
          运营报告
        </router-link>
      </div>

      <div class="find_menu">
        <ul>
          <li tag="li" @click="goNewAct" class="find_menu_newAct">
            <i class="iconfont icon-faxianzuixinhuodong"></i>
            <span>最新活动</span> 
            <span v-if="isNewAct" class="redDot"></span>
            <i class="iconfont icon-more"></i>
          </li>
          <router-link tag="li" to='/find_aboutUs'>
            <i class="iconfont icon-faxianguanyuwomen"></i>
            <span>关于我们</span> 
            <i class="iconfont icon-more"></i>
          </router-link>
          <router-link tag="li" to="/onlineService">
            <i class="iconfont icon-faxianrengongkefu"></i>
             <span>在线客服</span>
            <i class="iconfont icon-more"></i>
          </router-link>

        </ul>
      </div>
      <foot-guide></foot-guide>
  </div>
</template>

<script>
import footGuide from "@/components/footer/footGuide.vue";
import mheader from "@/components/header/header.vue";
import { queryLatestEvent, bbsWapLogin } from '@/server/getData.js'
import { getStore, setStore } from '../../config/mUtils';
let userId, token;
export default {
  data () {
    return {
      isNewAct: false,
      newActId: '',
      imgUrl: '',
      pageUrl: '',
    };
  },
  mounted() {
    this._queryLatestEvent();
  },
  methods: {
    gobbs() {
      bbsWapLogin(userId = getStore('userId')).then((res) => {
        if(res.data.code == 1) {
          console.log(res.data.data.referrer);
          alert('进入联金论坛')
          window.location.href = res.data.data.referrer;
          
        }
      }).catch(function (error) {
        console.log(error);
      })
    },
    goPageUrl() {
      window.location.href = this.pageUrl;
    },
    _queryLatestEvent() {
      queryLatestEvent(userId = getStore('userId'), token = getStore('token')).then((res) => {
        if(res.data.code == 1) {
          this.newActId = res.data.data.id;
          this.imgUrl = res.data.data.imgUrl;
          this.pageUrl = res.data.data.pageUrl;
          if(getStore('newActId')) {
            let id = getStore('newActId')
            if( id == this.newActId ) {
              this.isNewAct = false
            }else {
              this.isNewAct = true
            }
          }else {
            setStore('newActId', this.newActId)
          }
        }
      }).catch(function (error) { 
        console.log(error);
      })
    },
    goNewAct(){
      setStore('newActId', this.newActId);
      this.$router.push('/find_newAct');
    }
  },
  components: {
    footGuide,
    mheader
  }
}

</script>
<style lang='less' scoped>
  .find {
    background-color: #f4f4f4;
    font-size: 0.24rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    .find_banenr {
      height: 3rem;
      img {
        width: 100%;
      }
    }
    .find_nav {
      background-color: #fff;
      padding: 0.13rem 0;
      display: block;
      display: flex;
      margin-bottom: 0.2rem;
      .find_nav_item {
        color: #262626;
        font-size: 0.26rem;
        flex: 1;
        text-align: center;
        line-height: 0.75rem;
        &.find_nav_bbs {
          border-right: 1px solid #ddd;
        }
      }

      .find_nav_runReport {

      }
    }
    .find_menu {
      background-color: #fff;
      li {
        height: 0.88rem;
        line-height: 0.88rem;
        font-size: 0.24rem;
        border-bottom: 1px solid #f4f4f4;
        &:last-child {
          border-bottom: none;
        }
        i:first-child {
          color: #fed377;
          padding: 0 0.24rem;
        }
        i:last-child {
          float: right;
          padding-right: 0.1rem;          
        }
      }
      .find_menu_newAct {
        position: relative;
        .redDot {
          position: absolute;
          display: block;
          width: 0.1rem;
          height: 0.1rem;
          background-color: red;
          border-radius: 50%;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-0.05rem)
        }

      }
    }
  }
</style>