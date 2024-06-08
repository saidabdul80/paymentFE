import { createRouter, createWebHistory } from "vue-router";

import AdminRoutes from '@/admin/admin-router'
import IndividualTaxPayerRoutes from '@/individualTaxPayer/individual-tax-payer-router'
import CorporateTaxPayerRoutes from '@/corperateTaxPayer/corperate-tax-payer-router'
import useUserStore from '@/admin/stores/admin'
import LayoutBasic from '@/admin/layouts/LayoutBasic.vue'
import { useGlobalsStore } from "@/stores/globals";
import RootRoutes from './root';

let routes = []
routes = routes.concat(AdminRoutes)
routes = routes.concat(IndividualTaxPayerRoutes)
routes = routes.concat(CorporateTaxPayerRoutes)
routes = routes.concat(RootRoutes)

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
  if (to.meta.requiresAuth) {
      globalStore.bootstrap(true)
    if (userStore.hasAbilities(ability)) {
      next()
    } else next({ path: rootPath + '/home' })
  }else {
    next()
  }
})


export default router;
