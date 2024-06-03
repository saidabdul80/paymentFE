<template>
    <v-card
        v-for="(card, index) in cards" :key="index"
        class="tw-p-10 border-1 tw-flex tw-mb-4"
        @click="selectCard(card)"
        :class="card.selected ? card.iconBgClass : `tw-bg-[${this.$constants.light}]`"
        variant="outlined"
        >
        <div>
            <span :class="card.selected ? `tw-bg-[${this.$constants.light}]`: card.iconBgClass" class="tw-p-[10px] tw-inline-block tw-rounded-[24px]">
            <v-icon
                size="56px"
                class="tw-w-[56px] tw-h-[56px]"
                :color="card.selected ? this.$constants.success : card.iconColor"
            >
                {{ card.icon }}</v-icon>
            </span>
        </div>
        <div class="tw-ml-4">
            <span class="tw-font-bold leading-none" :class="`${$constants.text_size.s4} tw-text-[${$constants.primary}]`">{{ card.title }}</span>
            <p :class="`${$constants.text_size.s2} tw-text-[${$constants.dark}]`" class="tw-font-thin tw-mb-[6px] tw-mt-[-3px]">{{ card.content }}</p>
        </div>
    </v-card>
</template>

<script>
export default {
    name: 'SelfEnrolmentFrom',
    data() {
        return {
            activeCard: null,
            cards: [
                {
                    // name: 'individual',
                    icon: 'mdi-account',
                    iconColor: this.$constants.success,
                    iconBgClass: this.getBgClass(this.$constants.success, this.$constants.transparent_level),
                    title: 'Individual Taxpayer',
                    content: 'Lorem ipsum dolor sit amet consectetur. Aenean vel ut consectetur elementum integer rutrum purus ac vitae. Feugiat pulvinar imperdiet sodales sed phasellus mattis vel nulla.',
                    selected: false
                },
                {
                    // name: 'corporate',
                    icon: 'mdi-store',
                    iconColor: this.$constants.success,
                    iconBgClass: this.getBgClass(this.$constants.success, this.$constants.transparent_level),
                    title: 'Corporate Taxpayer',
                    content: 'Lorem ipsum dolor sit amet consectetur. Aenean vel ut consectetur elementum integer rutrum purus ac vitae. Feugiat pulvinar imperdiet sodales sed phasellus mattis vel nulla.',
                    selected: false
                },
            ]
        };
    },
    methods: {
        getColor(type){
            if(type.toLowerCase() != 'inactive' ){
                return this.$constants.primary
            }
        },
        getBgClass(color, transparencyLevel) {
            return `tw-bg-[${color}]/${transparencyLevel}`;
        },
        selectCard(card) {
            this.cards.forEach(c => c.selected = false);
            card.selected = true;
        }
    },
};
</script>

<style scoped>
.self-enrolment {
    padding: 30px;
}

.taxpayer-card {
    cursor: pointer;
    transition: all 0.3s ease;
}

.taxpayer-card-active {
    background-color: #efe;
    border: 2px solid green;
}

.taxpayer-card:hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
