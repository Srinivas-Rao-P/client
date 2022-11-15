<template>
    <v-form ref="requesttimeoffofrm" lazy-validation @submit.prevent="saveBank">
        <v-row>
            <v-col cols="12">
                <v-sheet class="py-10">
                    <v-row justify="center">
                        <v-col cols="12" lg="10" md="10">
                            <span>Type</span>
                            <v-text-field placeholder="Type" required outlined solo dense flat hide-details="auto"
                                autocomplete="nope" clearable>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" lg="5" md="5">
                            <span>Start</span>
                            <v-text-field placeholder="Start" required outlined solo dense flat hide-details="auto"
                                autocomplete="nope" clearable></v-text-field>
                        </v-col>

                        <v-col cols="12" lg="5" md="5">
                            <span>End</span>
                            <v-text-field placeholder="End" required outlined solo dense flat hide-details="auto"
                                autocomplete="nope" clearable></v-text-field>
                        </v-col>

                        <!-- <v-col cols="12" lg="6" md="6">
                            <span>Account Type</span>
                            <v-autocomplete 
                                placeholder="Account Type"  clearable
                                hide-details="auto" autocomplete="nope" item-text="type" item-value="id" required
                                outlined solo dense flat></v-autocomplete>
                        </v-col> -->



                        <v-col cols="12" lg="10" md="10">
                            <span>Approver</span>
                            <v-text-field placeholder="Approver" required outlined solo dense flat hide-details="auto"
                                autocomplete="nope"></v-text-field>
                        </v-col>



                        <v-col cols="12" lg="10" md="10">
                            <span>Note</span>
                            <v-textarea placeholder="Note" required outlined solo dense flat hide-details="auto"
                                autocomplete="nope" rows="2" auto-grow>
                            </v-textarea>
                        </v-col>

                        <v-col cols="12" lg="10" md="10">
                            <v-row>
                                <v-col cols="auto">
                                    <v-btn type="submit" color="primary" depressed dark>
                                        Request Time Off
                                    </v-btn>
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn color="primary" depressed outlined dark text @click="cancel()">
                                        cancel
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
           
        </v-row>
    </v-form>
</template>

<script>

export default {
    name: "Requesttimeoff",
    data() {
        return {
           
        }
    },
    methods: {
        cancel() {
            this.$refs.requesttimeoffofrm.reset()
        },
       
    }
}
</script>

<style>
</style>