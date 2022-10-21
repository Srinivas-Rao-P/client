<template>
  <v-form ref="form" lazy-validation @submit.prevent="saveBank" class="pa-4 pa-md-10 pa-lg-12">
    <v-row>
      <v-col cols="12" lg="8" md="9" offset-lg="1" offset-md="1">
        <v-row>
          <v-col cols="12" lg="6" md="6">
            <span>Account Holder Name</span>
            <v-text-field v-model="bankData.accountholdername" placeholder="Account Holder Name" required outlined solo
              dense flat hide-details="auto" autocomplete="nope" clearable></v-text-field>
          </v-col>

          <v-col cols="12" lg="6" md="6">
            <span>Account Number</span>
            <v-text-field v-model="bankData.accountnumber" placeholder="Account Number" :rules="accountNumberRules"
              required outlined solo dense flat hide-details="auto" autocomplete="nope" clearable></v-text-field>
          </v-col>

          <v-col cols="12" lg="6" md="6">
            <span>Account Type</span>
            <v-autocomplete :items="bankaccounttypes" v-model="bankData.accounttypeid" placeholder="Account Type"
              :rules="accountTypeRules" :disabled="isEditMode" hide-details="auto" autocomplete="nope" item-text="type"
              item-value="id" required outlined solo dense flat></v-autocomplete>
          </v-col>

          <v-col cols="12" lg="6" md="6">
            <span>IFSC</span>
            <v-text-field v-model="bankData.ifsccode" placeholder="IFSC" :rules="ifscRules" required outlined solo dense
              flat hide-details="auto" autocomplete="nope" clearable @input="bankData.ifsccode && getBranchFromIfsc()">
            </v-text-field>
          </v-col>

          <v-col cols="12" lg="6" md="6">
            <span>Bank Name</span>
            <v-text-field v-model="bankData.bankname" readonly placeholder="Bank Name" required outlined solo dense flat
              hide-details="auto" autocomplete="nope"></v-text-field>
          </v-col>

          <v-col cols="12" lg="6" md="6">
            <span>Branch</span>
            <v-text-field v-model="bankData.bankbranch" placeholder="Branch" readonly required outlined solo dense flat
              hide-details="auto" autocomplete="nope"></v-text-field>
          </v-col>

          <v-col cols="12">
            <span>Bank Address</span>
            <v-textarea v-model="bankData.bankaddress" placeholder="Bank Address" readonly required outlined solo dense
              flat hide-details="auto" autocomplete="nope" rows="2" auto-grow></v-textarea>
          </v-col>
        
          <v-col cols="12">
            <v-btn type="submit" color="primary" depressed dark dense small>
              Save
            </v-btn>
            <v-btn color="primary" depressed outlined dark dense small text @click="cancel()">
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
  addBank,
  getBankData,
  updateBank,
  create,
} from "@/services/bank/bankService.js";
import ifsc from "ifsc";
export default {
  name: "Bankform",
  data() {
    return {
      bankData: {
        accountholdername: "",
        bankname: "",
        accounttypeid: "",
        accountnumber: "",
        ifsccode: "",
        bankbranch: "",
        bankaddress: "",
      },
      accountNumberRules: [(v) => !!v || "Please enter a Account Number"],
      ifscRules: [
        (v) => !!v || "Please enter a Ifsc Code",
        (v) => (!!v && ifsc.validate(v)) || "Invalid Ifsc Code",
      ],
      accountTypeRules: [(v) => !!v || "Please select a Account Type"],
      bankaccounttypes: [],
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

    // validateIfscCode() {
    //   ifsc.validate('BOTM0XEEMRA'); // returns false
    //   ifsc.fetchDetails(this.ifsccode).then(function (res) {
    //     console.log(res);
    //   });
    //   console.log(ifsc.validate(this.ifsccode))
    //   return this.ifsccode ? ifsc.validate(this.ifsccode) : true; // returns true
    // console.log(ifsc.bank.PUNB);
    // },
  },
  components: {},
  watch: {
    "bankData.ifsccode"(v) {
      if (!v || !ifsc.validate(v)) {
        this.bankData.bankname = "";
        this.bankData.bankbranch = "";
        this.bankData.bankaddress = "";
      }
    },
  },
  methods: {
    saveBank() {
      if (this.$refs.form.validate()) {
        if (this.isAddMode) {
          addBank(this.personId, this.bankData)
            .then(() => {
              this.$refs.form.reset();
              this.$emit("done");
            })
            .catch((error) => {
              console.log(error);
            });
        }
        if (this.isEditMode) {
          updateBank(this.personId, this.bankData)
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
    getBranchFromIfsc() {
      if (ifsc.validate(this.bankData.ifsccode)) {
        ifsc.fetchDetails(this.bankData.ifsccode).then((res) => {
          this.bankData.bankname = res.BANK.toLowerCase();
          this.bankData.bankbranch = res.BRANCH.toLowerCase();
          this.bankData.bankaddress = res.ADDRESS.toLowerCase();
        });
      }
    },
  },
  async created() {
    if (this.isAddMode) {
      await create(this.personId)
        .then((response) => {
          this.bankaccounttypes = response.data.bankaccounttypes;
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (this.isEditMode) {
      getBankData(this.id)
        .then((response) => {
          this.bankData = response.data.list;
          this.bankaccounttypes = response.data.bankaccounttypes;
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