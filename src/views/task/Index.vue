<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class=""><b>My Tasks</b></div>
      </v-col>
     
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "taskindex",
  data() {
    return {};
  },
  props: {
    personId: {
      type: [Number, String],
      default: window.personId,
    },
  },
//   components: {
//     profile,
//   },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>