<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-row no-gutters>
                <v-col><b>Address</b></v-col>
                <v-col class="text-right">
                    <v-btn color="primary" small @click="showDeletedRecords = !showDeletedRecords">
                        {{showDeletedRecords ? "Hide Deleted" : "Show Deleted"}}
                    </v-btn>
                </v-col>
            </v-row>
            <v-col cols="12">
                <Address :personId="personId" :showDeletedRecords="showDeletedRecords"></Address>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
import Address from "@/components/mycontactinfo/Address/index";
export default {
    name: "Addressindex",
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
    components: { Address },
    methods: {

    },
    created() {

    },
}
</script>

<style>

</style>