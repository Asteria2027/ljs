import wx from 'weixin-js-sdk'
import axios from 'axios'
import { getStore, setStore } from "@/config/mUtils";
import {
  baseUrl
} from '../config/env'

var wxApi = {
  methods: {
    wxRegister(callback) {
      const ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) != 'micromessenger') {
        return;
      } 
      let url;
      let userId = getStore('userId');
      let token = getStore('token');
      if(getStore('weiChatUrl')&&/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
        url = getStore('weiChatUrl');
      }else {
        url = window.location.href;
      }
      axios.post(`${baseUrl}/wap/wechatShare`, {
       userId, url
      }, { headers: { token }}).then((res) => {
        if(res.data.code==1){
          wx.config({
            debug: true, // 开启调试模式
            appId: res.data.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.data.signature, // 必填，签名，见附录1
            jsApiList: [
              'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
              'onMenuShareTimeline' // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        }
      }).catch((error) => {
        console.log(error)
      });
      wx.ready((res) => {
        // 如果需要定制ready回调方法
        if (callback) {
         callback()
        }
      })
    },
    /**
    * [ShareTimeline 微信分享到朋友圈]
    * @param {[type]} opstion [分享信息]
    * @param {[type]} success [成功回调]
    * @param {[type]} error   [失败回调]
    */
    ShareTimeline (opstion) { 
      wx.onMenuShareTimeline({
        title: opstion.title, // 分享标题
        link: opstion.link, // 分享链接
        imgUrl: opstion.imgUrl, // 分享图标
        success () {
          // 用户成功分享后执行的回调函数
          console.log('opstion.success')
          opstion.success()
        },
        cancel () {
          // 用户取消分享后执行的回调函数
          console.log('opstion.error')
          opstion.error()
        }
      })
    },
    ShareAppMessage (opstion) { 
      wx.onMenuShareAppMessage({
        title: opstion.title, // 分享标题
        link: opstion.link, // 分享链接
        imgUrl: opstion.imgUrl, // 分享图标
        success () {
          // 用户成功分享后执行的回调函数
          console.log('opstion.success')
          opstion.success()
        },
        cancel () {
          // 用户取消分享后执行的回调函数
          console.log('opstion.error')
          opstion.error()
        }
      })
    },

  }
}

export default wxApi;