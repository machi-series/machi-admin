<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">
        {{ isEditing ? "Editando Série" : "Criando Série" }}
      </h4>

      <form @submit.prevent="submit" class="forms-sample">
        <template v-if="entity">
          <b-form-group :disabled="true" label="ID">
            <b-form-input :value="entity.id"></b-form-input>
          </b-form-group>

          <b-form-group v-if="entity.author" :disabled="true" label="Autor">
            <b-form-input :value="entity.author.username"></b-form-input>
          </b-form-group>

          <b-form-group
            v-if="entity.editingBy"
            :disabled="true"
            label="Ultima edição por"
          >
            <b-form-input :value="entity.editingBy.username"></b-form-input>
          </b-form-group>
        </template>

        <b-form-group label="Status">
          <b-form-select
            v-model="form.status"
            @input="dirty('status')"
            :options="$options.statusOptions"
          ></b-form-select>

          <b-form-invalid-feedback>
            {{ statusValidation.messages.join(", ") }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Título">
          <b-form-input
            v-model="form.title"
            @input="dirty('title')"
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

        <b-form-group label="Sinópse">
          <b-form-textarea
            id="textarea"
            v-model="form.synopsis"
            @input="dirty('synopsis')"
            :rows="2"
            :max-rows="3"
          ></b-form-textarea>

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

const status = ["draft", "published", "deleted", "revision"];
export default {
  name: "SeriesForm",

  mixins: [
    WithForm(function defaultForm() {
      return {
        title: "",
        slug: "",
        synopsis: "",
        status: "draft"
      };
    })
  ],

  createdAlertTitle: "Série criada",
  updatedAlertTitle: "Série editada",

  validateForm: {
    slug(value) {
      return /^([a-z]|-|\d)+$/.test(value);
    },

    status(value) {
      return status.includes(value);
    }
  },

  statusOptions: [
    { value: "draft", text: "Rascunho" },
    { value: "published", text: "Publicado" },
    { value: "deleted", text: "Deletado" }
  ],

  computed: {
    ...mapGetters("auth", ["currentUser"])
  },

  methods: {
    handleCreate(payload) {
      const additionalFields = {
        authorId: this.currentUser.id
      };
      return this.$axios.post("/series", { ...payload, ...additionalFields });
    },

    handleUpdate(id, payload) {
      const additionalFields = {
        editingById: this.currentUser.id
      };
      return this.$axios.put("/series/" + id, {
        ...payload,
        ...additionalFields
      });
    }
  }
};
</script>

<style></style>
