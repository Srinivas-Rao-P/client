<template>
  <v-row>
    <v-col cols="12">
      <div class=""><b>Profile</b></div>
    </v-col>
    <v-col cols="12">
      <profile :personId="personId" />
    </v-col>
  </v-row>
</template>
<script>
import profile from "@/components/Profile.vue";
import { getProfile, saveProfile } from "@/services/profile/profileService";
export default {
  name: "profileindex",
  data() {
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
      type: [Number, String],
      default: window.personId,
    },
  },
  components: {
    profile,
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
    // this.getProfile();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>