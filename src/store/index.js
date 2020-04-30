import Vue from 'vue'
import Vuex from 'vuex'
import { routes } from '../router/index'
Vue.use(Vuex)
const currentRoute = []
currentRoute.push(Object.assign({}, routes[0]), routes[0].children[0])
console.log(routes)
currentRoute[0].children = []
export default new Vuex.Store({
  state: {
    sliderBar: {
      opened: false
    },
    routes,
    currentRoute: currentRoute
  },
  mutations: {
    TOGGLE_SLIDERBAR (state) {
      state.sliderBar.opened = !state.sliderBar.opened
    },
    SET_CURRENTROUTER (state, val) {
      state.currentRoute = val
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SLIDERBAR')
    },
    SET_CURRENTROUTER: ({ commit }, val) => {
      commit('SET_CURRENTROUTER', val)
    }
  },
  modules: {
  }
})
