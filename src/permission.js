import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (!store.state.user.name) {
      next('/login')
    }
    if (store.state.user.roles.length === 0) {
      store.dispatch('getUserMenu').then((res) => {
        const { username, menus } = res
        store.dispatch('GenerateRoutes', { menus, username }).then((res) => {
          router.addRoutes(store.getters.addRouters)
          next({
            ...to,
            replace: true
          })
        }).catch(() => {
          next('/')
        })
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
