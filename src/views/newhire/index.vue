<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div>
          Start new hire
        </div>
      </v-col>
      <v-col cols="12" id="candidateForm">
        <!-- <v-card outlined> -->
          <candidateForm
            mode="add"
            @done="$toast.success('Hiring was successful')"
          ></candidateForm>
        <!-- </v-card> -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import candidateForm from "@/components/newhire/Candidateform.vue";
import { sendEmail } from "@/services/email/emailService.js";

export default {
  name: "newhire",
  data() {
    return {
  
     
    };
  },
  components: {
    candidateForm,
  },
  computed: {
 
  },
  mounted() {},
  methods: {
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
  },
  created() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>