import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sliderBar: {
      opened: false
    }
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
