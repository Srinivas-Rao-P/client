<template>
  <v-app>
    <v-navigation-drawer
      class="navigation-drawer"
      app
      permanent
      v-if="showMenuHeader && !isMobile"
    >
      <Menu />
    </v-navigation-drawer>

    <v-app-bar app dense fixed flat v-if="showMenuHeader">
      <Header />
    </v-app-bar>

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
    return { dialog: true };
  },
  components: {
    Menu,
    Header,
  },
  computed: {
    activeSession() {
      return this.$store.state.activeSession;
    },
    isMobile() {
      if (window.innerWidth < 720) {
        return true;
      }
      return false;
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
a.active {
  color: indianred !important;
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
