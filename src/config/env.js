/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseUrl = `${protl}//172.16.2.118:8780`;//姚雯本地
 * baseUrl = `${protl}//172.16.2.113:8780`; // 李栋本地
 */

let baseUrl = '';
let routerMode = 'history';
let protl = 'http:'

if (location.protocol == 'https:') {
	protl = 'https:'
}

if(location.hostname=='172.16.2.22'){
	var vconsole = require('vconsole')
	var vConsole = new vconsole();
	baseUrl = `${protl}//172.16.2.22:8780`;
	console.log('172.16.2.22:8780', baseUrl)
}else if(location.hostname=='172.16.2.24'){
	var vconsole = require('vconsole')
	var vConsole = new vconsole();
	baseUrl = `${protl}//172.16.2.24:8780`;
	console.log('172.16.2.24', baseUrl)
}else if(location.hostname=='119.136.25.130'){
	var vconsole = require('vconsole')
	var vConsole = new vconsole();
	baseUrl = location.origin;
	console.log('119.136.25.130', baseUrl)
}else if (process.env.NODE_ENV == 'development') {
	var vconsole = require('vconsole')
	var vConsole = new vconsole();
	baseUrl = `${protl}//172.16.2.22:8780`;
	console.log('development', baseUrl)
} else {
	if (process.env.type === 'test') {
		var vconsole = require('vconsole')
		var vConsole = new vconsole();
		baseUrl = `${protl}//172.16.2.22:8780`;
		console.log('test', baseUrl)
	} else if (process.env.NODE_ENV == 'production') {
		baseUrl = `${protl}//www.uf-club.com`;
		console.log('production', baseUrl)
	}
}



export {
	baseUrl,
	routerMode,
}
