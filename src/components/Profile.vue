<template>
  <v-form ref="form">
    <v-row dense v-if="profile">
      <v-col cols="12" lg="3" md="4">
        <v-card class="px-3 py-10">
          <v-row justify="center" class="text-center">
            <v-col cols="12">
              <!-- <v-card class="ml-8 mr-2" height="100%" style="border-radius: 50%" elevation="4"> -->
              <v-avatar color="primary" height="100" width="100" @click="$refs.inputProfileImage.click()">
                <v-img v-if="profile.imageurl" :src="profile.imageurl"></v-img>
                <v-icon v-else dark x-large> mdi-account-circle </v-icon>
              </v-avatar>

              <input type="file" accept="image/*" @change="onProfileImageSelect" ref="inputProfileImage"
                class="d-none" />

              <!-- </v-card> -->
            </v-col>

            <template v-if="false">
              <v-col cols="12">
                <!-- <p>Upload a New Photo</p> -->
                <v-file-input placeholder="choose a file" hide-details="auto" prepend-icon="" dense outlined>
                </v-file-input>
              </v-col>
              <v-col cols="12">
                <v-btn color="primary" small dense outlined> Upload </v-btn>
              </v-col>
            </template>
            <v-col cols="12">
              <div>
                <!-- <v-icon>mdi-account</v-icon> -->
                {{ profile.name }}
              </div>
              <!-- <div>abcxyz00024</div> -->
              <div>{{profile.email}}</div>
              <div>{{profile.designation}}</div>
              <div>
                <!-- <v-icon>mdi-map-marker</v-icon> -->
                <!-- Remote -->
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-hover v-slot="{ hover }">
          <v-card class="mt-2 pa-3">
            <v-row>
              <v-col cols="12">
                <div class="d-flex align-center">
                  <v-icon color="primary"> mdi-linkedin </v-icon>
                  <div class="mx-2" style="width: 100%">
                    <v-text-field autofocus v-if="editLinkedin" v-model="linkedin" placeholder="Linked In" outlined flat
                      solo dense hide-details autocomplete="nope"></v-text-field>
                    <span v-else-if="linkedin">{{ linkedin }}</span>
                    <span v-else>Linked In</span>
                  </div>
                  <div class="ml-auto">
                    <v-btn v-if="editLinkedin" block icon x-small right @click="editLinkedin = !editLinkedin">
                      <v-icon color="primary" dense small>
                        mdi-check-bold
                      </v-icon>
                    </v-btn>

                    <v-btn v-else icon block x-small right @click="editLinkedin = !editLinkedin">
                      <v-icon :class="{ 'd-lg-none': !hover }" color="primary" dense small>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-hover>
        <v-hover v-slot="{ hover }">
          <v-card class="mt-2 pa-3">
            <v-row>
              <v-col cols="12">
                <div class="d-flex align-center">
                  <v-icon color="primary"> mdi-twitter </v-icon>
                  <div class="mx-2" style="width: 100%">
                    <v-text-field autofocus v-if="editTwitter" v-model="twitter" placeholder="Twitter" outlined flat
                      solo dense hide-details autocomplete="nope"></v-text-field>
                    <span v-else-if="twitter">{{ twitter }}</span>
                    <span v-else>Twitter</span>
                  </div>
                  <div class="ml-auto">
                    <v-btn v-if="editTwitter" block icon x-small right @click="editTwitter = !editTwitter">
                      <v-icon color="primary" dense small>
                        mdi-check-bold
                      </v-icon>
                    </v-btn>

                    <v-btn v-else icon block x-small right @click="editTwitter = !editTwitter">
                      <v-icon :class="{ 'd-lg-none': !hover }" color="primary" dense small>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-hover>
        <v-hover v-slot="{ hover }">
          <v-card class="mt-2 pa-3">
            <v-row>
              <v-col cols="12">
                <div class="d-flex align-center">
                  <v-icon color="primary"> mdi-card-account-details </v-icon>
                  <div class="mx-2" style="width: 100%">
                    <v-text-field autofocus v-if="editPan" v-model="pan" placeholder="Pan Card" outlined flat solo dense
                      hide-details autocomplete="nope"></v-text-field>
                    <span v-else-if="pan">{{ pan }}</span>
                    <span v-else>Pan Card</span>
                  </div>
                  <div class="ml-auto">
                    <v-btn v-if="editPan" block icon x-small right @click="editPan = !editPan">
                      <v-icon color="primary" dense small>
                        mdi-check-bold
                      </v-icon>
                    </v-btn>

                    <v-btn v-else icon block x-small right @click="editPan = !editPan">
                      <v-icon :class="{ 'd-lg-none': !hover }" color="primary" dense small>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-hover>
        <v-hover v-slot="{ hover }">
          <v-card class="mt-2 pa-3">
            <v-row>
              <v-col cols="12">
                <div class="d-flex align-center">
                  <v-icon color="primary">
                    mdi-card-account-details-outline
                  </v-icon>
                  <div class="mx-2" style="width: 100%">
                    <v-text-field autofocus v-if="editAddar" v-model="addar" placeholder="Addar crad" outlined flat solo
                      dense hide-details autocomplete="nope"></v-text-field>
                    <span v-else-if="addar">{{ addar }}</span>
                    <span v-else>Addar card</span>
                  </div>
                  <div class="ml-auto">
                    <v-btn v-if="editAddar" block icon x-small right @click="editAddar = !editAddar">
                      <v-icon color="primary" dense small>
                        mdi-check-bold
                      </v-icon>
                    </v-btn>

                    <v-btn v-else icon block x-small right @click="editAddar = !editAddar">
                      <v-icon :class="{ 'd-lg-none': !hover }" color="primary" dense small>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-hover>
      </v-col>

      <v-col cols="12" lg="9" md="8">
        <v-card class="pa-9 fill-height">
          <v-row>
            <v-col cols="12" lg="4" md="4">             
              <span>First name</span>              
              <v-text-field placeholder="First name" color="primary" hide-details="auto" dense flat outlined
                v-model="profile.fname" :rules="fnameRules" autocomplete="nope" readonly></v-text-field>
            </v-col>

            <v-col cols="12" lg="4" md="4">
              <span>Last Name</span>

              <v-text-field placeholder="Last Name" color="primary" hide-details="auto" dense flat outlined
                v-model="profile.lname" :rules="lnameRules" autocomplete="nope" readonly></v-text-field>
            </v-col>

            <v-col cols="12" lg="4" md="4">
              <span>Middle Name</span>
              <v-text-field placeholder="Middle Name" color="primary" hide-details="auto" dense flat outlined
                v-model="profile.mname" autocomplete="nope" readonly></v-text-field>
            </v-col>

            <v-col cols="12" lg="4" md="4">
              <span>Phone</span>
              <v-text-field placeholder="Phone" color="primary" hide-details="auto" type="number" hide-spin-buttons
                dense flat outlined v-model="profile.phoneno" autocomplete="nope" readonly></v-text-field>
            </v-col>

            <v-col cols="12" lg="8" md="8">
              <span>Email</span>
              <v-text-field placeholder="Email" color="primary" hide-details="auto" dense flat outlined
                v-model="profile.email" :rules="emailRules" autocomplete="nope" readonly></v-text-field>
            </v-col>

            <v-col cols="12">
              <span>Address</span>
              <v-text-field placeholder="Address" color="primary" hide-details="auto" dense flat outlined
                v-model="profile.address" :rules="addressRules" autocomplete="nope" readonly></v-text-field>
            </v-col>

            <v-col cols="12" lg="4" md="4">
              <span>Country</span>
              <v-autocomplete :items="countryList" item-text="name" item-value="isoCode" placeholder="Country"
                color="primary" hide-details="auto" dense flat solo outlined v-model="profile.countrycode"
                :rules="countryRules" autocomplete="nope" readonly>
              </v-autocomplete>
            </v-col>

            <v-col cols="12" lg="4" md="4">
              <span>State</span>
              <v-autocomplete :items="stateList" item-text="name" item-value="isoCode" placeholder="State"
                color="primary" hide-details="auto" dense flat outlined v-model="profile.statecode" :rules="stateRules"
                autocomplete="nope" readonly>
              </v-autocomplete>
            </v-col>

            <v-col cols="12" lg="4" md="4">
              <span>City</span>

              <v-autocomplete :disabled="!profile.statecode" :items="cityList" item-text="name" item-value="isoCode"
                placeholder="City" color="primary" hide-details="auto" dense flat outlined v-model="profile.city"
                :rules="cityRules" autocomplete="nope" readonly>
              </v-autocomplete>
            </v-col>

            <v-col cols="12" lg="4" md="4">
              <span>Zip code</span>

              <v-text-field :disabled="!profile.city" placeholder="Zip code" color="primary" hide-details="auto" dense
                flat outlined v-model="profile.zipcode" :rules="zipcodeRules" autocomplete="nope" readonly></v-text-field>
            </v-col>

            <!-- <v-col cols="12" lg="4" md="4">
              <span>Nationality</span>
              
              <v-text-field placeholder="Nationality" color="primary" hide-details="auto" dense flat outlined
                v-model="profile.nationality" :rules="nationalityRules" autocomplete="nope"></v-text-field>
            </v-col> -->

            <v-col cols="12" lg="4" md="4">
              <span>Date of birth</span>

              <datepicker :date="profile.dob" @input="setDob" :readonly="true"></datepicker>
            </v-col>

            <v-col cols="12" lg="4" md="4">
              <span>Gender</span>

              <v-select :items="genderList" item-text="item" item-value="value" placeholder="Gender" color="primary"
                hide-details="auto" dense flat outlined v-model="profile.gender" :rules="genderRules"
                autocomplete="nope" readonly>
              </v-select>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
