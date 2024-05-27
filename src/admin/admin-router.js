import abilities from '@/admin/stubs/abilities'
const LayoutBasic = () => import('@/admin/layouts/LayoutBasic.vue')
export default [
    {
        path: '/admin',
        component: LayoutBasic,
        meta: { requiresAuth: true },
        children: [

        ],  
    },
    {
    path: "/",
    name: "home",
    component: LayoutBasic,
    meta: { requiresAuth: true },
    },
]