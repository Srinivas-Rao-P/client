<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <div class=""><b>Company time off</b></div>
            </v-col>

            <v-col cols="12" lg="4" md="5">
                <v-card class="fill-height" flat outlined>
                    <lister :columns="listerColumns" :data="tableData" name="companytimeoff" primaryKey="id"
                        ref="lister" pageSize="-1" :showTotalRecords="false">
                        <template #start="{ row }">
                            {{ formateDate(row.start) }}
                        </template>
                    </lister>
                </v-card>
            </v-col>

            <v-col cols="12" lg="8" md="7">

                <v-sheet tile height="54" class="d-flex">
                    <v-toolbar flat>
                        <v-btn outlined class="mr-2" color="grey darken-2" @click="setToday">
                            Today
                        </v-btn>
                        <v-btn fab text small color="grey darken-2" @click="$refs.calendar.prev()">
                            <v-icon small>
                                mdi-chevron-left
                            </v-icon>
                        </v-btn>
                        <v-toolbar-title v-if="$refs.calendar" class="mx-2">
                            {{ $refs.calendar.title }}
                        </v-toolbar-title>
                        <v-btn fab text small color="grey darken-2" @click="$refs.calendar.next()">
                            <v-icon small>
                                mdi-chevron-right
                            </v-icon>
                        </v-btn>

                        <v-spacer></v-spacer>
                        {{ formateDate(new Date()) }}
                    </v-toolbar>
                </v-sheet>
                <hr>
                <v-sheet height="75vh" class="pt-2">
                    <v-calendar ref="calendar" v-model="value" :weekdays="weekday" :type="type" :events="tableData"
                        :event-overlap-mode="mode" :event-overlap-threshold="30" color="primary">
                    </v-calendar>
                </v-sheet>

            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import lister from "@/components/easyTable/Index.vue";
import { getCompanyHolidays } from "@/services/time/companytimeoff.js"
export default {
    name: "companytimeoff",
    data() {
        return {
            type: 'month',
            mode: 'stack',
            weekday: [0, 1, 2, 3, 4, 5, 6],
            value: '',
            tableData: [],
        }
    },
    components: {
        lister
    },
    methods: {
        getCompanyHolidays() {
            getCompanyHolidays().then((response) => {
                this.tableData = response.data;
                this.tableData.forEach(event => {
                    event.start = new Date(event.start)
                    event.end = new Date(event.end)
                });
            })
        },
        setToday() {
            this.value = ''
        },
        formateDate(date) {
            return new Date(date).toLocaleString("en-IN", {
                timeZone: "IST",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        },
    },
    created() {
        this.getCompanyHolidays()
    },

    computed: {
        listerColumns() {
            return [
                { title: "Date", key: "start", type: "custom" },
                { title: "Holiday", key: "name" },
            ];
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>