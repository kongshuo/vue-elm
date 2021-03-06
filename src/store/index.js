import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
Vue.use(Vuex)
const state = {
  setUserInfo: '', // 储存用户信息
  getUserInfo: '', // 获取用户信息
  isLogin: false, // 用户是否已经登录
  newAddress: '', // 收获地址选择
  geohash: '31.22299,121.36025', // 当前定位经纬度
  afterAddress: [], // 已经添加到列表中的收获地址
  questions: null, // 服务中心问题标题
  foodsList: null // 商品选择数量
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
