<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
                <v-list-item nav >
                    <template v-slot:prepend v-if="!rail">
                        <v-btn icon="mdi-home" variant="text"></v-btn>
                    </template>
                    <template v-slot:default>
                        <div v-if="!rail">
                            Gombe GIRAS
                            <p>Other text</p>
                        </div>
                    </template>
                    <template v-slot:append>
                        <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
                    </template>
                </v-list-item>
                <v-divider></v-divider>
                <hr>
                <br>
                <v-list density="compact" nav>
                    <v-list-item rounded="lg" prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
                    <v-list-item rounded="lg" prepend-icon="mdi-account" title="My Account"
                        value="account"></v-list-item>
                    <v-list-item rounded="lg" prepend-icon="mdi-account-group-outline" title="Users"
                        value="users"></v-list-item>
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
        }

    },

}

</script>