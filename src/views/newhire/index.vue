<template>
  <v-container fluid>
    <v-row>
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
  </v-container>
</template>
<script>
import candidateForm from "@/components/newhire/Candidateform.vue";
import { getCandidateList } from "@/services/candidate/candidateService.js";
import { sendEmail } from "@/services/email/emailService.js";

export default {
  name: "newhire",
  data() {
    return {
  
      showAddForm: false,
    };
  },
  components: {
    candidateForm,
  },
  computed: {
 
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