<template>
    <v-form ref="form" lazy-validation @submit.prevent="savephoneContact" class="pa-4 pa-md-10 pa-lg-12">
        <v-row>
            <v-col cols="12" lg="5" md="6" offset-lg="1" offset-md="1">
                <v-row>
                    <v-col cols="12" lg="4" md="4">
                        <span>Country Code</span>
                        <span class="primary--text"> <b>*</b></span>
                        <v-text-field v-model="phoneContact.countrycode" placeholder="Country code"
                            :rules="countryCodeRules" required type="number" hide-spin-buttons outlined solo dense flat
                            hide-details="auto" autocomplete="nope" clearable>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" lg="8" md="8">
                        <span>Phone</span>
                        <span class="primary--text"> <b>*</b></span>
                        <v-text-field v-model="phoneContact.phoneno" placeholder="Phone" :rules="phoneRules"
                            type="number" hide-spin-buttons outlined solo dense flat hide-details="auto"
                            autocomplete="nope" clearable>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" lg="12" md="12">
                        <span>Type</span>
                        <span class="primary--text"> <b>*</b></span>
                        <v-autocomplete :items="phoneContactTypeList" v-model="phoneContact.phonecontacttype"
                            placeholder="Contact Type" :rules="phoneContactTypeRules" :disabled="isEditMode" clearable
                            hide-details="auto" autocomplete="nope" item-text="description" item-value="id" required
                            outlined solo dense flat>
                        </v-autocomplete>
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
    addPhone,
    updatePhone,
    getPhoneContact,
    createPhone,
} from "@/services/mycontactinfo/phoneService.js";
export default {
    name: "PhoneForm",
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
    data() {
        return {
            phoneContact: {
                countrycode: "",
                phoneno: "",
                phonecontacttype: "",
            },
            countryCodeRules: [(v) => !!v || "Please enter a valid country code"],
            phoneRules: [(v) => !!v || "Please enter a valid number"],
            phoneContactTypeRules: [(v) => !!v || "Please make a selection"],
            phoneContactTypeList: [],
        }
    },
    methods: {
        savephoneContact() {
            if (this.$refs.form.validate()) {
                if (this.isAddMode) {
                    addPhone(this.personId, this.phoneContact)
                        .then(() => {
                            this.$refs.form.reset();
                            this.$emit("done");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                if (this.isEditMode) {
                    updatePhone(this.personId, this.phoneContact)
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
            await createPhone(this.personId)
                .then((response) => {
                    this.phoneContactTypeList = response.data.phoneContactTypeList;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (this.isEditMode) {
            console.log(this.isEditMode);
            getPhoneContact(this.id)
                .then((response) => {
                    this.phoneContact = response.data.list;
                    this.phoneContactTypeList = response.data.phoneContactTypeList;
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