<template>
  <v-app dark>
    <v-app-bar
      elevation="1"
      app
      dense
      fixed
      flat
      v-if="showMenuHeader"
      color="white"
      clipped-left
    >
      <v-app-bar-nav-icon
        class="d-lg-none"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <Header />
    </v-app-bar>

    <v-navigation-drawer
      app
      v-model="drawer"
      class="navigation-drawer"
      :mini-variant="miniVariant"
      clipped
      v-if="showMenuHeader"
    >
      <Menu @collapse="miniVariant = !miniVariant" />
    </v-navigation-drawer>

    <v-main id="main" class="honeydew">
      <v-container fluid :class="showMenuHeader ? '' : 'fill-height'">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import Menu from "@/components/Menu";
import Header from "@/components/Header";
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      miniVariant: false,
    };
  },
  components: {
    Menu,
    Header,
  },
  created() {
    this.drawer = !this.isMobile;
  },
  computed: {
    activeSession() {
      return this.$store.state.activeSession;
    },
    isMobile() {
      if (window.innerWidth < 720) {
        return true;
      } else {
        return false;
      }
    },
    showMenuHeader() {
      if (
        this.$route.name &&
        !["login", "register"].includes(this.$route.name)
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    redirectToLogin() {
      this.$router.push({ name: "login" });
    },
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
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.no-background-hover::before {
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
