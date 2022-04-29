<template>
  <v-row no-gutters>
    <v-col cols="12">
      <lister
        :columns="columns"
        :data="tableData"
        name="address"
        primaryKey="id"
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
  computed: {
    columns() {
      return [
        { title: "Address", key: "address" },
        { title: "State", key: "state" },
        { title: "City", key: "city" },
        { title: "Zipcode", key: "zipcode" },
        { title: "Type", key: "type" },
        { title: "Privacy", key: "privacy" },
        { title: "Actions", key: "action", type: "custom", fixed: "right" },
      ];
    },
  },
  created() {
    this.tableData = [
      {
        id: 30,
        address: "923 Payne Street",
        state: "Karnataka",
        city: "Bangalore",
        zipcode: "47586",
        type: "Work Location",
        privacy: "Unrestricted",
      },
      {
        id: 31,
        address: "Kamalanagar",
        state: "Karnataka",
        city: "Bangalore",
        zipcode: "560079",
        type: "Home",
        privacy: "Restricted",
      },
    ];
  },
};
</script>

<style>
</style>