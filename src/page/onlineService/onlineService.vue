<template>
<div class="onlineService">
	<mheader headTitle='在线客服' :goBack="'true'" class="borderBottom-1px">
  </mheader>
  <div class="onlineServerce_header clearfix" id="onlineServerce_header">
      <div class="onlineServerce_header_item" v-for="(item, index) in questionTypeList" :key="item.key" @click="onlineServiceList(item.key)">
          <div class="img">
            <img :src="imgsrc[index]" >
          </div>
          <p>{{item.value}}</p>
        </div>
      </div>
      
    <div class="onlineService_detail">
      <ul class="onlineService_detail_ul" id="onlineService_detail_ul">
        <li v-for="(item, index) in questionAnswer" :key="index" @click="openAnswer(index)">
          <div class="title" :class="{open: isOpenArr.indexOf(index) > -1 }">{{item.title}} {{item.isOpen}}</div>
          <template v-if="isOpenArr.indexOf(index) > -1">
            <div class="content" v-html="item.content" >
            </div>
          </template>
      </li>
      </ul>
    </div>
    <div class="onlineServerce_footer">
      <span @click=" isDialog = true ">拨打电话</span>
      <span @click="staffService">人工客服</span>
      <!-- 人工客服需要引入的js -->
      <remote-js v-if="isGetXiaoNenJs" :jsUrl="`https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=${NTKF_PARAM.siteid}`" ></remote-js>
    </div>

    <Dialog :dialog= "dialog" @leftBtn='dialogLeftBtn' @rightBtn='dialogrightBtn' @tapMark="dialogTapMark" v-if="isDialog">
      <div class="onlineService_dialog">
        <p>客服电话 400-867-9888</p>
        <p>(0755-88607525)</p>
        <p class="gray">周一~周五 09:00-20:00</p>
        <p class="gray">周六~周日 09:00-12:00, 13:30-18:00</p>
      </div>
    </Dialog>

  </div>
</template>

<script>
import mheader from '@/components/header/header.vue'  
import Dialog from '@/components/common/dialog/dialog.vue'  
import RemoteJs from '@/components/common/remoteJs/remoteJs'
import { onlineServiceInit, onlineServiceList, getXiaoNeng} from "@/server/getData.js";
import { getStore } from '@/config/mUtils';
let userId, token,  NTKF_PARAM;

export default {
  data () {
    return {
      dialog: {
        btn: {
          leftText: '取消',
          rightText: '呼叫' 
        },
        width: '',
      },
      isDialog: false,
      imgsrc: [
          require('../../../static/images/onlineService/header1.png'),
          require('../../../static/images/onlineService/header2.png'),
          require('../../../static/images/onlineService/header3.png'),
          require('../../../static/images/onlineService/header4.png'),
          require('../../../static/images/onlineService/header5.png'),
          require('../../../static/images/onlineService/header6.png'),
      ],
      questionTypeList: '',
      questionAnswer:[],
      isOpenArr: [],
      cacheBox:{}, // 缓存请求请求问题和回答的数据,
      NTKF_PARAM: {},  //小能客服参数
      isGetXiaoNenJs: false
    };
  },
  mounted() {
    this.onlineServiceInit();
    this._getXiaoNeng();

  },
  methods: {
    dialogLeftBtn(){
      this.isDialog = false;
    },
    dialogrightBtn() {
      console.log(132);
      window.location.href = 'tel:4008679888'
    },
    dialogTapMark() {
      this.isDialog = false;
    },
    callPhone () {
      window.location.href = 'tel:0755637'
    },
    onlineServiceInit() {
      onlineServiceInit(token=getStore('token'), userId=getStore('userId')).then( (res) => {
        const data = res.data.data;
        this.questionTypeList = data.questionTypeList;
        this.onlineServiceList(this.questionTypeList[0].key);
      })
    },

    onlineServiceList(type) {
      if( !(type in this.cacheBox) ) {
        let questionType;
        onlineServiceList(token=getStore('token'), userId=getStore('userId'), questionType = type).then( (res) => {
          const data = res.data.data;
          this.questionAnswer = data.helpList; 
          this.cacheBox[type] = data.helpList;
        } ).catch( function (error) { 
          console.log(error);
        })
      }else {
        this.questionAnswer = this.cacheBox[type];
      }
    },  
    _getXiaoNeng() {
      getXiaoNeng(token=getStore('token'), userId=getStore('userId')).then((res) => {
        let data = res.data.data;
        this.NTKF_PARAM = data;
        window.NTKF_PARAM = this.NTKF_PARAM;
        this.isGetXiaoNenJs = true;
      }).catch(function (error) { 
        console.log(error);
      })
    },
    openAnswer(index) {
      const i = this.isOpenArr.indexOf(index);
      i == -1 ? this.isOpenArr.push(index) : this.isOpenArr.splice(i,1);
    },
    //人工客服
    staffService(){
      NTKF.im_openInPageChat(this.NTKF_PARAM.settingid);
    }
  },
  components: {
    mheader,
    Dialog,
    RemoteJs
  }
}

