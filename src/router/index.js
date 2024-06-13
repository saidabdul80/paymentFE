import { createRouter, createWebHistory } from "vue-router";

import AdminRoutes from '@/admin/admin-router'

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  AdminRoutes
})

router.beforeEach((to, from, next) => {  
  next()
})


export default router;
