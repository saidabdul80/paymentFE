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
                path: "users/add-individual-taxpayer",
                name: "IndividualTaxpayer",
                meta: { breadcrumb: "Add Individual Taxpayer", parent: "Users", ability: abilities.USER_CREATE },
                component: () => import("@/admin/views/users/taxpayers/individual/Index.vue"),
            },
            {
                path: "users/add-corporate-taxpayer",
                name: "CorporateTaxpayer",
                meta: { breadcrumb: "Add Corporate Taxpayer", parent: "Users", ability: abilities.USER_CREATE },
                component: () => import("@/admin/views/users/taxpayers/corporate/Index.vue"),
            },
            {
                path: "users/add-vendor",
                name: "Add Vendor",
                meta: { breadcrumb: "Add Vendor", parent: "Users", ability: abilities.USER_CREATE },
                component: () => import("@/admin/views/users/vendors/Addvendor.vue"),
            },
            {
                path: "users/view-vendor",
                name: "View Vendor",
                meta: { breadcrumb: "View Vendor", parent: "Users", ability: abilities.USER_CREATE },
                component: () => import("@/admin/views/users/vendors/VeiwVendor.vue"),
            },
            {
                path: "users/add-admin",
                name: "Add Admin",
                meta: { breadcrumb: "Add Admin", parent: "Users", ability: abilities.USER_CREATE },
                component: () => import("@/admin/views/users/admin/create.vue"),
            },
            {
                path: "payments",
                name: "Payments",
                meta: { breadcrumb: "Payments", ability: abilities.PAYMENT },
                component: () => import("@/admin/views/payments/Index.vue"),
            },
            {
                path: "invoices",
                name: "Invoices",
                meta: { breadcrumb: "Invoices", ability: abilities.INVOICE },
                component: () => import("@/admin/views/invoices/Index.vue"),
            },
            {
                path: "messages",
                name: "Messages",
                meta: { breadcrumb: "Messages", ability: abilities.MESSAGE },
                component: () => import("@/admin/views/messages/Index.vue"),
            },
            {
                path: "categories",
                name: "Categories",
                meta: { breadcrumb: "Categories", ability: abilities.CATEGORY },
                component: () => import("@/admin/views/categories/Index.vue"),
            },
            {
                path: "businesses",
                name: "Businesses",
                meta: { breadcrumb: "Businesses", ability: abilities.BUSINESS },
                component: () => import("@/admin/views/businesses/Index.vue"),
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
        path: "/admin/login",
        name: "Login",
        component: () => Login,
        meta: { breadcrumb: "Login", requiresAuth: true },
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
