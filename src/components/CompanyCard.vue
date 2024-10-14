<template>
    <span @click="show = !show" class="tw-relative">
    <Badge v-if="!user?.picture_url || user?.imageError" class="tw-mt-[18px]" :style="{
        backgroundColor: getColorFromWord(getInitials('Interswitch Group')),
        borderRadius: '50%',
        width: !modelValue ? '50px' : '40px',
        marginBottom: '20px',
        height: !modelValue ? '50px' : '40px',
        marginTop: '10px',
    }" severity="contrast">
        <span class="tw-text-[16px] tw-font-[500]">{{
            getInitials("Interswitch Group")
            }}</span>
    </Badge>

    <img v-else :src="user?.picture_url" @error="handleImageError(user)" alt="Interswitch Group"
        class="tw-h-[40px] tw-w-[40px] tw-rounded-full" />
    <div v-if="name" class="tw-ms-3">
        <p class="tw-text-xl tw-font-[400] tw-truncate tw-w-[159px]">
            Interswitch Group
        </p>
        <p class="tw-font-[300]">Derick Loona</p>
    </div>
    <Transition name="fade">
        <div v-if="show && !name" class="tw-fixed tw-top-15 tw-z-10 tw-right-5" >
            <v-btn class="tw-bg-white tw-text-black">Logout</v-btn>
        </div>
    </Transition>
</span>
</template>

<script>
import Badge from 'primevue/badge';

export default {
    props:{
        name:{
            type:Boolean,
            default:true
        }
    },
    data() {
        return {
            show: false
        }
    },
    components: {
        Badge,
    },
    methods:{
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

    }
};
</script>

<style lang="scss" scoped></style>
