<template>
  <v-row dense>
    <v-col cols="12">
      <div class="text-h4"><b></b></div>
      <lister
        :columns="columns"
        :data="tableData"
        name="manageemployee"
        primaryKey="id"
        ref="lister"
        :pagination="true"
        :sort="true"
        :search="true"
      >
        <template #listerTitle>
          <b>Manage employee</b>
        </template>

        <template #profile="table">
          <v-btn
            icon
            fab
            x-small
            dark
            depressed
            color="primary"
            :to="{
              name: 'profileindex',
              params: { personId: table.row.id },
            }"
          >
            <v-icon color="primary">mdi-account</v-icon>
          </v-btn>
        </template>
        <template #name="table">
          <router-link
            class="ml-2"
            :to="{
              name: 'navbar',
              params: { personId: table.row.id },
            }"
            >{{ table.row.name }}
          </router-link>
        </template>
      </lister>
    </v-col>
  </v-row>
</template>
<script>
import { manageEmployee } from "@/services/employee/manageemployee.js";
import lister from "@/components/easyTable/Index.vue";
export default {
  name: "manageemployee",
  data: () => {
    return {
      tableData: [],
    };
  },
  components: {
    lister,
  },
  computed: {
    columns() {
      return [
        { title: "Profile", key: "profile", type: "custom" },
        { title: "Full name", key: "name", type: "custom", align: "left" },
        { title: "Designation", key: "designation" },
        { title: "Hire date", key: "hiredate", type: "date" },
        { title: "Manager", key: "manager" },
      ];
    },
  },
  created() {
    this.manageEmployee();
  },
  methods: {
    manageEmployee() {
      manageEmployee(window.personId)
        .then((response) => {
          console.log(response);
          this.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>