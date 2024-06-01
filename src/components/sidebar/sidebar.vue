<template>
    <v-navigation-drawer v-model="pdrawer" :rail="rail" permanent>
        <div class="tw-h-[calc(100vh-160px)] tw-overflow-y-auto">
            <v-list-item nav class="tw-py-[6px] tw-px-[6px]">
                <template v-slot:default>
                    <div class="tw-flex tw-py-1 tw-items-center">
                        <img class="tw-h-12 tw-w-auto tw-mt-2" src="@/assets/logo.png" alt="logo" />
                        <div>
                            <transition name="slide-fade">
                                <div class="tw-ms-2 tw-mt-1 text-truncate ">
                                    <span :class="`${$constants.text_size.s3} tw-text-${$constants.primary}`" class="tw-font-bold">GOMBE STATE</span> 
                                    <p :class="$constants.text_size.xs1" class=" tw-text-gray-500 tw-mt-[-3px]">INTERNAL REVENUE SERVICE</p>
                                </div>
                            </transition>
                        </div>
                    </div>
                </template>
            </v-list-item>
    
            <v-divider class="border-opacity-100" :class="`tw-bg-[${$constants.primary}]`"></v-divider>
    
            <v-list density="compact" nav class="py-8">
                <v-list-item v-for="item in items" rounded="lg"
                    :class="getClasses( item.href)"
                    size="xlarge" :to="item.href"
                    :value="item.title">
                    <template v-slot:prepend>
                        <v-icon :class="getClasses( item.href)" size="small" :icon="item.icon"></v-icon>
                    </template>
                    <template v-slot:default>
                        <span class="text-truncate" :class="getClasses( item.href)">{{ item.name }}</span>
                    </template>
                </v-list-item>
            </v-list>
        </div>

        <v-list density="compact" nav slot="append"></v-list>
        
        <div class="tw-py-[6px] tw-fixed tw-bottom-0 tw-w-full">
            <v-divider class="border-opacity-100" :class="`tw-bg[${$constants.primary}]`"></v-divider>
            <v-list density="compact" nav class="py-1">
                <v-list-item v-for="item in subItems" rounded="lg"
                     :class="getClasses( item.href)"
                    size="xlarge" :to="item.href"
                    :value="item.title">
                    <template v-slot:prepend>
                        <v-icon :class="getClasses( item.href)" size="small" :icon="item.icon"></v-icon>
                    </template>
                    <template v-slot:default>
                        <span class="text-truncate" :class="getClasses( item.href)">{{ item.name }}</span>
                    </template>
                </v-list-item>
            </v-list>
            <v-divider class="border-opacity-100" :class="`tw-bg-[${$constants.primary}]`"></v-divider>
            <v-list-item nav class="tw-py-[6px] tw-px-[8px]">
                <template v-slot:default>
                    <div class="tw-flex tw-items-center tw-mt-1">
                        <img class="tw-h-8 tw-w-auto tw-rounded-full " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s" alt="logo" />
                        <transition name="slide-fade">
                            <div class="tw-ms-2 tw-ml-7 text-truncate">
                                <span  :class="`${$constants.text_size.s1} tw-text-[${$constants.primary}]`" class="tw-font-bold">AMINU MUDI</span> 
                                <p :class="`${$constants.text_size.s1} tw-text-[${$constants.dark}]`" class="tw-mt-[-3px]">SUB - ADMIN</p>
                            </div>
                        </transition>
                    </div>
                </template>
            </v-list-item>
        </div>
    </v-navigation-drawer>
</template>

<script>
    
import {
    PhSquaresFour,
    PhUsersThree,
    PhCardholder,
    PhReceipt,
    PhStorefront,
    PhChartPieSlice ,
    PhChatDots,
    PhGear,
    PhSignOut,
} from "@phosphor-icons/vue";

export default {
     components: {
        PhSquaresFour,
        PhUsersThree,
        PhCardholder,
        PhReceipt,
        PhStorefront,
        PhChartPieSlice,
        PhChatDots,
        PhGear,
        PhSignOut,
    },
    props: {
        drawer: {
            default: false
        },
        rail: {
            default: true
        }
    },
    methods:{
        getClasses(href){
            return href === this.$route.path ? `tw-text-[${this.$constants.primary}]` :  `tw-text-[${this.$constants.primary}]`
        }
    },
    data() {
        return {
            pdrawer: true,
            items: [
                { name: 'Dashboard', href: '/admin/dashboard', icon: 'mdi-view-dashboard-outline', current: true },
                { name: 'Users', href: '/admin/users', icon: 'mdi-account-group', current: false },
                { name: 'Payments', href: '/admin/payments', icon: 'mdi-credit-card-outline', current: false },
                { name: 'Invoices', href: '/admin/invoices', icon: 'mdi-file-document-multiple-outline', current: false },
                { name: 'Businesses', href: '/admin/businesses', icon: 'mdi-store-outline', current: false },
                { name: 'Categories', href: '/admin/categories', icon: 'mdi-chart-pie-outline', current: false },
                { name: 'Messages', href: '/admin/messages', icon: 'mdi-email-outline', current: false },
            ],
            subItems: [
                { name: 'Settings', href: '/admin/settings', icon: 'mdi-cog-outline', current: true },
                { name: 'Logout', href: '/admin/logout', icon: 'mdi-logout', current: false }
            ]
        }
    },
}
</script>
<style scoped>
    .translatex {
        transform: scale(1.5);
        transition: transform 2s ease-in;
    }

    .slide-fade-enter-active {
        transition: all 2s ease;
    }

    .slide-fade-leave-active {
        transition: all 2s ease;
    }

    .slide-fade-enter,
    .slide-fade-leave-to {
        transform: translateX(-30px);
        opacity: 0;
    }

    /* Overriding the class*/
    .theme--light.v-application {
        background: #011627;
    }
</style>