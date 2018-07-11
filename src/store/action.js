import { myHomeDate, wapExit } from '../server/getData'
import { GET_USERINFO,OUT_LOGIN } from './mutation-types.js'
import { getStore } from '@/config/mUtils'

export default {

	async getUserInfo({
		commit,
		state
	}) {
		commit(GET_USERINFO, await myHomeDate(getStore('token'), getStore('userId')))
	},
	async Exit({
		commit,
		state
	}) {
		commit(OUT_LOGIN, await wapExit())
	}
	
}