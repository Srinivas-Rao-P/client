<template>
  <v-row>
    <v-col cols="12">
      <lister
        :columns="columns"
        :data="tableData"
        name="candidate"
        primaryKey="id"
        ref="lister"
        :pagination="true"
        :sort="true"
        :search="true"
      >
        <template #listerTitle>
          <div class="font-weight-black mb-4">New hire</div>
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
        <template #firstname="table">
          <router-link
            class="ml-2"
            :to="{
              name: 'Viewcandidate',
              params: { candidateId: table.row.id },
            }"
            >{{ table.row.firstname }} {{ table.row.lastname }}
          </router-link>
        </template>
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
            <!-- <v-col cols="12" lg="auto">
              <v-btn
                icon
                fab
                small
                dark
                depressed
                color="primary"
                @click="table.toggle('history')"
              >
                <v-icon dense dark>mdi-clock-outline</v-icon>
              </v-btn>
            </v-col> -->
            <v-col cols="12" lg="auto">
              <v-btn
                icon
                fab
                x-small
                dark
                depressed
                color="primary"
                title="Send link"
                @click="sendEmail(table.row)"
              >
                <v-icon dense dark>mdi-send</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template #rowDetails="table">
          <candidateForm
            :candidateId="table.row.id"
            mode="edit"
            @done="getCandidateList(), table.toggle('edit')"
            @cancel="table.toggle('edit')"
          ></candidateForm>
        </template>
      </lister>
    </v-col>
    <v-col cols="12" id="candidateForm">
      <v-btn
        v-if="!showAddForm"
        small
        class=""
        color="primary"
        outlined
        depressed
        @click="showCandidateForm"
      >
        Add new candidate
      </v-btn>
      <v-card outlined v-else>
        <candidateForm
          mode="add"
          @done="getCandidateList(), (showAddForm = false)"
          @cancel="showAddForm = false"
        ></candidateForm>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import lister from "@/components/easyTable/Index.vue";
import candidateForm from "@/components/newhire/Candidateform.vue";
import { getCandidateList } from "@/services/candidate/candidateService.js";
import { sendEmail } from "@/services/email/emailService.js";

export default {
  name: "newhire",
  data() {
    return {
      columns: [
        { title: "Profile", key: "profile", type: "custom" },
        { title: "Full name", key: "firstname", type: "custom", align: "left" },
        { title: "Email", key: "email" },
        { title: "Designation", key: "designation" },
        { title: "Date", key: "date", type: "date" },
        { title: "Status", key: "status" },
        { title: "action", key: "action", type: "custom" },
      ],
      tableData: [],
      showAddForm: false,
    };
  },
  components: {
    lister,
    candidateForm,
  },
  mounted() {},
  methods: {
    getCandidateList() {
      getCandidateList()
        .then((response) => {
          this.tableData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendEmail(data) {
      sendEmail({ id: data.id, email: data.email })
        .then((response) => {
          if (response.status == 200) {
            this.$toast.success("Email sent successfully");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showCandidateForm() {
      this.showAddForm = true;
      this.$vuetify.goTo("#candidateForm");
    },
  },
  created() {
    this.getCandidateList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>