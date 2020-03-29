<template lang="html">
  <section v-if="isLoggedIn" class="app-footer">
    <footer class="footer">
      <div class="container-fluid clearfix">
        <span
          class="text-muted d-block text-center text-sm-left d-sm-inline-block"
          >Machi Series. Copyright © {{ new Date().getFullYear() }}
          <a href="https://www.github.com/lubien" target="_blank">
            <i class="mdi mdi-github-circle"></i> Lubien </a
          >. All rights reserved.</span
        >
      </div>
    </footer>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppFooter",

  computed: {
    ...mapGetters("auth", ["isLoggedIn"])
  }
};
</script>

<style scoped lang="scss">
.app-footer {
}
</style>
