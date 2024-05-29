<template>
    <div>
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog class="tw-relative tw-z-50 lg:tw-hidden" @close="sidebarOpen = false">
                <TransitionChild as="template" enter="tw-transition-opacity tw-ease-linear tw-duration-300"
                    enter-from="tw-opacity-0" enter-to="tw-opacity-100"
                    leave="tw-transition-opacity tw-ease-linear tw-duration-300" leave-from="tw-opacity-100"
                    leave-to="tw-opacity-0">
                    <div class="tw-fixed tw-inset-0 tw-bg-gray-900/80" />
                </TransitionChild>

                <div class="tw-fixed tw-inset-0 tw-flex">
                    <TransitionChild as="template" enter="tw-transition tw-ease-in-out tw-duration-300 tw-transform"
                        enter-from="-tw-translate-x-full" enter-to="tw-translate-x-0"
                        leave="tw-transition tw-ease-in-out tw-duration-300 tw-transform" leave-from="tw-translate-x-0"
                        leave-to="-tw-translate-x-full">
                        <DialogPanel class="tw-relative tw-mr-16 tw-flex tw-w-full tw-max-w-xs tw-flex-1">
                            <TransitionChild as="template" enter="tw-ease-in-out tw-duration-300"
                                enter-from="tw-opacity-0" enter-to="tw-opacity-100"
                                leave="tw-ease-in-out tw-duration-300" leave-from="tw-opacity-100"
                                leave-to="tw-opacity-0">
                                <div
                                    class="tw-absolute tw-left-full tw-top-0 tw-flex tw-w-16 tw-justify-center tw-pt-5">
                                    <button type="button" class="-tw-m-2.5 tw-p-2.5" @click="sidebarOpen = false">
                                        <span class="tw-sr-only">Close sidebar</span>
                                        <XMarkIcon class="tw-h-6 tw-w-6 tw-text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div class="tw-flex tw-grow tw-flex-col tw-gap-y-5 tw-overflow-y-auto tw-px-6 tw-pb-4">
                                <div class="tw-flex tw-h-16 tw-shrink-0 tw-items-center">
                                    <img class="tw-h-8 tw-w-auto" src="@/assets/logo-white.png" alt="Your Company" />
                                </div>
                                <nav class="tw-flex tw-flex-1 tw-flex-col">
                                    <ul role="list" class="tw-flex tw-flex-1 tw-flex-col tw-gap-y-7">
                                        <li>
                                            <ul role="list" class="-tw-mx-2 tw-space-y-1">
                                                <li v-for="item in navigation" :key="item.name">
                                                    <router-link :to="item.href"
                                                        :class="[item.current ? 'tw-bg-green-700 tw-text-white' : 'tw-text-indigo-200 hover:tw-text-white hover:tw-bg-green-700', 'group tw-flex tw-gap-x-3 tw-rounded-md tw-p-2 tw-text-sm tw-leading-6 tw-font-semibold']">
                                                        <component :is="item.icon"
                                                            :class="[item.current ? 'tw-text-white' : 'tw-text-indigo-200 group-hover:tw-text-white', 'tw-h-6 tw-w-6 tw-shrink-0']"
                                                            aria-hidden="true" />
                                                        {{ item.name }}
                                                    </router-link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="tw-mt-auto">
                                            <a href="#"
                                                class="group -tw-mx-2 tw-flex tw-gap-x-3 tw-rounded-md tw-p-2 tw-text-sm tw-font-semibold tw-leading-6 tw-text-indigo-200 hover:tw-bg-green-700 hover:tw-text-white">
                                                <Cog6ToothIcon
                                                    class="tw-h-6 tw-w-6 tw-shrink-0 tw-text-indigo-200 group-hover:tw-text-white"
                                                    aria-hidden="true" />
                                                Settings
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div class="tw-hidden lg:tw-fixed lg:tw-inset-y-0 lg:tw-z-50 lg:tw-flex lg:tw-w-72 lg:tw-flex-col tw-shadow-md">
            <div class="tw-flex tw-grow tw-flex-col tw-gap-y-5 tw-overflow-y-auto tw-bg-white tw-px-6 tw-pb-4">
                <div class="tw-flex tw-h-16 tw-shrink-0 tw-items-center">
                    <img class="tw-h-12 tw-w-auto" src="@/assets/logo.png" alt="Your Company" />
                </div>
                <nav class="tw-flex tw-flex-1 tw-flex-col">
                    <ul role="list" class="tw-flex tw-flex-1 tw-flex-col tw-gap-y-7">
                        <li>
                            <ul role="list" class="-tw-mx-2 tw-space-y-1">
                                <li v-for="item in navigation" :key="item.name">
                                    <a :href="item.href"
                                        :class="[item.current ? 'tw-bg-green-700 tw-text-white' : 'tw-text-green-700 hover:tw-text-white hover:tw-bg-green-700', 'group tw-flex tw-gap-x-3 tw-rounded-md tw-p-2 tw-text-sm tw-leading-6 tw-font-semibold']">
                                        <component :is="item.icon" class='tw-h-6 tw-w-6 tw-shrink-0'
                                            aria-hidden="true" />
                                        {{ item.name }}
                                    </a>
                                    <!-- class="[item.current ? 'tw-bg-green-700 tw-text-white' : 'tw-text-green-700 hover:tw-text-white hover:tw-bg-white', 'tw-h-6 tw-w-6 tw-shrink-0']" -->
                                </li>
                            </ul>
                        </li>
                        <li class="tw-mt-auto">
                            <a href="#"
                                class="group -tw-mx-2 tw-flex tw-gap-x-3 tw-rounded-md tw-p-2 tw-text-sm tw-font-semibold tw-leading-6 tw-text-green-700 hover:tw-bg-green-800 hover:tw-text-white">
                                <Cog6ToothIcon class="tw-h-6 tw-w-6 tw-shrink-0 " aria-hidden="true" />
                                Settings
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="lg:tw-pl-72">
            <div
                class="tw-sticky tw-top-0 tw-z-40 tw-flex tw-h-16 tw-shrink-0 tw-items-center tw-gap-x-4 tw-border-b tw-border-gray-200 tw-bg-white tw-px-4 tw-shadow-sm sm:tw-gap-x-6 sm:tw-px-6 lg:tw-px-8">
                <button type="button" class="-tw-m-2.5 tw-p-2.5 tw-text-gray-700 lg:tw-hidden"
                    @click="sidebarOpen = true">
                    <span class="tw-sr-only">Open sidebar</span>
                    <Bars3Icon class="tw-h-6 tw-w-6" aria-hidden="true" />
                </button>

                <div class="tw-h-6 tw-w-px tw-bg-gray-900/10 lg:tw-hidden" aria-hidden="true" />

                <div class="tw-flex tw-flex-1 tw-gap-x-4 tw-self-stretch lg:tw-gap-x-6">
                    <div class="tw-relative tw-flex tw-flex-1">
                    </div>
                    <div class="tw-flex tw-items-center tw-gap-x-4 lg:tw-gap-x-6">
                        <button type="button" class="-tw-m-2.5 tw-p-2.5 tw-text-gray-400 hover:tw-text-gray-500">
                            <span class="tw-sr-only">View notifications</span>
                            <BellIcon class="tw-h-6 tw-w-6" aria-hidden="true" />
                        </button>


                    </div>
                </div>
            </div>

            <router-view />

        </div>
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

const tabs = [
    { name: 'Identification Details', href: '#', current: true },
    { name: 'Personal Details', href: '#', current: false },
    { name: 'Contact Information', href: '#', current: false },
    { name: 'Business / Employer Details', href: '#', current: false },
]

const currentTab = ref('Identification Details');

const sidebarOpen = ref(false);

</script>