<template>
  <v-form ref="form" lazy-validation @submit.prevent="newHire" class="">
    <v-row no-gutters justify="center">
      <v-col cols="12">
        <v-row>
          <v-col cols="auto" align-self="center">
            <span> Hire Date </span>
            <span class="primary--text"><b>*</b></span>
          </v-col>
          <v-col cols="3">
            <datepicker :date="candidateData.hiredate" @input="setHiredate"></datepicker>
          </v-col>
        </v-row>
        <v-expansion-panels class="mt-6" multiple v-model="panel" focusable accordion flat>
          <v-expansion-panel class="mb-8">
            <v-expansion-panel-header color="primary" style="min-height: fit-content">
              <template v-slot:actions>
                <v-icon color="white" dark dense>$expand</v-icon>
              </template>
              <b class="white--text">Employee Information</b>
            </v-expansion-panel-header>
            <v-expansion-panel-content color="honeydew" class="pt-6">
              <v-row justify="start">
                <v-col cols="12" lg="7" md="8" offset-lg="1" offset-md="1">
                  <v-row>

                    <!-- Title -->
                    <v-col cols="12" lg="3" md="3">
                      <span>Title </span>
                      <span class="primary--text"> <b>*</b></span>
                      <v-text-field type="text" autofocus v-model="candidateData.title" placeholder="Mr / Ms"
                        autocomplete="nope" aria-label="name title" :rules="titleRules" required outlined solo dense
                        flat hide-details="auto"></v-text-field>
                    </v-col>

                    <!-- First name -->
                    <v-col cols="12" lg="9" md="9">
                      <span> First name </span>
                      <span class="primary--text"> <b>*</b></span>
                      <v-text-field type="text" v-model="candidateData.fname" placeholder="First Name"
                        autocomplete="nope" aria-label="first name" clearable :rules="nameRules" required outlined solo
                        dense flat hide-details="auto"></v-text-field>
                    </v-col>

                    <!-- Middle name -->
                    <v-col cols="12" lg="6" md="6">
                      <span> Middle name </span>
                      <v-text-field v-model="candidateData.mname" placeholder="Middle Name" aria-label="middle name"
                        autocomplete="nope" clearable required outlined solo dense flat hide-details="auto">
                      </v-text-field>
                    </v-col>

                    <!-- Last name -->
                    <v-col cols="12" lg="6" md="6">
                      <span> Last name </span>
                      <span class="primary--text"> <b>*</b></span>
                      <v-text-field v-model="candidateData.lname" :rules="lastnameRules" placeholder="Last Name"
                        aria-label="last name" autocomplete="nope" clearable required outlined solo dense flat
                        hide-details="auto"></v-text-field>
                    </v-col>

                    <!-- Address -->
                    <v-col cols="12" lg="12" md="12">
                      <span> Address </span>
                      <span class="primary--text"> <b>*</b></span>
                      <v-text-field v-model="candidateData.address" :rules="addressRules" placeholder="Address"
                        aria-label="address" autocomplete="nope" clearable required outlined solo dense flat
                        hide-details="auto"></v-text-field>
                    </v-col>

                    <!-- Country -->
                    <v-col cols="12" lg="6" md="6">
                      <span> Country </span>
                      <span class="primary--text"> <b>*</b></span>

                      <v-autocomplete :items="countryList" item-text="name" item-value="isoCode" placeholder="Country"
                        color="primary" hide-details="auto" dense flat solo outlined v-model="candidateData.countrycode"
                        :rules="cityRules" autocomplete="nope">
                      </v-autocomplete>
                    </v-col>


                    <!-- State -->
                    <v-col cols="12" lg="6" md="6">
                      <span> State </span>
                      <span class="primary--text"> <b>*</b></span>
                      <v-autocomplete :items="stateList" item-text="name" item-value="isoCode" placeholder="State"
                        color="primary" hide-details="auto" dense flat solo outlined v-model="candidateData.statecode"
                        :rules="stateRules" autocomplete="nope">
                      </v-autocomplete>
                    </v-col>

                    <!-- City -->
                    <v-col cols="12" lg="6" md="6">
                      <span> City </span>
                      <span class="primary--text"> <b>*</b></span>
                      <v-autocomplete :disabled="!candidateData.statecode" :items="cityList" item-text="name"
                        item-value="isoCode" placeholder="City" color="primary" hide-details="auto" dense flat solo
                        outlined v-model="candidateData.city" :rules="cityRules" autocomplete="nope">
                      </v-autocomplete>
                    </v-col>

                    <!-- Zipcode -->
                    <v-col cols="12" lg="6" md="6">
                      <span> Zipcode </span>
                      <span class="primary--text"> <b>*</b></span>
                      <v-text-field :disabled="!candidateData.city" placeholder="Zip Code" color="primary"
                        hide-details="auto" dense flat solo outlined clearable v-model="candidateData.zipcode"
                        :rules="zipcodeRules" autocomplete="nope"></v-text-field>
                    </v-col>

                  </v-row>
                </v-col>
              </v-row>

            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel class="mb-4">
            <v-expansion-panel-header color="primary" style="min-height: fit-content">
              <template v-slot:actions>
                <v-icon color="white" dark dense>$expand</v-icon>
              </template>
              <b class="white--text">Personal Information</b>
            </v-expansion-panel-header>
            <v-expansion-panel-content color="honeydew" class="pt-6">
              <v-row justify="start">
                <v-col cols="12" lg="7" md="8" offset-lg="1" offset-md="1">
                  <v-row>
                    <!-- Username -->
                    <v-col cols="12" lg="12" md="12">
                      <span> Username </span>
                      <span class="primary--text"> <b>*</b></span>
                      <v-text-field v-model="candidateData.username" :rules="usernameRules" placeholder="Username"
                        aria-label="username" autocomplete="nope" clearable required outlined solo dense flat
                        hide-details="auto"></v-text-field>
                    </v-col>

                    <!-- Email type -->
                    <v-col cols="12" lg="3" md="3">
                      <span> Email type </span>
                      <span class="primary--text"> <b>*</b></span>
                      <v-autocomplete :items="netcontacttypeList" v-model="candidateData.netcontacttype" :rules="emailtypeRules"
                        autocomplete="nope" placeholder="Email type" aria-label="email type" item-text="item"
                        item-value="value" required outlined solo dense flat hide-details="auto"></v-autocomplete>
                    </v-col>

                    <!-- Email -->
                    <v-col cols="12" lg="9" md="9">
                      <span> Email </span>
                      <span class="primary--text"> <b>*</b></span>
                      <v-text-field v-model="candidateData.email" placeholder="Email" :rules="emailRules"
                        autocomplete="nope" aria-label="email" :disabled="mode == 'edit'" clearable required outlined
                        solo dense flat hide-details="auto"></v-text-field>
                    </v-col>

                    <!-- Phone -->
                    <v-col cols="12" lg="6" md="6">
                      <span> Phone </span>
                      <v-text-field type="number" v-model="candidateData.phoneno" placeholder="Phone" aria-label="phone"
                        autocomplete="nope" clearable required outlined solo dense flat hide-details="auto"
                        hide-spin-buttons></v-text-field>
                    </v-col>


                    <!-- Gender -->
                    <v-col cols="12" lg="6" md="6">
                      <span> Gender </span>
                      <span class="primary--text"> <b>*</b></span>
                      <v-select :items="genderList" item-text="item" item-value="value" placeholder="Gender"
                        color="primary" hide-details="auto" dense flat solo outlined v-model="candidateData.gender"
                        :rules="genderRules" autocomplete="nope">
                      </v-select>
                    </v-col>

                    <!-- Marital status -->
                    <v-col cols="12" lg="6" md="6">
                      <span> Marital status </span>
                      <v-select :items="maritalList" item-text="item" item-value="value" placeholder="Marital status"
                        aria-label="marital status" color="primary" hide-details dense flat solo outlined
                        v-model="candidateData.maritalstatus" autocomplete="nope">
                      </v-select>
                    </v-col>

                    <!-- Date of birth -->
                    <v-col cols="12" lg="6" md="6">
                      <span> Date of birth </span>
                      <span class="primary--text"> <b>*</b></span>
                      <datepicker :date="candidateData.dob" @input="setDob"></datepicker>
                    </v-col>

                  </v-row>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel class="mb-4">
            <v-expansion-panel-header color="primary" style="min-height: fit-content">
              <template v-slot:actions>
                <v-icon color="white" dark dense>$expand</v-icon>
              </template>
              <b class="white--text">Employment Information</b>
            </v-expansion-panel-header>
            <v-expansion-panel-content color="honeydew" class="pt-6">
              <v-row justify="start">
                <v-col cols="12" lg="7" md="8" offset-lg="1" offset-md="1">
                  <v-row>
                    <!-- Designation -->
                    <v-col cols="12" lg="12" md="12">
                      <span> Designation </span>
                      <span class="primary--text"> <b>*</b></span>
                      <v-text-field v-model="candidateData.designation" :rules="designationRules"
                        placeholder="Designation" aria-label="Designation" autocomplete="nope" clearable required
                        outlined solo dense flat hide-details="auto"></v-text-field>
                    </v-col>

                    <!-- Choose a manager -->
                    <v-col cols="12" lg="6" md="6">
                      <span>Choose a manager</span>
                      <v-autocomplete :items="managerList" v-model="candidateData.managerid" autocomplete="nope"
                        clearable item-text="name" item-value="id" placeholder="Choose a manager"
                        aria-label="choose a manager" required outlined solo dense flat hide-details="auto">
                      </v-autocomplete>
                    </v-col>

                    <!-- Referrer -->
                    <v-col cols="12" lg="6" md="6">
                      <span>Referrer</span>
                      <v-autocomplete :items="referrerList" v-model="candidateData.referrerid" autocomplete="nope"
                        clearable item-text="name" item-value="id" placeholder="Referrer" aria-label="referrer" outlined
                        solo dense flat hide-details></v-autocomplete>
                    </v-col>

                    <!-- Pay unit -->
                    <v-col cols="12" lg="6" md="6">
                      <span> Pay unit </span>
                      <v-text-field v-model="candidateData.payunit" placeholder="Pay unit" aria-label="pay unit"
                        autocomplete="nope" clearable required outlined solo dense flat hide-details="auto">
                      </v-text-field>
                    </v-col>

                    <!-- Compensation type -->
                    <v-col cols="12" lg="6" md="6">
                      <span>Compensation type</span>
                      <v-autocomplete :items="managerList" v-model="candidateData.compensationtype" autocomplete="nope"
                        clearable item-text="name" item-value="id" placeholder="Compensation type"
                        aria-label="compensation type" required outlined solo dense flat hide-details="auto">
                      </v-autocomplete>
                    </v-col>

                    <!-- Permanency -->
                    <v-col cols="12" lg="6" md="6">
                      <span>Permanency</span>
                      <v-autocomplete :items="permanencyList" v-model="candidateData.permanency" autocomplete="nope"
                        clearable item-text="item" item-value="value" placeholder="Permanency" aria-label="permanency"
                        outlined solo dense flat hide-details></v-autocomplete>
                    </v-col>

                    <!-- Annual ctc -->
                    <v-col cols="12" lg="6" md="6">
                      <span> Annual Ctc </span>
                      <span class="primary--text"> <b>*</b></span>
                      <v-text-field type="number" hide-spin-buttons v-model="candidateData.ctc" :rules="ctcRules"
                        placeholder="Annual Cta" aria-label="annual ctc" autocomplete="nope" clearable required outlined
                        solo dense flat hide-details="auto"></v-text-field>
                    </v-col>

                    <!-- Employment category -->
                    <v-col cols="12" lg="6" md="6">
                      <span> Employment category</span>
                      <v-autocomplete :items="statusList" v-model="candidateData.employmentcategory" autocomplete="nope"
                        aria-label="Status" clearable item-text="status" item-value="id"
                        placeholder="Employment category" required outlined solo dense flat hide-details="auto">
                      </v-autocomplete>
                    </v-col>

                    <!-- Pay frequency -->
                    <v-col cols="12" lg="6" md="6">
                      <span> Pay frequency </span>
                      <v-autocomplete :items="statusList" v-model="candidateData.payfrequency" autocomplete="nope"
                        aria-label="Status" clearable item-text="status" item-value="id" required outlined solo dense
                        flat hide-details="auto"></v-autocomplete>
                    </v-col>

                    <!-- Note -->
                    <v-col cols="12" lg="12" md="12">
                      <span>Note</span>
                      <v-textarea v-model="candidateData.note" placeholder="Optional..." autocomplete="nope"
                        aria-label="Note" clearable flat outlined dense hide-details solo color="primary" rows="3"
                        auto-grow></v-textarea>
                    </v-col>

                    <v-col cols="12" lg="12" md="12">
                      <div class="d-flex" style="align-items: center">
                        <v-checkbox v-model="candidateData.welcomemail"></v-checkbox>
                        <span>Send welcome mail</span>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-row>
          <v-col cols="12" offset-lg="1" offset-md="1">
            <v-btn type="submit" color="primary" depressed dark dense>
              Hire Employee
            </v-btn>
            <v-btn color="primary" depressed outlined dark dense text @click="cancel()">
              cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import {
  create,
  addCandidate,
  updateCandidate,
  getCandidateData,
} from "@/services/candidate/candidateService.js";
import { newHire } from "@/services/newhire/newhireService.js";
import { Country, State, City } from "country-state-city";
import { postcodeValidator } from "postcode-validator";
import datepicker from "@/components/datePicker/index.vue";
export default {
  name: "Candidateform",
  data() {
    return {
      panel: (this.panel = [...Array(3).keys()].map((k, i) => i)),
      candidateData: {
        address: "",
        city: "",
        compensationtype: "",
        ctc: "",
        designation: "",
        dob: "",
        email: "",
        netcontacttype: "",
        title: "",
        fname: "",
        gender: "",
        lname: "",
        managerid: "",
        maritalstatus: "",
        mname: "",
        note: "",
        phoneno: "",
        positiontitle: "",
        referrerid: "",
        statecode: "",
        status: "",
        username: "",
        zipcode: "",
        hiredate: "",
        welcomemail: true,
        countrycode: "IN",
      },
      titleRules: [(v) => !!v || "Please enter a title"],
      nameRules: [(v) => !!v || "Please enter a name"],
      lastnameRules: [(v) => !!v || "Please enter a last name"],
      addressRules: [(v) => !!v || "Please enter a valid address"],
      emailRules: [
        (v) => !!v || "Please enter a valid email",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      usernameRules: [(v) => !!v || "Please enter a user name"],
      maritalstatusRules: [(v) => !!v || "Please select a status"],
      emailtypeRules: [(v) => !!v || "Please select a type"],
      positiontitleRules: [(v) => !!v || "Please enter a title"],
      payunitRules: [(v) => !!v || "Please select a pay unit"],
      ctcRules: [(v) => !!v || "Please enter a CTC"],
      countryRules: [(v) => !!v || "Country is required"],
      stateRules: [(v) => !!v || "State is required"],
      cityRules: [(v) => !!v || "City is required"],
      statusRules: [(v) => !!v || "Please select a status"],
      dobRules: [(v) => !!v || "Please enter the date of birth"],
      genderRules: [(v) => !!v || "Please select the gender"],
      zipcodeRules: [
        (v) => !!v || "Zipcode is required",
        (v) => (!!v && this.validateZipcode) || "Zipcode not valid",
      ],
      genderList: [
        { item: "Male", value: "m" },
        { item: "Female", value: "f" },
        { item: "Other", value: "o" },
      ],
      maritalList: [
        { item: "Single", value: "s" },
        { item: "Maried", value: "m" },
        { item: "Divorsed", value: "d" },
        { item: "Widow / Widower", value: "w" },
      ],
      permanencyList: [
        { item: "Full Time", value: "f" },
        { item: "Part Time", value: "p" },
        { item: "Internship", value: "i" },
        { item: "Contract", value: "c" },
      ],
      netcontacttypeList: [
        { item: "Work", value: "1" },
        { item: "Personal", value: "2" },
        { item: "Other", value: "3" },
      ],
      managerList: [],
      referrerList: [],
      statusList: [],
    };
  },
  props: {
    candidateId: {
      type: Number,
    },
    mode: {
      type: String,
      default: "add",
    },
  },
  computed: {
    isEditMode() {
      return this.mode === "edit";
    },
    isAddMode() {
      return this.mode === "add";
    },
    countryList() {
      return Country.getAllCountries();
    },

    stateList() {
      return State.getStatesOfCountry(this.candidateData.countrycode);
    },
    cityList() {
      return City.getCitiesOfState(
        this.candidateData.countrycode,
        this.candidateData.statecode
      );
    },
    validateZipcode() {
      return postcodeValidator(
        this.candidateData.zipcode,
        this.candidateData.countrycode
      );
    },
  },
  components: { datepicker },
  watch: {},
  mounted() { },
  methods: {
    saveCandidate() {
      if (this.$refs.form.validate()) {
        if (this.isAddMode) {
          addCandidate(this.candidateData)
            .then((res) => {
              console.log(res);
              if (this.candidateData.status == 3) {
                this.$router.push({
                  name: "navbar",
                  params: { personId: res.data.insertId },
                });
              } else {
                this.$refs.form.reset();
                this.$emit("done");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }

        if (this.isEditMode) {
          updateCandidate(this.candidateData)
            .then(() => {
              this.$refs.form.reset();
              this.$emit("done");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    newHire() {
      if (this.$refs.form.validate()) {
        if (this.isAddMode) {
          newHire(this.candidateData)
            .then(() => {
              this.$refs.form.reset();
              this.$emit("done");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    cancel() {
      this.$emit("cancel");
      this.$refs.form.reset();
    },
    setHiredate(date) {
      this.candidateData.hiredate = date;
    },
    setDob(date) {
      this.candidateData.dob = date;
    },

    create() {
      create()
        .then((response) => {
          this.managerList = response.data.managerList;
          this.referrerList = response.data.referrerList;
          this.statusList = response.data.statusList;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    // if (this.mode == "add") {
    this.create();
    // }
    if (this.isEditMode) {
      getCandidateData(this.candidateId)
        .then((response) => {
          this.candidateData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>