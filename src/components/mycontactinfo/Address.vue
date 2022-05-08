<template>
  <v-row no-gutters>
    <v-col cols="12">
      <lister
        :columns="columns"
        :data="tableData"
        name="address"
        primaryKey="peraddpid"
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
import { getAddress } from "@/services/mycontactinfo/addressService.js";
export default {
  name: "address",
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
        { title: "Address", key: "address" },
        { title: "State", key: "statecode" },
        { title: "City", key: "city" },
        { title: "Zipcode", key: "zipcode" },
        { title: "Type", key: "type" },
        { title: "Privacy", key: "privacy" },
        { title: "Actions", key: "action", type: "custom", fixed: "right" },
      ];
    },
  },
  created() {
    this.getAddress();
  },
  methods: {
    getAddress() {
      getAddress(this.personId)
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