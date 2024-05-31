import LayoutBasic from '@/admin/layouts/LayoutBasic.vue'
import Login from '@/admin/views/auth/login.vue'
import Dashboard from '@/admin/views/dashboard/Dashboard.vue'
import abilities from './stubs/abilities'

export default [
  {
    path: "/admin",
    component: LayoutBasic,
    meta: { requiresAuth: true },
    children: [
      {
        path: "home",
        name: "Home",
        meta: { ability: "" },
        meta: { requiresAuth: false },
        component: () => import("@/admin/views/home/Index.vue"),
      },
      {
        path: "dashboard",
        name: "Admin Dashboard",
        component: () => Dashboard,
        meta: { ability: abilities.DASHBOARD },
      },
      {
        path: "users",
        name: "Users",
        meta: { ability: abilities.USER },
        component: () => import("@/admin/views/users/Index.vue"),
      },
      {
        path: "payments",
        name: "Payments",
        meta: { ability: abilities.PAYMENT },
        component: () => import("@/admin/views/payments/Index.vue"),
      },
      {
        path: "invoices",
        name: "Invoices",
        meta: { ability: abilities.INVOICE },
        component: () => import("@/admin/views/invoices/Index.vue"),
      },
      {
        path: "messages",
        name: "Messages",
        meta: { ability: abilities.MESSAGE },
        component: () => import("@/admin/views/messages/Index.vue"),
      },
      {
        path: "categories",
        name: "Categories",
        meta: { ability: abilities.CATEGORY },
        component: () => import("@/admin/views/categories/Index.vue"),
      },
      {
        path: "businesses",
        name: "Businesses",
        meta: { ability: abilities.BUSINESS },
        component: () => import("@/admin/views/businesses/Index.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        meta: { ability: abilities.SETTING },
        component: () => import("@/admin/views/settings/Index.vue"),
      },

      // all reusable components can be found in this route
      {
        path: "reusable_components",
        name: "Reusable components",
        meta: { ability: abilities.REUSABLE_COMPONENTS },
        component: () =>
          import("@/admin/views/reusable_components/Reusable_components.vue"),
      },
    ],
  },
  {
    path: "/admin/login",
    name: "Login",
    component: () => Login,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "ErrorView",
    component: () => import("@/components/Error.vue"),
  },
];