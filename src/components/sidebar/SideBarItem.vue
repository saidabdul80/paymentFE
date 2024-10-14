<template>
      <v-list-item rounded="lg" class="tw-py-[12px]  tw-font-[400]"  :class="!state?'tw-px-6 tw-mx-5':''"
       
        active-class="tw-bg-black tw-text-white" :base-color="$constants.mode =='light'? $constants.primary:''"
        :to="item.href" :value="item.title">
        <template v-slot:prepend>
            <component size="22px"  :is="item.icon"></component>
        </template>
        <template v-slot:default>
            <span class="text-truncate " :class="state?'tw-ms-2':''">{{ item.name }}</span>
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
        },
        state:{
            type:Boolean,
            default:true,
        }
    }
}
</script>