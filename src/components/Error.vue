<template>
    <v-empty-state
        headline="Whoops, 404"
        title="Page not found"
        text="The page you were looking for does not exist"
        image=""
    >
    <template v-slot:media>
        <center>
            <img class="tw-w-[150px] tw-mt-5" src="@/assets/logo.png"/>
        </center>
    </template>
</v-empty-state>
<center>
    <v-btn to="/" color="green" class="tw-text-white">Home</v-btn>
</center>
</template>