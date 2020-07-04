import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        userName: ''
      },
      mutations: {
        setUserName (state, val) {
          state.userName = val
        }
      },
      actions: {
        setUserName ({ commit }, val) {
          commit('setUserName', val)
        }
      }
})