<template>
  <v-container fluid>
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
      <!-- <v-col cols="12" lg="9" md="9">
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
    </v-col> -->

      <v-col cols="12" lg="9" md="9">
        <v-row>
          <v-col cols="12">
            <span>Add/edit menu</span>
            <v-form ref="menu">
              <v-row>
                <v-col cols="12" lg="6" md="6">
                  <span>Name</span>
                  <span class="primary--text"> <b>*</b></span>
                  <v-text-field
                    placeholder="Menu name"
                    color="primary"
                    hide-details="auto"
                    dense
                    flat
                    outlined
                    v-model="menu.name"
                    :rules="menuNameRules"
                    autocomplete="nope"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <span>Description</span>
                  <v-text-field
                    placeholder="Menu Description"
                    color="primary"
                    hide-details
                    dense
                    flat
                    outlined
                    v-model="menu.description"
                    autocomplete="nope"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <span>Link</span>
                  <span class="primary--text"> <b>*</b></span>
                  <v-text-field
                    placeholder="Menu link"
                    color="primary"
                    hide-details="auto"
                    dense
                    flat
                    outlined
                    v-model="menu.link"
                    :rules="menuLinkRules"
                    autocomplete="nope"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <span>Icon</span>
                  <v-text-field
                    placeholder="Menu Icon"
                    color="primary"
                    hide-details
                    dense
                    flat
                    outlined
                    v-model="menu.icon"
                    autocomplete="nope"
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12">
            <span>Icon</span>
            <v-text-field
              placeholder="Menu Icon"
              color="primary"
              hide-details
              dense
              flat
              outlined
              v-model="menu.icon"
              autocomplete="nope"
            ></v-text-field>
          </v-col> -->
                <v-col cols="12">
                  <v-btn
                    color="primary"
                    @click="addMainMenu"
                    :loading="loading"
                  >
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>

          <v-col cols="12">
            <span>Add/edit submenu</span>
            <v-form ref="submenu">
              <v-row>
                <v-col cols="12">
                  <span>Main menu</span>
                  <span class="primary--text"> <b>*</b></span>
                  <v-autocomplete
                    :items="menus"
                    item-text="name"
                    item-value="id"
                    v-model="submenu.menuid"
                    placeholder="Menu"
                    hide-details="auto"
                    color="primary"
                    outlined
                    dense
                    flat
                    :rules="mainMenuRules"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <span>Name</span>
                  <span class="primary--text"> <b>*</b></span>
                  <v-text-field
                    placeholder="Menu name"
                    color="primary"
                    hide-details="auto"
                    dense
                    flat
                    outlined
                    v-model="submenu.name"
                    :rules="menuNameRules"
                    autocomplete="nope"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <span>Description</span>
                  <v-text-field
                    placeholder="Menu Description"
                    color="primary"
                    hide-details
                    dense
                    flat
                    outlined
                    v-model="submenu.description"
                    autocomplete="nope"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <span>Link</span>
                  <span class="primary--text"> <b>*</b></span>
                  <v-text-field
                    placeholder="Menu link"
                    color="primary"
                    hide-details="auto"
                    dense
                    flat
                    outlined
                    v-model="submenu.link"
                    :rules="menuLinkRules"
                    autocomplete="nope"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <span>Icon</span>
                  <v-text-field
                    placeholder="Menu Icon"
                    color="primary"
                    hide-details
                    dense
                    flat
                    outlined
                    v-model="submenu.icon"
                    autocomplete="nope"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-btn color="primary" @click="addSubMenu"> Save </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  getMenu,
  addMainMenu,
  updateSubMenu,
} from "@/services/menu/menuService.js";
export default {
  name: "managemenus",
  data() {
    return {
      menu: {
        name: "",
        description: "",
        icon: "",
        link: "",
        userrole: window.userRole,
      },
      submenu: {
        menuid: "",
        name: "",
        description: "",
        icon: "",
        link: "",
        userrole: window.userRole,
      },
      loading: false,
      userroleItems: [],
      mainMenuRules: [(v) => !!v || "PLease choose a menu"],
      menuNameRules: [(v) => !!v || "Menuname is required"],
      menuLinkRules: [(v) => !!v || "Menulink is required"],
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
      this.menu = this.menus.filter((e) => e.id == id)[0];
    },

    addMainMenu() {
      if (this.$refs.menu.validate()) {
        this.loading = true;
        addMainMenu(this.menu)
          .then((response) => {
            this.$refs.menu.reset();
            this.loading = false;
            this.$toast.success(response.data.message);
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      }
    },

    addSubMenu() {
      if (this.$refs.submenu.validate()) {
        const mainMenu = this.menus.filter((menu) => {
          return menu.id == this.submenu.menuid;
        })[0];
        mainMenu.submenu.push(this.submenu);
        updateSubMenu(this.submenu.menuid, mainMenu.submenu)
          .then((response) => {
            this.$refs.submenu.reset();
            this.$toast.success(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
</style>