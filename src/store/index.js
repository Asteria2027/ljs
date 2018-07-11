import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	address: '', // 当前位置
	telphone: '', // 手机号码
	cartList: {}, // 加入购物车的商品列表
	shopid: null,//商品id
	author: null,//作者
	name: null,//名字
	userInfo: null, //用户信息
	price: null, //价格
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})