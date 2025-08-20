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
import Contact from '@/views/Contact.vue';
import ForgortPassword from '@/views/ForgotPassword.vue';
import MFA from '@/admin/views/auth/MFA.vue';
import Setup_MFA from '@/admin/views/auth/Setup_MFA.vue';

// UGCC Components
import UgccInterest from '@/views/UgccInterest.vue';
import UgccLogin from '@/views/UgccLogin.vue';
import UgccRegister from '@/views/UgccRegister.vue';
import UgccDashboard from '@/views/UgccDashboard.vue';

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
        path: "/auth/verification",
        name: "MFA",
        component: MFA,
        meta: { requiresAuth: false },
    },
    {
        path: "/auth/setup-mfa",
        name: "MFA-Setup",
        component: Setup_MFA,
        meta: { requiresAuth: false },
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
                path: "/contact",
                name: "Contact",
                component: Contact,
                meta: { requiresAuth: false },
            },
            {
                path: "/otp",
                name: "Otp",
                component: Otp,
                meta: { requiresAuth: false },
            },
            {
                path: "/forgort-password",
                name: "ForgotPassword",
                component: ForgortPassword,
                meta: { requiresAuth: false },
            },
            {
                path: "/verified",
                name: "verified",
                component: Verified,
                meta: { requiresAuth: false },
            },   
        ]
    },
    {
        path: "/verify/:name/:token?",
        name: "Success",
        component: () => import("@/views/Success.vue"),
        meta: { requiresAuth: false, breadcrumb: '', parent: "" },
    },
    // UGCC Routes
    {
        path: "/ugcc/interest",
        name: "UgccInterest",
        component: UgccInterest,
        meta: { requiresAuth: false, breadcrumb: 'UGCC Interest Registration' },
    },
    {
        path: "/ugcc/login",
        name: "UgccLogin", 
        component: UgccLogin,
        meta: { requiresAuth: false, breadcrumb: 'UGCC Member Login' },
    },
    {
        path: "/ugcc/register",
        name: "UgccRegister",
        component: UgccRegister,
        meta: { requiresAuth: false, breadcrumb: 'UGCC Member Registration' },
    },
    {
        path: "/ugcc/dashboard",
        name: "UgccDashboard",
        component: UgccDashboard,
        meta: { requiresAuth: true, breadcrumb: 'UGCC Dashboard' },
    },
];
