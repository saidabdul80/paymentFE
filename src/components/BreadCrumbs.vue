<template>
    <v-breadcrumbs :items="breadcrumbs" :color="mode === 'LIGHT' ? '' : 'white'"
        :active-class="mode === 'LIGHT' ? '' : 'tw-text-white'">
        <template v-slot:divider>
            <v-icon icon="mdi-chevron-right" :color="mode === 'LIGHT' ? '' : 'white'"></v-icon>
        </template>
    </v-breadcrumbs>
</template>

<script>

import ls from '@/services/ls';
import { useConstantsStore } from '@/stores/constants';

export default {
    data(){
        return{
            constantsStore: useConstantsStore()
        }
    },
    methods:{

    },
    computed: {
        mode() {
            return this.constantsStore.mode;
        },
        breadcrumbs() {
            let matchedRoutes = this.$route.matched;
            let breadcrumbs = [];

            matchedRoutes.forEach(route => {
                if (route.meta.parent) {
                    let parentRoute = this.$router.options.routes.find(r => {
                        if (r.children) {
                            return r.children.find(c => c.name === route.meta.parent);
                        }
                        return r?.name === route.meta.parent;
                    });

                    if (parentRoute) {
                        const topParentPath = parentRoute.path
                        if (parentRoute?.children) {
                            parentRoute = parentRoute.children.find(r => r?.name === route.meta.parent);
                        }
                        breadcrumbs.push({
                            title: parentRoute.meta.breadcrumb,
                            to: topParentPath + '/' + parentRoute.path,
                            exact: true
                        });
                    }
                }

                if (route.meta.breadcrumb ) {
                    breadcrumbs.push({
                        title: typeof route.meta.breadcrumb === 'function'
                            ? route.meta.breadcrumb(this.$route)
                            : route.meta.breadcrumb,
                        to: route.path,
                        exact: true
                    });
                }
            });

            return [...breadcrumbs];
        },
        
    },
    created(){
        const savedMode = ls.get('mode');
         if (savedMode) {
              this.constantsStore.setMode(savedMode);
          } 

    }
}

</script>
