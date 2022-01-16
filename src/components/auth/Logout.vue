<template>
  <v-list-item dense link :ripple="false" class="no-background-hover">
    <v-list-item-title @click="logout">Logout</v-list-item-title>
  </v-list-item>
</template>

<script>
import { logout } from "@/services/login/loginService";
export default {
  name: "logout",
  methods: {
    logout() {
      //  console.log(window.refreshToken);

      logout(window.refreshToken).then((response) => {
        if (response.data) {
          window.token = null;
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          this.$router.push({ name: "login" });
        }
      });
    },
  },
};
</script>

<style>
</style>