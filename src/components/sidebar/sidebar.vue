<template>
    <v-navigation-drawer v-model="pdrawer" :rail="rail" permanent>
        <v-list-item nav class="tw-py-[6px]">
            <template v-slot:default>
                <div class="tw-flex tw-py-4 tw-items-center">
                    <v-btn icon="mdi-circle" color="green" class="tw-text-4xl " variant="text"></v-btn>
                    <div>
                        <transition name="slide-fade">
                            <div class="tw-ms-2 tw-mt-1 text-truncate ">
                                <span :class="$globals.text_size.s3" class="tw-text-green-900 tw-font-bold">Gombe State</span> 
                                <p :class="$globals.text_size.s1">Internal Revenue</p>
                            </div>
                        </transition>
                    </div>
                </div>
            </template>
        </v-list-item>
        <v-divider class="border-opacity-100" color="success"></v-divider>
        <v-list density="compact" nav class="py-8">
            <v-list-item v-for="item in items" rounded="lg" active-class="tw-bg-green-100" size="xlarge" :to="item.path"
                :value="item.title">
                <template v-slot:prepend>
                    <v-icon class="tw-text-green-900" size="small" :icon="item.icon"></v-icon>
                </template>
                <template v-slot:default>
                    <span class="text-truncate tw-text-green-700" :class="$globals.text_size.s2">{{ item.title }}</span>
                </template>
            </v-list-item>
        </v-list>
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
                {
                    title: 'Home',
                    icon: 'mdi-home-city',
                    path: '/'
                },
                {
                    title: 'My Account',
                    icon: 'mdi-account',
                    path: '/accounts'
                },
                {
                    title: 'Users',
                    icon: 'mdi-account-group-outline',
                    path: '/users'
                }
            ]
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