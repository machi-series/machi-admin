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
            v-if="entity.editedBy"
            :disabled="true"
            label="Ultima edição por"
          >
            <b-form-input :value="entity.editedBy.username"></b-form-input>
          </b-form-group>
        </template>

        <b-form-group label="Status">
          <StatusInput v-model="form.status" @input="dirty('status')" />

          <b-form-invalid-feedback>
            {{ statusValidation.messages.join(", ") }}
          </b-form-invalid-feedback>
        </b-form-group>

        <ImageInput
          v-model="form.coverId"
          @input="dirty('coverId')"
          :image="entity.cover"
          :width="220"
          :height="320"
          :params="{ width: 220 }"
          noCircle
        />

        <div
          v-if="coverIdValidation.messages.length"
          class="invalid-feedback mb-2"
          style="display: block"
        >
          {{ coverIdValidation.messages.join(", ") }}
        </div>

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

        <TagsInput
          v-model="form.tags"
          :tags="entity ? entity.tags : []"
          @input="dirty('tags')"
        />

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
import StatusInput from "@/views/forms/inputs/StatusInput";
import ImageInput from "@/views/forms/inputs/ImageInput";
import TagsInput from "@/views/forms/inputs/TagsInput";
import { mapGetters } from "vuex";

const status = ["draft", "published", "deleted", "revision"];
export default {
  name: "SeriesForm",

  mixins: [
    WithForm(function defaultForm(entity = {}) {
      return {
        coverId: null,
        title: "",
        slug: "",
        synopsis: "",
        status: "draft",
        tags: entity.tags ? entity.tags.map(t => t.id) : []
      };
    })
  ],

  components: { StatusInput, ImageInput, TagsInput },

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
        editedById: this.currentUser.id
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
