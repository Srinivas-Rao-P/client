<template>
  <v-row no-gutters>
    <v-col cols="12">
      <lister
        :columns="columns"
        :data="tableData"
        name="phone"
        primaryKey="percontactpid"
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
import { getPhones } from "@/services/mycontactinfo/phoneService.js";
export default {
  name: "phone",
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
        { title: "Country code", key: "countrycode" },
        { title: "Phone", key: "phoneno" },
        { title: "Type", key: "type" },
        { title: "Privacy", key: "privacy" },
        { title: "Actions", key: "action", type: "custom", fixed: "right" },
      ];
    },
  },
  created() {
    this.getPhones();
  },
  methods: {
    getPhones() {
      getPhones(this.personId)
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