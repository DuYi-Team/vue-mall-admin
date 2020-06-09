import { getUser, setUser, removeUser } from '@/utils/auth';
import api from '@/api/user';

const user = {
  state: {
    name: getUser(),
    avatar: '',
    roles: [],
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
  },
  actions: {
    login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      commit('SET_NAME', username);
      setUser(username);
    },
    loginOut({ commit }) {
      commit('SET_NAME', '');
      removeUser();
    },
    getUserMenu({ commit, state }) {
      const data = api.getUserMenu(state.name);
      if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        commit('SET_ROLES', data.roles);
      }
      return data;
    },
  },
};

export default user;
