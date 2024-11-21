
<template>    
    <v-navigation-drawer class="tw-transition-all" v-model="pdrawer" :rail="computedRail" :temporary="temporary" :color="$constants.light" :width="280">
        
        <div class="tw-h-[calc(100vh-200px)] tw-overflow-y-auto tw-font-[300] tw-transition-all ">
            <v-list-item nav class="tw-py-[6px] tw-px-[6px]" @mouseenter="startMarquee" @mouseleave="stopMarquee">
                <template v-slot:default>
                    <div class="tw-flex tw-py-2 tw-items-center">
                        <img class=" tw-w-auto" src="@/assets/logo-plain.svg" alt="logo" />
                        <div>
                            <transition name="slide-fade">
                                <div class="tw-ms-2 tw text-truncate tw-font-visby uppercase tw-flex tw-items-center">
                                    <span class="tw-text-black tw-text-2xl tw-font-bold">COWRIS</span>    
                                    <Badge severity="danger" :pt="{root:{class:'tw-ms-2 tw-bg-red tw-text-white !tw-opacity-[1]'}}" value="Beta" />                                                                
                                </div>
                            </transition>
                        </div>
                    </div>

                    <div class="tw-flex  tw-py-2 tw-items-center" :class="!modelValue?'tw-px-4':'tw-px-0 tw-w-[90px]'">
                      
                    <!-- <Badge v-if="!user?.picture_url || user?.imageError" class="tw-mt-[18px]" :style="{
                        backgroundColor: getColorFromWord(getInitials(user?.business_name)), 
                        borderRadius: '50%', 
                        width:!modelValue? '50px' :'40px', 
                        marginBottom: '20px', 
                        height: !modelValue? '50px' :'40px', 
                        marginTop: '10px'
                    }" severity="contrast">
                    <span class="tw-text-[16px] tw-font-[500]">{{ getInitials(user?.business_name) }}</span>
             
                    </Badge>
                    <img v-else :src="user?.picture_url" @error="handleImageError(user)" :alt=" user.business_name " class="tw-h-[40px] tw-w-[40px] tw-rounded-full" />
                        <div v-if="!modelValue" class="tw-ms-3">
                            <p class="tw-text-xl tw-font-[400] tw-capitalize tw-truncate tw-w-[159px]">
                                {{ user.business_name }}
                            </p>
                            <p class="tw-font-[300]">  {{ user?.first_name }} {{ user?.last_name  }}</p>
                        </div> -->
                    </div>
                </template>
            </v-list-item>

            <v-divider class="border-opacity-100" :class="`tw-bg-[${$constants.primary}]`"></v-divider>

            <v-list density="compact" nav class="py-8">
                <SideBarItem :state="modelValue" v-for="item in filteredItems" :key="item.name" :item="item" />
            </v-list>
        </div>

        <!-- <v-list density="compact" nav slot="append"></v-list> -->

        <div class="tw-py-[6px] tw-bottom-0 tw-w-full tw-bg-white">
            <v-divider class="border-opacity-100 tw-mx-4" :class="`tw-bg[${$constants.primary}]`"></v-divider>
            <v-list density="compact" nav class="py-1">
                <SideBarItem :state="modelValue" v-for="item in filteredSubItems" :key="item.name" :item="item" @click="handleItemClick(item)" />            
            </v-list>
          
        </div>
    </v-navigation-drawer>
</template>

<script>
import SideBarItem from "@/components/sidebar/SideBarItem.vue"
import { useGlobalsStore } from "@/stores/globals";
import Ls from '@/services/ls'
import { useAuthStore } from "@/admin/stores/auth";
import abilities from "@/admin/stubs/abilities"
import Badge from 'primevue/badge';
import {
    PhSquaresFour,
    PhUsersThree,
    PhCardholder,
    PhReceipt,
    PhStorefront,
    PhChartPieSlice,
    PhChatDots,
    PhGear,
    PhSignOut,
    PhScroll,
    PhWallet,
    PhBell,
    PhQuestion,
} from "@phosphor-icons/vue";
import CompanyCard from "../CompanyCard.vue";


