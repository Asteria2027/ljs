import {
	RECORD_PINFOR,
	ADD_CART,
	REDUCE_CART,
	INIT_BUYCART,
	CLEAR_CART,
	RECORD_USERINFO,
	GET_USERINFO,
	OUT_LOGIN
} from './mutation-types'

import { setStore, getStore, removeStore,  cookie} from '../config/mUtils'


export default {
	// 记录当前个人用户信息
	[RECORD_PINFOR](state, {
		address,
		telphone
	}) {
		state.address = address;
		state.telphone = telphone;
	},
	// 加入购物车
	[ADD_CART](state, {
		author,
		shopid,
		name,
		price
	}) {
		let cart = state.cartList;
		let shop = cart[shopid] = (cart[shopid] || {});
		let translator = shop[author] = (shop[author] || {});
		if (translator[name]){
			translator[name]['num']++;
		}else {
			translator[name] = {
				num:1,
				"price": price,
			};	
		}
		state.cartList = {...cart};
		//存入localStorage
		setStore('buyCart', state.cartList);
	},
	// 移出购物车
	[REDUCE_CART](state, {
		shopid,
		author,
		name
	}) {
		let cart = state.cartList;
		let shop = cart[shopid] = (cart[shopid] || {});
		let translator = shop[author] = (shop[author] || {});
		if (translator && translator[name]) {
			if (translator[name]['num'] > 0) {
				translator[name]['num']--;
				state.cartList = {...cart};
				//存入localStorage
				setStore('buyCart', state.cartList);
			} else {
				//商品数量为0，则清空当前商品的信息
				translator[name] = null;
			}
		}
	},
	//网页初始化时从本地缓存获取购物车数据
	[INIT_BUYCART](state) {
		let initCart = getStore('buyCart');
		if (initCart) {
			state.cartList = JSON.parse(initCart);
		}
	},
	//清空当前商品的购物车信息
	[CLEAR_CART](state, shopid) {
		state.cartList[shopid] = null;
		state.cartList = {...state.cartList};
		setStore('buyCart', state.cartList);
	},
	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		// setStore('user', JSON.stringify(info));
	},
	//获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		if (info.data.code==1 ){
			state.userInfo = { ...info.data.data };
		}else {
			if(getStore('token')){
				removeStore('token');
			}
			if(getStore('userId')){
				removeStore('userId');
			}
			if(getStore('isOpenAcc')){
				removeStore('isOpenAcc');
			}
			if(getStore('DetailData')){
				removeStore('DetailData');
			}
			state.userInfo = null;
		}
	},
	//退出登录
	[OUT_LOGIN](state){

		if(getStore('token')){
			removeStore('token');
		}
		if(getStore('userId')){
			removeStore('userId');
		}
		if(getStore('isOpenAcc')){
			removeStore('isOpenAcc');
		}
		if(getStore('DetailData')){
			removeStore('DetailData');
		}
		if(getStore('hideAssets')){
			removeStore('hideAssets');
		}
		state.userInfo = null;
	}
}
