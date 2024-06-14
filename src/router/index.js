import { createRouter, createWebHistory } from "vue-router";

import AdminRoutes from '@/admin/admin-router'
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
