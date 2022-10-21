<template>
  <v-row no-gutters justify="center" class="fill-height login">
    <!-- <v-col cols="12" md="8" lg="9"></v-col> -->
    <v-col cols="12" md="4" lg="3" align-self="center">
      <v-card outlined elevation="2" class="pa-8" color="honeydew">
        <h1>Login</h1>
        <!-- <h3>Your session has expired.</h3>
      <h3>{{ candidateToken }}</h3> -->

        <v-form ref="form" lazy-validation @submit.prevent="login">
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field type="text" v-model="username" :rules="[rules.nameRules]" label="Username/Email" required
                autofocus outlined color="primary">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Password" v-model="password" :rules="[rules.passwordRules]" type="password" required
                outlined hide-details="auto"></v-text-field>
              <v-btn class="float-right no-background-hover mt-2" :ripple="false" color="primary"
                :to="{ name: 'resetpassword' }" text link dark depressed small right>Forgot
                Password</v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn type="submit" class="btn-submit no-background-hover" color="primary " :ripple="false"
                :disabled="isLoading">Login
              </v-btn>

              <!-- <v-btn
              text
              :to="{ name: 'register' }"
              style="float: right"
              color="primary"
              :ripple="false"
              class="no-background-hover"
              >Dont have a account
            </v-btn> -->
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import { login, candidateLogin } from "@/services/login/loginService";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      rules: {
        nameRules: (v) => !!v || "Username/Email is required",
        passwordRules: (v) => !!v || "Password is required",
      },
      isLoading: false,
    };
  },
  props: {
    candidateId: {
      default: null,
    },
    candidateToken: {
      type: String,
      default: null,
    },
  },
  computed: {
    isCandidate() {
      return !!this.candidateToken;
    },
    decoded() {
      return VueJwtDecode.decode(this.candidateToken);
    },
  },
  created() {
    if (this.isCandidate) {
      this.username = this.decoded.email;
      this.candidateLogin();
    }
  },
  methods: {
    candidateLogin() {
      candidateLogin(this.username, this.candidateToken, this.candidateId)
        .then((response) => {
          if (response.data.accessToken) {
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            this.$router.push({ name: "home" });
          } else {
            this.$toast.error("Token not found");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    login() {
      if (this.$refs.form.validate()) {
        if (this.isCandidate) {
          this.candidateLogin();
        } else {
          login(this.username, this.password)
            .then((response) => {
              if (response.data.accessToken) {
                // window.token = window.accessToken;
                // window.refreshToken = window.refreshToken;
                // Vue.$cookies.set("token", window.token);
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem(
                  "refreshToken",
                  response.data.refreshToken
                );
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
    },
  },
};
</script>

<style scoped>
.login {
  background-image: url('/assets/background.png');
  background-size: cover;
  background-position: center;
  /* background-color: #195f73 ; */
}
</style>