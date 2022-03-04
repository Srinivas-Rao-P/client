<template>
  <v-list-item
    dense
    link
    :ripple="false"
    class="no-background-hover"
    @click="logout"
  >
    <v-list-item-title>Logout</v-list-item-title>
  </v-list-item>
</template>

<script>
import { logout } from "@/services/login/loginService";
export default {
  name: "logout",
  methods: {
    logout() {
      logout(window.refreshToken)
        .then((response) => {
          if (response.data) {
            // window.token =
            //   window.refreshToken =
            //   window.companyId =
            //   window.personId =
            //   window.name =
            //   window.userRole =
            //     null;
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            this.$router.go();
            // this.$router.push({ name: "login" });
          }
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