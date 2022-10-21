<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-row no-gutters>
                <v-col> <b>Name</b></v-col>
                <v-col class="text-right">
                    <v-btn color="primary" small @click="showDeletedRecords = !showDeletedRecords">
                        {{showDeletedRecords ? "Hide Deleted" : "Show Deleted"}}
                    </v-btn>
                </v-col>
            </v-row>
            <v-col cols="12">
                <Name :personId="personId" :showDeletedRecords="showDeletedRecords"></Name>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
import Name from "@/components/mycontactinfo/Name/index";
export default {
    name: "nameindex",
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
    components: { Name },
    methods: {

    },
    created() {

    },
}
</script>

<style>

</style>