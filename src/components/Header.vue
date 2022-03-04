<template>
  <v-row no-gutters dense>
    <v-col cols="auto" class="ml-auto">
      <v-btn
        dark
        right
        depressed
        :ripple="false"
        class="white no-background-hover"
        @click="changeColorPallet"
      >
        <v-icon color="primary" dark dense>mdi-circle</v-icon>
      </v-btn>
      <v-btn
        dark
        right
        depressed
        :ripple="false"
        class="white no-background-hover"
      >
        <v-icon color="primary" dark dense>mdi-bell-ring</v-icon>
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
            class="white no-background-hover"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon dark color="primary" class="mx-2"
              >mdi-account-circle</v-icon
            >
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
  created() {},
  methods: {
    changeColorPallet() {
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
      // window.theme = this.$vuetify.theme.isDark
      //   ? this.$vuetify.theme.themes.dark
      //   : this.$vuetify.theme.themes.light;
    },
  },
};
</script>

<style>
</style>