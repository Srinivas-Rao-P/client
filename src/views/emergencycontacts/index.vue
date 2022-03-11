<template>
  <v-row dense>
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
          <b>Emergency Contacts</b>
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
</template>
<script>
import lister from "@/components/easyTable/Index.vue";
import emergencyContactForm from "@/components/Emergencycontact/Emergencycontactform.vue";
import { getEmergencyContactList } from "@/services/emergencycontact/emergencycontactService.js";
export default {
  name: "emergencycontacts",
  data() {
    return {
      columns: [
        { title: "Name", key: "name" },
        { title: "Address", key: "address" },
        { title: "Phone", key: "phone" },
        { title: "Email", key: "email" },
        { title: "Relationship", key: "relationship" },
        { title: "action", key: "action", type: "custom", fixed: "right" },
      ],
      tableData: [],
      canAddEmergencyContact: true,
      showAddForm: false,
    };
  },
  props: {
    personId: {
      type: [Number, String],
      default: window.personId,
    },
  },
  components: {
    lister,
    emergencyContactForm,
  },

  methods: {
    showEmergencyContactForm() {
      this.showAddForm = true;
      this.$vuetify.goTo("#emergencyContactForm");
    },
    getEmergencyContactList() {
      getEmergencyContactList(this.personId)
        .then((response) => {
          this.tableData = response.data.list;
          this.canAddEmergencyContact = response.data.canAddEmergencyContact;
          this.showAddForm = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getEmergencyContactList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>