<template>
    <v-navigation-drawer v-model="pdrawer" :rail="rail" permanent>
        <v-list-item nav class="tw-py-[6px] tw-px-[6px]">
            <template v-slot:default>
                <div class="tw-flex tw-py-1 tw-items-center">
                    <img class="tw-h-12 tw-w-auto tw-mt-2" src="@/assets/logo.png" alt="logo" />
                    <div>
                        <transition name="slide-fade">
                            <div class="tw-ms-2 tw-mt-1 text-truncate ">
                                <span :class="$constants.text_size.s3, $constants.color.primary" class="tw-font-bold">GOMBE STATE</span> 
                                <p :class="$constants.text_size.xs1" class=" tw-text-gray-500 tw-mt-[-3px]">INTERNAL REVENUE SERVICE</p>
                            </div>
                        </transition>
                    </div>
                </div>
            </template>
        </v-list-item>
        <v-divider class="border-opacity-100" :class="$constants.bg.primary"></v-divider>
        <v-list density="compact" nav class="py-8">
            <v-list-item v-for="item in items" rounded="lg"
                :class="item.href === $route.path ? $constants.bg.primary : 'hover:tw-bg-green-100'"
                size="xlarge" :to="item.href"
                :value="item.title">
                <template v-slot:prepend>
                    <v-icon :class="item.href === $route.path ? $constants.color.light : $constants.color.primary" size="small" :icon="item.icon"></v-icon>
                </template>
                <template v-slot:default>
                    <span class="text-truncate" :class="item.href === $route.path ? $constants.color.light : $constants.color.primary">{{ item.name }}</span>
                </template>
            </v-list-item>
        </v-list>

        <v-list density="compact" nav slot="append">
        </v-list>
        
        <v-list-item nav class="tw-py-[6px] tw-px-[6px]">
            <template v-slot:default>
                <v-divider class="border-opacity-100" :class="$constants.bg.primary"></v-divider>
                <v-list-item rounded="lg"
                    :class="settings_path === $route.path ? $constants.bg.primary : 'hover:tw-bg-green-100 tw-bg-white'"
                    size="xlarge" to="/admin/settings"
                    value="Settings"
                    >
                    <template v-slot:prepend>
                        <v-icon :class="settings_path === $route.path ? $constants.color.light : $constants.color.primary" size="small" icon="mdi-cog-outline"></v-icon>
                    </template>
                    <template v-slot:default>
                        <span class="text-truncate" :class="settings_path === $route.path ? $constants.color.light : $constants.color.primary">Settings</span>
                    </template>
                </v-list-item>
                <v-list-item rounded="lg"
                    class="tw-my-0"
                    :class="logout_path === $route.path ? $constants.bg.primary : 'hover:tw-bg-green-100 tw-bg-white'"
                    size="xlarge" to="/admin/logout"
                    value="Settings"
                    >
                    <template v-slot:prepend>
                        <v-icon :class="logout_path === $route.path ? $constants.color.light : $constants.color.primary" size="small" icon="mdi-logout"></v-icon>
                    </template>
                    <template v-slot:default>
                        <span class="text-truncate" :class="logout_path === $route.path ? $constants.color.light : $constants.color.primary">Logout</span>
                    </template>
                </v-list-item>
                
                <v-divider class="border-opacity-100" :class="$constants.bg.primary"></v-divider>

                <v-list-item nav class="tw-py-[6px] tw-px-[8px]">
                    <template v-slot:default>
                        <div class="tw-flex tw-items-center tw-mt-1">
                            <img class="tw-h-9 tw-w-auto tw-rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s" alt="logo" />
                            <div>
                                <transition name="slide-fade">
                                    <div class="tw-ms-2 text-truncate">
                                        <span :class="$constants.text_size.s1, $constants.color.primary" class="tw-font-bold">AMINU MUDI</span> 
                                        <p :class="$constants.text_size.s1" class="tw-text-gray-500 tw-mt-[-3px]">SUB - ADMIN</p>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </template>
                </v-list-item>
            </template>
        </v-list-item>
    </v-navigation-drawer>

</template>

<script>
export default {
    props: {
        drawer: {
            default: false
        },
        rail: {
            default: true
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
            settings_path: '/admin/settings',
            logout_path: '/admin/logout'
        }
    },
    watch: {

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

</style>