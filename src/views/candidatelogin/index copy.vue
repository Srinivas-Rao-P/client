<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-stepper v-model="el" class="honeydew" elevation="0">
          <v-stepper-header>
            <v-stepper-step :complete="el > 1" step="1" @click="el = 1">
              Basic Information
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="el > 2" step="2" @click="el = 2">
              Qualification
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="el > 3" step="3" @click="el = 3">
              Employment History
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="4" @click="el = 4"> Others </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <profile :candidateToken="candidateToken" />
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-row>
                <v-col cols="12" lg="6">
                  <span>Level of education</span>
                  <span class="primary--text"> <b>*</b></span>
                  <v-text-field
                    placeholder="Level of education"
                    color="primary"
                    hide-details="auto"
                    class="white"
                    dense
                    flat
                    outlined
                    v-model="levelOfEducation"
                    autocomplete="nope"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6">
                  <span>Exam/Degree Title</span>

                  <v-text-field
                    placeholder="Exam/Degree Title"
                    color="primary"
                    hide-details="auto"
                    class="white"
                    dense
                    flat
                    outlined
                    v-model="degree"
                    autocomplete="nope"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6">
                  <span>Year of passing</span>
                  <v-text-field
                    placeholder="Year of passing"
                    color="primary"
                    hide-details="auto"
                    disabled
                    class="white"
                    dense
                    flat
                    outlined
                    v-model="yop"
                    autocomplete="nope"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6">
                  <span>Institute name</span>
                  <v-text-field
                    placeholder="Institute name"
                    color="primary"
                    hide-details="auto"
                    class="white"
                    dense
                    flat
                    outlined
                    v-model="institute"
                    autocomplete="nope"
                  ></v-text-field>
                </v-col>

                <v-col cols="auto">
                  <v-btn color="primary" outlined dense> Add education </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-row> </v-row>
            </v-stepper-content>

            <v-stepper-content step="4"> </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-col cols="auto">
        <v-btn text v-if="el > 1" @click="back()"> Back </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" v-if="el == 4"> Save </v-btn>
        <v-btn color="primary" v-else @click="next(el)"> Next </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import profile from "@/components/Profile.vue";
export default {
  name: "candidatelogin",
  props: {
    candidateToken: {
      type: String,
      requied: true,
    },
  },
  data() {
    return {
      phone: "",
      addresss: "",
      state: "",
      city: "",
      zipcode: "",
      nationality: "",
      dateofbirth: "",
      gender: "",
      el: 1,

      zipcodeRules: [
        (v) => !!v || "Zipcode is required",
        (v) => (!!v && this.validateZipcode) || "Zipcode not valid",
      ],
      stateRules: [(v) => !!v || "State is required"],
      cityRules: [(v) => !!v || "City is required"],
      addressRules: [(v) => !!v || "Address is required"],
      emailRules: [
        (v) => !!v || "Please enter a valid email",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      lastnameRules: [(v) => !!v || "Lastname is required"],
      firstnameRules: [(v) => !!v || "Firstname is required"],
      nationalityRules: [(v) => !!v || "Nationality is required"],
      dateofbirthRules: [(v) => !!v || "Date of birth is required"],
      genderRules: [(v) => !!v || "Gender is required"],

      countryCode: "IN",
      genderList: [
        { item: "male", value: "m" },
        { item: "female", value: "f" },
        { item: "Choose not to disclose", value: "t" },
      ],
    };
  },
  components: {
    profile
  },
  computed: {
  },
  created() {
    
  },
  methods: {
    back() {
      this.el = this.el - 1;
    },
    next(index) {
      switch (index) {
        case 1: {
          if (this.$refs.basicInformation.validate()) {
            this.basicInformation();
            this.el = this.el + index;
          }
          break;
        }
        default: {
          alert("default");
          break;
        }
      }
    },
  },
};
</script>

<style>
</style>