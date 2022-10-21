<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <lister :columns="refreshedColumns" :data="tableData" name="history" :primaryKey="pid+'_history_id'" ref="lister"
                    :pagination="false" :sort="true" :search="false">
                </lister>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import lister from "@/components/easyTable/Index.vue";
import { getHistory } from "@/services/history/historyService.js";

export default {
    name: "historyIndex",
    data() {
        return {
            tableData: [],
        };
    },
    props: {
        personId: {
            type: [Number, String],
            default: window.personId,
        },
        columns: { type: Array, required: true },
        id: {
            type: [Number, String],
            default: null,
            required: true
        },
        pid: {
            type: [Number, String],
            default: null,
            required: true
        },
    },
    components: {
        lister
    },
    computed: {
        refreshedColumns() {
            return this.columns;
        },
    },
    methods: {
        getHistory() {
            getHistory(this.id, this.pid)
                .then((response) => {
                    this.tableData = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    created() {
        this.getHistory();
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>