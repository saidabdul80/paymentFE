import { createRouter, createWebHistory } from "vue-router";

import AdminRoutes from '@/admin/admin-router'
import useUserStore from '@/admin/stores/user'

let routes = []
routes = routes.concat(AdminRoutes)

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()    
  let ability = to.meta.ability
  const { isAppLoaded } = globalStore
/*  */
})

export default router;
