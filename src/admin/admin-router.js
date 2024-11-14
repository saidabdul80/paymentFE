import LayoutBasic from '@/admin/layouts/LayoutBasic.vue';
import ErrorView from '@/components/Error.vue';
import MFA from './views/auth/MFA.vue';
import ChangePassword from './views/auth/changePassword.vue';
import Setup_MFA from './views/auth/Setup_MFA.vue';
import HomeView from '@/views/HomeView.vue';

import Dashboard from './views/Dashboard.vue'; // Corrected spelling
import HomeLayout from '@/views/HomeLayout.vue';
import Login from './views/auth/Login.vue';
import Transactions from './views/Transactions.vue';
import Customers from './views/Customers.vue';
import Clients from './views/Clients.vue';
import ClientDashbaord from './views/ClientDashbaord.vue';

export default [
    {
        path: '/admin',
        component: LayoutBasic,
        meta: { breadcrumb: "Home", requiresAuth: false },
        children: [
            {
                path: '',
                redirect: '/admin/dashboard',  
            },
            {
                path: "dashboard",
                name: "Admin-Dashboard",
                component: Dashboard,
                meta: { breadcrumb: "Dashboard", requiresAuth: false },
            },
            {
                path: "",
                name: "Admin-Home",
                component: Dashboard,
                meta: { breadcrumb: "Home", requiresAuth: true },
            },
            {
                path: "transactions/:id?",
                name: "Admin-Transactions",
                component: Transactions,
                meta: { breadcrumb: "Transactions", requiresAuth: true },
            },
            {
                path: "customers/:id?",
                name: "Admin-Customers",
                component: Customers,
                meta: { breadcrumb: "Customers", requiresAuth: true },
            },
            {
                path: "clients",
                name: "Admin-Clients",
                component: Clients,
                meta: { breadcrumb: "Clients", requiresAuth: true },
            },
            {
                path: "dashboard/:id",
                name: "Admin-Clients-Dashboard",
                component: ClientDashbaord,
                meta: { breadcrumb: "Dashboard", parent:'Admin-Clients', requiresAuth: true },
            },
        ],
    },
    {
        path: '/admin',
        component: HomeLayout,
        meta: { breadcrumb: "Home", requiresAuth: false },
        children: [
            {
                path: "",
                name: "AdHome",
                component: HomeView,
                meta: { breadcrumb: "Home", requiresAuth: false },
            },

            {
                path: "login",
                name: "AdLogin",
                component: Login,
                meta: { requiresAuth: false },
            },
         
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'ErrorView',
        component: ErrorView,
    },
];
