import abilities from '@/admin/stub/abilities'
const LayoutBasic = () => import('@/admin/layouts/LayoutBasic.vue')

export default [
    {
        path: '/admin',
        component: LayoutBasic,
        meta: { requiresAuth: true },
        children: [


        ],  

    }

]