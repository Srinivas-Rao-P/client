<template>
  <v-row no-gutters dense>
    <v-col cols="auto" class="ml-auto">
      <v-btn right depressed :ripple="false" class="no-background-hover">
        <v-icon color="primary">mdi-bell-ring</v-icon>
      </v-btn>

      <v-menu
        transition="slide-y-transition"
        bottom
        rounded="b-xl"
        offset-y
        z-index="0"
        right
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            small
            depressed
            :ripple="false"
            class="no-background-hover"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon color="primary" large>mdi-account-circle</v-icon>
            <span v-if="username" class="username">{{ username }}</span>
            <span v-else class="username">No name</span>
          </v-btn>
        </template>

        <v-list dense flat>
          <v-list-item
            dense
            link
            :ripple="false"
            class="no-background-hover"
            :to="{ name: 'profile' }"
          >
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <Logout />
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
import Logout from "@/components/auth/Logout";
export default {
  data: () => {
    return {
      username: window.name,
    };
  },
  components: {
    Logout,
  },
  created: () => {
  },
};
</script>

<style>
</style>