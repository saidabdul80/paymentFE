import { createRouter, createWebHistory } from "vue-router";

import AdminRoutes from '@/admin/admin-router'
import ls from "@/services/ls";
import useAdminStore from "@/admin/stores/admin";
import appRouter from "./app-router";
let routes = []
let routes1 = routes.concat(AdminRoutes)
routes = routes1.concat(appRouter)

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes
})

/* router.beforeEach((to, from, next) => {  
  next()
})

 */
router.beforeEach(async (to, from, next) => {
  window.currentRoute = to;

  const correctedPath = to.fullPath.replace(/\/{2,}/g, '/');
  if (correctedPath !== to.fullPath) {
    next({ path: correctedPath, replace: true });
    return;
  }

  if (to.meta.requiresAuth) {

    let userRootPath = to.matched[0]?.path?.replace('/', '') || '';
    if(!ls.hasPermission(to.meta.ability)){
      if(userRootPath.includes('admin')){
        next({ path: `/` }); // Redirect to login or home page
      }
    }

    try {
     // const globalStore = useGlobalsStore();
      const adminStore = useAdminStore()
      adminStore.bootstrap()
      //globalStore.bootstrap();
    } catch (error) { }

    if (ls.get('auth.token')) {
      next();
    } else {
      if(userRootPath.includes('admin')){
        next({ path: `/` }); // Redirect to login or home page
      }      
    }

  } else {
    next(); // Proceed to the next navigation step
  }
})


export default router;
