// import abilities from '@/admin/stub/abilities'
const LayoutBasic = () => import('@/individualTaxPayer/layouts/LayoutBasic.vue')

export default [
    {
        path: '/individual',
        component: LayoutBasic,
        meta: { requiresAuth: true },
        children: [
            {
                path: "register",
                name: "Individual Taxpayer",
                component: () => import("@/admin/views/auth/IndividualTaxpayerRegistration.vue"),
                meta: { requiresAuth: false },
            },
            {
                path: "corporate",
                name: "Corporate Taxpayer",
                component: () => import("@/admin/views/auth/CorporateTaxpayerRegistration.vue"),
                meta: { requiresAuth: false },
            },
        ],

    }

]
