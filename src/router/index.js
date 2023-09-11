import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { userUserStore } from '../stores/user-store'


export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from, next) => {
    const requireAuth = to.meta.auth;
    const userStore = userUserStore();

    //si existe el token en memoria
    if (userStore.token) return next();

    // si no existe el token versión 2 
    if (requireAuth || sessionStorage.getItem('user')) {
      await userStore.refreshToken();
      if (userStore.token) return next();
      return next('/login');
    }
    return next();

  });

  return Router
});
