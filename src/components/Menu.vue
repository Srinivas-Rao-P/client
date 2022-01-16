<template>
  <v-row no-gutters dense>
    <v-col cols="12">
      <v-card
        elevation="0"
        width="100%"
        style="z-index: 1; position: fixed"
        color="primary"
        rounded="0"
        class="lightgray"
      >
        <v-list dense height="48">
          <v-list-item dense link :ripple="false" class="no-background-hover">
            <v-list-item-content>
              <v-list-item-title class="text-center white--text"
                ><b>LOGO</b>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
      <v-list dense>
        <v-list-item dense link :ripple="false" class="no-background-hover">
          <v-list-item-content>
            <v-list-item-title class="text-center">logo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-if="menu.length">
        <v-list-item
          link
          exact
          exact-active-class="active"
          :ripple="false"
          class="no-background-hover"
          v-for="menuItem in menu"
          :key="menuItem.id"
          :to="{ name: menuItem.link }"
        >       
          <v-list-item-icon>
            <v-icon dense color="primary">{{ menuItem.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import { getMenu } from "@/services/menu/menuService.js";
export default {
  data() {
    return {
      menu: []
    };
  },
  created() {
    this.getMenu();
  },
  methods: {
    getMenu() {
      getMenu()
        .then((response) => {
          this.menu = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
</style>