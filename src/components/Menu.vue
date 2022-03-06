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

      <v-list>
        <v-list-item
          dense
          :ripple="false"
          class="no-background-hover float-right"
        >
          <!-- <v-text-field
          class="pa-0"
            v-if="!collapse"
            placeholder="search"
            clearable
            dense
            hide-details
            solo
            flat
            outlined
            rounded
            color="primary"
            autocomplete="nope"
          >
          </v-text-field> -->
          <v-btn
            depressed
            color="primary"
            small
            plain
            icon
            @click="collapseMenu()"
          >
            <v-icon dense color="primary" v-if="collapse">
              mdi-chevron-double-right
            </v-icon>
            <v-icon dense color="primary" v-else>
              mdi-chevron-double-left
            </v-icon>
          </v-btn>
        </v-list-item>
        <template v-for="menuitem in menu">
          <v-list-group
            v-if="!collapse && menuitem.submenu.length > 0"
            :key="menuitem.id"
            :value="false"
            color="primary"
            :ripple="false"
          >
            <template v-slot:activator>
              <v-list-item-title class="no-background-hover">{{
                menuitem.name
              }}</v-list-item-title>
            </template>
            <v-list-item
              v-for="submenuitem in menuitem.submenu"
              :key="submenuitem.id"
              link
              exact
              exact-active-class="active"
              :ripple="false"
              class="no-background-hover"
              :to="submenuitem.link"
            >
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

          <!-- <v-list-item
            v-else-if="collapse && menuitem.submenu.length > 0"
            v-for="submenuitem in menuitem.submenu"
            :key="submenuitem.id"
            link
            exact
            exact-active-class="active"
            :ripple="false"
            class="no-background-hover"
          >
            <v-tooltip right color="primary" v-if="collapse" :open-delay="300">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @mouseover="tooltipText = submenuitem.name"
                  icon
                  plain
                  x-small
                  depressed
                  link
                  :to="menuitem.link"
                >
                  <v-icon v-bind="attrs" v-on="on" dense color="primary">
                    {{ submenuitem.icon }}
                  </v-icon>
                </v-btn>
              </template>
              <span> {{ tooltipText }}</span>
            </v-tooltip>
          </v-list-item> -->

          <v-list-item
            v-else
            :key="menuitem.id"
            link
            exact
            exact-active-class="active"
            :ripple="false"
            class="no-background-hover"
          >
            <v-tooltip right color="primary" v-if="collapse" :open-delay="300">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-icon
                  @mouseover="tooltipText = menuitem.name"
                  class="mr-2"
                >
                  <v-btn icon plain x-small depressed link :to="menuitem.link">
                    <v-icon v-bind="attrs" v-on="on" dense color="primary">
                      {{ menuitem.icon }}
                    </v-icon>
                  </v-btn>
                </v-list-item-icon>
              </template>
              <span> {{ tooltipText }}</span>
            </v-tooltip>

            <v-list-item-content>
              <v-list-item-title>
                {{ menuitem.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- <v-list-item
            v-else-if="!menuitem.submenuid"
            :key="menuitem.id"
            link
            exact
            exact-active-class="active"
            :ripple="false"
            class="no-background-hover"
          >
            <v-tooltip right color="primary" v-if="collapse" :open-delay="300">
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
import { getMenu } from "@/services/menu/menuService.js";
export default {
  data() {
    return {
      menu: [],
      submenu: [],
      collapse: false,
      tooltipText: "",
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
    getMenu() {
      getMenu()
        .then((response) => {
          this.menu = response.data;
          this.menu.map((e) => {
            e.submenu = JSON.parse(e.submenu);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // getSubMenu(menuId) {
    //   getSubMenu({ menuId: menuId })
    //     .then((response) => {
    //       this.submenu = response.data;
    //       this.$vuetify.goTo(0, 0);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
  },
};
</script>
<style scoped>
</style>