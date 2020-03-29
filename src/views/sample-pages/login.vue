<template lang="html">
  <section class="login" style="width: 100vw">
    <div class="wrapper d-flex align-items-center auth login-full-bg">
      <div class="row w-100">
        <div class="col-lg-6 mx-auto">
          <div class="auth-form-dark text-left p-5">
            <h2>Machi Series</h2>
            <form class="pt-5">
              <form @submit.prevent="submit">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email</label>
                  <input
                    v-model="credentials.email"
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                  />
                  <i class="mdi mdi-account"></i>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Senha</label>
                  <input
                    v-model="credentials.password"
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Senha"
                  />
                  <i class="mdi mdi-eye"></i>
                </div>
                <div class="mt-5">
                  <button
                    type="submit"
                    class="btn btn-block btn-warning btn-lg font-weight-medium"
                  >
                    Login
                  </button>
                </div>
                <div class="mt-3 text-center">
                  <a
                    @click.prevent="forgot"
                    href="#"
                    class="auth-link text-white"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
              </form>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",

  data() {
    return {
      credentials: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    ...mapActions("auth", ["login"]),

    async submit() {
      try {
        await this.login(this.credentials);
        this.$router.push({ name: "dashboard" });
      } catch (err) {
        if (err.response && err.response.status === 401) {
          this.credentials.password = "";
          return this.$swal("😲", "Credenciais inválidas", "error");
        }
        console.error(err);
        this.$swal("😔", "Algo deu errado", "error");
      }
    },

    forgot() {
      this.$swal({
        text: "Escreva aqui seu email",
        content: "input",
        button: {
          text: "Pedir!",
          closeModal: false
        }
      })
        .then(email => {
          if (!email) throw null;

          return this.$axios.post("/forgot", { email });
        })
        .then(() => {
          return this.$swal("✉️", "Email de recuperação enviado!", "success");
        })
        .catch(err => {
          if (err.response && err.response.status === 404) {
            return this.$swal("😲", "Email inv'alido", "error");
          }

          this.$swal("😔", "Algo deu errado", "error");
        });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
}
</style>
