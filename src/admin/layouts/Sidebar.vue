<template>
    <!-- Static sidebar for desktop -->
    <div class="tw-hidden lg:tw-fixed lg:tw-inset-y-0 lg:tw-z-50 lg:tw-flex lg:tw-w-72 lg:tw-flex-col">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="tw-flex tw-grow tw-flex-col tw-gap-y-5 tw-overflow-y-auto tw-bg-indigo-600 tw-px-6 tw-pb-4">
            <div class="tw-flex tw-h-16 tw-shrink-0 tw-items-center">
                
            </div>
            <div class="tw-flex tw-flex-1 tw-flex-col">
                <ul role="list" class="tw-flex tw-flex-1 tw-flex-col tw-gap-y-7">
                    <li>
                        <ul role="list" class="-tw-mx-2 tw-space-y-1">
                            <li v-for="item in navigation" :key="item.name">
                                <a :href="item.href"
                                    :class="[item.current ? 'tw-bg-indigo-700 tw-text-white' : 'tw-text-indigo-200 hover:tw-text-white hover:tw-bg-indigo-700', 'group tw-flex tw-gap-x-3 tw-rounded-md tw-p-2 tw-text-sm tw-leading-6 tw-font-semibold']">
                                    <component :is="item.icon"
                                        :class="[item.current ? 'tw-text-white' : 'tw-text-indigo-200 group-hover:tw-text-white', 'tw-h-6 tw-w-6 tw-shrink-0']"
                                        aria-hidden="true" />
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div class="tw-text-xs tw-font-semibold tw-leading-6 tw-text-indigo-200">Your teams</div>
                        <ul role="list" class="-tw-mx-2 tw-mt-2 tw-space-y-1">
                            <li v-for="team in teams" :key="team.name">
                                <a :href="team.href"
                                    :class="[team.current ? 'tw-bg-indigo-700 tw-text-white' : 'tw-text-indigo-200 hover:tw-text-white hover:tw-bg-indigo-700', 'group tw-flex tw-gap-x-3 tw-rounded-md tw-p-2 tw-text-sm tw-leading-6 tw-font-semibold']">
                                    <span
                                        class="tw-flex tw-h-6 tw-w-6 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-lg tw-border tw-border-indigo-400 tw-bg-indigo-500 tw-text-[0.625rem] tw-font-medium tw-text-white">{{
                                            team.initial }}</span>
                                    <span class="tw-truncate">{{ team.name }}</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="tw-mt-auto">
                        <a href="#"
                            class="group -tw-mx-2 tw-flex tw-gap-x-3 tw-rounded-md tw-p-2 tw-text-sm tw-font-semibold tw-leading-6 tw-text-indigo-200 hover:tw-bg-indigo-700 hover:tw-text-white">
                            <Cog6ToothIcon
                                class="tw-h-6 tw-w-6 tw-shrink-0 tw-text-indigo-200 group-hover:tw-text-white"
                                aria-hidden="true" />
                            Settings
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'



const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
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
    { name: 'My Account', href: '#', current: false },
    { name: 'Company', href: '#', current: false },
    { name: 'Team Members', href: '#', current: true },
    { name: 'Billing', href: '#', current: false },
]

const sidebarOpen = ref(false);

export default {
    name: 'Sidebar'
}
</script>