<template>
    <v-form ref="form" lazy-validation @submit.prevent="saveLeaveType" class="pa-4 pa-md-10 pa-lg-12">
        <v-row>
            <v-col cols="12" lg="5" md="6" offset-lg="1" offset-md="1">
                <v-row>
                    <v-col cols="12" lg="12" md="12">
                        <span>Type</span>
                        <span class="primary--text"><b>*</b></span>
                        <v-text-field v-model="leave.type" :disabled="this.isEditMode" placeholder="Type"
                            :rules="typeRules" autocomplete="nope" aria-label="Type" clearable required outlined solo
                            dense flat hide-details="auto">
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" lg="12" md="12">
                        <span>Description</span>
                        <span class="primary--text"><b>*</b></span>
                        <v-text-field v-model="leave.description" placeholder="Description" :rules="descriptionRules"
                            autocomplete="nope" aria-label="Description" clearable required outlined solo dense flat
                            hide-details="auto">
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" lg="12" md="12">
                        <v-radio-group v-model="leave.category" row :rules="categoryRules">
                            <v-radio label="General" value="G"></v-radio>
                            <v-radio label="Special" value="S"></v-radio>
                        </v-radio-group>
                    </v-col>

                    <v-col cols="12" lg="12" md="12" v-if="leave.category == 'G'">
                        <span>Days</span>
                        <span class="primary--text"><b>*</b></span>
                        <v-text-field v-model.number="leave.days" placeholder="Days" :rules="daysRules"
                            autocomplete="nope" aria-label="Days" clearable required outlined solo dense flat
                            hide-details="auto" type="number">
                        </v-text-field>
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
    addLeaveType,
    updateLeaveType,
    getLeaveType,
} from "@/services/leave/leaveService.js";
export default {
    name: "LeaveTypeForm",
    data() {
        return {
            leave: {
                type: "",
                description: "",
                days: 0,
                category: "G"
            },
            typeRules: [(v) => !!v || "Please enter a leave type"],
            descriptionRules: [(v) => !!v || "Please enter a leave description"],
            daysRules: [(v) => !!v || "Please enter number of days"],
            categoryRules: [(v) => !!v || "Please select a category"],
        }
    },
    props: {
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
    methods: {
        saveLeaveType() {
            if (this.$refs.form.validate()) {
                if (this.isAddMode) {
                    addLeaveType(this.leave)
                        .then(() => {
                            this.$refs.form.reset();
                            this.$emit("done");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                if (this.isEditMode) {
                    updateLeaveType(this.id, this.leave)
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
    created() {
        if (this.isEditMode) {
            getLeaveType(this.id)
                .then((response) => {
                    this.leave = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}
</script>