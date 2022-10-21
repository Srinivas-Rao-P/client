<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" lg="3" md="3">
        <div>Main menu</div>
        <v-list>
          <v-list-item v-for="menu in menus" :key="menu.id" :ripple="false" class="no-background-hover">
            <v-list-item-content>
              <v-list-item-title @click="computeMenu(menu.id)">
                {{ menu.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12" lg="9" md="9">
        <v-row>
          <v-col cols="12">
            <span>Add/edit menu</span>
            <v-form ref="menu">
              <v-row>
                <v-col cols="12" lg="6" md="6">
                  <span>Name</span>
                  <span class="primary--text"> <b>*</b></span>
                  <v-text-field placeholder="Menu name" color="primary" hide-details="auto" dense flat outlined
                    v-model="menu.name" :rules="menuNameRules" autocomplete="nope"></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <span>Description</span>
                  <v-text-field placeholder="Menu Description" color="primary" hide-details dense flat outlined
                    v-model="menu.description" autocomplete="nope"></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <span>Link</span>
                  <span class="primary--text"> <b>*</b></span>
                  <v-text-field placeholder="Menu link" color="primary" hide-details="auto" dense flat outlined
                    v-model="menu.link" autocomplete="nope"></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <span>Icon</span>
                  <v-text-field placeholder="Menu Icon" color="primary" hide-details dense flat outlined
                    v-model="menu.icon" autocomplete="nope"></v-text-field>
                </v-col>
                <template v-if="!menu.link">
                  <v-col cols="3">
                    <v-row v-for="submenu in menu.submenu" :key="submenu.id">
                      <v-col cols="12" @click="computeSubMenu(submenu.id)">
                        {{submenu.name}}
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="9">
                    <v-row>
                      <v-col cols="12" lg="7">
                        <span>Name</span>
                        <span class="primary--text"> <b>*</b></span>
                        <v-text-field placeholder="Menu name" color="primary" hide-details="auto" dense flat outlined
                          v-model="submenu.name" :rules="menuNameRules" autocomplete="nope"></v-text-field>
                      </v-col>
                      <v-col cols="12" lg="7">
                        <span>Description</span>
                        <v-text-field placeholder="Menu Description" color="primary" hide-details dense flat outlined
                          v-model="submenu.description" autocomplete="nope"></v-text-field>
                      </v-col>
                      <v-col cols="12" lg="7">
                        <span>Link</span>
                        <span class="primary--text"> <b>*</b></span>
                        <v-text-field placeholder="Menu link" color="primary" hide-details="auto" dense flat outlined
                          v-model="submenu.link" autocomplete="nope"></v-text-field>
                      </v-col>
                      <v-col cols="12" lg="7">
                        <span>Icon</span>
                        <v-text-field placeholder="Menu Icon" color="primary" hide-details dense flat outlined
                          v-model="submenu.icon" autocomplete="nope"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </template>
              </v-row>
            </v-form>
          </v-col>
          <!-- 
          <v-col cols="12">
           
            <v-form ref="submenu">
              <v-row>
                <v-col cols="12">
                  <span class="primary--text"> <b>*</b></span>
                  <v-autocomplete :items="menus" item-text="name" item-value="id" v-model="submenu.id"
                    placeholder="Menu" hide-details="auto" color="primary" outlined dense flat :rules="mainMenuRules">
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <span>Name</span>
                  <span class="primary--text"> <b>*</b></span>
                  <v-text-field placeholder="Menu name" color="primary" hide-details="auto" dense flat outlined
                    v-model="submenu.name" :rules="menuNameRules" autocomplete="nope"></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <span>Description</span>
                  <v-text-field placeholder="Menu Description" color="primary" hide-details dense flat outlined
                    v-model="submenu.description" autocomplete="nope"></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <span>Link</span>
                  <span class="primary--text"> <b>*</b></span>
                  <v-text-field placeholder="Menu link" color="primary" hide-details="auto" dense flat outlined
                    v-model="submenu.link" :rules="menuLinkRules" autocomplete="nope"></v-text-field>
                </v-col>
                <v-col cols="12" lg="6" md="6">
                  <span>Icon</span>
                  <v-text-field placeholder="Menu Icon" color="primary" hide-details dense flat outlined
                    v-model="submenu.icon" autocomplete="nope"></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-btn color="primary" @click="addSubMenu"> Save </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col> -->

          <v-col cols="12">
            <v-btn color="primary" @click="saveMenu">
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  getMenu,
  saveMenu
} from "@/services/menu/menuService.js";
export default {
  name: "managemenus",
  data() {
    return {
      menu: {
        id: "",
        name: "",
        description: "",
        icon: "",
        link: "",
        userrole: window.userRole,
        submenu: [],
      },
      userroleItems: [],
      mainMenuRules: [(v) => !!v || "PLease choose a menu"],
      menuNameRules: [(v) => !!v || "Menuname is required"],
      menuLinkRules: [(v) => !!v || "Menulink is required"],
      menus: [],
      submenu: [],
      menuDetails: null,
      linkItenms: null,
    };
  },
  created() {
    this.getMenu();
    this.linkItenms = this.$router.options.routes;
    this.linkItenms.pop();
  },
  mounted() { },
  methods: {
    computeMenu(menuId) {
      this.menu = this.menus.filter(menu => menu.id === menuId)[0];
    },
    computeSubMenu(submenuId) {
      this.submenu = this.menu.submenu.filter(submenu => submenu.id === submenuId)[0];
    },
    userroleCheckbox(v) {
      console.log(v);
    },
    getMenu() {
      getMenu()
        .then((response) => {
          this.menus = response.data;         
        })
        .catch((error) => {
          console.log(error);
        });
    },

    saveMenu() {
     
      if (this.$refs.menu.validate()) {
        saveMenu(this.menu.id, this.menu)
          .then((response) => {
            // this.$refs.menu.reset();
            this.$toast.success(response.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  },
};
</script>

<style>

</style>