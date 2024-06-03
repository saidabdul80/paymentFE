<template>
    <v-navigation-drawer v-model="pdrawer" :rail="rail" permanent :color="$constants.light">
        <div class="tw-h-[calc(100vh-160px)] tw-overflow-y-auto tw-font-[300]">
            <v-list-item nav class="tw-py-[6px] tw-px-[6px]" @mouseenter="startMarquee" @mouseleave="stopMarquee">
                <template v-slot:default>
                    <div class="tw-flex tw-py-1 tw-items-center">
                        <img class="tw-h-12 tw-w-auto tw-mt-2" src="@/assets/logo.png" alt="logo" />
                        <div>
                            <transition name="slide-fade">
                                <div class="tw-ms-2 tw-mt-1 text-truncate uppercase">
                                    <span :class="`${$constants.text_size.s3} tw-text-${$constants.primary}`"
                                        class="tw-font-bold">GOMBE STATE</span>
                                    <p :class="[$constants.text_size.s1,isHovered?'marquee':'']"  class=" tw-text-gray-500 tw-mt-[-3px]">
                                        INTERNAL REVENUE SERVICE</p>
                                </div>
                            </transition>
                        </div>
                    </div>
                </template>
            </v-list-item>

            <v-divider class="border-opacity-100" :class="`tw-bg-[${$constants.primary}]`"></v-divider>

            <v-list density="compact" nav class="py-8">
                <v-list-item v-for="item in items" rounded="lg" class="tw-p-[12px] tw-m-0"
                    :class="`${$constants.text_size.s1}`"
                    :active-class="`tw-bg-[${$constants.primary}] tw-text-[white]`" :base-color="$constants.mode =='light'? $constants.primary:''"
                    :color="$constants.primary"
                    @click="globals.setCurrentPageName(item)"
                    :to="item.href" :value="item.title">
                    <template v-slot:prepend>
                        <v-icon size="small"
                            :icon="item.href === this.$route.path ? item.icon : item.icon + '-outline'"></v-icon>
                    </template>
                    <template v-slot:default>
                        <span class="text-truncate ">{{ item.name }}</span>
                    </template>
                </v-list-item>
            </v-list>
        </div>

        <v-list density="compact" nav slot="append"></v-list>

        <div class="tw-py-[6px] tw-fixed tw-bottom-0 tw-w-full">
            <v-divider class="border-opacity-100 tw-mx-4" :class="`tw-bg[${$constants.primary}]`"></v-divider>
            <v-list density="compact" nav class="py-1">
                <v-list-item v-for="item in subItems" rounded="lg" class="tw-p-[12px] tw-m-0"
                    :class="`${$constants.text_size.s1}`"
                    :active-class="`tw-bg-[${$constants.primary}] tw-text-[white]`" :base-color="$constants.mode =='light'? $constants.primary:''"
                    :to="item.href" :value="item.title">
                    <template v-slot:prepend>
                        <v-icon size="small" :icon="item.icon"></v-icon>
                    </template>
                    <template v-slot:default>
                        <span class="text-truncate">{{ item.name }}</span>
                    </template>
                </v-list-item>
            </v-list>
            <v-divider class="border-opacity-100 tw-mx-4 tw-mb-2" :class="`tw-bg-[${$constants.primary}]`"></v-divider>
            <v-list-item nav class="tw-pb-[26px] tw-px-[8px] " :class="`${$constants.text_size.s1}`"
                :active-class="`tw-bg-[${$constants.primary}] tw-text-[white]`" :base-color="$constants.mode =='light'? $constants.primary:''">
                <template v-slot:prepend>
                    <img class="tw-h-8  tw-rounded-full tw-ml-1"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s"
                        alt="logo" />
                </template>
                <template v-slot:default>
                    <div class="tw-ms-2 tw-ml-7 tw-mt-1 text-truncate">
                        <span :class="`tw-text-${$constants.text_size.s1} tw-text-[${$constants.primary}]`"
                            class="tw-font-bold">AMINU MUDI</span>
                        <p :class="`tw-text-${$constants.text_size.s1} tw-text-[${$constants.dark}]`"
                            class="tw-mt-[-3px]">SUB - ADMIN</p>
                    </div>

                </template>
            </v-list-item>
        </div>
    </v-navigation-drawer>
</template>

<script>

import { useGlobalsStore } from "@/stores/globals";
import {
    PhSquaresFour,
    PhUsersThree,
    PhCardholder,
    PhReceipt,
    PhStorefront,
    PhChartPieSlice,
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
    methods: {
        getClasses(href) {
            return (href === this.$route.path ? `tw-text-[${this.$constants.primary}]` : `tw-text-[${this.$constants.primary}]`) + ' tw-text-' + this.$constants.text_size.s2
        },
        startMarquee() {
            this.isHovered = true;
        },
        stopMarquee() {
            this.isHovered = false;
        },

    },
    data() {
        return {
            globals: useGlobalsStore(),
            isHovered: false,
            pdrawer: true,
            items: [
                { name: 'Dashboard', href: '/admin/dashboard', icon: 'mdi-view-dashboard', current: true },
                { name: 'Users', href: '/admin/users', icon: 'mdi-account-group', current: false },
                { name: 'Payments', href: '/admin/payments', icon: 'mdi-credit-card', current: false },
                { name: 'Invoices', href: '/admin/invoices', icon: 'mdi-file-document-multiple', current: false },
                { name: 'Businesses', href: '/admin/businesses', icon: 'mdi-store', current: false },
                { name: 'Categories', href: '/admin/categories', icon: 'mdi-chart-pie', current: false },
                { name: 'Messages', href: '/admin/messages', icon: 'mdi-message-processing', current: false },
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
.marquee {
        overflow: visible;
        animation: marquee 5s linear infinite;
      }
      
      @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-100%); }
      }
</style>