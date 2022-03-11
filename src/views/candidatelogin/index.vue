<template>
  <v-row>
    <v-col cols="12">
      <Login :candidateId="candidateId" :candidateToken="candidateToken">
      </Login
    ></v-col>
    <v-col cols="12">{{ candidateId }}</v-col>
  </v-row>
</template>

<script>
import Login from "@/components/auth/Login";
export default {
  name: "candidatelogin",
  props: {
    candidateId: {
      requied: true,
    },
    candidateToken: {
      type: String,
      requied: true,
    },
  },
  data() {
    return {};
  },
  components: {
    Login,
  },
  computed: {},
  created() {
    console.log(this.candidateToken);
  },
  methods: {},
};
</script>

<style>
</style>