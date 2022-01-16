<template>
  <v-row no-gutters justify="center" class="fill-height">
    <v-col cols="12" md="6" lg="4" align-self="center">
      <h1>Login</h1>
      <h3>Your session has expired.</h3>

      <v-form ref="form" lazy-validation @submit.prevent="login">
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              type="text"
              v-model="username"
              :rules="[rules.nameRules]"
              label="Username/Email"
              required
              outlined
              color="primary"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Password"
              v-model="password"
              :rules="[rules.passwordRules]"
              type="password"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn
              type="submit"
              class="btn-submit no-background-hover"
              color="primary "
              :ripple="false"
              :disabled="isLoading"
              >Login
            </v-btn>

            <v-btn
              text
              :to="{ name: 'register' }"
              style="float: right"
              color="primary"
              :ripple="false"
              class="no-background-hover"
              >Dont have a account
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { login } from "@/services/login/loginService";
export default {
  name: "login",
  data() {
    return {
      username: "admin",
      password: "xyz",
      rules: {
        nameRules: (v) => !!v || "Username/Email is required",
        passwordRules: (v) => !!v || "Password is required",
      },
      isLoading: false,
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        login(this.username, this.password)
          .then((response) => {
            if (response.data.accessToken) {
                        
              // window.token = window.accessToken;
              // window.refreshToken = window.refreshToken;
              // Vue.$cookies.set("token", window.token);
              localStorage.setItem("token", response.data.accessToken);
              localStorage.setItem("refreshToken", response.data.refreshToken);
              this.$router.push({ name: "home" });
            } else {
              console.log("token not found");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
</style>