import router from './router';
import store from './store';

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next();
  }
  if (!store.state.user.name) {
    return next('/login');
  }
  if (store.state.user.roles.length === 0) {
    return store.dispatch('getUserMenu').then((res) => {
      const { username, menus } = res;
      return store.dispatch('generateRoutes', { menus, username }).then(() => {
        router.addRoutes(store.getters.addRouters);
        next({
          ...to,
          replace: true,
        });
      }).catch(() => {
        next('/');
      });
    });
  }
  return next();
});
