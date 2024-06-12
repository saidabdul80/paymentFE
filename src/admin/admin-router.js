import LayoutBasic from '@/admin/layouts/LayoutBasic.vue';
import Dashboard from '@/admin/views/dashboard/Dashboard.vue';

// Auth
import Login from '@/admin/views/auth/login.vue';
import ForgotPassword from '@/admin/views/auth/ForgortPassword.vue';
import RComponent from '@/admin/views/reusable_components/Reusable_components.vue';

import abilities from './stubs/abilities';

export default [
    {
        path: '/admin',
        component: LayoutBasic,
        meta: { breadcrumb: "Home", requiresAuth: true },
        children: [
            {
                path: "home",
                name: "Home",
                meta: { breadcrumb: "Dashboard", ability: '', requiresAuth: false },
                component: () => import("@/admin/views/home/Index.vue"),
            },
            {
                path: "dashboard",
                name: "Dashboard",
                component: () => Dashboard,
                meta: { breadcrumb: "Dashboard", ability: abilities.DASHBOARD },
            },
            {
                path: "users",
                name: "Users",
                meta: { breadcrumb: "Users", ability: abilities.USER },
                component: () => import("@/admin/views/users/Index.vue"),
            },            
        
            {
                path: "receive",
                name: "Received Transactions",
                meta: { breadcrumb: "receive", ability: abilities.PAYMENT },
                component: () => import("@/admin/views/receive/Index.vue"),
            },
            {
                path: "sent",
                name: "Sent Transactions",
                meta: { breadcrumb: "sent", ability: abilities.INVOICE },
                component: () => import("@/admin/views/sent/Index.vue"),
            },      
            {
                path: "send",
                name: "Send",
                meta: { breadcrumb: "send", ability: abilities.INVOICE },
                component: () => import("@/admin/views/send/Index.vue"),
            },            
            {
                path: "settings",
                name: "Settings",
                meta: { breadcrumb: "Settings", ability: abilities.SETTING },
                component: () => import("@/admin/views/settings/Index.vue"),
            },
            {
                path: "reusable_components",
                name: "ReusableComponents",
                component: () => RComponent,
                meta: { breadcrumb: "Reusable Components", requiresAuth: true },
            },
        ],
    },
    {
        path: "/",
        name: "Login",
        component: () => Login,
        meta: { breadcrumb: "Login", requiresAuth: false },
    },
    {
        path: "/admin/forgot-password",
        name: "ForgotPassword",
        component: () => ForgotPassword,
        meta: { requiresAuth: false },
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'ErrorView',
        component: () => import('@/components/Error.vue'),
    },
];
