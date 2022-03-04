<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-col cols="12" md="6" lg="4">
        <h1>Welcome</h1>
        <v-form ref="form" lazy-validation @submit.prevent="register">
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
                <span v-if="validateEmail" slot="append" color="primary">
                  will be verified
                </span>
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
              <v-text-field
                label="Confirm Password"
                v-model="confirmPassword"
                :rules="[rules.confirmPasswordRules, passwordConfirmationRule]"
                type="password"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn
                type="submit"
                class="btn-submit no-background-hover"
                color="primary"
                :ripple="false"
                :disabled="isLoading"
                >Register
              </v-btn>
              <v-btn
                text
                :to="{ name: 'login' }"
                style="float: right"
                color="primary"
                class="no-background-hover"
                :ripple="false"
                >Already have a account
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { register } from "@/services/register/registerService";
import { login } from "@/services/login/loginService";
export default {
  name: "register",
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      rules: {
        nameRules: (v) => !!v || "Username/Email is required",
        passwordRules: (v) => !!v || "Password is required",
        confirmPasswordRules: (v) => !!v || "Password is required",
      },
      isLoading: false,
    };
  },
  created() {},
  computed: {
    validateEmail() {
      var re = /\S+@\S+\.\S+/;
      return re.test(this.username);
    },
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword || "Password do not match";
    },
  },
  methods: {
    register() {
      if (this.$refs.form.validate()) {
        register(this.username, this.password)
          .then((response) => {
            if (response && response.data.id) {
              {
                login(this.username, this.password)
                  .then((response) => {
                    if (response.data.accessToken) {
                      window.token = response.data.accessToken;
                      window.refreshToken = response.data.refreshToken;
                      localStorage.setItem("accessToken", window.token);
                      localStorage.setItem("refreshToken", window.refreshToken);
                      this.$router.push({ name: "home" });
                    } else {
                      this.$toast.error("Token not found");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            }
            console.log(response.data.id);
            // window.token = response.data.accessToken;
            // // Vue.$cookies.set("token", window.token);
            // localStorage.setItem("accessToken", window.token);
            // this.$router.push({ name: "home" });
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