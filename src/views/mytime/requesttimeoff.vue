<template>
    <v-row dense>
        <v-col cols="12">
            <div class="text-h6"><b>Request time off</b></div>
        </v-col>
        <v-col cols="12" lg="6" md="6">
            <v-card class="pa-4">
                <vc-donut background="white" foreground="grey" :size="200" unit="px" :thickness="20" has-legend
                    :legend-placement="legendPlacement" :sections="sections" :total="totalLeaves" :start-angle="0"
                    :auto-adjust-text-size="true"><b>{{ totalLeaves }}</b>
                </vc-donut>
            </v-card>
            </v-col>
              <v-col cols="12" lg="6" md="6">
            <v-card class="pa-4">
                <requestTimeOffForm />
            </v-card>


        </v-col>
        <v-col cols="12" lg="6" md="6">

            <lister :columns="columns" :data="tableData" name="manageemployee" primaryKey="id" ref="lister"
                :showTotalRecords="false">

                <template #action="">
                    <v-row dense justify="center">
                        <v-col cols="12" lg="auto">
                            <v-btn icon fab small dark depressed color="error" title="reject">
                                <v-icon dense dark size="20">mdi-close-circle-outline</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </template>
            </lister>
        </v-col>
    </v-row>
</template>
<script>
import lister from "@/components/easyTable/Index.vue";

import requestTimeOffForm from "@/components/time/Requesttimeoff.vue";
export default {
    name: "requestTimeOff",
    data: () => {
        return {
            tableData: [],
        };
    },
    components: {
        lister,
        requestTimeOffForm
    },
    computed: {
        columns() {
            return [
                { title: "Type", key: "type" },
                { title: "Start", key: "start", type: "date" },
                { title: "End", key: "end", type: "date" },
                { title: "Day(s)", key: "day" },
                { title: "Approver", key: "approver" },
                { title: "Status", key: "status" },
                { title: "Note", key: "note" },
                { title: "Action", key: "action", type: "custom" },
            ];
        },
    },
    created() {
        // this.manageEmployee();
        this.tableData = [{
            id: 1,
            type: "Pto",
            start: "12/06/2022",
            end: "12/06/2022",
            approver: "Maya",
            day: 1,
            status: "Pending",
            note: "note"
        }]
    },
    methods: {
        // manageEmployee() {
        //   manageEmployee(window.personId)
        //     .then((response) => {
        //       console.log(response);
        //       this.tableData = response.data;
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
        // },
    },
    mounted() { },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>