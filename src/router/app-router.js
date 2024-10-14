import LayoutBasic from '@/admin/layouts/LayoutBasic.vue';
import HomeView from '@/views/HomeView.vue';
import Join from '@/views/Join.vue';
import Login from '@/views/Login.vue';
import Otp from '@/views/Otp.vue';
import Verified from '@/views/Verified.vue';
import Dashbaord from '@/views/Dashbaord.vue';
import Transactions from '@/views/Transactions.vue';
import HomeLayout from '@/views/HomeLayout.vue';

export default [
    {
        path: '/app',
        component: LayoutBasic,
        meta: { breadcrumb: "Home", requiresAuth: false },
        children: [       
            {
                path: "dashboard",
                name: "App-Dashbaord",
                component: Dashbaord,
                meta: { breadcrumb: "", requiresAuth: false },
            },
            {
                path: "",
                name: "App-Home",
                component: Dashbaord,
                meta: { breadcrumb: "", requiresAuth: false },
            },
            {
                path: "transactions",
                name: "App-Transactions",
                component: Transactions,
                meta: { breadcrumb: "", requiresAuth: false },
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
