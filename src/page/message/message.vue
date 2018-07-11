<template>
  <div class="message">
      <mheader headTitle='消息' :goBack="'true'" class="borderBottom-1px">
      </mheader>
      <div class="message_list" ref='message_list'>
        <ul>
          <li class="message_list_li borderBottom-1px" @click="readed(item.id)" v-for="(item, index) in messageList" :key="index">
            <h1 class="caption" :class="{'readed':  readedId.indexOf(item.id) != -1 }">{{item.title}} </h1>
            <p class="time">{{item.publishTime}}</p>
          </li>
        </ul>
      </div>
      <div class="message_loadMore">{{loadMoreTip}}</div>
  </div>
</template>

<script>
import mheader from '@/components/header/header.vue'   
import { queryNewsList, allMarkRead } from '@/server/getData.js'
import { getStore , setStore } from "@/config/mUtils";
import transactionDetailsVue from '../transactionDetails/transactionDetails.vue';
let userId, token, pageNum, pageSize;
let readedIdStore = {}; 

export default {
  data () {
    return {
      loadMoreTip: '上拉加载',
      messageList: [],
      pageNum: 1,
      pageSize: 15,
      readedId: [], // 已经读过的消息的id
      isload: true, //能否加载滚动
    };
  },
  beforeRouteEnter( to, from, next){
    if(from.name == 'messageDetial'){
      next( vm => {
        window.addEventListener('scroll', vm.loadMore);       
        if(vm.$route.query.readedId) {
          vm.setReadedIdStore(Number(vm.$route.query.readedId))
        }
      })
    }else {

      next(vm => {
        vm.initData();
        vm._queryNewsList()
        window.addEventListener('scroll', vm.loadMore);
      });

    }
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener('scroll',this.loadMore)
    next()
  },

  mounted() {
    this.initData()
    this._queryNewsList()
    window.addEventListener('scroll', this.loadMore);
  },

  methods: {
    _queryNewsList() {

        queryNewsList( pageNum = this.pageNum, pageSize= this.pageSize).then( (res)=>{            
          let data = res.data.data
          this.messageList = this.messageList.concat(data.noticeList)
          this.pageNum ++;
        });
  
    },
    loadMore(){

      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.body.clientHeight;
      if(this.$refs.message_list.offsetHeight-clientHeight<(Number(scrollTop)+10) && this.isload){ 
        this.isload = false
        this.loadMoreTip = '加载中...'
        queryNewsList( pageNum = this.pageNum, pageSize= this.pageSize).then( (res)=>{            
          let data = res.data.data
          if(data.noticeList.length != 0){
            this.messageList = this.messageList.concat(data.noticeList)
            this.pageNum ++;
            this.loadMoreTip = '上拉加载'
            this.isload = true
          }else {
            this.loadMoreTip = '加载完毕,没有更多消息了'
          }
        });
      }

    },
    readed(id) {
      this.setReadedIdStore(id)      
      let url = '/messageDetial/'+id
      this.$router.push(url);
    },
    // 把用户读过的id存起来
    setReadedIdStore(id) {
      readedIdStore = JSON.parse(getStore('readedIdStore')) || {};
      readedIdStore[userId] = readedIdStore[userId] || [];
      if(readedIdStore[userId].indexOf(id) == -1) {
        readedIdStore[userId].push( id );
      }
      this.readedId = readedIdStore[userId]
      setStore( 'readedIdStore', readedIdStore)
    },

    // 重置数据
    initData() {
      this.loadMoreTip = '加载更多'
      this.pageNum = 1
      this.pageSize = 15
      this.messageList = []
      this.isload = true;

      userId = getStore('userId');
      readedIdStore = JSON.parse(getStore('readedIdStore')) || {};
      console.log(readedIdStore); 
      this.readedId = readedIdStore[userId] || [];
    }
  },
  destroyed(){
    window.removeEventListener('scroll', this.loadMore)
  },
  components: {
    mheader
  }
}

</script>
<style lang='less' scoped>
  .message {
    font-size: 0.24rem;
    padding-top: 0.8rem;
    .message_list {
      .message_list_li {
        padding: 0.1rem 0 0.1rem 0.2rem;
        .caption {
          color: #222;
          font-size: 0.26rem;
          line-height: 0.4rem; 
          &.readed {
            color: #ddd;
          }
        }
        .time {
          color: #999;
           font-size: 0.22rem;
           line-height: 0.3rem; 
        }
      }
    }
    .message_loadMore {
      text-align: center;
      background-color: #f5f5f5;
      font-size: 0.26rem;
      line-height: 0.7rem;
    }
  }
</style>