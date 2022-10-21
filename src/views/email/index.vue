<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-row no-gutters>
                <v-col> <b>Email</b></v-col>
                <v-col class="text-right">
                    <v-btn color="primary" small @click="showDeletedRecords = !showDeletedRecords">
                        {{showDeletedRecords ? "Hide Deleted" : "Show Deleted"}}
                    </v-btn>
                </v-col>
            </v-row>
            <v-col cols="12">
                <Email :personId="personId" :showDeletedRecords="showDeletedRecords"></Email>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
import Email from "@/components/mycontactinfo/Email/index";
export default {
    name: "Emailindex",
    data() {
        return {
            showDeletedRecords: false,
        };
    },
    props: {
        personId: {
            default: window.personId,
        },
    },
    components: { Email },
    methods: {

    },
    created() {

    },
}
</script>

<style>

</style>