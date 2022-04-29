<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div>My Contact Info</div>
      </v-col>
      <v-col cols="12">
        <v-expansion-panels
          class="mb-6"
          multiple
          v-model="panel"
          focusable
          accordion
          flat
        >
          <v-expansion-panel class="mb-4">
            <v-expansion-panel-header
              color="primary"
              style="min-height: fit-content"
            >
              <template v-slot:actions>
                <v-icon color="white" dark dense>$expand</v-icon>
              </template>
              <b class="white--text">Name</b>
            </v-expansion-panel-header>
            <v-expansion-panel-content color="honeydew">
              <Name></Name>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel class="mb-4">
            <v-expansion-panel-header
              color="primary"
              style="min-height: fit-content"
            >
              <template v-slot:actions>
                <v-icon color="white" dark dense>$expand</v-icon>
              </template>
              <b class="white--text">Address</b>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="honeydew">
              <Address></Address>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel class="mb-4">
            <v-expansion-panel-header
              color="primary"
              style="min-height: fit-content"
            >
              <template v-slot:actions>
                <v-icon color="white" dark dense>$expand</v-icon>
              </template>
              <b class="white--text">Email</b>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="honeydew">
              <Email></Email>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel class="mb-4">
            <v-expansion-panel-header
              color="primary"
              style="min-height: fit-content"
            >
              <template v-slot:actions>
                <v-icon color="white" dark dense>$expand</v-icon>
              </template>
              <b class="white--text">Phone</b>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="honeydew">
              <Phone></Phone>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Name from "@/components/mycontactinfo/Name";
import Address from "@/components/mycontactinfo/Address";
import Email from "@/components/mycontactinfo/Email";
import Phone from "@/components/mycontactinfo/Phone";

export default {
  name: "mycontactinfo",
  data() {
    return {
      panel: (this.panel = [...Array(4).keys()].map((k, i) => i)),
    };
  },
  components: {
    Name,
    Address,
    Email,
    Phone,
  },
  computed: {},
  created() {},
};
</script>

<style>
</style>