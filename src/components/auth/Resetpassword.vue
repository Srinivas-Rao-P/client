!<template>
  <v-row no-gutters justify="center" class="fill-height">
    <v-col cols="12" md="4" lg="3" align-self="center">
      <div class="text-right">
        <v-btn class="no-background-hover" :ripple="false" color="primary" :to="{ name: 'login' }" text link dark
          depressed small>
          <v-icon small>mdi-arrow-left</v-icon>
          Back to Login
        </v-btn>
      </div>

      <v-card outlined elevation="2" class="pa-8" color="honeydew">
        <h1 color="primary">Reset Password</h1>
        <v-form ref="resetPassword" lazy-validation v-if="otpVerified">
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field type="password" v-model="newPassword" label="New Password" required outlined
                color="primary">
              </v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field type="text" label="Confirm Password" v-model="confirmPassword" required outlined
                color="primary">
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn v-if="otpGenerated" @click="resetPassword" class="btn-submit no-background-hover" color="primary "
                :ripple="false" :loading="isLoading">Reset Password
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-form ref="verifyOtp" lazy-validation v-else>
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field type="text" v-model="username" label="Username" :rules="[rules.nameRules]" required outlined
                color="primary">
              </v-text-field>
            </v-col>

            <v-col cols="12">
              <v-btn v-if="!otpGenerated" @click="generateOtp" class="btn-submit no-background-hover" color="primary "
                :ripple="false" :loading="isLoading">Generate OTP
              </v-btn>
            </v-col>
            <v-col cols="12" v-if="otpGenerated">
              <v-text-field label="Enter OTP" v-model="otp" :rules="[rules.otpRules]" required
                hide-spin-buttons outlined hide-details="auto">
              </v-text-field>
              <v-btn class="float-right no-background-hover mt-2" :ripple="false" color="primary" @click="generateOtp"
                text link dark depressed small right>Resend OTP</v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn v-if="otpGenerated" @click="verifyOtp" class="btn-submit no-background-hover" color="primary "
                :ripple="false" :loading="isLoading">Verify OTP
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { resetPassword, generateOtp, verifyOtp } from "@/services/login/loginService";
export default {
  name: 'resetpassword',
  data() {
    return {
      username: "",
      isLoading: false,
      otpGenerated: false,
      otpVerified: false,
      otp: "",
      newPassword: "",
      confirmPassword: "",
      rules: {
        nameRules: (v) => !!v || "Please enter a username",
        otpRules: (v) => !!v || "Please enter a valid Otp",
      }

    }

  },
  props: {
    personId: {
      type: [Number, String],
      default: window.personId,
    },
  },
  methods: {
    resetPassword() {
      resetPassword(this.username, this.newPassword, this.otp).then((response) => {
        if (response.status === 200) {
          this.$toast.success("Password changed successfully");
          this.$router.push({ name: "login" });
        } else {
          this.$toast.error("OTP invalid/expired");
        }
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
      })
    },
    generateOtp() {
      if (this.$refs.verifyOtp.validate()) {
        this.isLoading = true
        generateOtp(this.username).then((response) => {
          if (response.status === 200) {
            this.$toast.info("If you are a registered user otp will be sent to your registered email and phone");
            this.isLoading = false
            this.otpGenerated = true
          }
        }).catch(() => {
          this.isLoading = false
        })
      }
    },
    verifyOtp() {
      if (this.$refs.verifyOtp.validate()) {
        this.isLoading = true
        verifyOtp(this.username, this.otp).then((response) => {
          if (response.status === 200) {
            this.$toast.success("Otp varified");
            this.otpVerified = true
          } else {
            this.$toast.error("OTP invalid/expired");
            this.otpVerified = false
          }
          this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>