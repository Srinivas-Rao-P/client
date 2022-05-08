<template>
  <v-row no-gutters>
    <v-col cols="12">
      <lister
        :columns="columns"
        :data="tableData"
        name="email"
        primaryKey="pernetcontactpid"
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
import { getEmails } from "@/services/mycontactinfo/emailService.js";
export default {
  name: "email",
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
        { title: "Email", key: "email" },
        { title: "Type", key: "netcontacttype" },
        { title: "Privacy", key: "privacycode" },
        { title: "Actions", key: "action", type: "custom", fixed: "right" },
      ];
    },
  },
  created() {
    this.getEmails();
  },
  methods: {
    getEmails() {
      getEmails(this.personId)
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