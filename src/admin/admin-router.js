import LayoutBasic from '@/admin/layouts/LayoutBasic.vue';
import Dashboard from '@/admin/views/dashboard/Dashboard.vue';
import Login from '@/admin/views/auth/Index.vue'; // Corrected import
import ForgotPassword from '@/admin/views/auth/ForgortPassword.vue'; // Corrected import
import abilities from './stubs/abilities';

import HomeIndex from '@/admin/views/home/Index.vue'; // Corrected import
import UsersIndex from '@/admin/views/users/Index.vue'; // Corrected import
import ReceiveIndex from '@/admin/views/receive/Index.vue'; // Corrected import
import SentIndex from '@/admin/views/sent/Index.vue'; // Corrected import
import SendIndex from '@/admin/views/send/Index.vue'; // Corrected import
import PayBill from '@/admin/views/bills/Index.vue'; // Corrected import

import SettingsIndex from '@/admin/views/settings/Index.vue'; // Corrected import
import ErrorView from '@/components/Error.vue'; // Corrected import
import MFA from './views/auth/MFA.vue';
import ChangePassword from './views/auth/changePassword.vue';
import Setup_MFA from './views/auth/Setup_MFA.vue';

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
                meta: { breadcrumb: "Users", ability: abilities.VIEW_ADMINS },
                component: UsersIndex,
            },               
            {
                path: "users/view-admin/:id",
                name: "View Admin",
                meta: { breadcrumb: "View Admin", parent: "Users", ability: abilities.VIEW_ADMINS, requiresAuth: true },
                component: () => import("@/admin/views/users/ViewAdmin.vue"),
            },
            {
                path: "users/add-admin/:id?",
                name: "Add Admin",
                meta: { breadcrumb: "Add Admin", parent: "Users", ability: abilities.ADD_ADMINS, requiresAuth: true  },
                component: () => import("@/admin/views/users/create.vue"),
            },                
            {
                path: "receive",
                name: "Received Transactions",
                meta: { breadcrumb: "receive", ability: abilities.VIEW_RECEIVE },
                component: ReceiveIndex,
            },
            {
                path: "sent",
                name: "Sent Transactions",
                meta: { breadcrumb: "sent", ability: abilities.VIEW_SENTS },
                component: SentIndex,
            },      
            {
                path: "send",
                name: "Send",
                meta: { breadcrumb: "send", ability: abilities.SEND_MONEY },
                component: SendIndex,
            },        
            {
                path: "paybill",
                name: "Paybill",
                meta: { breadcrumb: "Paybill", ability: abilities.VIEW_PAY_BILLS },
                component: PayBill,
            },            
            {
                path: "settings",
                name: "Settings",
                meta: { breadcrumb: "Settings", ability: abilities.VIEW_ROLES },
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
        path: "/admin/verification",
        name: "MFA",
        component: MFA,
        meta: { requiresAuth: false },
    },
    {
        path: "/admin/setup-mfa",
        name: "MFA-Setup",
        component: Setup_MFA,
        meta: { requiresAuth: false },
    },
    {
        path: "/admin/change-password",
        name: "CP",
        component: ChangePassword,
        meta: { requiresAuth: false },
    },    
    {
        path: "/:pathMatch(.*)*",
        name: 'ErrorView',
        component: ErrorView,
    },
];
