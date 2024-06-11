import { createRouter, createWebHistory } from "vue-router";

import AdminRoutes from '@/admin/admin-router'
import useUserStore from '@/admin/stores/admin'
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
})


export default router;
