<template>
  <v-form
    ref="form"
    lazy-validation
    @submit.prevent="saveCandidate"
    class="pa-4 pa-md-10 pa-lg-12"
  >
    <v-row justify="center">
      <v-col cols="12" lg="8" md="8">
        <v-row>
          <v-col cols="12" lg="6" md="6">
            <span> First name </span>
            <span class="primary--text"> <b>*</b></span>
            <v-text-field
              type="text"
              v-model="candidateData.firstname"
              placeholder="First Name"
              autocomplete="nope"
              aria-label="first name"
              clearable
              :rules="nameRules"
              required
              outlined
              solo
              dense
              flat
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <span> Last name </span>
            <span class="primary--text"> <b>*</b></span>
            <v-text-field
              v-model="candidateData.lastname"
              :rules="lastnameRules"
              placeholder="Last Name"
              aria-label="last name"
              autocomplete="nope"
              clearable
              required
              outlined
              solo
              dense
              flat
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <span> Email </span> <span class="primary--text"> <b>*</b></span>
            <v-text-field
              v-model="candidateData.email"
              placeholder="Email"
              :rules="emailRules"
              autocomplete="nope"
              aria-label="email"
              :disabled="mode == 'edit'"
              clearable
              required
              outlined
              solo
              dense
              flat
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" lg="6" md="6">
            <span>Choose a manager</span>
            <v-autocomplete
              :items="managerList"
              v-model="candidateData.managerid"
              autocomplete="nope"
              clearable
              item-text="name"
              item-value="id"
              placeholder="Choose a manager"
              aria-label="choose a manager"
              required
              outlined
              solo
              dense
              flat
              hide-details="auto"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <span>Designation</span>
            <v-text-field
              v-model="candidateData.designation"
              autocomplete="nope"
              placeholder="Designation"
              aria-label="designation"
              clearable
              required
              outlined
              solo
              dense
              flat
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" lg="6" md="6">
            <span>Referrer</span>
            <v-autocomplete
              :items="referrerList"
              v-model="candidateData.referrerid"
              autocomplete="nope"
              clearable
              item-text="name"
              item-value="id"
              placeholder="Referrer"
              aria-label="referrer"
              outlined
              solo
              dense
              flat
              hide-details
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <span> Status</span><span class="primary--text"> <b>*</b></span>
            <v-autocomplete
              :items="statusList"
              v-model="candidateData.status"
              autocomplete="nope"
              aria-label="Status"
              :rules="statusRules"
              clearable
              item-text="status"
              item-value="id"
              placeholder="Status"
              required
              outlined
              solo
              dense
              flat
              hide-details="auto"
            ></v-autocomplete>
          </v-col>
        </v-row>

        <!-- <v-row v-if="candidateData.status == 3">
          <v-col cols="12" lg="4" md="4">
            <span>Candidate Id</span>
             <v-text-field
              v-model="candidateData.emailtype"
              placeholder="Email Type"
              autocomplete="nope"
              aria-label="emailtype"
              clearable
              required
              outlined
              solo
              dense
              flat
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="8" md="8">
            <span>Work mail</span>
            <v-text-field
              v-model="candidateData.email"
              placeholder="Email"
              :rules="emailRules"
              autocomplete="nope"
              aria-label="email"
              clearable
              required
              outlined
              solo
              dense
              flat
              hide-details="auto"
            ></v-text-field>
          </v-col>
        
          <v-col cols="12" lg="4" md="4">
            <span>Work location</span>
            <v-text-field
              v-model="candidateData.email"
              placeholder="Email"
              :rules="emailRules"
              autocomplete="nope"
              aria-label="email"
              clearable
              required
              outlined
              solo
              dense
              flat
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4">
            <span>Shift</span>
            <v-text-field
              v-model="candidateData.email"
              placeholder="Email"
              :rules="emailRules"
              autocomplete="nope"
              aria-label="email"
              clearable
              required
              outlined
              solo
              dense
              flat
              hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4">
            <span>Work type</span>
            <v-text-field
              v-model="candidateData.email"
              placeholder="Email"
              :rules="emailRules"
              autocomplete="nope"
              aria-label="email"
              clearable
              required
              outlined
              solo
              dense
              flat
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row> -->

        <v-row>
          <v-col cols="12">
            <span>Note</span>
            <v-textarea
              v-model="candidateData.note"
              placeholder="Optional..."
              autocomplete="nope"
              aria-label="Note"
              clearable
              flat
              outlined
              dense
              hide-details
              solo
              color="primary"
              rows="3"
              auto-grow
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="auto">
                <v-btn type="submit" color="primary" depressed dark dense small>
                  Save
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  color="primary"
                  depressed
                  outlined
                  dark
                  dense
                  small
                  text
                  @click="cancel()"
                >
                  cancel
                </v-btn>
              </v-col>
            </v-row>
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
export default {
  name: "Candidateform",
  data() {
    return {
      candidateData: {
        firstname: "",
        lastname: "",
        email: "",
        status: 1,
        managerid: "",
        referrerid: "",
        designation: "",
        note: "",
      },
      nameRules: [(v) => !!v || "Please enter a name"],
      lastnameRules: [(v) => !!v || "Please enter a lastname"],
      emailRules: [
        (v) => !!v || "Please enter a valid email",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      statusRules: [(v) => !!v || "Please select a status"],
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
  },
  components: {},
  watch: {},
  mounted() {},
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
    cancel() {
      this.$emit("cancel");
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