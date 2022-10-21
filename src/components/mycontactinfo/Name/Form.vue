<template>
    <v-form ref="form" lazy-validation @submit.prevent="saveName" class="pa-4 pa-md-10 pa-lg-12">
        <v-row>
            <v-col cols="12" lg="6" md="7" offset-lg="1" offset-md="1">
                <v-row>
                    <v-col cols="12" lg="3" md="3">
                        <span>Title</span>
                        <span class="primary--text"><b>*</b></span>
                        <v-text-field v-model="name.title" placeholder="Title" :rules="countryCodeRules" required
                            outlined solo dense flat hide-details="auto" autocomplete="nope" clearable>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" lg="9" md="9">
                        <span>First Name</span>
                        <span class="primary--text"><b>*</b></span>
                        <v-text-field v-model="name.fname" placeholder="First Name" :rules="phoneRules" outlined solo
                            dense flat hide-details="auto" autocomplete="nope" clearable>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" lg="6" md="6">
                        <span>Middle Name</span>
                        <span class="primary--text"></span>
                        <v-text-field v-model="name.mname" placeholder="Middle Name" outlined solo dense flat
                            hide-details="auto" autocomplete="nope" clearable>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" lg="6" md="6">
                        <span>Last Name</span>
                        <span class="primary--text"><b>*</b></span>
                        <v-text-field v-model="name.lname" placeholder="Last Name" :rules="phoneRules" outlined solo
                            dense flat hide-details="auto" autocomplete="nope" clearable>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" lg="12" md="12">
                        <span>Type</span>
                        <span class="primary--text"> <b>*</b></span>
                        <v-autocomplete :items="nameTypeList" v-model="name.nametype" placeholder="Name Type"
                            :rules="nameTypeRules" :disabled="isEditMode" clearable hide-details="auto"
                            autocomplete="nope" item-text="description" item-value="id" required outlined solo dense
                            flat>
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
    addName,
    updateName,
    getName,
    createName,
} from "@/services/mycontactinfo/nameService.js";
export default {
    name: "NameForm",
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
            name: {
                title: "",
                fname: "",
                mname: "",
                lname: "",
                nametype: "",
            },
            countryCodeRules: [(v) => !!v || "Please enter a valid country code"],
            phoneRules: [(v) => !!v || "Please enter a valid number"],
            nameTypeRules: [(v) => !!v || "Please make a selection"],
            nameTypeList: [],
        }
    },
    methods: {
        saveName() {
            if (this.$refs.form.validate()) {
                if (this.isAddMode) {
                    addName(this.personId, this.name)
                        .then(() => {
                            this.$refs.form.reset();
                            this.$emit("done");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                if (this.isEditMode) {
                    updateName(this.personId, this.name)
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
            await createName(this.personId)
                .then((response) => {
                    this.nameTypeList = response.data.nameTypeList;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (this.isEditMode) {
            getName(this.id)
                .then((response) => {
                    this.name = response.data.list;
                    this.nameTypeList = response.data.nameTypeList;
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