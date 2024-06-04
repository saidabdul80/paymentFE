// import abilities from '@/admin/stub/abilities'
const LayoutBasic = () => import('@/individualTaxPayer/layouts/LayoutBasic.vue')

export default [
    {
        path: '/individual',
        component: LayoutBasic,
        meta: { requiresAuth: true, breadcrumb: "Home", },
        children: [
            {
                path: "register",
                name: "Individual Taxpayer",
                component: () => import("@/admin/views/auth/IndividualTaxpayerRegistration.vue"),
                meta: { requiresAuth: false, breadcrumb:'Individual Tax Payer' },
            }
        ],

    }

]
