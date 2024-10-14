<template>
    <div class=" tw-bg-black  tw-p-0 tw-w-full" >
        <v-layout class="rounded tw-p-0  !tw-bg-black rounded-md" >


            <v-navigation-drawer  v-model="pdrawer" :rail="computedRail" :temporary="temporary" :width="280">
                <div class="tw-h-[calc(100vh-200px)] tw-overflow-y-auto tw-font-[300]">
                    <div class="tw-flex tw-items-center tw-gap-1">
                        <img loading="lazy"
                            src="@/assets/logo-plain.svg"
                            class="tw-object-contain tw-shrink-0 tw-w-18 tw-aspect-square" alt="Company logo" />
                       <span class="tw-font-bold tw-text-xl">COWRIS</span>
                    </div>
                    <v-divider class="border-opacity-100" :class="`tw-bg-[${$constants.primary}]`"></v-divider>
                    <v-list density="compact" nav class="py-8">
                        <SideBarItem :state="pdrawer" v-for="item in main_items" :key="item.name" :item="item" />
                    </v-list>
                    <v-divider class="border-opacity-100" :class="`tw-bg-[${$constants.primary}]`"></v-divider>
                    <v-list density="compact" nav class="py-8">
                        <SideBarItem :state="pdrawer" v-for="item in items" :key="item.name" :item="item" />
                    </v-list>
                </div>
            </v-navigation-drawer>
            <v-app-bar flat :color="$constants.light" class="tw-shadow-none tw-border-b tw-py-2 tw-top-10 tw-transition-all" :style="isScrollingUp?'top:0px !important':''">                                            
                <v-app-bar-nav-icon v-if="!$vuetify.display.mdAndUp" variant="text" @click.stop="pdrawer = !pdrawer"></v-app-bar-nav-icon>
                <div class="tw-w-[92%] tw-mx-auto tw-flex tw-items-center tw-pe-3">
                <div  v-if="$vuetify.display.mdAndUp" class="tw-flex tw-items-center ">
                    <div class="tw-flex tw-items-center tw-gap-1">
                        <img loading="lazy"
                            src="@/assets/logo-plain.svg"
                            class="tw-object-contain tw-shrink-0 tw-w-18 tw-aspect-square" alt="Company logo" />
                       <span class="tw-font-bold tw-text-xl">COWRIS</span>
                    </div>
                 <div class="tw-ms-4">
                     <v-btn v-for="item in main_items" class="tw-capitalize tw-font-semibold" variant="link">{{ item.name }}</v-btn></div>
                </div>
                <v-spacer></v-spacer>
                <v-btn to="/login" v-if="$vuetify.display.mdAndUp && !ls.isLoggedIn()" class="tw-capitalize tw-font-semibold tw-border tw-border-gray-300 tw-me-3 " outlined color="black" >Sign In</v-btn>
                <v-btn  v-if="$vuetify.display.mdAndUp" class="tw-capitalize tw-font-semibold tw-me-3 tw-bg-black tw-text-white" elevated color="black" >Contact Us</v-btn>
                <CompanyCard v-if="ls.isLoggedIn()" class="tw-cursor-pointer" :name="false" />
                </div>
            </v-app-bar>            
            <v-main style="min-height:100vh;" :class="`tw-bg-[${$constants.layout_background}]`"  class="tw-p-0">
            <div>
                <RouterView v-slot="{ Component }">
                    <transition name="scale">
                        <component :is="Component" />
                    </transition>
                </RouterView>
            </div>
            </v-main>

        </v-layout>
    </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import useUserStore from '@/admin/stores/admin';
import SideBar from "@/components/sidebar/sidebar.vue"
import { useNotificationStore } from '@/stores/notification';
import { useGlobalsStore } from "@/stores/globals";
import ls from "@/services/ls";
import { useConstantsStore } from '@/stores/constants';
import BreadCrumbs  from '@/components/BreadCrumbs.vue' 
import useAdminStore from "@/admin/stores/admin";
import Select from "primevue/select";
import SideBarItem from "@/components/sidebar/SideBarItem.vue"
import CompanyCard from "@/components/CompanyCard.vue";
export default {
    components: {
        RouterView,
        SideBar,
        BreadCrumbs,
        Select,
        SideBarItem,
        CompanyCard
    },
    data() {
        return {
            ls:ls,
            globals: useGlobalsStore(),
            main_items:[
            {name:'Resources', href:'/',  permission:'', current: true },
            {name:'Developer', href:'/',  permission:'', current: true },
            {name:'Pricing', href:'/',  permission:'', current: true },
            ],
            items: [
                { name: 'Sign In', href: '/admin/dashboard', color: '#000', permission:'', current: true },
                { name: 'Contact Us', href: '/admin/users', color: '#000', permission:'' , current: false },
            ],
            drawer: false,
            userStore: useUserStore(),
            constantsStore: useConstantsStore(),
            adminStore: useAdminStore(),
            loading:false,
            pdrawer:false,
            computedRail:false,
            temporary:false,
            lastScrollTop: 70,
            isScrollingUp: false,
        }
    },
    beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    },
    watch: {
      
        'globals.subPageName': function (n, o) {
            /*   this.items[1] =
              {
                  title: n.name,
                  href: n.href
              } */
        },
        'globals.currentPageName': function (newPage, oldPage) {
            if (!this.items.some(item => item.title === newPage.name)) {
                this.items.push({
                    title: newPage.name,
                    to: newPage.href
                });
            }
        }
    },
    computed: {
        mode() {
            return this.constantsStore.mode;
        },
        constantsStore() {
            return useConstantsStore();
        }
    },
    created() {
        const savedMode = ls.get('mode');
        if (savedMode) {
            this.constantsStore.setMode(savedMode);
        }
        
    },
    computed: {
     
    },
    methods: {
        handleScroll() {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScrollTop > this.lastScrollTop) {
                this.isScrollingUp = true;
            } else {
                this.isScrollingUp = false;
            }
         //   this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
        },
      
        showNo() {
            const notificationStore = useNotificationStore();
            notificationStore.showNotification({
                type: 'success',
                message: 'Notification triggered!',
            });
        },
        async created() {
            await this.userStore.fetchUserPermissions();
        },
    },
    mounted() {
    window.addEventListener('scroll', this.handleScroll);
    },

}

</script>

<style scoped>
.slide-leave-active,
.slide-enter-active {
    transition: .4s;
}

.slide-enter {
    transform: translate(-100%, 0);
}

.slide-leave-to {
    transform: translate(100%, 0);
}

.scale-enter-active,
.scale-leave-active {
    transition: all 0.3s ease;
}

.scale-enter-from {
    opacity: 0;
    transform: scale(0);
}

.scale-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>
