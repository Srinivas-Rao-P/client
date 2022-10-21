<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <div class="pt-lg-5">
          <div class="primary--text">
            Your Personalised
          </div>
          <div class="primary--text">
            Dashboard
          </div>

        </div>
      </v-col>
      <v-col cols="12">
        <div class="main">
          <grid-layout :layout.sync="layout" :col-num="12" :row-height="1" :is-draggable="draggable"
            :is-resizable="resizable" :responsive="responsive" :margin="[12, 12]" :vertical-compact="true"
            :use-css-transforms="true" @layout-updated="saveLayout">

            <grid-item v-for="item in computedLayout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
              :key="item.i" drag-allow-from=".tile-header-drag" drag-ignore-from=".no-drag">
             
              <component :is="fetchComponent(item.component)" @delete="deletePanel(item.i)"
                v-bind={tileTitle:item.title,link:item.link}>
              </component>

            </grid-item>
          </grid-layout>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <!-- <v-btn color="primary" @click="refreshToken">refreshToken </v-btn> -->
</template>
<script>
import sessionService from "@/services/session/sessionService";
import VueGridLayout from 'vue-grid-layout';
import TimeEntries from "@/components/tile/TimeEntries.vue";
import DefaultTile from "@/components/tile/Index.vue";
import { mapGetters } from "vuex";
export default {
  name: "home",
  data() {
    return {
      layout: [
        { "x": 0, "y": 0, "w": 2, "h": 20, "i": "0", "moved": false, component:"timeEntries" },
        { "x": 2, "y": 0, "w": 2, "h": 10, "i": "1", "moved": false },
        { "x": 6, "y": 0, "w": 2, "h": 20, "i": "3", "moved": false },
        { "x": 4, "y": 0, "w": 2, "h": 10, "i": "2", "moved": false },
        { "x": 8, "y": 0, "w": 2, "h": 10, "i": "4", "moved": false },
        { "x": 0, "y": 20, "w": 2, "h": 20, "i": "5", "moved": false },
        { "x": 2, "y": 10, "w": 2, "h": 20, "i": "6", "moved": false },
        { "x": 4, "y": 10, "w": 2, "h": 10, "i": "7", "moved": false },
        { "x": 8, "y": 10, "w": 2, "h": 10, "i": "8", "moved": false },
        { "x": 2, "y": 30, "w": 2, "h": 10, "i": "9", "moved": false },
        { "x": 4, "y": 20, "w": 4, "h": 20, "i": "10", "moved": false },
        { "x": 8, "y": 20, "w": 2, "h": 20, "i": "11", "moved": false }
      ],
      draggable: true,
      resizable: false,
      responsive: true,
      index: 0
    }
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    timeEntries: TimeEntries,
    defaultTile: DefaultTile,
  },
  methods: {
    fetchComponent(companentName) {
      if (companentName in this.$options.components)
        return companentName;

      return this.$options.components.defaultTile;

    },

    refreshToken() {
      sessionService.refreshToken();
    },
    saveLayout() {
      // console.log(JSON.stringify(this.layout));
    },

    deletePanel(itemId) {
      this.layout = this.layout.filter(e => e.i !== itemId).map((e, i) => {
        e.i = i;
        return e
      })
    },
  },

  computed: {
    ...mapGetters(["isMobile", "getMainMenu"]),
    computedLayout() {
      return this.layout
      // getMainMenu
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vue-grid-item.vue-grid-placeholder {
  background: green;
}

/* .vue-grid-layout { */
/* background: #eee; */
/* } */

.vue-grid-item:not(.vue-grid-placeholder) {
  /* background: #ccc; */
  border: 2px solid transparent;
}

.vue-grid-item .resizing {
  opacity: 0.9;
}

.vue-grid-item .static {
  background: #cce;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
</style>