// import VueJwtDecode from "vue-jwt-decode";
import { utilities } from "@/mixin/utilities";
import { getProfile, saveProfile } from "@/services/profile/profileService";
import datepicker from "@/components/datePicker/index.vue";
export default {
  name: "profile",
  data() {
    return {
      editLinkedin: false,
      editTwitter: false,
      editPan: false,
      editAddar: false,
      linkedin: "",
      twitter: "",
      addar: "",
      pan: "",
      profile: null,
      el: 1,
      loading: false,
      zipcodeRules: [
        (v) => !!v || "Zipcode is required",
        (v) => (!!v && this.validateZipcode) || "Zipcode not valid",
      ],
      countryRules: [(v) => !!v || "Country is required"],
      stateRules: [(v) => !!v || "State is required"],
      cityRules: [(v) => !!v || "City is required"],
      addressRules: [(v) => !!v || "Address is required"],
      emailRules: [
        (v) => !!v || "Please enter a valid email",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      lnameRules: [(v) => !!v || "Lastname is required"],
      fnameRules: [(v) => !!v || "Firstname is required"],
      nationalityRules: [(v) => !!v || "Nationality is required"],
      genderRules: [(v) => !!v || "Gender is required"],

      countryCode: "IN",
      genderList: [
        { item: "Male", value: "m" },
        { item: "Female", value: "f" },
        { item: "Choose not to disclose", value: "t" },
      ],
    };
  },
  props: {
    candidateToken: {
      type: String,
      default: null,
    },
    personId: {
      type: [Number, String],
      default: window.personId,
    },
  },
  mixins: [utilities],
  watch: {
    personId() {
      this.getProfile();
    },
  },
  components: {
    datepicker,
  },
  computed: {
    countryList() {
      return this.getCountryList();
    },
    stateList() {
      return this.getStateList(this.profile.countrycode);
    },
    cityList() {
      return this.getCityList(
        this.profile.countrycode,
        this.profile.statecode
      );
    },
    validateZipcode() {
      return this.postcodeValidator(
        this.profile.zipcode,
        this.profile.countrycode
      );
    },

  },
  methods: {
    setDob(date) {
      this.profile.dob = date;
    },
    onProfileImageSelect(e) {
      // const file = e.target.files[0];
      // this.profile.imageurl = URL.createObjectURL(file);
      console.log(e, this.profile.imageurl);
    },
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
      if (this.$refs.form.validate()) {
        this.loading = !this.loading;
        saveProfile(this.personId, this.profile)
          .then(() => {
            this.getProfile();
            this.loading = !this.loading;
            this.$toast.success("Profile updated");
          })
          .catch((error) => {
            console.log(error);
            this.loading = !this.loading;
          });
      }
    },
  },
  created() {
    this.getProfile();
  },
};
</script>

<style>

</style>