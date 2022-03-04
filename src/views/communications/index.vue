<template>
  <v-row dense>
    <v-col cols="12">
      <div class="text-h6"><b></b></div>
      <lister
        :columns="columns"
        :data="tableData"
        name="mycommunications"
        primaryKey="personId"
        ref="lister"
        :pagination="true"
        :sort="true"
        :search="true"
      >
        <template #listerTitle>
          <b>Communications</b>
        </template>

        <template #action="table">
          <v-row dense justify="center">
            <v-col cols="12" lg="auto">
              <v-btn
                icon
                fab
                small
                dark
                depressed
                color="primary"
                title="view"
                @click="table.toggle('view')"
              >
                <v-icon dense dark>mdi-eye-outline </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>

        <template #title="table">
          <b>{{ table.row.title }} </b>
        </template>

        <template #file="table">
          <a :href="table.row.file">{{ table.row.file }}</a>
        </template>

        <template #rowDetails> viewed </template>
      </lister>
    </v-col>
  </v-row>
</template>
<script>
import lister from "@/components/easyTable/Index.vue";
export default {
  name: "communications",
  data: () => {
    return {
      columns: [
        { title: "Title", key: "title", type: "custom", align: "left" },
        { title: "File", key: "file", type: "custom", align: "left" },
        { title: "Creator", key: "creator" },
        { title: "Creation Date", key: "creationDate" },
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
        title: "holiday list",
        file: "filelink",
        creator: "srinivas",
        creationDate: "2022/01/25",
      },
      {
        personId: 3,
        title: "refund successful",
        file: "receipt",
        creator: "hari",
        creationDate: "2022/01/20",
      },
      {
        personId: 2,
        title: "course to up skill",
        file: "video link",
        creator: "srinivas",
        creationDate: "2022/01/29",
      },
      {
        personId: 2,
        title: "meeting schedule",
        file: "meeting link",
        creator: "srinivas",
        creationDate: "2022/01/10",
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