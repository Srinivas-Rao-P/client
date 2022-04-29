<template>
  <v-row no-gutters>
    <v-col cols="12">
      <lister
        :columns="columns"
        :data="tableData"
        name="name"
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
  name: "name",
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
        { title: "First Name", key: "firstname" },
        { title: "Last Name", key: "lastname" },
        { title: "Middle Name", key: "middlename" },
        { title: "Type", key: "type" },
        { title: "Actions", key: "action", type: "custom", fixed: "right" },
      ];
    },
  },
  created() {
    this.tableData = [
      {
        id: 30,
        firstname: "Bharatha",
        lastname: "H",
        middlename: "R",
        type: "Primary",
      },
    ];
  },
};
</script>

<style>
</style>