<template>
    <v-row dense>
        <v-col cols="12">
            <div class=""><b>Company time off</b></div>

        </v-col>
        <v-col cols="12">

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
                </v-toolbar>
            </v-sheet>
            <hr>
            <v-sheet height="75vh" class="pt-2">
                <v-calendar ref="calendar" v-model="value" :weekdays="weekday" :type="type" :events="events"
                    :event-overlap-mode="mode" :event-overlap-threshold="30" 
                    @change="getEvents" color="primary"></v-calendar>
            </v-sheet>

        </v-col>
    </v-row>
</template>
<script>
import { getCompanyHolidays } from "@/services/time/companytimeoff.js"
export default {
    name: "companytimeoff",
    data: () => ({
        type: 'month',
        mode: 'stack',
        weekday: [1, 2, 3, 4, 5],
        value: '',
        events: [],
    }),
    methods: {
        getEvents() {
            getCompanyHolidays().then((response) => {
                this.events = response.data
                this.events.forEach(event => {
                    event.start = new Date(event.start)
                    event.end = new Date(event.end)
                });
            })
        },

        // getEventColor(event) {
        //     return event.color
        // },
        setToday() {
            this.value = ''
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>