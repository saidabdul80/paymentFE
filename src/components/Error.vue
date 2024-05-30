<template>
    <v-empty-state
        headline="Whoops, 404"
        title="Page not found"
        text="The page you were looking for does not exist"
        image=""
    >
    <template v-slot:media>
        <center>
            <img class="" src="@/assets/logo.png"/>
        </center>
    </template>
</v-empty-state>
<center>
    <v-btn to="/admin/login" color="green" class="tw-text-white">Home</v-btn>
</center>
</template>