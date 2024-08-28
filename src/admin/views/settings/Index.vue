<template>
    <div>
        <Tab :tabs="allowedTabs" v-model="tab" :withBorder="false" bg="transparent">
        <!-- <Tab :tabs="tabs" :config="tabConfig" :withBorder="false"> -->
            <template v-slot:Configuration>
                <Configurations />
            </template>
            <template v-slot:Role>
                <Role />
            </template>
        </Tab>

    </div>
</template>

<script>
import { useGlobalsStore } from '@/stores/globals';
import Tab from '@/components/tab.vue';
import Role from "./Role.vue"
import Configurations from "./Configurations.vue"
import ls from '@/services/ls';
import abilities from '@/admin/stubs/abilities';
export default {
    components: {
        Role,
        Tab,
        Configurations
    },
    data() {
        return {
            tab:0,
            globals: useGlobalsStore(),
            tabs: [
                { name: 'Configuration', key: 'Configuration' },
                { name: 'Manage Roles', key: 'Role' },                
            ],
          /*   tabConfig: {
                'Admins': {
                    search: true,
                    searchOptions: [
                        "email",
                        "staff_number",
                        "phone_number"
                    ],
                    sideButton: true,
                    toolTipText: '',
                    dropDownLabel: 'Add New Admin',
                    dropdownItem: [{
                        title: 'Add Admin',
                        link: 'users/add-admin/'
                    }]
                },
                'Vendors': {
                    search: true,
                    sideButton: true,
                    toolTipText: '',
                    dropDownLabel: 'Add New Vendor',
                    searchOptions: [
                        "email",
                        "phone_number",
                        "gtin",
                    ],
                    dropdownItem: [{
                        title: 'Individual Taxpayer',
                        link: 'users/add-vendor/'
                    }]
                },
                'Taxpayers': {
                    search: true,
                    sideButton: true,
                    searchOptions: [
                        "email",
                        "phone_number",
                        "gtin",
                    ],
                    toolTipText: '',
                    header: 'CHOOSE TAXPAYER TYPE',
                    dropDownLabel: 'Add New TaxPayer',
                    searchOptions: [
                        "email",
                        "phone_number",
                        "rc_number",
                    ],
                    dropdownItem: [
                        {
                            title: 'Individual Taxpayer',
                            link: 'users/add-individual-taxpayer/'
                        },
                        {
                            title: 'Corporate Taxpayer',
                            link: 'users/add-corporate-taxpayer/'
                        }
                    ]
                },
            }, */
        }
    },
    computed:{
      allowedTabs(){
        return this.tabs.filter((item)=>{
          if(item.name === 'Configuration'){
            return ls.hasPermission(abilities.MANAGE_SETTING)
          }
          if(item.name === 'Manage Roles'){
            return ls.hasPermission(abilities.MANAGE_ROLE)
          }
        })
      }
    },
}
</script>

<style lang="scss" scoped></style>