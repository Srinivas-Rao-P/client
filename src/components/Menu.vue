<template>
  <v-row no-gutters dense>
    <v-col cols="12">
      <!-- <v-card
        elevation="1"
        width="100%"
        style="z-index: 1; position: fixed"
        rounded="0"
        class="primary"
      >
        <v-list dense height="48" class="white">
          <v-list-item dense link :ripple="false" class="no-background-hover">
            <v-list-item-content>
              <v-list-item-title class="text-center primary--text"
                ><b>LOGO</b>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card> -->

      <v-list>
        <v-list-item
          dense
          :ripple="false"
          @click="collapseMenu()"
          class="no-background-hover float-right"
        >
          <!-- <v-list-item-icon class="ml-auto"> -->
          <v-icon dense color="primary" v-if="collapse">
            mdi-chevron-double-right
          </v-icon>
          <v-icon dense color="primary" v-else>mdi-chevron-double-left</v-icon>
          <!-- </v-list-item-icon> -->
        </v-list-item>
        <v-list-item
          v-for="menuItem in menu"
          :key="menuItem.id"
          link
          exact
          exact-active-class="active"
          :ripple="false"
          class="no-background-hover"
          :to="menuItem.link ? { name: menuItem.link } : ''"
        >
          <v-tooltip right color="primary" v-if="collapse" :open-delay="300">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon class="mr-2">
                <v-icon v-bind="attrs" v-on="on" dense color="primary">
                  {{ menuItem.icon }}
                </v-icon>
              </v-list-item-icon>
            </template>
            <span> {{ menuItem.name }}</span>
          </v-tooltip>

          <v-list-item-icon class="mr-2" v-else>
            <v-icon dense color="primary">
              {{ menuItem.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ menuItem.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import { getMenu, getSubMenu } from "@/services/menu/menuService.js";
export default {
  data() {
    return {
      menu: [],
      subMenu: [],
      collapse: false,
    };
  },
  created() {
    this.getMenu();
  },
  methods: {
    collapseMenu() {
      this.collapse = !this.collapse;
      this.$emit("collapse");
    },
    onClick(e) {
      console.log(e);
    },
    getMenu() {
      getMenu()
        .then((response) => {
          this.menu = response.data;
          this.getSubMenu(5);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSubMenu(menuId) {
      getSubMenu({ menuId: menuId })
        .then((response) => {
          this.subMenu = response.data;
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