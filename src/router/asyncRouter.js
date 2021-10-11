const baseLayout = () => import('@/layouts/baseLayout')
export const generatorDynamicRouter = (menu) => {
  return new Promise((resolve, reject) => {
    const listMenu = menu.map(item => {
      return item.children ? {
        name: item.name,
        path: item.path,
        meta: { title: item.title },
        component: baseLayout,
        redirect: item.children[0].path,
        children: listChildren(item.children)
      }
        : {
          name: item.name,
          path: `/${item.path.split('/')[1]}`,
          meta: { title: item.title },
          component: baseLayout,
          redirect: `/${item.path.split('/')[2]}`,
          children: singleMenu(item)
        }
    })
    resolve(listMenu)
  })
}
const listChildren = (childrenMenu) => {
  return childrenMenu.map(item => {
    return {
      path: item.path.split('/')[2],
      name: item.name,
      meta: { title: item.title },
      component: () => import('@/views' + item.path + '/index.vue')
      // component: resolve => require(['@/views' + item.path + '/index.vue'], resolve)
    }
  })
}
const singleMenu = (item) => {
  return [{
    path: item.path.split('/')[2],
    name: item.name,
    meta: { title: item.title },
    component: () => import('@/views/' + item.path.split('/')[1] + '/index.vue')
    // component: resolve => require(['@/views' + item.path.split('/')[1] + '/index.vue'], resolve)
  }]
}
