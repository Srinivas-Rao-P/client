<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-row no-gutters>
                <v-col> <b>Phone Contacts</b></v-col>
                <v-col class="text-right">
                    <v-btn color="primary" small @click="showDeletedRecords = !showDeletedRecords">
                        {{showDeletedRecords ? "Hide Deleted" : "Show Deleted"}}
                    </v-btn>
                </v-col>
            </v-row>
            <v-col cols="12">
                <Phone :personId="personId" :showDeletedRecords="showDeletedRecords"></Phone>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
import Phone from "@/components/mycontactinfo/Phone/index";
export default {
    name: "phoneindex",
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
    components: { Phone },
    methods: {

    },
    created() {

    },
}
</script>

<style>

</style>