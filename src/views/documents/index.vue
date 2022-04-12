<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="text-h6"><b></b></div>
        <lister
          :columns="columns"
          :data="tableData"
          name="mycommunications"
          primaryKey="id"
          ref="lister"
          :pagination="true"
          :sort="true"
          :search="true"
        >
          <template #listerTitle>
            <b>My Documents</b>
          </template>

          <template #action="table">
            <v-row dense justify="center" class="white">
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
            <emergencyContactForm
              :personId="personId"
              :id="table.row.id"
              mode="edit"
              @done="getEmergencyContactList(), table.toggle('edit')"
              @cancel="table.toggle('edit')"
            ></emergencyContactForm>
          </template>
        </lister>
      </v-col>
      <v-col cols="12" id="emergencyContactForm" v-if="canAddEmergencyContact">
        <v-btn
          v-if="!showAddForm"
          small
          class=""
          color="primary"
          outlined
          depressed
          @click="showEmergencyContactForm()"
        >
          Add Emergency Contact
        </v-btn>
        <v-card outlined v-else>
          <emergencyContactForm
            mode="add"
            @done="getEmergencyContactList(), (showAddForm = false)"
            @cancel="showAddForm = false"
          ></emergencyContactForm>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import lister from "@/components/easyTable/Index.vue";
export default {
  name: "documents",
  data() {
    return {
      tableData: [
          {
            id: 1,
            name: "srinivas",
            address: "kamalanagar",
            phone: "2147483647",
            email: "s@g.com",
            relationship: "Adult Child",
            notes: "t",
          },
          {
            id: 2,
            name: "srinivas",
            address: "kamalanagar",
            phone: "8197279373",
            email: "s@gmail.com",
            relationship: "Aunt",
            notes: "contact notes",
          },
          {
            id: 3,
            name: "test",
            address: "",
            phone: "8197279373",
            email: "t@gmail.com",
            relationship: "Brother",
            notes: "",
          },
          {
            id: 4,
            name: "Hari",
            address: "",
            phone: "8197279373",
            email: "",
            relationship: "Friend",
            notes: "",
          },
          {
            id: 5,
            name: "Raja",
            address: "",
            phone: "8197279373",
            email: "",
            relationship: "Child",
            notes: "",
          },
        ],
    };
  },
  computed: {
    columns() {
      return [
        { title: "Name", key: "name" },
        { title: "Address", key: "address" },
        { title: "Phone", key: "phone" },
        { title: "Email", key: "email" },
        { title: "Relationship", key: "relationship" },
        { title: "action", key: "action", type: "custom", fixed: "right" },
      ];
    },
  },
  components: {
    lister,
  },
};
</script>

<style>
</style>