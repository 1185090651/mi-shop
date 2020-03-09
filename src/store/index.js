import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profileInfo: {}
  },
  mutations: {
    saveProfile: (state, userInfo) => {
      state.profileInfo = userInfo
    }
  },
  getters: {
   showProfile: (state) => {
     return state.profileInfo
   }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]  //加上这个就可以了
})
