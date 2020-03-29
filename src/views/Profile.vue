<template>
  <section class="login">
    <div class="wrapper d-flex align-items-center auth login-full-bg">
      <div class="row w-100">
        <div class="col-lg-6 mx-auto">
          <div class="auth-form-dark text-left p-5">
            <h2>Perfil</h2>

            <UserForm
              :entity="currentUser"
              :use-card="false"
              :show-title="false"
              :is-profile="true"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserForm from "@/views/forms/UserForm.vue";
import { mapGetters } from "vuex";

export default {
  name: "Profile",

  components: {
    UserForm
  },

  computed: {
    ...mapGetters("auth", ["currentUser"])
  }
};
</script>

<style></style>
