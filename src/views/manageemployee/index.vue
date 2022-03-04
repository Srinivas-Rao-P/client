<template>
  <v-row dense>
    <v-col cols="12">
      <div class="text-h4"><b></b></div>
      <lister
        :columns="columns"
        :data="tableData"
        name="manageemployee"
        primaryKey="personId"
        ref="lister"
        :pagination="true"
        :sort="true"
        :search="true"
      >
        <template #listerTitle>
          <b>Manage employee</b>
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
                @click="table.toggle('impersonate')"
              >
                <v-icon dense dark>mdi-account</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>

        <template #rowDetails> test </template>
      </lister>
    </v-col>
  </v-row>
</template>
<script>
import lister from "@/components/easyTable/Index.vue";
export default {
  name: "manageemployee",
  data: () => {
    return {
      columns: [
        { title: "Name", key: "name" },
        { title: "Department", key: "department" },
        { title: "Position", key: "position" },
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
        department: "api/ui",
        position: "developer",
      },
      {
        personId: 2,
        name: "hari",
        department: "api/ui",
        position: "qa",
      },
      {
        personId: 3,
        name: "rajat",
        department: "api/ui",
        position: "developer",
      },
      {
        personId: 4,
        name: "kishan",
        department: "api/ui",
        position: "sql",
      },
      {
        personId: 5,
        name: "sachin",
        department: "api/ui",
        position: "sql",
      },
      {
        personId: 6,
        name: "shreyas",
        department: "api/ui",
        position: "tester",
      },
      {
        personId: 7,
        name: "srinivas",
        department: "api/ui",
        position: "developer",
      },
      {
        personId: 8,
        name: "hari",
        department: "api/ui",
        position: "qa",
      },
      {
        personId: 9,
        name: "rajat",
        department: "api/ui",
        position: "developer",
      },
      {
        personId: 10,
        name: "kishan",
        department: "api/ui",
        position: "sql",
      },
      {
        personId: 11,
        name: "sachin",
        department: "api/ui",
        position: "sql",
      },
      {
        personId: 12,
        name: "shreyas",
        department: "api/ui",
        position: "tester",
      },
      {
        personId: 13,
        name: "srinivas",
        department: "api/ui",
        position: "developer",
      },
      {
        personId: 14,
        name: "hari",
        department: "api/ui",
        position: "qa",
      },
      {
        personId: 15,
        name: "rajat",
        department: "api/ui",
        position: "developer",
      },
      {
        personId: 16,
        name: "kishan",
        department: "api/ui",
        position: "sql",
      },
      {
        personId: 17,
        name: "sachin",
        department: "api/ui",
        position: "sql",
      },
      {
        personId: 18,
        name: "shreyas",
        department: "api/ui",
        position: "tester",
      },
    ];
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>