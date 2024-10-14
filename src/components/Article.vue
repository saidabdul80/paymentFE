<template>

          <div class="tw-flex tw-full tw-flex-col tw-grow tw-px-16 tw-pt-14 tw-pb-8 tw-w-full tw-text-base tw-text-white tw-bg-black tw-rounded-3xl tw-border tw-border-white tw-border-solid tw-max-md:tw-px-5 tw-max-md:tw-mt-10">
            <img loading="lazy" :src="icon" class="tw-object-contain tw-aspect-[1.15] tw-w-[47px]" alt="" />
            <h2 class="tw-mt-5 tw-font-bold">{{title}}</h2>
            <p class="tw-mt-2">
             {{ content }}
            </p>
          </div>
</template>

<script>
    export default {
        props: ['title','icon','content']
    }
</script>

<style scoped>

</style>