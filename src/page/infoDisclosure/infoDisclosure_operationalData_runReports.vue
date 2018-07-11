

<template>
  
    <!-- 运营报告 -->
    <div class="runReports" ref="runReports"  id="scrollDiv">

        <h1 class="runReports_fixedTitle">
            {{fixedTitle}}
        </h1>
        <div class="runReports_list" v-for='(list, index) in reportMapList' :key="index" >
            <h1 ref="ListTitle" class="runReports_list_title">{{list.reportYear}}</h1>
            <a class="runReports_list_detail" :href="item.imgUrl"  v-for='(item, index) in list.reportList' :key="index">
                <img :src="'https://www.uf-club.com' + item.imgPath" alt="">
                <p>{{item.reportTitle}}</p>
                <span class="iconfont icon-more"></span>
            </a>
        </div>

    </div>
</template>

<script>
import { getReportListShow } from '@/server/getData.js';

export default {
  data () {
    return {
      reportMapList: {},
      fixedTitle: '',
      fixedTitleArr: [],
    };
  },

  mounted() {
    getReportListShow().then(res => {
      this.reportMapList = res.data.data.reportMapList;

      setTimeout(() => {
        let doms = document.querySelectorAll(".runReports_list_title")
          doms.forEach(element => {
            this.fixedTitleArr.push({ "offsetTop": element.offsetTop, "titleName": element.innerText})
          });
        this.handleScoll()
      }, 20);
    }).catch(function (err) {
      console.log(err);
    })
      
    window.addEventListener('scroll', this.handleScoll)

  },
  methods: {
    handleScoll() {
      let arr = this.fixedTitleArr;
      for (let i = 0; i < arr.length-1; i++) {
        if(window.scrollY >= arr[i].offsetTop && window.scrollY < arr[i+1].offsetTop) {
            this.fixedTitle = arr[i].titleName
        }
      }
      
    }

  }


}

</script>
<style lang='less' scoped>

 #title () {
      display: block;
      padding-left: 0.1rem;
      height: .45rem;
      line-height: .45rem;
      color: #666666;
      background-color: #f4f4f4
 }

.runReports {
  .runReports_fixedTitle {
    #title;
    position: fixed;
    top: 2.25rem;
    z-index: 10;
    width: 100%;
  }
  .runReports_list {
    .runReports_list_title {
      #title;
    }
    a.runReports_list_detail {
        display: block;
        display: flex;
        border-bottom: 1px solid #dddddd;
        height: 0.8rem;
        line-height: 0.8rem;
        >img {
          display: block;
          width: 0.7rem;
          padding: 0.12rem;
          padding-right: 0.2rem;
        }
        >p {
          display: block;
          flex: 1;
          height: 0.8rem;
          line-height: 0.8rem;
          color: #222222;
          font-size: 0.26rem;
        }
        >span {
          display: block;
          font-size: 0.23rem;
          padding-right: 0.15rem;
        }
      }
    
  }


}




</style>
