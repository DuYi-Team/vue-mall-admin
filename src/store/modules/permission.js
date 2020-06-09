import { asyncRouterMap, commonRouterMap } from '@/router/index';
// 根据路由名称获取菜单
function getMenu(name, menus) {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    if (name === menu.name) {
      return menu;
    }
  }
  return null;
}

// 判断是否有权限访问该菜单
function hasPermission(menus, route) {
  if (route.name) {
    const currMenu = getMenu(route.name, menus);
    if (currMenu != null) {
      // 设置菜单的标题、图标和可见性
      if (currMenu.title != null && currMenu.title !== '') {
        route.meta.title = currMenu.title;
      }
      if (currMenu.icon != null && currMenu.title !== '') {
        route.meta.icon = currMenu.icon;
      }
      if (currMenu.hidden != null) {
        route.hidden = currMenu.hidden !== 0;
      }
      return true;
    } if (route.hidden !== undefined && route.hidden === true) {
      return true;
    }
    return false;
  }
  return true;
}

const permission = {
  state: {
    routers: commonRouterMap,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = commonRouterMap.concat(routers);
    },
  },
  actions: {
    generateRoutes({ commit }, data) {
      const { menus } = data;
      const accessedRouters = asyncRouterMap.filter((v) => {
        // admin帐号直接返回所有菜单
        if (hasPermission(menus, v)) {
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter((child) => {
              if (hasPermission(menus, child)) {
                return child;
              }
              return false;
            });
            return v;
          }
          return v;
        }
        return false;
      });
      commit('SET_ROUTERS', accessedRouters);
    },
  },
};

export default permission;
