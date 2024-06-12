<template>
      <v-list-item rounded="lg" class="tw-p-[12px] tw-m-0"
        :class="`${$constants.text_size.s2} tw-font-bold`"
        :active-class="`tw-bg-[${$constants.primary}] tw-text-[white]`" :base-color="$constants.mode =='light'? $constants.primary:''"
        :to="item.href" :value="item.title">
        <template v-slot:prepend>
            <v-icon  :icon="item.icon"></v-icon>
        </template>
        <template v-slot:default>
            <span class="text-truncate">{{ item.name }}</span>
        </template>
    </v-list-item>
</template>

<script>
export default { 
    props:{
        item:{
            type:Object,
            default:{
                href:'',
                icon:'',
                name:'',
                title:'',
            }
        }
    }
}
</script>