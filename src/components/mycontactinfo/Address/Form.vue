<template>
    <v-form ref="form" lazy-validation @submit.prevent="saveAddress" class="pa-4 pa-md-10 pa-lg-12">
        <v-row>
            <v-col cols="12" lg="6" md="7" offset-lg="1" offset-md="1">
                <v-row>
                    <v-col cols="12" lg="12" md="12">
                        <span> Address </span>
                        <span class="primary--text"><b>*</b></span>
                        <v-text-field v-model="address.address" placeholder="Address" :rules="addressRules"
                            autocomplete="nope" aria-label="address" clearable required outlined solo dense flat
                            hide-details="auto"></v-text-field>
                    </v-col>

                    <v-col cols="12" lg="12" md="12">
                        <span> Type </span>
                        <span class="primary--text"><b>*</b></span>
                        <v-autocomplete :items="addressTypeList" v-model="address.addresstype"
                            placeholder="Address Type" :rules="addressTypeRules" :disabled="isEditMode" clearable
                            hide-details="auto" autocomplete="nope" item-text="description" item-value="id" required
                            outlined solo dense flat>
                        </v-autocomplete>
                    </v-col>

                    <v-col cols="12" lg="6" md="6">
                        <span> Country </span>
                        <span class="primary--text"><b>*</b></span>

                        <v-autocomplete :items="countryList" item-text="name" item-value="isoCode" placeholder="Country"
                            color="primary" hide-details="auto" dense flat solo outlined v-model="address.countrycode"
                            :rules="cityRules" autocomplete="nope">
                        </v-autocomplete>
                    </v-col>

                    <v-col cols="12" lg="6" md="6">
                        <span> State </span>
                        <span class="primary--text"><b>*</b></span>
                        <v-autocomplete :items="stateList" item-text="name" item-value="isoCode" placeholder="State"
                            color="primary" hide-details="auto" dense flat solo outlined v-model="address.statecode"
                            :rules="stateRules" autocomplete="nope">
                        </v-autocomplete>
                    </v-col>

                    <v-col cols="12" lg="6" md="6">
                        <span> City </span>
                        <span class="primary--text"><b>*</b></span>
                        <v-autocomplete :disabled="!address.statecode" :items="cityList" item-text="name"
                            item-value="isoCode" placeholder="City" color="primary" hide-details="auto" dense flat solo
                            outlined v-model="address.city" :rules="cityRules" autocomplete="nope">
                        </v-autocomplete>
                    </v-col>



                    <v-col cols="12" lg="6" md="6">
                        <span> Zipcode </span>
                        <span class="primary--text"><b>*</b></span>
                        <v-text-field placeholder="Zip code" color="primary" hide-details="auto" dense flat solo
                            outlined v-model="address.zipcode" :rules="zipcodeRules" autocomplete="nope"></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
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
    addAddress,
    updateAddress,
    getAddress,
    createAddress,
} from "@/services/mycontactinfo/addressService.js";
import { utilities } from "@/mixin/utilities";
export default {
    name: "addressForm",
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
    data() {
        return {
            address: {
                address: "",
                city: "",
                zipcode: "",
                countrycode: "IN",
                statecode: "",
                addresstype: ""
            },
            addressRules: [(v) => !!v || "Please add a valid address"],
            addressTypeRules: [(v) => !!v || "Please make a selection"],
            countryRules: [(v) => !!v || "Country is required"],
            stateRules: [(v) => !!v || "State is required"],
            cityRules: [(v) => !!v || "City is required"],
            zipcodeRules: [
                (v) => !!v || "Zipcode is required",
                (v) => (!!v && this.validateZipcode) || "Zipcode not valid",
            ],

            addressTypeList: [],
        }
    },
    methods: {
        saveAddress() {
            if (this.$refs.form.validate()) {
                if (this.isAddMode) {
                    addAddress(this.personId, this.address)
                        .then(() => {
                            this.$refs.form.reset();
                            this.$emit("done");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                if (this.isEditMode) {
                    updateAddress(this.personId, this.address)
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
    mixins: [utilities],
    computed: {
        isEditMode() {
            return this.mode === "edit";
        },
        isAddMode() {
            return this.mode === "add";
        },
        countryList() {
            return this.getCountryList();
        },
        stateList() {
            return this.getStateList(this.address.countrycode);
        },
        cityList() {
            return this.getCityList(
                this.address.countrycode,
                this.address.statecode
            );
        },
        validateZipcode() {
            return this.postcodeValidator(
                this.address.zipcode,
                this.address.countrycode
            );
        },
    },
    async created() {
        if (this.isAddMode) {
            await createAddress(this.personId)
                .then((response) => {
                    this.addressTypeList = response.data.addressTypeList;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (this.isEditMode) {
            getAddress(this.id)
                .then((response) => {
                    this.address = response.data.list;
                    this.addressTypeList = response.data.addressTypeList;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
}
</script>

<style>

</style>