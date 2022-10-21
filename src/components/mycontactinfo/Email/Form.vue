<template>
    <v-form ref="form" lazy-validation @submit.prevent="saveEmail" class="pa-4 pa-md-10 pa-lg-12">
        <v-row>
            <v-col cols="12" lg="5" md="6" offset-lg="1" offset-md="1">
                <v-row>
                    <v-col cols="12" lg="12" md="12">
                        <span>Email</span>
                        <span class="primary--text"><b>*</b></span>
                        <v-text-field v-model="email.email" placeholder="Email" :rules="emailRules" autocomplete="nope"
                            aria-label="email" clearable required outlined solo dense flat
                            hide-details="auto"></v-text-field>
                    </v-col>

                    <v-col cols="12" lg="12" md="12">
                        <span>Type</span>
                        <span class="primary--text"><b>*</b></span>
                        <v-autocomplete :items="emailTypeList" v-model="email.netcontacttype" placeholder="Email Type"
                            :rules="emailTypeRules" :disabled="isEditMode" clearable hide-details="auto"
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
    addEmail,
    updateEmail,
    getEmail,
    createEmail,
} from "@/services/mycontactinfo/emailService.js";
export default {
    name: "emailForm",
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
            email: {
                email: "",
                netcontacttype: ""
            },
            emailTypeRules: [(v) => !!v || "Please make a selection"],
            emailRules: [
                (v) => !!v || "Please enter a valid email",
                (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
            ],
            emailTypeList: [],
        }
    },
    methods: {
        saveEmail() {
            if (this.$refs.form.validate()) {
                if (this.isAddMode) {
                    addEmail(this.personId, this.email)
                        .then(() => {
                            this.$refs.form.reset();
                            this.$emit("done");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                if (this.isEditMode) {
                    updateEmail(this.personId, this.email)
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
            await createEmail(this.personId)
                .then((response) => {
                    this.emailTypeList = response.data.emailTypeList;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if (this.isEditMode) {
            getEmail(this.id)
                .then((response) => {
                    this.email = response.data.list;
                    this.emailTypeList = response.data.emailTypeList;
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