export default {
    components: {
        SideBarItem,
        PhSquaresFour,
        PhUsersThree,
        PhCardholder,
        PhReceipt,
        PhStorefront,
        PhChartPieSlice,
        PhChatDots,
        PhGear,
        PhSignOut,
        Badge,
        CompanyCard
        
    },
    data() {
        return {
            authStore:useAuthStore(),
            // user: JSON.parse(Ls.get('auth.client')||"{}"),
            user: Ls.get('auth.user'),
            globals: useGlobalsStore(),
            isHovered: false,
            pdrawer: true,
            items: [
                { name: 'Dashboard', href: '/admin/dashboard', icon: PhSquaresFour, permission:'', current: true },
                { name: 'Customers', href: '/admin/customers', icon: PhUsersThree, permission:'', current: false },
                { name: 'Clients', href: '/admin/clients', icon: PhUsersThree, permission:'', current: false },
                // { name: 'Wallet', href: '/app/wallet', icon: PhWallet, permission:'' , current: false },
                { name: 'Transactions', href: '/admin/transactions', icon: PhScroll, permission:'', current: false }, 
                // { name: 'Notifications', href: '/app/notifications', icon: PhBell, permission:'', current: false },
        
            ],
            subItems: [
                { name: 'Settings', href: '/admin/settings', icon:PhGear, permission:'', current: true },
                // { name: 'Supports', href: '/app/supports', icon: PhQuestion, permission:'', current: true },
                { name: 'Logout', href: '', icon: PhSignOut, current: false }
            ]
        }
    },
    props: {
        drawer: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: Boolean,
            default: true
        }
    },   
    computed: {
        filteredItems() {
            return this.items.filter(item => !item.permission || Ls.hasPermission(item.permission));
        },
        filteredSubItems() {
            return this.subItems.filter(item => !item.permission || Ls.hasPermission(item.permission));
        },
        pdrawer: {
            get() {
                return this.$vuetify.display.mdAndDown ?  this.modelValue : true;                
            },
            set(value) {                
                this.$emit('update:modelValue', value);

            }
        },
        computedRail() {
            return this.$vuetify.display.mdAndDown ? false : this.modelValue;
        },
        temporary() {
            return this.$vuetify.display.mdAndDown;
        }
    },
    methods: {
        permissions(){
            return Ls.get('permissions');
        },
        getClasses(href) {
            return (href === this.$route.path ? `tw-text-[${this.$constants.primary}]` : `tw-text-[${this.$constants.primary}]`) + ' tw-text-' + this.$constants.text_size.s2;
        },
        startMarquee() {
            this.isHovered = true;
        },
        stopMarquee() {
            this.isHovered = false;
        },
        handleItemClick(item) {
            if (item.name === 'Logout') {
                this.authStore.logout();
            } else {
                this.$router.push(item.href);
            }
        },
      getInitials(fullName) {
        if (!fullName) return '';
        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0].charAt(0).toUpperCase();
        const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0).toUpperCase() : '';
        return firstName + lastName;
      },
  
      // Convert word to ASCII sum
      getAsciiSum(word) {
        return word
          .split('')
          .reduce((sum, char) => sum + char.charCodeAt(0), 0);
      },
  
      // Generate HSL color from the initials
      getColorFromWord(word) {
        const asciiSum = this.getAsciiSum(word);

        // Use a base color hue and adjust for more variation
        const hue = (asciiSum * 137) % 360; // 137 is a prime number to spread out hues

        // Use a higher saturation and varied lightness for deeper colors
        const saturation = 70; // Increase saturation for vibrant colors
        const lightness = 45 + (asciiSum % 20); // Vary lightness to add more depth

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        },

  
      // Handle image error and show initials
      handleImageError(user) {
        user.imageError = true; // Vue 3 automatically tracks this
      },

    },
    watch: {
        group() {
            this.pdrawer = false;
        },
    },
    created() {
        console.log(this.$vuetify);
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

.marquee {
    overflow: visible;
    animation: marquee 5s linear infinite;
}

@keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
}
</style>
