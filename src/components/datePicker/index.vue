<template>
  <v-menu 
    :disabled="readonly"
    ref="dateModel"
    v-model="dateModel"
    :close-on-content-click="false"
    :return-value.sync="dateInput"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        v-bind="attrs"
        @blur="dateInput = parseDate(dateFormatted)"
        v-on="on"
        placeholder="DD/MM/YYYY"
        color="primary"
        dense
        flat
        solo
        outlined
        pre
        :rules="datePickerRules"
        hide-details="auto"
        readonly
      ></v-text-field>
    </template>
    <v-date-picker v-model="dateInput" scrollable color="primary">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="dateModel = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.dateModel.save(dateInput)">
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "datepicker",
  data() {
    return {
      dateModel: false,
      dateInput:
        this.date ||
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      datePickerRules: [(v) => !!v || "Please select a date"],
    };
  },
  props: {
    date: {
      type: String,
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    dateInput() {
      this.$emit("input", this.dateInput);
    },
  },
  computed: {
    dateFormatted() {
      return this.formatDate(this.dateInput);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
  mounted() {
    this.$emit("input", this.dateInput);
  },
};
</script>

<style>
</style>