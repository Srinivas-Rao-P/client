<template>
  <v-form
    ref="form"
    lazy-validation
    @submit.prevent="saveEmergencyContact"
    class="pa-4 pa-md-10 pa-lg-12"
  >
    <v-row justify="center">
      <v-col cols="12" lg="8" md="8">
        <v-row>
          <v-col cols="12" lg="6" md="6">
            <span>Name</span>
            <v-text-field
              v-model="emergencyContact.name"
              placeholder="Name"
              :rules="nameRules"
              required
              outlined
              solo
              dense
              flat
              hide-details="auto"
              autocomplete="nope"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <span>Email</span>
            <v-text-field
              v-model="emergencyContact.email"
              placeholder="Email"
              :rules="emergencyContact.email ? emailRules : [true]"
              outlined
              solo
              dense
              flat
              hide-details="auto"
              autocomplete="nope"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <span>Phone</span>
            <v-text-field
              v-model="emergencyContact.phone"
              placeholder="Phone"
              :rules="phoneRules"
              type="number"
              hide-spin-buttons
              outlined
              solo
              dense
              flat
              hide-details="auto"
              autocomplete="nope"
              clearable
            ></v-text-field>
          </v-col>

          <v-col cols="12" lg="6" md="6">
            <span>Relationship</span>
            <v-autocomplete
              :items="relationshipList"
              v-model="emergencyContact.relationshipid"
              placeholder="Relationship"
              :rules="relationshipRules"
              :disabled="isEditMode"
              clearable
              hide-details="auto"
              autocomplete="nope"
              item-text="relationship"
              item-value="id"
              required
              outlined
              solo
              dense
              flat
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" lg="6" md="6">
            <span>Address</span>
            <v-textarea
              v-model="emergencyContact.address"
              placeholder="Address"
              outlined
              solo
              dense
              flat
              hide-details="auto"
              autocomplete="nope"
              clearable
              rows="2"
              auto-grow
            ></v-textarea>
          </v-col>

          <v-col cols="12" lg="6" md="6">
            <span>Notes</span>
            <v-textarea
              v-model="emergencyContact.notes"
              placeholder="Notes"
              outlined
              solo
              dense
              flat
              hide-details="auto"
              autocomplete="nope"
              clearable
              rows="2"
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
  addEmergencyContact,
  getEmergencyContact,
  updateEmergencyContact,
  create,
} from "@/services/emergencycontact/emergencycontactService.js";
export default {
  name: "Emergencycontactform",
  data() {
    return {
      emergencyContact: {
        name: "",
        email: "",
        phone: "",
        relationshipid: "",
        address: "",
        notes: "",
      },
      nameRules: [(v) => !!v || "Please enter a name"],
      emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
      phoneRules: [(v) => !!v || "Please enter a number"],
      relationshipRules: [(v) => !!v || "Please make a selection"],
      relationshipList: [],
    };
  },
  props: {
    personId: {
      type: [Number, String],
      default: window.personId,
    },
    id: {
      type: Number,
      require: true,
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
  methods: {
    saveEmergencyContact() {
      if (this.$refs.form.validate()) {
        if (this.isAddMode) {
          addEmergencyContact(this.personId, this.emergencyContact)
            .then(() => {
              this.$refs.form.reset();
              this.$emit("done");
            })
            .catch((error) => {
              console.log(error);
            });
        }
        if (this.isEditMode) {
          updateEmergencyContact(this.personId, this.emergencyContact)
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
  },
  async created() {
    if (this.isAddMode) {
      await create(this.personId)
        .then((response) => {
          this.relationshipList = response.data.relationshipList;
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (this.isEditMode) {
      getEmergencyContact(this.id)
        .then((response) => {
          this.emergencyContact = response.data.list;
          this.relationshipList = response.data.relationshipList;
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