<template>
  <v-row no-gutters>
    <v-col cols="12">
      <lister
        :columns="columns"
        :data="tableData"
        name="name"
        primaryKey="pernamespid"
        ref="lister"
        :sort="true"
        :showTotalRecords="false"
      >
        <template #action="table">
          <v-row dense justify="center">
            <v-col cols="12" lg="auto">
              <v-btn
                icon
                fab
                x-small
                dark
                depressed
                color="primary"
                @click="table.toggle('edit')"
              >
                <v-icon dense dark>mdi-pencil</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template #rowDetails="table">
          {{ table }}
        </template>
      </lister>
    </v-col>
  </v-row>
</template>

<script>
import lister from "@/components/easyTable/Index.vue";
import { getNames } from "@/services/mycontactinfo/nameService.js";
export default {
  name: "name",
  data() {
    return {
      tableData: [],
    };
  },
  components: {
    lister,
  },
  props: {
    personId: {
      default: window.personId,
    },
  },
  computed: {
    columns() {
      return [
        { title: "Title", key: "title" },
        { title: "First Name", key: "fname" },
        { title: "Middle Name", key: "mname" },
        { title: "Last Name", key: "lname" },
        { title: "Type", key: "type" },
        { title: "Actions", key: "action", type: "custom", fixed: "right" },
      ];
    },
  },
  created() {
    this.getNames();
  },
  methods: {
    getNames() {
      getNames(this.personId)
        .then((response) => {
          this.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>