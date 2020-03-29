<template lang="html">
  <b-navbar
    v-if="isLoggedIn"
    class="fixed-top"
    toggleable="md"
    type="dark"
    variant="info"
  >
    <div
      class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center"
    >
      <router-link to="/" class="navbar-brand brand-logo">
        <img src="../../assets/logo.png" alt="logo" />
      </router-link>
      <router-link to="/" class="navbar-brand brand-logo-mini">
        <img src="../../assets/logo-mini.png" alt="logo" />
      </router-link>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-center ml-auto ml-lg-0">
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right class="preview-list">
          <template slot="button-content">
            <img
              :src="currentUser | avatar"
              alt="profile image"
              class="img-xs rounded-circle"
            />
          </template>
          <b-dropdown-item
            @click.prevent="
              () => {
                $router.push({ name: 'profile' });
              }
            "
            href="#"
            class="preview-item flex-wrap"
          >
            Profile
          </b-dropdown-item>
          <b-dropdown-item
            @click.prevent="
              () => {
                logout();
                $router.push({ name: 'login' });
              }
            "
            href="#"
            class="preview-item flex-wrap"
          >
            Signout
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <button
        class="navbar-toggler navbar-toggler-right align-self-center"
        type="button"
        @click="collapedMobileSidebar()"
      >
        <span class="mdi mdi-menu"></span>
      </button>
    </div>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AppHeader",

  computed: {
    ...mapGetters("auth", ["isLoggedIn", "currentUser"])
  },

  methods: {
    ...mapActions("auth", ["logout"]),
    collapedMobileSidebar: () => {
      document.querySelector(".sidebar").classList.toggle("active");
    }
  }
};
</script>

<style scoped lang="scss">
.app-header {
}
</style>
