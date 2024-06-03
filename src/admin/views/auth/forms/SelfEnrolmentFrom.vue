<template>
    <v-container class="self-enrolment" fluid>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <h4 class="text-h5 tw-text-green-700 font-weight-bold">SELF - ENROLMENT</h4>
                <p>Choose the option that best describes you as a taxpayer.</p>

                <v-row class="mt-5" justify="center">
                    <v-col cols="12" md="12">
                        <v-card class="taxpayer-card" :class="{ 'taxpayer-card-active': activeCard === 'individual' }"
                            @click="proceed('individual')">
                            <v-card-title class="px-5 py-5">
                                <v-row>
                                    <v-col cols="1">
                                        <div size="100">
                                            <v-icon class="bg-green px-10 py-10 rounded-xl" dark
                                                size="60">mdi-account</v-icon>
                                        </div>
                                    </v-col>
                                    <v-col cols="4">
                                        <span class="ml-3">Individual Taxpayer</span>
                                        <v-card-text>
                                            Lorem ipsum dolor sit amet consectetur. Aenean vel ut consectetur elementum
                                            integer
                                            rutrum purus ac vitae. Feugiat pulvinar imperdiet sodales sed phasellus
                                            mattis
                                            vel
                                            nulla.
                                        </v-card-text>
                                    </v-col>
                                </v-row>
                            </v-card-title>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="12">
                        <v-card class="taxpayer-card" :class="{ 'taxpayer-card-active': activeCard === 'corporate' }"
                            @click="proceed('corporate')">
                            <v-card-title>
                                <v-avatar color="yellow darken-2" size="56">
                                    <v-icon dark>mdi-store</v-icon>
                                </v-avatar>
                                <span class="ml-3">Corporate Taxpayer</span>
                            </v-card-title>
                            <v-card-text>
                                Lorem ipsum dolor sit amet consectetur. Aenean vel ut consectetur elementum integer
                                rutrum purus ac vitae. Feugiat pulvinar imperdiet sodales sed phasellus mattis vel
                                nulla. Auctor a ut id risus mattis blandit venenatis urna luctus. Convallis tempus ut
                                pretium turpis quis purus nisl placerat.
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row class="mt-5" justify="center">
                    <v-btn color="primary" class="mr-3" @click="goBack">Go Back</v-btn>
                    <v-btn color="success" @click="proceedToEnrolment">Proceed to Enrolment</v-btn>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'SelfEnrolmentFrom',
    data() {
        return {
            activeCard: null,
        };
    },
    methods: {
        proceed(type) {
            this.activeCard = type;
            console.log(`Proceed as ${type}`);
            // Implement navigation or logic here
        },
        goBack() {
            console.log('Go back');
            // Implement navigation or logic here
        },
        proceedToEnrolment() {
            console.log('Proceed to enrolment');
            // Implement navigation or logic here
        },
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
