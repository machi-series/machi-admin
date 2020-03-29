<template lang="html">
  <section v-if="isLoggedIn" class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item nav-profile">
          <div class="nav-link">
            <div class="profile-image">
              <img :src="currentUser | avatar" alt="image" />
              <span class="online-status online"></span>
            </div>
            <div class="profile-name">
              <p class="name">{{ currentUser.username }}</p>
              <p class="designation">{{ currentUser.role | translateRole }}</p>
            </div>
          </div>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/"
            ><img
              class="menu-icon"
              src="../../assets/images/menu_icons/01.png"
              alt="menu icon"
            /><span class="menu-title">Dashboard</span></router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/users">
            <i class="mdi mdi-account-multiple menu-icon"></i>
            <span class="menu-title">Usuários</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/series">
            <i class="mdi mdi-laptop menu-icon"></i>
            <span class="menu-title">Séries</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/tags">
            <i class="mdi mdi-folder-multiple-outline menu-icon"></i>
            <span class="menu-title">Tags</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AppSidebar",

  computed: {
    ...mapGetters("auth", ["isLoggedIn", "currentUser"])
  }
};
</script>

<style scoped lang="scss">
.app-sidebar {
}
</style>
