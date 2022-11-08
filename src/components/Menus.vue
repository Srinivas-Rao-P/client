<template>
  <v-row no-gutters dense ref="menu">
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

      <v-list expand>
      
        <v-list-item dense :ripple="false" class="no-background-hover float-right">
          <v-btn depressed color="primary" small plain icon @click="collapseMenu()" v-if="!isMobile">
            <v-icon dense color="primary" v-if="collapse">
              mdi-chevron-double-right
            </v-icon>
            <v-icon dense color="primary" v-else>
              mdi-chevron-double-left
            </v-icon>
          </v-btn>

          <v-btn depressed color="primary" small plain icon v-else @click="closeDrawer()">
            <v-icon dense color="primary">
              mdi-close
            </v-icon>

          </v-btn>
        </v-list-item>

        <template v-if="!collapse">

          <!-- <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-list-item-avatar>
          </v-list-item> -->

          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-h6 text-capitalize">
                {{ personInfo.name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{personInfo.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="mt-4 mb-8">          
              <v-text-field class="pa-0" placeholder="Search" clearable dense hide-details solo flat outlined small
                color="primary" autocomplete="nope" v-model="search" @click:clear="search = ''">
              </v-text-field>            
          </v-list-item>

        </template>
     
        <template v-for="menuitem in filteredMenu">
          <template v-if="!collapse">
            <v-list-group v-if="menuitem.submenu.length > 0" :key="menuitem.id" :value="search && search.toString() !== ''" color="primary"
              :ripple="false">
              <template v-slot:activator>
                <v-list-item-title class="no-background-hover">
                  {{ menuitem.name }}
                </v-list-item-title>
              </template>
              <v-list-item v-for="submenuitem in menuitem.submenu" :key="submenuitem.id" link exact
                exact-active-class="active" :ripple="false" class="no-background-hover"
                :to="{ name: submenuitem.link }">
                <v-list-item-icon class="mr-2">
                  <v-icon dense color="primary">
                    {{ submenuitem.icon }}
                  </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ submenuitem.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>

            <v-list-item v-else :key="menuitem.id" link exact exact-active-class="active" :ripple="false"
              class="no-background-hover" :to="{ name: menuitem.link }">
              <v-list-item-content>
                <v-list-item-title>
                  {{ menuitem.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template v-else>
            <v-list-item v-if="menuitem.submenu.length == 0" :key="menuitem.name" link exact dense
              exact-active-class="active" :ripple="false" class="no-background-hover" :to="{ name: menuitem.link }">
              <v-tooltip right color="primary" v-if="collapse" :open-delay="1000" transition="fade">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" dense color="primary">
                    {{ menuitem.icon }}
                  </v-icon>
                </template>
                <span> {{ menuitem.name }}</span>
              </v-tooltip>
            </v-list-item>

            <v-list-item v-else v-for="submenuitem in menuitem.submenu" :key="submenuitem.id" link exact dense
              exact-active-class="active" :ripple="false" class="no-background-hover" :to="{ name: submenuitem.link }">
              <v-tooltip right color="primary" v-if="collapse" :open-delay="1000" transition="fade">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" dense color="primary">
                    {{ submenuitem.icon }}
                  </v-icon>
                </template>
                <span> {{ submenuitem.name }}</span>
              </v-tooltip>
            </v-list-item>
          </template>

          <!-- <v-list-item
            v-else-if="!menuitem.submenuid"
            :key="menuitem.id"
            link
            exact
            exact-active-class="active"
            :ripple="false"
            class="no-background-hover"
          >
            <v-tooltip right color="primary" v-if="collapse" :open-delay="1000" transition="fade">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-icon
                  @mouseover="tooltipText = menuitem.name"
                  class="mr-2"
                  v-if="!menuitem.submenuid"
                >
                  <v-btn icon plain x-small depressed link :to="menuitem.link">
                    <v-icon v-bind="attrs" v-on="on" dense color="primary">
                      {{ menuitem.icon }}
                    </v-icon>
                  </v-btn>
                </v-list-item-icon>
                <template v-else v-for="submenuitem in menuitem.submenu">
                  <v-list-item-icon
                    @mouseover="tooltipText = submenuitem.name"
                    class="mr-2"
                    :to="submenuitem.link"
                    :key="submenuitem.id"
                  >
                    <v-btn
                      icon
                      plain
                      x-small
                      depressed
                      link
                      :to="submenuitem.link"
                    >
                      <v-icon v-bind="attrs" v-on="on" dense color="primary">
                        {{ submenuitem.icon }}
                      </v-icon>
                    </v-btn>
                  </v-list-item-icon>
                </template>
              </template>
              <span> {{ tooltipText }}</span>
            </v-tooltip>

            <v-list-item-content>
              <v-list-item-title>
                {{ menuitem.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
        </template>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { getPersonInfo } from "@/services/person/personService.js";
import { getMenu } from "@/services/menu/menuService.js";
export default {
  name: "menus",
  data() {
    return {
      menus: [],
      collapse: JSON.parse(localStorage.getItem("collapse")),
      tooltipText: "",
      search: "",
      personInfo: {},
    };
  },
  created() {
    this.getMenu();
    this.getPersonInfo();
  },
  watch: {
    isMobile: {
      handler(newValue) {
        if (newValue && this.collapse)
          this.collapseMenu();
      }
    }
  },
  methods: {
    ...mapActions(["saveMainMenu"]),
    collapseMenu() {
      this.collapse = !this.collapse;
      this.search = "";
      localStorage.setItem("collapse", this.collapse);
      this.$emit("collapse");
    },
    closeDrawer() {
      this.$emit("closeDrawer");
    },
    getMenu() {
      getMenu()
        .then((response) => {
          this.menus = response.data;
          
          this.saveMainMenu(this.menus);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPersonInfo() {
      getPersonInfo(window.personId)
        .then((response) => {
          this.personInfo = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    ...mapGetters(["isMobile","getMainMenu"]),
    filteredMenu() {
      if (!this.search?.length) {
        return this.getMainMenu;
      }
      return this.getMainMenu.map((menu) => {
        return this.search.toLowerCase().split(" ").every(v => menu.name.toLowerCase().includes(v))
          ? menu : {
            ...menu,
            submenu: menu.submenu?.filter(subMenu => this.search.toLowerCase().split(" ").every(v => subMenu.name.toLowerCase().includes(v)))
          }
      }).filter((menu) => {
        if (menu.submenu?.length)
          return menu
        else
          return this.search.toLowerCase().split(" ").every(v => menu.name.toLowerCase().includes(v))
      });
    }
  }
};
</script>
<style scoped>
</style>