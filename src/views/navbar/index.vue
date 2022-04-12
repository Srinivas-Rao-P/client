<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div>Navbar</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "navbar",
  props: {
    personId: {
      type: [Number, String],
      required: true,
    },
  },
};
</script>

<style>
</style>