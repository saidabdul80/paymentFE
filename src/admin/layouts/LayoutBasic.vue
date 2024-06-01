<template>
    <div class="tw-flex tw-h-full tw-w-full tw-bg-gray-100">

        <v-layout class="rounded rounded-md">
            <SideBar :drawer="drawer" :rail="drawer" />
            <v-app-bar flat color="success">
                <v-app-bar-nav-icon variant="text" @click="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title>{{ $route.name }}</v-toolbar-title>

                <v-spacer></v-spacer>

                <template v-if="$vuetify.display.mdAndUp">
                    <v-btn icon="mdi-magnify" variant="text"></v-btn>

                    <v-btn icon="mdi-filter" variant="text"></v-btn>
                </template>

                <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
            </v-app-bar>
            <v-main style="height:100vh;">
                <v-breadcrumbs :items="items">
                    <template v-slot:divider color="red">
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </template>
                    <template v-slot:title="item">
                        <span style="text-transform: capitalize;">{{ item.item.title.toLowerCase().replaceAll('-', '
                            ')}}</span>
                    </template>
                </v-breadcrumbs>
                <RouterView></RouterView>
            </v-main>
        </v-layout>
    </div>

</template>

<script setup>
import { ref } from 'vue'
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const navigation = [
    { name: 'DASHBOARD', href: '/admin/dashboard', icon: HomeIcon, current: true },
    { name: 'USERS', href: '/admin/dashboard/users', icon: UsersIcon, current: false },
    { name: 'PAYMENTS', href: '/admin/dashboard/payments', icon: UsersIcon, current: false },
    { name: 'INVOICES', href: '/admin/dashboard/invoices', icon: FolderIcon, current: false },
    { name: 'BUSINESSES', href: '/admin/dashboard/businesses', icon: CalendarIcon, current: false },
    { name: 'CATEGORIES', href: '/admin/dashboard/categories', icon: DocumentDuplicateIcon, current: false },
    { name: 'MESSAGES', href: '/admin/dashboard/messages', icon: ChartPieIcon, current: false },
]
const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]
const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
]

    < script >
import { RouterLink, RouterView } from "vue-router";
import useUserStore from '@/admin/stores/user';
import SideBar from "@/components/sidebar/sidebar.vue"
import { useNotificationStore } from '@/stores/notification';
import { useGlobalsStore } from "@/stores/globals";
import { storeToRefs } from "pinia";

export default {
    components: {
        RouterView,
        SideBar
    },
    data() {
        return {
            items: [],
            globals: useGlobalsStore(),
            userNavigation: [
                { name: 'Your profile', href: '#' },
                { name: 'Sign out', href: '#' },
            ],
            drawer: true,
            userStore: useUserStore(),
        }
    },
    watch: {
        'globals.subPageName': function (n, o) {
            this.items[1].title = n
        },
        '$route.name': function (n, o) {
            this.items[0].title = n
        }
    },
    created() {

        this.items = [
            {
                title: this.$route.name.replaceAll('-', ''),
                disabled: false,
                href: '#',
                class: 'tw-text-gray-500 tw-font-bold'
            },
            {
                title: '',
                disabled: false,
                href: '#',
                class: 'tw-text-green-700 tw-font-bold'
            }
        ]

    },
    methods: {
        showNo() {
            alert()
            const notificationStore = useNotificationStore();
            notificationStore.showNotification({
                type: 'success',
                message: 'Notification triggered!',
            })
        },
        async created() {
            await this.userStore.fetchUserPermissions();
        },

        const sidebarOpen = ref(false);

</script>