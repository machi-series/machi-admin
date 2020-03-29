<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">
        {{ isEditing ? "Editando Usuário" : "Criando Usuário" }}
      </h4>

      <form @submit.prevent="submit" class="forms-sample">
        <b-form-group v-if="entity" :disabled="true" label="ID">
          <b-form-input :value="entity.id"></b-form-input>
        </b-form-group>

        <b-form-group label="Cargo">
          <b-form-select
            v-model="form.role"
            @input="dirty('role')"
            :options="$options.roleOptions"
          ></b-form-select>

          <b-form-invalid-feedback>
            {{ roleValidation.messages.join(", ") }}
          </b-form-invalid-feedback>
        </b-form-group>

        <ImageInput
          v-model="form.avatarId"
          @input="dirty('avatarId')"
          :image="entity.avatar"
          :width="200"
          :height="200"
          :params="{ width: 100, height: 100 }"
          noCircle
        />

        <b-form-group label="Nome">
          <b-form-input
            v-model="form.username"
            @input="dirty('username')"
            :state="usernameValidation.state"
          ></b-form-input>

          <b-form-invalid-feedback>
            {{ usernameValidation.messages.join(", ") }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Email">
          <b-form-input
            v-model="form.email"
            @input="dirty('email')"
            :state="emailValidation.state"
          ></b-form-input>

          <b-form-invalid-feedback>
            {{ emailValidation.messages.join(", ") }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Senha">
          <b-form-input
            type="password"
            v-model="form.password"
            @input="dirty('password')"
            :state="passwordValidation.state"
          ></b-form-input>

          <b-form-invalid-feedback>
            {{ passwordValidation.messages.join(", ") }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button
          type="submit"
          variant="success"
          class="mr-2"
          :disabled="!formValid || !formDirty"
        >
          {{ isEditing ? "Atualizar" : "Criar" }}
        </b-button>
        <b-button
          :disabled="!formDirty"
          @click.prevent="resetForm"
          variant="light"
          class="mr-2"
        >
          Reset
        </b-button>
        <b-button
          v-if="isEditing"
          @click.prevent="stopEditing"
          variant="light"
          class="mr-2"
        >
          Parar de Editar
        </b-button>
      </form>
    </div>
  </div>
</template>

<script>
import WithForm from "@/mixins/WithForm";
import ImageInput from "@/views/forms/inputs/ImageInput";
import { mapGetters, mapMutations } from "vuex";
const roles = ["user", "publisher", "manager", "admin"];

export default {
  name: "UserForm",

  components: { ImageInput },

  mixins: [
    WithForm(function defaultForm() {
      return {
        username: "",
        email: "",
        role: "user",
        password: "",
        avatarId: null
      };
    })
  ],

  createdAlertTitle: "Usuário criado",
  updatedAlertTitle: "Usuário editado",

  roles,

  roleOptions: [
    { value: "user", text: "Usuário comum" },
    { value: "publisher", text: "Publicador" },
    { value: "manager", text: "Gerente" },
    { value: "admin", text: "Administrador" }
  ],

  validateForm: {
    username(value) {
      return /^([a-z]|[0-9]|-)+$/i.test(value);
    },

    email(value) {
      if (!value.includes("@")) {
        return false;
      }
      const afterAt = value.slice(value.indexOf("@") + 1);
      if (!afterAt.includes(".")) {
        return false;
      }
      const afterDotAfterAt = afterAt.slice(afterAt.indexOf(".") + 1);
      return afterDotAfterAt.length;
    },

    password(value) {
      return value && value.length >= 5;
    }
  },

  computed: {
    ...mapGetters("auth", ["currentUser"])
  },

  methods: {
    ...mapMutations("auth", ["setUser"]),

    handleCreate(payload) {
      return this.$axios.post("/users", payload);
    },

    handleUpdate(id, payload) {
      return this.$axios.put("/users/" + id, payload).then(updated => {
        if (updated.data.id === this.currentUser.id) {
          this.setUser(updated.data);
        }
        return updated;
      });
    }
  }
};
</script>
