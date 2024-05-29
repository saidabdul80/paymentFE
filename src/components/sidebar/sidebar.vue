<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
                <v-list-item nav >
                    <template v-slot:prepend v-if="!rail">
                        <v-btn icon="mdi-home" variant="text"></v-btn>
                    </template>
                    <template v-slot:default>
                        <transition name="slide-fade">
                            <div class="text-truncate ">
                                Gombe GIRAS
                                <p>Other text</p>
                            </div>
                        </transition>
                    </template>
                    <template v-slot:append>

                        <v-btn :icon="!rail?'mdi-chevron-left':'mdi-chevron-right'" variant="text" @click.stop="rail = !rail"></v-btn>
                    </template>
                </v-list-item>
                <v-divider></v-divider>
                <hr>
                <br>
                <v-list density="compact" nav>
                    <v-list-item v-for="item in items" rounded="lg" active-class="tw-bg-green-100" size="xlarge"  :to="item.path"  :value="item.title">
                        <template v-slot:prepend>
                            <v-icon class="tw-text-green-900" size="small" :icon="item.icon"></v-icon>
                        </template>
                        <template  v-slot:default>
                            <span class="text-truncate tw-text-green-700" :class="$globals.text_size.s2" >{{ item.title }}</span>
                        </template>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main style="height: 250px"></v-main>
        </v-layout>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            drawer: true,
            rail: true,
            items:[
                {
                    title:'Home',
                    icon:'mdi-home-city',
                    path:'/'
                },
                {
                    title:'My Account',
                    icon:'mdi-account',
                    path:'/accounts'
                },
                {
                    title:'Users',
                    icon:'mdi-account-group-outline',
                    path:'/users'
                }
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

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

/* Overriding the class*/
.theme--light.v-application {
  background: #011627;
}
</style>