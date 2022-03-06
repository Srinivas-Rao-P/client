<template>
  <v-row>
    <v-col cols="12">
      <div v-for="menuitems in menu" :key="menuitems.id">
        <li>{{ menuitems.name }}</li>
        {{ menuitems.submenuid }}
        <!-- <div v-if="menuitems.submenu.length">
          <div v-for="submenuitems in menuitems.submenu" :key="submenuitems.id">
           {{ submenuitems.name }}
          </div>
        </div> -->
      </div>
    </v-col>
  </v-row>
</template>

<script>
import {
  getMenu,
  //  getSubMenu
} from "@/services/menu/menuService.js";
export default {
  name: "menu",
  data() {
    return {
      menu: [],
      subMenu: [],
    };
  },
  created() {
    this.getMenu();
  },
  mounted() {},
  methods: {
    getMenu() {
      getMenu()
        .then((response) => {
          this.menu = response.data;
        //   this.menu.forEach(async (e) => {
        //     await getSubMenu({ menuId: e.id }).then((response) => {
        //       e.submenu = response.data;
        //     });
        //   });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // getSubMenu(menuId) {
    //   getSubMenu({ menuId: menuId })
    //     .then((response) => {
    //       this.menu.submenuid = response.data;
    //       console.log(this.menu.submenuid);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
  },
};
</script>

<style>
</style>