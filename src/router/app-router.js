//import LayoutBasic from '@/admin/layouts/LayoutBasic.vue';
import HomeView from '@/views/HomeView.vue';
import Join from '@/views/Join.vue';
import Login from '@/views/Login.vue';
import Otp from '@/views/Otp.vue';
import Verified from '@/views/Verified.vue';
import Dashbaord from '@/views/Dashbaord.vue';
import Transactions from '@/views/Transactions.vue';
import HomeLayout from '@/views/HomeLayout.vue';
import Settings from '@/views/Settings.vue';
import Customers from '@/views/Customers.vue';
import LayoutBasic from '@/views/layouts/LayoutBasic.vue';

export default [
    {
        path: '/app',
        component: LayoutBasic,
        meta: { breadcrumb: "Home", requiresAuth: true },
        children: [       
            {
                path: "dashboard",
                name: "App-Dashbaord",
                component: Dashbaord,
                meta: { breadcrumb: "", requiresAuth: true, ability:[] },
            },
            {
                path: "",
                name: "App-Home",
                component: Dashbaord,
                meta: { breadcrumb: "", requiresAuth: true, ability:[] },
            },
            {
                path: "transactions",
                name: "App-Transactions",
                component: Transactions,
                meta: { breadcrumb: "", requiresAuth: true, ability:[] },
            }, 
            {
                path: "customers",
                name: "App-customers",
                component: Customers,
                meta: { breadcrumb: "", requiresAuth: true, ability:[] },
            }, 
            {
                path: "notifications",
                name: "App-notifications",
                component: Transactions,
                meta: { breadcrumb: "", requiresAuth: true, ability:[] },
            }, 
            {
                path: "settings",
                name: "App-Setting",
                component: Settings,
                meta: { breadcrumb: "", requiresAuth: true, ability:[] },
            },
        ],
    },
    { 
        path: '/',
        component: HomeLayout,
        meta: { breadcrumb: "Home", requiresAuth: false },
        children: [      
            {
                path: "/",
                name: "Home",
                component: HomeView,
                meta: { breadcrumb: "Login", requiresAuth: false },
            },
            {
                path: "/register",
                name: "Register",
                component: Join,
                meta: { requiresAuth: false },
            },
            {
                path: "/login",
                name: "Login",
                component: Login,
                meta: { requiresAuth: false },
            },
            {
                path: "/otp",
                name: "Otp",
                component: Otp,
                meta: { requiresAuth: false },
            },
            {
                path: "/verified",
                name: "verified",
                component: Verified,
                meta: { requiresAuth: false },
            },   
        ]
    }
];
