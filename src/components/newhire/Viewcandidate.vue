<template>
  <div>
    candidate {{ candidateId }}
    <router-link :to="{ name: 'profileindex', params: { personId: candidateId } }"
      >name</router-link
    >
  </div>
</template>

<script>
export default {
  name: "Viewcandidate",
  props: {
    candidateId: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style>
</style>