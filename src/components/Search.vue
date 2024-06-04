<template>
  
                <v-row class="tw-flex tw-items-center tw-m-0">
                    <v-select
                    v-model="filter"
                    :items="filters"
                    placeholder="Filter"
                   
                    prepend-inner-icon="mdi-tune"
                    variant="none"
                    density="compact"
                    hide-details
                    class="tw-rounded-r-[0px] tw-border  tw-rounded-l-[5px] lg:tw-w-[40%]"
                    :class="`tw-text-[${$constants.secondary}]`"
                    ></v-select> 
                   
                    <v-text-field
                    variant="none"
                    placeholder="Search"
                    v-model="searchInput"
                    prepend-inner-icon="mdi-magnify"
                    density="compact"
                    hide-details
                    class="tw-rounded-r-[5px] tw-border  tw-rounded-l-[0px] lg:tw-w-[60%]"
                    ></v-text-field>
           
               
                </v-row>
</template>
<script>

</script>