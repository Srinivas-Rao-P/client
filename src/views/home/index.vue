!<template>
  <div>
    Home
    <!-- <v-btn color="primary" @click="refreshToken">refreshToken </v-btn> -->
  </div>
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