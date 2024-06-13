import LayoutBasic from '@/admin/layouts/LayoutBasic.vue';
import Dashboard from '@/admin/views/dashboard/Dashboard.vue';
import Login from '@/admin/views/auth/Login.vue'; // Corrected import
import ForgotPassword from '@/admin/views/auth/ForgotPassword.vue'; // Corrected import
import abilities from './stubs/abilities';

import HomeIndex from '@/admin/views/home/Index.vue'; // Corrected import
import UsersIndex from '@/admin/views/users/Index.vue'; // Corrected import
import ReceiveIndex from '@/admin/views/receive/Index.vue'; // Corrected import
import SentIndex from '@/admin/views/sent/Index.vue'; // Corrected import
import SendIndex from '@/admin/views/send/Index.vue'; // Corrected import
import SettingsIndex from '@/admin/views/settings/Index.vue'; // Corrected import
import ErrorView from '@/components/Error.vue'; // Corrected import

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
                component: HomeIndex,
            },
            {
                path: "dashboard",
                name: "Dashboard",
                component: Dashboard,
                meta: { breadcrumb: "Dashboard", ability: abilities.DASHBOARD },
            },
            {
                path: "users",
                name: "Users",
                meta: { breadcrumb: "Users", ability: abilities.USER },
                component: UsersIndex,
            },            
        
            {
                path: "receive",
                name: "Received Transactions",
                meta: { breadcrumb: "receive", ability: abilities.PAYMENT },
                component: ReceiveIndex,
            },
            {
                path: "sent",
                name: "Sent Transactions",
                meta: { breadcrumb: "sent", ability: abilities.INVOICE },
                component: SentIndex,
            },      
            {
                path: "send",
                name: "Send",
                meta: { breadcrumb: "send", ability: abilities.INVOICE },
                component: SendIndex,
            },            
            {
                path: "settings",
                name: "Settings",
                meta: { breadcrumb: "Settings", ability: abilities.SETTING },
                component: SettingsIndex,
            },          
        ],
    },
    {
        path: "/",
        name: "Login",
        component: Login,
        meta: { breadcrumb: "Login", requiresAuth: false },
    },
    {
        path: "/admin/forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword,
        meta: { requiresAuth: false },
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'ErrorView',
        component: ErrorView,
    },
];
