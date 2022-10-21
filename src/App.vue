<template>
  <v-app dark>
    <v-app-bar elevation="1" app dense fixed flat v-if="showMenuHeader" color="white" clipped-left>
      <v-app-bar-nav-icon class="d-lg-none" @click="drawer = true"></v-app-bar-nav-icon>
      <Header />
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" :value="drawer" class="navigation-drawer" :mini-variant="miniVariant"
      clipped touchless fixed :width="sidebarWidth" v-if="showMenuHeader">
      <Menus @collapse="miniVariant = !miniVariant" @closeDrawer="drawer = false" />
    </v-navigation-drawer>

    <v-overlay :value="getSpinner" opacity="0.5" color="white">
      <v-progress-circular indeterminate color="primary" size="40">
      </v-progress-circular>
    </v-overlay>

    <v-main app id="main" class="honeydew">
      <v-container fluid :class="showMenuHeader ? '' : 'fill-height'">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>

    <v-footer app elevation="5" fixed>
      <v-card class="flex" flat tile color="transparent">
        <v-card-text class="text-center pa-0">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import Menus from "@/components/Menus";
import Header from "@/components/Header";
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      isMobile: false,
      miniVariant: JSON.parse(localStorage.getItem("collapse")),
    };
  },
  components: {
    Menus,
    Header,
  },
  created() {
    this.onResize()
    this.drawer = !this.isMobile;
  },
  computed: {
    ...mapGetters(["getSpinner"]),
    sidebarWidth() {
      if (this.isMobile) {
        return "100%"
      }
      return 300;
    },
    activeSession() {
      return this.$store.state.activeSession;
    },
    showMenuHeader() {
      return this.$route.name &&
        !["login", "resetpassword", "register", "candidatelogin"].includes(this.$route.name)
    },
  },
  methods: {
    redirectToLogin() {
      this.$router.push({ name: "login" });
    },
    onResize() {
      if (window.innerWidth < 720) {
        this.$store.dispatch("setMobile", true);
        this.isMobile = true;
      } else {
        this.$store.dispatch("setMobile", false);
        this.isMobile = false;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize, { passive: true })
  },
  beforeDestroy() {
    if (typeof window === "undefined") return
    window.removeEventListener("resize", this.onResize, { passive: true })
  },
};
</script>

<style>
/* *{  
  text-transform: capitalize;
} */
/* Hide scrollbar for Chrome, Safari and Opera */
.v-navigation-drawer__content::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.v-navigation-drawer__content {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.no-background-hover:before,
.v-list-item--link:before {
  background-color: transparent !important;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}

a:hover,
a.active,
b {
  color: #195f73 !important;
}

a.active {
  font-weight: bold;
}

@media only screen and (min-width: 600px) {

  .Vue-Toastification__container.top-right,
  .Vue-Toastification__container.bottom-right {
    right: 0em !important;
  }

  .Vue-Toastification__container.top-left,
  .Vue-Toastification__container.top-right,
  .Vue-Toastification__container.top-center {
    top: 3em !important;
  }
}
</style>
