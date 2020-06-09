import Vue from 'vue';
import Vuex from 'vuex';
// import { asyncRouterMap } from '../router/index'
import permission from './modules/permission';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sliderBar: {
      opened: false,
    },
  },
  mutations: {
    TOGGLE_SLIDERBAR(state) {
      state.sliderBar.opened = !state.sliderBar.opened;
    },
  },
  actions: {
    toggleSideBar: ({ commit }) => {
      commit('TOGGLE_SLIDERBAR');
    },
  },
  modules: {
    permission,
    user,
  },
  getters: {
    addRouters: (state) => state.permission.addRouters,
    routers: (state) => state.permission.routers,
  },
});
