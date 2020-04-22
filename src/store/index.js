import Vue from 'vue'
import Vuex from 'vuex'
import { routes } from '../router/index'
Vue.use(Vuex)
console.log(routes)
export default new Vuex.Store({
  state: {
    sliderBar: {
      opened: false
    },
    routes
  },
  mutations: {
    TOGGLE_SLIDERBAR (state) {
      state.sliderBar.opened = !state.sliderBar.opened
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SLIDERBAR')
    }
  },
  modules: {
  }
})
