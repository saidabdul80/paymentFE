import { createRouter, createWebHistory } from "vue-router";

import AdminRoutes from '@/admin/admin-router'
import useUserStore from '@/admin/stores/user'
import LayoutBasic from '@/admin/layouts/LayoutBasic.vue'
import { useGlobalsStore } from "@/stores/globals";

let routes = []
routes = routes.concat(AdminRoutes)

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  next()
  //### UN COMMENT THE BELOW TO ENABLE MIDDLWARE ###///
  const userStore = useUserStore()
  const globalStore = useGlobalsStore()
  let ability = to.meta.ability
  let rootPath = to.matched[0].path;
  globalStore.bootstrap()
  const { pageLoading } = globalStore

  if (ability && pageLoading && to.meta.requiresAuth) {
    if (userStore.hasAbilities(ability)) {
      next()
    } else next({ path: rootPath+'/home' })
  } else if (to.meta.isOwner && isAppLoaded) {
    if (userStore.currentUser.is_owner) {
      next()
    } else next({ path: rootPath+'home' })
  } else {
    next()
  }
})


export default router;
