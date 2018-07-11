<template>
    <div class="index">
        <nav class="index_nav">
          <ul>
            <li class="item" :class="{ 'active' : item.link == routePath }"  tag="li" v-for='(item, index) in infoList' :key="index" @click="changeNav(index,item.link)">
              <span>{{item.title}}</span>
            </li>
          </ul>
          <i class="iconfont icon-you-shuangjiantou"></i>
        </nav>
        
      <div class="index_routerBox">
        <transition name="router-fade" mode="out-in">
          <router-view >
          </router-view>
        </transition>
      </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      routePath: "/infoDisclosure/organizationInfo",
      infoList: [
        {
          title: "组织信息",
          link: "/infoDisclosure/organizationInfo"
        },
        {
          title: "备案信息",
          link: "/infoDisclosure/MPrecordInfo"
        },
        {
          title: "审核信息",
          link: "/infoDisclosure/auditInformation"
        },
        {
          title: "运营信息",
          link: "/infoDisclosure/operationalData/runReports"
        },
        {
          title: "风险管理信息",
          link: "/infoDisclosure/riskManagement/risk"
        },
        {
          title: "信披确认函",
          link: "/infoDisclosure/confirmInformation"
        },
        {
          title: "风险提示",
          link: "/infoDisclosure/riskTips"
        },
        {
          title: "合作机构",
          link: "/infoDisclosure/partners"
        }
      ]
    };
  },
  mounted() {
    this.getPath();
  },
  methods: {
    changeNav (index,path) {
        this.$router.replace(path)
        this.routePath = path
    },
    getPath(){
      this.routePath = this.$route.path
    }
  }, 
  watch: {
    '$route.path':'getPath'
  }
};
</script>

<style lang='less' scoped>
.index {
  font-size: 0.24rem;
  position: relative;
  height: 100%;
  width: 100%;
  nav {
      position: fixed;
      top: 0;
      left: 0;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      background-color: #F2F2F2;
      font-size: 0.24rem;
      z-index: 20;
      .iconfont {
        position: fixed;
        right: 0.05rem;
        top: 0rem;
        font-size: 0.2rem;
      }
    ul {

      li.item {
        padding: 0 0.29688rem;
        padding-bottom: 1px;
        color: #7c7c7c;
        display: inline-block;
        span {
          display: inline-block;
          position: relative;
        }
          &.active{
            span:after {
              content: '';
              display: inline-block;
              position: absolute;
              bottom: 0px;
              left: 0px;
              width: 100%;
              height: 2px;
              background-color: #ed5b00;
            }
          }


      }
    }
  }

  .index_routerBox {
    position: absolute;
    top: 0.6rem;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>