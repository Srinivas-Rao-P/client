<template>
  <v-row>
    <v-col cols="12" lg="3" md="3">
      <div>Main menu</div>
      <v-list>
        <v-list-item
          v-for="menuItem in menus"
          :key="menuItem.id"
          :ripple="false"
          class="no-background-hover"
          @click="showMenuDetails(menuItem.id)"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ menuItem.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col cols="12" lg="9" md="9">
      <template v-if="menuDetails">
        <div>Menu details</div>

        <v-form class="white">
          <v-row>
            <v-col cols="12" lg="4" md="4">
              <span>Name</span>
              <v-text-field v-model="menuDetails.name"></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4">
              <span>Description</span>
              <v-text-field v-model="menuDetails.description"></v-text-field>
            </v-col>
            <v-col cols="12" lg="4" md="4">
              <span>Icon</span>
              <v-text-field v-model="menuDetails.icon"></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6">
              <span>Link</span>

              <v-autocomplete
                :items="linkItenms"
                item-text="name"
                item-value="name"
                v-model="menuDetails.link"
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="12" lg="6" md="6">
              <div class="d-flex">
                <div
                  v-for="(role, index) in menuDetails.userrole"
                  :key="role.id"
                >
                  <span>{{ role }}</span>
                  <v-checkbox
                    v-model="menuDetails.userrole[index]"
                    :true-value="role"
                    @click="userroleCheckbox"
                  >
                  </v-checkbox>
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <div>
                <v-btn small color="primary" outlined depressed>
                  Add Sub menu
                </v-btn>
              </div>
              <v-autocomplete
                :items="menuDetails.submenu"
                item-text="name"
                item-value="item"
                multiple
              >
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-form>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import { getMenu } from "@/services/menu/menuService.js";
export default {
  name: "managemenus",
  data() {
    return {
      menus: [],
      menuDetails: null,
      linkItenms: null,
    };
  },
  created() {
    this.getMenu();
    this.linkItenms = this.$router.options.routes;
    this.linkItenms.pop();
  },
  mounted() {},
  methods: {
    userroleCheckbox(v) {
      console.log(v);
    },
    getMenu() {
      getMenu()
        .then((response) => {
          this.menus = response.data;
          this.menus.map((e) => {
            e.submenu = JSON.parse(e.submenu);
            e.userrole = JSON.parse(e.userrole);
            // e.submenu.map((u) => {
            //   u.userrole = JSON.parse(u.userrole);
            // });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showMenuDetails(id) {
      this.menuDetails = this.menus.filter((e) => e.id == id)[0];
      console.log(this.menuDetails);
    },
  },
};
</script>

<style>
</style>