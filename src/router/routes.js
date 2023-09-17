import { api } from 'src/boot/axios';

const redirectLink = async (to, from, next) => {
  console.log(to.params.nanoid);
  try {
    const { data } = await api.get(`/links/${to.params.nanoid}`);
    window.location.href = data.data;
    next();
  } catch (error) {
    console.log(error);
    next('/404');
  }
}


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/register', component: () => import('pages/RegisterPage.vue') },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { auth: true } },
      { path: '/protected', component: () => import('pages/ProtectedPage.vue'), meta: { auth: true } },
      {
        path: '/:nanoid',
        component: () => import('pages/RedirectPage.vue'),
        beforeEnter: redirectLink
      },

    ]
  },

  {
    path: '/404',
    component: () => import('pages/ErrorNotFound.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }

]

export default routes
