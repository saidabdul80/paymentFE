import abilities from '@/admin/stub/abilities'
const LayoutBasic = () => import('@/admin/layouts/LayoutBasic.vue')
export default [
    {
        path: '/individual-taxpayer',
        component: LayoutBasic,
        meta: { requiresAuth: true },
        children: [


        ],  

    }

]