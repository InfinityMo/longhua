const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: '' },
    component: () => import('@/views/login/index.vue')
  }, {
    path: '/401',
    name: 'forbidden',
    component: () => import('@/views/401/index.vue')
  }
]
export default routes
