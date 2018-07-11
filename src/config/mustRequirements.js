import { getUrlParam, isMobile, setStore } from './mUtils.js';

//第三方跳转所带参数传入注册页
if(getUrlParam("utm_source")){
  sessionStorage.setItem('utm_source',getUrlParam("utm_source"));
}

//微信分享所需地址
const ua = window.navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i) == 'micromessenger'&&/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
  if(window.location.pathname=='/wapfront'||window.location.pathname=='/wapfront/'){
    setStore('weiChatUrl',window.location.origin+'/wapfront/home');
  }else {
    setStore('weiChatUrl',window.location.href);
  }
}

//移动端强制跳转pc
if(!isMobile){
  if(window.location.host=='www.uf-club.com'&&(location.pathname=='/wapfront/register'||location.pathname=='/wapfront/registerPrize')){
    window.location.href='https://www.uf-club.com/registerlanding.do'+window.location.search;
  }else if((window.location.host=='172.16.2.25')&&(location.pathname=='/wapfront/register'||location.pathname=='/wapfront/registerPrize')){
    window.location.href='https://172.16.2.25/registerlanding.do'+window.location.search;
  }else if((window.location.host=='172.16.2.24')&&(location.pathname=='/wapfront/register'||location.pathname=='/wapfront/registerPrize')){
    window.location.href='https://172.16.2.24/registerlanding.do'+window.location.search;
  }else if(window.location.host=='119.136.25.130'&&(location.pathname=='/wapfront/register'||location.pathname=='/wapfront/registerPrize')){
    window.location.href='https://119.136.25.130:8000/registerlanding.do'+window.location.search;
  }else if(window.location.host=='www.uf-club.com'){
    window.location.href='https://www.uf-club.com'+window.location.search;
  }else if(window.location.host=='172.16.2.25'||window.location.host=='172.16.2.101:9000'){
    window.location.href='https://172.16.2.25'+window.location.search;
  }else if(window.location.host=='119.136.25.130') {
    window.location.href='https://119.136.25.130:8000'+window.location.search;
  }
}