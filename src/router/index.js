import { createRouter, createWebHistory } from "vue-router";

import AdminRoutes from '@/admin/admin-router'
import ls from "@/services/ls";
import useAdminStore from "@/admin/stores/admin";
import appRouter from "./app-router";
import { useGlobalsStore } from "@/stores/globals";
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
  useGlobalsStore().error = ''
  const correctedPath = to.fullPath.replace(/\/{2,}/g, '/');
  if (correctedPath !== to.fullPath) {
    next({ path: correctedPath, replace: true });
    return;
  }

  if (to.meta.requiresAuth) {

    let userRootPath = to.matched[0]?.path?.replace('/', '') || '';
    ///alert(ls.hasPermission(to.meta.ability))
    if (!ls.hasPermission(to.meta.ability)) {
      //const rootPath = userRootPath.includes(userType);
      next({ path: '/' }); 
    }
    
   
    try {
      //const adminStore = useAdminStore()
      //adminStore.bootstrap()
      //globalStore.bootstrap();
    } catch (error) { }

    if (ls.get('auth.token')) {

      if(userRootPath.includes('admin')){
        next();
      }else if(userRootPath.includes('app')){
        // if(ls.get('auth.user')?.kyc_documentation_status !== 'completed' && to.fullPath !=='/app/settings'){
        //   const globalStore = useGlobalsStore();
        //   globalStore.palert({title:'Please complete business verification',icon:'mdi-lightbulb-on-outline'})
        //   next({path:'/app/settings'})
        // }
        next();
      }

     
    } else {
      if(userRootPath.includes('admin')){
        next({ path: `/` }); // Redirect to login or home page
      }else if(userRootPath.includes('app')){
        next({ path: `/` }); 
      }
    }

  } else {
    next(); // Proceed to the next navigation step
  }
})


export default router;
