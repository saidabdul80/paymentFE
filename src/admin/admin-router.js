import LayoutBasic from '@/admin/layouts/LayoutBasic.vue'
import Login from '@/admin/views/auth/login.vue'
import Dashboard from '@/admin/views/Dashboard.vue'

export default [
    {
        path: '/admin',
        component: LayoutBasic,
        meta: { requiresAuth: true },
        children: [
            {
                path: "dashboard",
                name: "Dashboard",
                component: () => Dashboard,
                meta: { requiresAuth: true },
            },
        ],
    },
    {
        path: "/",
        name: "home",
        component: () => Login,
        meta: { requiresAuth: true },
    },
]