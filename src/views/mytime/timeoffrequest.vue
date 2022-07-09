<template>
  <v-row dense>
    <v-col cols="12">
      <div class="text-h6"><b>Time off request</b></div>
    </v-col>

    <v-col cols="12" lg="5" md="5">
      <v-row dense>
        <v-col cols="12">
          <v-card class="pa-4">
            <div class="text-h6">Avalilable</div>
            <vc-donut background="white" foreground="grey" :size="200" unit="px" :thickness="20" has-legend
              :legend-placement="legendPlacement" :sections="sections" :total="totalLeaves" :start-angle="0"
              :auto-adjust-text-size="true"><b>{{ totalLeaves }}</b>
            </vc-donut>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="fill-height pa-4">
            <div class="text-h6">2022 Company Holidays</div>
            <v-data-table :headers="companyHolidaysHeader" :items="companyHolidays" :items-per-page="-1" item-key="id"
              class="" fixed-header hide-default-footer hide-default-header>
              <template #item.start="{ item }">
                {{ formateDate(item.start) }}
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>

      <!-- <v-row>
          <v-col>
            20-06-2022
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            Test Holiday
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            20-06-2022
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            Test Holiday
          </v-col>
        </v-row> -->

    </v-col>

    <v-col cols="12" lg="7" md="7">
      <v-row dense>
        <v-col cols="12" v-if="timeOffRequests.length">
          <v-card class="pa-4">
            <v-row>
              <v-col cols="12">
                <div class="text-h6">Upcoming Requests</div>
                <v-data-table :headers="requestsHeader" :items="timeOffRequests" :items-per-page="5" item-key="id"
                  class="" fixed-header :show-expand="false" :single-expand="true" :expanded.sync="expanded"
                  :hide-default-footer="timeOffRequests.length < 5">

                  <!-- <template v-slot:item.actions="{ item }">

                    <v-icon color="primary" small class="mr-2" @click="editRequest(item)">
                      mdi-pencil
                    </v-icon>
                    <v-icon color="red" small @click="deleteRequest(item)">
                      mdi-delete
                    </v-icon>
                  </template>
                  <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                      {{ item }}
                    </td>
                  </template> -->
                </v-data-table>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" v-if="timeOffHistory.length">
          <v-card class="pa-4">
            <v-row>
              <v-col cols="12">
                <div class="text-h6">Time off History</div>
                <v-data-table :headers="historyHeader" :items="timeOffHistory" :items-per-page="5" item-key="id"
                  class="" fixed-header :show-expand="false" :single-expand="true" :expanded.sync="expanded"
                  :hide-default-footer="timeOffHistory.length < 5">
                </v-data-table>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

  </v-row>
</template>
<script>
import { getCompanyHolidays } from "@/services/time/companytimeoff.js"
export default {
  name: "timeoffrequest",
  data: () => {
    return {
      requestsHeader: [],
      timeOffRequests: [],
      historyHeader: [],
      timeOffHistory: [],
      companyHolidaysHeader: [],
      companyHolidays: [],
      expanded: [],
      totalLeaves: 30,
      sections: [
        { label: '6 Leave without pay', value: 6 },
        { label: '6 Personal leave', value: 6 },
        { label: '6 Sick', value: 6 },
        { label: '12 Covid Care', value: 12 },
      ]
    };
  },
  components: {

  },
  computed: {
    legendPlacement() {
      return this.isMobile ? "bottom" : "right"
    },
    isMobile() {
      if (window.innerWidth < 720) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.requestsHeader = [
      { text: 'Date', value: 'date', align: 'start', sortable: true },
      { text: 'Type', value: 'type' },
      { text: 'Status', value: 'status' },
      // { text: 'Actions', value: 'actions', align: 'end', sortable: false },
      // { text: '', value: 'data-table-expand' },
    ],
      this.timeOffRequests = [
        {
          id: 1,
          date: "11/06/2022",
          type: "Sick",
          status: "Approved"
        },
        {
          date: "12/06/2022",
          type: "Leave without pay",
          status: "Approved"
        },
        {
          date: "13/06/2022",
          type: "Pto",
          status: "Pending"
        },
        {
          date: "11/06/2022",
          type: "Sick",
          status: "Approved"
        },
        {
          date: "12/06/2022",
          type: "Dto",
          status: "Approved"
        },
        {
          date: "13/06/2022",
          type: "Pto",
          status: "Pending"
        },
      ],
      this.historyHeader = [
        { text: 'Date', value: 'date', align: 'start', sortable: true },
        { text: 'Type', value: 'type' },
        { text: 'Days', value: 'days' }
      ],
      this.timeOffHistory = [
        {
          id: 1,
          date: "11/06/2022",
          type: "Personal",
          days: "1",
        },
        {
          id: 2,
          date: "12/06/2022",
          type: "Sick",
          days: "1",
        },
        {
          id: 3,
          date: "13/06/2022",
          type: "Leave without pay",
          days: "1",
        },
        {
          id: 4,
          date: "14/06/2022",
          type: "Personal",
          days: "1",
        }
      ],
      this.companyHolidaysHeader = [
        { text: '', value: 'start', align: 'start', sortable: true },
        { text: '', value: 'name' }
      ]

  },
  methods: {
    formateDate(date) {
      return new Date(date).toLocaleString("en-IN", {
        timeZone: "IST",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });


    },
    getCompanyHolidays() {
      getCompanyHolidays().then((response) => {
        this.companyHolidays = response.data
        console.log(this.companyHolidays);
      })
    },
    editRequest(item) {
      alert(item)
    },
    deleteRequest(item) {
      alert(JSON.stringify(item))
    }
  },
  created() {
    this.getCompanyHolidays()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>