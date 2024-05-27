import { createRouter, createWebHistory } from "vue-router";

import AdminRoutes from '@/admin/admin-router'
import useUserStore from '@/admin/stores/user'
import LayoutBasic from '@/admin/layouts/LayoutBasic.vue'

let routes = []
routes = routes.concat(AdminRoutes)

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes:[
    {
      path: "/",
      name: "home",
      component: () =>LayoutBasic,
      meta: { requiresAuth: true },
      },
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()    
  let ability = to.meta.ability
  const { isAppLoaded } = globalStore
  next()
/*  */
})

export default router;
