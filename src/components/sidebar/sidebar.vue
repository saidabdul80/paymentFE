<template>    
    <v-navigation-drawer v-model="pdrawer" :rail="computedRail" :temporary="temporary" :color="$constants.light">
        <div class="tw-h-[calc(100vh-160px)] tw-overflow-y-auto tw-font-[300]">
            <v-list-item nav class="tw-py-[6px] tw-px-[6px]" @mouseenter="startMarquee" @mouseleave="stopMarquee">
                <template v-slot:default>
                    <div class="tw-flex tw-py-1 tw-items-center">
                        <img class="tw-h-12 tw-w-auto tw-mt-2" src="@/assets/logo.png" alt="logo" />
                        <div>
                            <transition name="slide-fade">
                                <div class="tw-ms-2 tw-mt-1 text-truncate tw-font-visby uppercase">
                                    <span :class="`${$constants.text_size.s3} tw-text-[${$constants.primary}]`"
                                        class="tw-font-bold">COWRIS</span>                                    
                                </div>
                            </transition>
                        </div>
                    </div>
                </template>
            </v-list-item>

            <v-divider class="border-opacity-100" :class="`tw-bg-[${$constants.primary}]`"></v-divider>

            <v-list density="compact" nav class="py-8">
                <SideBarItem v-for="item in filteredItems" :key="item.name" :item="item" />
            </v-list>
        </div>

        <v-list density="compact" nav slot="append"></v-list>

        <div class="tw-py-[6px] tw-fixed tw-bottom-0 tw-w-full tw-bg-white">
            <v-divider class="border-opacity-100 tw-mx-4" :class="`tw-bg[${$constants.primary}]`"></v-divider>
            <v-list density="compact" nav class="py-1">
                <SideBarItem v-for="item in filteredSubItems" :key="item.name" :item="item" @click="handleItemClick(item)" />            
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
                            class="tw-font-bold tw-text-base tw-font-visby">AMINU MUDI</span>
                        <p :class="`tw-text-${$constants.text_size.s1} tw-text-[${$constants.dark}]`"
                            class="tw-mt-[-3px] tw-font-visby tw-text-xs tw-font-bold tw-text-[#626260]">SUB - ADMIN</p>
                    </div>
                </template>
            </v-list-item>
        </div>
    </v-navigation-drawer>
</template>

<script>
import SideBarItem from "@/components/sidebar/SideBarItem.vue"
import { useGlobalsStore } from "@/stores/globals";
import Ls from '@/services/ls'
import { useAuthStore } from "@/admin/stores/auth";
import abilities from "@/admin/stubs/abilities"
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
        SideBarItem,
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
    data() {
        return {
            authStore:useAuthStore(),
            user: JSON.parse(Ls.get('auth.client')||"{}"),
            globals: useGlobalsStore(),
            isHovered: false,
            pdrawer: true,
            items: [
                { name: 'Dashboard', href: '/admin/dashboard', icon: 'mdi-view-dashboard', permission:abilities.DASHBOARD, current: true },
                { name: 'Users', href: '/admin/users', icon: 'mdi-account-group', permission: abilities.VIEW_ADMINS, current: false },
                { name: 'Pay Bills', href: '/admin/paybill', icon: 'mdi-numeric-0-box-multiple-outline', permission:abilities.VIEW_PAY_BILLS, current: false }, 
                { name: 'Received Transactions', href: '/admin/receive', icon: 'mdi-login', permission:abilities.VIEW_RECEIVE, current: false },
                { name: 'Sent Transactions', href: '/admin/sent', icon: 'mdi-logout', permission:abilities.VIEW_SENTS, current: false },
                { name: 'Send Money', href: '/admin/send', icon: 'mdi-file-document-multiple', permission:abilities.SEND_MONEY, current: false },
            ],
            subItems: [
                { name: 'Settings', href: '/admin/settings', icon: 'mdi-cog-outline', permission:abilities.VIEW_ROLES, current: true },
                { name: 'Logout', href: '', icon: 'mdi-logout', current: false }
            ]
        }
    },
    props: {
        drawer: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: Boolean,
            default: true
        }
    },   
    computed: {
        filteredItems() {
            return this.items.filter(item => !item.permission || Ls.hasPermission(item.permission));
        },
        filteredSubItems() {
            return this.subItems.filter(item => !item.permission || Ls.hasPermission(item.permission));
        },
        pdrawer: {
            get() {
                return this.$vuetify.display.mdAndDown ?  this.modelValue : true;                
            },
            set(value) {                
                this.$emit('update:modelValue', value);

            }
        },
        computedRail() {
            return this.$vuetify.display.mdAndDown ? false : this.modelValue;
        },
        temporary() {
            return this.$vuetify.display.mdAndDown;
        }
    },
    methods: {
        permissions(){
            return Ls.get('permissions');
        },
        getClasses(href) {
            return (href === this.$route.path ? `tw-text-[${this.$constants.primary}]` : `tw-text-[${this.$constants.primary}]`) + ' tw-text-' + this.$constants.text_size.s2;
        },
        startMarquee() {
            this.isHovered = true;
        },
        stopMarquee() {
            this.isHovered = false;
        },
        handleItemClick(item) {
            if (item.name === 'Logout') {
                this.authStore.logout();
            } else {
                this.$router.push(item.href);
            }
        },
    },
    watch: {
        group() {
            this.pdrawer = false;
        },
    },
    created() {
        console.log(this.$vuetify);
    }
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
