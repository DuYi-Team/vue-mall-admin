import { asyncRouterMap, commonRouterMap } from '@/router/index'
// 判断是否有权限访问该菜单
function hasPermission (menus, route) {
  console.log('permission', route.name)
  if (route.name) {
    const currMenu = getMenu(route.name, menus)
    console.log('curMenu', currMenu)
    if (currMenu != null) {
      // 设置菜单的标题、图标和可见性
      if (currMenu.title != null && currMenu.title !== '') {
        route.meta.title = currMenu.title
      }
      if (currMenu.icon != null && currMenu.title !== '') {
        route.meta.icon = currMenu.icon
      }
      if (currMenu.hidden != null) {
        route.hidden = currMenu.hidden !== 0
      }
      return true
    } else {
      if (route.hidden !== undefined && route.hidden === true) {
        return true
      } else {
        return false
      }
    }
  } else {
    return true
  }
}
// 根据路由名称获取菜单
function getMenu (name, menus) {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    if (name === menu.name) {
      return menu
    }
  }
  return null
}
const permission = {
  state: {
    routers: commonRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = commonRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      const { menus } = data
      const accessedRouters = asyncRouterMap.filter(v => {
        // admin帐号直接返回所有菜单
        if (hasPermission(menus, v)) {
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter(child => {
              if (hasPermission(menus, child)) {
                return child
              }
              return false
            })
            return v
          } else {
            return v
          }
        }
        return false
      })
      commit('SET_ROUTERS', accessedRouters)
    }
  }
}

export default permission
