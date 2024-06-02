<template>
    <div :class="`tw-flex tw-h-full tw-p-0 tw-w-full`" >
        <v-layout class="rounded rounded-md" :color="$constants.light">
            <SideBar :drawer="drawer" :rail="drawer" />
            <v-app-bar flat :color="$constants.light" class="tw-shadow-md">
                <v-app-bar-nav-icon variant="text" @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <template v-if="$vuetify.display.mdAndUp">
                    <v-switch
                        v-model="mode"
                        @change="toggleMode"
                        class="tw-text-sm tw-w-[150px]"
                        :class="mode === 'LIGHT' ? 'tw-text-green-900' : 'tw-text-gray-500'"
                        :color="mode === 'LIGHT' ? $constants.success : 'gray-500'"
                        :label="`${mode}`"
                        false-value="DARK"
                        true-value="LIGHT"
                        hide-details
                    >
                        <template v-slot:prepend>
                            <v-icon icon="mdi-white-balance-sunny"></v-icon>
                        </template>
                    </v-switch>
                </template>
                <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
            </v-app-bar>
            <v-main style="height:100vh;" >
                <v-breadcrumbs :items="items" :bg-color="$constants.light">
                    <template v-slot:divider >
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </template>
                    <template v-slot:title="item">
                        <span style="text-transform: capitalize;">{{ item.item.title.toLowerCase()?.replaceAll('-', ' ') }}</span>
                    </template>
                </v-breadcrumbs>
                <RouterView v-slot="{ Component }">
                    <transition name="scale">
                        <component :is="Component"  :class="`tw-bg-[${$constants.light}]`" />
                    </transition>
                </RouterView>
            </v-main>
        </v-layout>
    </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import useUserStore from '@/admin/stores/user';
import SideBar from "@/components/sidebar/sidebar.vue"
import { useNotificationStore } from '@/stores/notification';
import { useGlobalsStore } from "@/stores/globals";
import { storeToRefs } from "pinia";
import ls from "@/services/ls";
import { useConstantsStore } from '@/stores/constants';
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
        'globals.subPageName': function(n, o) {
            this.items[1].title = n;
        },
        '$route.name': function(n, o) {
            this.items[0].title = n;
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
        ];
    },
    methods: {
        toggleMode() {
            this.constantsStore.toggleMode();
            ls.set('mode', this.constantsStore.mode);
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
    }
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
