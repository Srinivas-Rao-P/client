<template>
  <tileIndex tileTitle="Time Entries" type="tyle">
    <template #tileContent>
      <div>
        <v-btn color="primary">Clock Out</v-btn>
      </div>
    </template>
  </tileIndex>
</template>

<script>
import tileIndex from "@/components/tile/Index"
export default {
  name: "TimeEntries",
  components: {
    tileIndex
  }

}
</script>

<style>

</style>