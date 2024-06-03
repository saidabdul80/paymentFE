// import abilities from '@/admin/stub/abilities'
const LayoutBasic = () => import('@/individualTaxPayer/layouts/LayoutBasic.vue')

export default [
    {
        path: '/corporate',
        component: LayoutBasic,
        meta: { requiresAuth: true },
        children: [
            {
                path: "register",
                name: "Corporate Taxpayer",
                component: () => import("@/admin/views/auth/CorporateTaxpayerRegistration.vue"),
                meta: { requiresAuth: false },
            },
        ],

    }

]
