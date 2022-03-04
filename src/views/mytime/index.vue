<template>
  <v-row dense>
    <v-col cols="12">
      <div class="text-h6"><b></b></div>
      <lister
        :columns="columns"
        :data="tableData"
        name="mytime"
        primaryKey="personId"
        ref="lister"
        :pagination="true"
        :sort="true"
        :search="true"
      >
        <template #listerTitle>
          <b>My Time</b>
        </template>

        <template #action="">
          <v-row dense justify="center">
            <v-col cols="12" lg="auto">
              <v-btn
                icon
                fab
                small
                dark
                depressed
                color="primary"
                title="approve"
              >
                <v-icon dense dark size="20">mdi-check-circle-outline </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" lg="auto">
              <v-btn icon fab small dark depressed color="error" title="reject">
                <v-icon dense dark size="20">mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>

        <template #days="table">
          {{ dateDifference(table.row.to, table.row.from) }}
        </template>

        <template #rowDetails> test </template>
      </lister>
    </v-col>
  </v-row>
</template>
<script>
import lister from "@/components/easyTable/Index.vue";
export default {
  name: "mytime",
  data: () => {
    return {
      columns: [
        { title: "Name", key: "name" },
        { title: "Type", key: "type" },
        { title: "From", key: "from" },
        { title: "To", key: "to" },
        { title: "Days", key: "days", type: "custom" },
        { title: "Reason", key: "reason" },
        { title: "action", key: "action", type: "custom" },
      ],
      tableData: [],
    };
  },
  components: {
    lister,
  },
  mounted() {
    this.tableData = [
      {
        personId: 1,
        name: "srinivas",
        type: "Privilege Leave (PL) / Earned Leave (EL) / Annual Leave (AL)",
        from: "2022/01/20",
        to: "2022/01/25",
        reason: "",
      },
      {
        personId: 2,
        name: "hari",
        type: "Casual Leave (CL)",
        from: "2022/01/25",
        to: "2022/01/25",
        reason: "",
      },
      {
        personId: 3,
        name: "rajat",
        type: "Sick Leave (SL)",
        from: "2022/01/24",
        to: "2022/01/24",
        reason: "",
      },
      {
        personId: 4,
        name: "kishan",
        type: "Maternity Leave (ML)",
        from: "2022/01/19",
        to: "2022/01/21",
        reason: "",
      },
      {
        personId: 5,
        name: "sachin",
        type: "Marriage Leave",
        from: "2022/01/20",
        to: "2022/01/23",
        reason: "",
      },
      {
        personId: 6,
        name: "shreyas",
        type: "Paternity Leave",
        from: "2022/01/24",
        to: "2022/01/25",
        reason: "",
      },
      {
        personId: 7,
        name: "shreyas",
        type: "Bereavement Leave",
        from: "2022/01/24",
        to: "2022/01/25",
        reason: "",
      },
      {
        personId: 8,
        name: "shreyas",
        type: "Compensatory Off (comp-off)",
        from: "2022/01/24",
        to: "2022/01/25",
        reason: "",
      },
      
    ];
  },
  methods: {
    dateDifference(to, from) {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      let date2 = new Date(to);
      let date1 = new Date(from);
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(
        date1.getFullYear(),
        date1.getMonth(),
        date1.getDate()
      );
      const utc2 = Date.UTC(
        date2.getFullYear(),
        date2.getMonth(),
        date2.getDate()
      );

      return Math.floor((utc2 - utc1) / _MS_PER_DAY) + 1;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>