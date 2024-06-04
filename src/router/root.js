import LayoutBasic from "@/views/layouts/Layout.vue"

export default [
    {
        path: '/',
        component: LayoutBasic,
        meta: { requiresAuth: true },
        children: [
            {
                path: "/",
                name: "Self Service",
                component: () => import("@/views/SelfService.vue"),
                meta: { requiresAuth: false, breadcrumb: "Home" },
            },
        ],

    }

]