</script>
<style lang='less' scoped>
.onlineService {
  padding: 0.8rem 0;
  font-size: 0.24rem;
  .onlineServerce_header {
    display: block;
    padding: 0.3rem 0 0;
    border-bottom: 0.2rem solid #f4f4f4;
    .onlineServerce_header_item {
      float: left;
      width: 33%;
      text-align: center;
      padding-bottom: 0.18rem;
      .img {
        font-size: 0;
        img {
          width: 0.56rem;
        }
      }
      p {
        font-size: 0.2rem;
        line-height: 0.4rem;
      }
    }
  }
  .onlineService_detail {
    .onlineService_detail_ul {
      li {
        .title {
          padding: 12px 0.2rem;
          border-bottom: 1px solid #f4f4f4;
          position: relative;
          font-size: 0.24rem;
          &:after {
            width: 0;
            height: 0;
            border: 10px solid;
            content: '';
            display: block;
            position: absolute;
            border: 8px solid;
            right: 0.2rem;
            top: 50%;
            margin-top: -3px;
            border-color: #bebebe transparent transparent transparent;
          }
          &:before {
            width: 0;
            height: 0;
            border: 10px solid;
            content: '';
            display: block;
            position: absolute;
            border: 8px solid;
            right: 0.2rem;
            top: 50%;
            margin-top: -4px;
            z-index: 2;
            border-color: #fff transparent transparent transparent;
          }
          &.open {
            &:after {
              width: 0;
              height: 0;
              border: 10px solid;
              content: '';
              display: block;
              position: absolute;
              border: 8px solid;
              right: 0.2rem;
              top: 50%;
              margin-top: -14px;
              border-color: transparent transparent #bebebe  transparent;
            }
            &:before {
              width: 0;
              height: 0;
              border: 10px solid;
              content: '';
              display: block;
              position: absolute;
              border: 8px solid;
              right: 0.2rem;
              top: 50%;
              margin-top: -13px;
              z-index: 2;
              border-color: transparent transparent #fff transparent;
            }
          }
        }
        .content {
          padding: 0.2rem;
          overflow-y: auto;
          background-color: #f4f4f4;
          font-size: 12px;
          line-height: 20px;
          color: #999;
          p {
            line-height: 20px;
            color: #999;
            font-size: 12px;
          }
          img {
            width: 95%;
          }
        }
      }
    }
  }
  .onlineServerce_footer {
    width: 100%;
    position: fixed;
    background-color: #fff;
    left: 0;
    bottom: 0;
    border-top: 1px solid #ddd;
    span {
      box-sizing: border-box;
      text-align: center;
      font-size: 0.28rem;
      line-height: 0.8rem;
      color: #fb9809;
      display: block;
      width: 50%;
      float: left;
      &:first-child {
        border-right: 1px solid #dddddd;
      }
    }
  }
  .onlineService_dialog {
    padding: 0.3rem 0 0.2rem;
    text-align: center;
    font-size: 0.26rem; 
    line-height: 0.4rem;
    p:nth-child(2) {
      padding-bottom: 0.1rem;
    }
    .gray {
      color: #999;
    }
  }
}

</style>