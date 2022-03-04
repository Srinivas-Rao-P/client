!<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12" lg="4" md="4">
        <v-card height="250" width="100%"> Task</v-card>
      </v-col>
      <v-col cols="12" lg="4" md="4">
        <v-card height="250" width="100%"> Communication</v-card>
      </v-col>
      <v-col cols="12" lg="4" md="4">
        <v-card height="250" width="100%"> Leave</v-card>
      </v-col>
      <v-col cols="12" lg="6" md="6">
        <v-card height="250" width="100%">.........</v-card>
      </v-col>
      <v-col cols="12" lg="6" md="6">
        <v-card height="250" width="100%">.........</v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- <v-btn color="primary" @click="refreshToken">refreshToken </v-btn> -->
</template>
<script>
import sessionService from "@/services/session/sessionService";
export default {
  name: "home",
  methods: {
    refreshToken() {
      console.log("token", window.token);
      console.log("refreshToken", window.refreshToken);
      sessionService.refreshToken();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>