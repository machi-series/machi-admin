<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">
        {{ isEditing ? "Editando tag" : "Criando Tag" }}
      </h4>

      <form @submit.prevent="submit" class="forms-sample">
        <b-form-group v-if="entity" :disabled="true" label="ID">
          <b-form-input :value="entity.id"></b-form-input>
        </b-form-group>

        <b-form-group label="Nome">
          <b-form-input
            v-model="form.name"
            @input="dirty('name')"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Slug">
          <b-form-input
            v-model="form.slug"
            @input="dirty('slug')"
            :state="slugValidation.state"
          ></b-form-input>

          <b-form-invalid-feedback>
            {{ slugValidation.messages.join(", ") }}
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
          v-if="isEditing && isManager"
          @click.prevent="confirmDelete"
          variant="danger"
          class="mr-2"
        >
          Deletar
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
import { mapGetters } from "vuex";

export default {
  name: "TagForm",

  mixins: [
    WithForm(function defaultForm() {
      return {
        name: "",
        slug: ""
      };
    })
  ],

  createdAlertTitle: "Tag criada",
  updatedAlertTitle: "Tag editada",

  validateForm: {
    slug(value) {
      return /^([a-z]|-|\d)+$/.test(value);
    }
  },

  computed: {
    ...mapGetters("auth", ["isManager"])
  },

  methods: {
    handleCreate(payload) {
      return this.$axios.post("/tags", payload);
    },

    handleUpdate(id, payload) {
      return this.$axios.put("/tags/" + id, payload);
    },

    handleDelete(id) {
      return this.$axios.delete("/tags/" + id);
    }
  }
};
</script>

<style></style>
