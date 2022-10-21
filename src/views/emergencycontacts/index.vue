<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <div class="text-h6"><b></b></div>
        <lister :columns="listerColumns" :data="tableData" name="mycommunications" primaryKey="id" ref="lister"
          :pagination="true" :sort="true" :search="true">
          <template #listerTitle>
            <v-row no-gutters>
              <v-col> <b>Emergency Contacts</b></v-col>
              <v-col class="text-right">
                <v-btn color="primary" small @click="showDeletedRecords = !showDeletedRecords">
                  {{showDeletedRecords ? "Hide Deleted" : "Show Deleted"}}
                </v-btn>
              </v-col>
            </v-row>
          </template>

          <template #action="table">
            <v-row dense justify="center" class="white">
              <v-col cols="12" lg="auto">
                <v-btn v-if="showDeletedRecords" icon fab x-small depressed disabled color="primary">
                  <v-icon dense>mdi-pencil</v-icon>
                </v-btn>

                <v-btn v-else icon fab x-small depressed color="primary" @click="toggleExpandPannel(table, 'edit')">
                  <v-icon dense>mdi-pencil</v-icon>
                </v-btn>

                <v-btn v-if="showDeletedRecords" icon fab x-small depressed disabled color="error">
                  <v-icon dense>mdi-delete</v-icon>
                </v-btn>

                <v-btn v-else icon fab x-small depressed color="error" @click="deleteRecord(table.row)">
                  <v-icon dense>mdi-delete</v-icon>
                </v-btn>


                <v-btn title="Show history" icon fab x-small depressed color="primary"
                  @click="toggleExpandPannel(table, 'history')">
                  <v-icon dense>mdi-clock-outline</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </template>

          <template #rowDetails="table">
            <emergencyContactForm :personId="personId" :id="table.row.id" mode="edit"
              @done="getEmergencyContactList(), table.toggle('edit')" @cancel="table.toggle('edit')"
              v-if="buttonClicked === 'edit'">
            </emergencyContactForm>

            <History v-if="buttonClicked === 'history'" :id="table.row.id" :pid="table.row.pid"
              :columns="historyColumns" />

          </template>
        </lister>
      </v-col>
      
      <v-col cols="12" id="emergencyContactForm" v-if="canAddEmergencyContact" class="mt-5">      
        <v-btn v-if="!showAddForm" small color="primary" outlined depressed
          @click="showEmergencyContactForm()">
          Add Emergency Contact
        </v-btn>
        <v-card outlined v-else>
          <emergencyContactForm mode="add" @done="getEmergencyContactList(), (showAddForm = false)"
            @cancel="showAddForm = false"></emergencyContactForm>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import lister from "@/components/easyTable/Index.vue";
import emergencyContactForm from "@/components/Emergencycontact/Emergencycontactform.vue";
import { getEmergencyContactList } from "@/services/emergencycontact/emergencycontactService.js";
import { deleteRecord } from "@/services/history/historyService.js";
import History from "@/components/history/Index.vue";

export default {
  name: "emergencycontacts",
  data() {
    return {
      tableData: [],
      canAddEmergencyContact: true,
      showAddForm: false,
      buttonClicked: "",
      showDeletedRecords: false,
    };
  },
  props: {
    personId: {
      type: [Number, String],
      default: window.personId,
    },
  },
  watch: {
    showDeletedRecords() {
      this.getEmergencyContactList();
    }
  },
  components: {
    lister,
    emergencyContactForm,
    History
  },
  computed: {
    listerColumns() {
      return [
        { title: "Name", key: "name" },
        { title: "Address", key: "address" },
        { title: "Phone", key: "phone" },
        { title: "Email", key: "email" },
        { title: "Relationship", key: "relationship" },
        { title: "action", key: "action", type: "custom", fixed: "right" },
      ];
    },
    historyColumns() {
      return [
        { title: "Name", key: "name" },
        { title: "Address", key: "address" },
        { title: "Phone", key: "phone" },
        { title: "Email", key: "email" },
      ];
    },
  },
  methods: {
    showEmergencyContactForm() {
      this.showAddForm = true;
      this.$vuetify.goTo("#emergencyContactForm");
    },
    getEmergencyContactList() {
      getEmergencyContactList(this.personId, this.showDeletedRecords)
        .then((response) => {
          this.tableData = response.data.list;
          this.canAddEmergencyContact = response.data.canAddEmergencyContact;
          this.showAddForm = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteRecord(row) {
      deleteRecord(row.id, row.pid)
        .then((response) => {
          this.$toast.success(response.data.message)
          this.getEmergencyContactList();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleExpandPannel(table, buttonClicked) {
      this.buttonClicked = buttonClicked;
      table.toggle(buttonClicked)
    }
  },
  created() {
    this.getEmergencyContactList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>