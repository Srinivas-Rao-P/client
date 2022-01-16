<template>
  <v-row dense>
    <v-col cols="12">
      <div class="text-h4"><b>Profile</b></div>
      <v-breadcrumbs :items="breadcrumbItems" class="pa-0">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-col>
    <v-col cols="12" lg="3" md="4">
      <v-row dense>
        <v-col cols="12">
          <v-card class="">
            <v-list>
              <v-list-item link :ripple="false" class="no-background-hover">
                <v-list-item-content>
                  <v-list-item-title class="text-h6 primary--text">
                    Account<v-icon x-small color="primary" style="float: right"
                      >mdi-circle</v-icon
                    >
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-list>
              <v-list-item link :ripple="false" class="no-background-hover">
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    Bank Details
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="">
            <v-list>
              <v-list-item link :ripple="false" class="no-background-hover">
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    Notification
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" lg="9" md="8">
      <v-row dense>
        <v-col cols="12" align-self="center">
          <v-card height="150">
            <v-row no-gutters class="fill-height">
              <v-col
                cols="12"
                lg="2"
                md="3"
                align-self="center"
                class="text-center"
              >
                <!-- <v-card class="ml-8 mr-2" height="100%" style="border-radius: 50%" elevation="4"> -->
                <v-avatar color="primary" height="100" width="100">
                  <v-icon dark x-large> mdi-account-circle </v-icon>
                  <!-- <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  /> -->
                </v-avatar>

                <!-- </v-card> -->
              </v-col>

              <v-col cols="8" lg="7" md="6" align-self="center">
                <div class="text-h6"><b>Upload a New Photo</b></div>
                <div>profile.jpg</div>
              </v-col>
              <v-col cols="4" lg="3" md="3" align-self="center">
                <v-btn color="primary" outlined>Update</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="pa-8">
            <div class="pb-4 text-h5"><b> Change your information here</b></div>
            <v-row>
              <v-col cols="12" lg="4" md="4">
                <div class="pb-1">Full name</div>
                <v-text-field
                  outlined
                  color="primary"
                  placeholder="Full name"
                  hide-details="auto"
                  v-model="profile.fullname"
                  dense
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" lg="4" md="4">
                <div class="pb-1">Email</div>
                <v-text-field
                  outlined
                  color="primary"
                  placeholder="Email"
                  hide-details="auto"
                  v-model="profile.email"
                  dense
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" lg="4" md="4">
                <div class="pb-1">Phone</div>
                <v-text-field
                  outlined
                  color="primary"
                  placeholder="Phone"
                  hide-details="auto"
                  v-model="profile.phone"
                  @keypress="isNumber($event)"
                  dense
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div class="pb-1">Address</div>
                <v-text-field
                  outlined
                  color="primary"
                  placeholder="Address"
                  hide-details="auto"
                  v-model="profile.address"
                  dense
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6" md="6">
                <div class="pb-1">City</div>
                <v-text-field
                  outlined
                  color="primary"
                  placeholder="City"
                  hide-details="auto"
                  v-model="profile.city"
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <div class="pb-1">State/Province</div>
                <v-text-field
                  outlined
                  color="primary"
                  placeholder="State"
                  hide-details="auto"
                  v-model="profile.state"
                  dense
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="6" md="6">
                <div class="pb-1">
                  Zip code {{ profile.zipcode == null && profile.zipcode }}
                </div>
                <v-text-field
                  outlined
                  color="primary"
                  placeholder="zip code"
                  hide-details="auto"
                  v-model="profile.zipcode"
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="6">
                <div class="pb-1">Country</div>
                <v-text-field
                  outlined
                  color="primary"
                  placeholder="country"
                  hide-details="auto"
                  v-model="profile.country"
                  dense
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn color="primary" @click="saveProfile"
                  >Update Information
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import { getProfile, saveProfile } from "@/services/profile/profileService";
export default {
  name: "profile",
  data: () => {
    return {
      profile: { fullname: "", phone: "", email: "", zipcode: "" },
      rules: {
        phoneRules: (v) => !!v || "phone is required",
        emailRules: (v) => !!v || "Password is required",
      },

      breadcrumbItems: [
        {
          text: "Dashboard",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },
        {
          text: "Link 1",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
        {
          text: "Link 2",
          disabled: true,
          href: "breadcrumbs_link_2",
        },
      ],
    };
  },
  props: {
    personId: {
      type: Number,
      default: window.personId,
    },
  },
  methods: {
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        (charCode > 31 &&
          (charCode < 48 || charCode > 57) &&
          charCode !== 46) ||
        this.profile.phone.length > 9
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    getProfile() {
      getProfile(this.personId)
        .then((response) => {
          this.profile = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveProfile() {
      saveProfile(window.personId, JSON.stringify(this.profile))
        .then(() => {
          this.getProfile();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getProfile();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>