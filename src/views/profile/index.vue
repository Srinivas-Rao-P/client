<template>
  <v-row>
    <v-col cols="12">
      <div class=""><b>Profile</b></div>
    </v-col>
    <v-col cols="12">
      <profile :personId="personId" />
    </v-col>
  </v-row>
</template>
<script>
import profile from "@/components/Profile.vue";
export default {
  name: "profileindex",
  data() {
    return {};
  },
  props: {
    personId: {
      type: [Number, String],
      default: window.personId,
    },
  },
  components: {
    profile,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>