<template>
  <div class="row">
    <div class="col-lg-12 grid-margin pt-0">
      <ImageInput
        v-model="form.coverId"
        @input="dirty('coverId')"
        :image="entity.cover"
        :params="{ width: 640, height: 360 }"
        :allowAllSizes="true"
        noCircle
      />

      <div
        v-if="coverIdValidation.messages.length"
        class="invalid-feedback mb-2"
        style="display: block"
      >
        {{ coverIdValidation.messages.join("\n") }}
      </div>
    </div>
    <div class="col-lg-12 grid-margin">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">
            {{ isEditing ? "Editando Notícia" : "Criando Notícia" }}
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
                {{ statusValidation.messages.join("\n") }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Título">
              <b-form-input
                v-model="form.title"
                @input="dirty('title')"
                @blur="
                  {
                    if (!isDirty.slug && !form.slug.length) {
                      form.slug = $options.slugify(form.title, { lower: true });
                    }
                  }
                "
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ titleValidation.messages.join("\n") }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Slug">
              <b-form-input
                v-model="form.slug"
                @input="dirty('slug')"
                :state="slugValidation.state"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ slugValidation.messages.join("\n") }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Prioridade" class="mt-2">
              <b-form-checkbox
                v-model="form.priority"
                @input="dirty('priority')"
                :value="true"
                :unchecked-value="false"
              >
                <div class="pt-1">
                  Esta notícia <b>aparecerá</b> na página inicial
                </div>
              </b-form-checkbox>

              <b-form-invalid-feedback>
                {{ priorityValidation.messages.join(", ") }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Conteúdo">
              <quill-editor
                ref="myQuillEditor"
                v-model="form.content"
                :options="{ placeholder: '...' }"
                @input="dirty('content')"
              />

              <b-form-invalid-feedback>
                {{ contentValidation.messages.join("\n") }}
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
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WithForm from "@/mixins/WithForm";
import StatusInput from "@/views/forms/inputs/StatusInput";
import ImageInput from "@/views/forms/inputs/ImageInput";
import { mapGetters } from "vuex";
import slugify from "slugify";
import { quillEditor } from "vue-quill-editor";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

const status = ["draft", "published", "deleted", "revision"];
export default {
  name: "SeriesForm",

  slugify,

  mixins: [
    WithForm(function defaultForm() {
      const defaults = {
        coverId: null,
        title: "",
        slug: "",
        content: "",
        priority: false,
        status: "draft"
      };

      return defaults;
    })
  ],

  components: {
    StatusInput,
    ImageInput,
    quillEditor
  },

  createdAlertTitle: "Notícia criada",
  updatedAlertTitle: "Notícia editada",

  validateForm: {
    slug(value) {
      return /^([a-z]|-|\d)+$/.test(value);
    },

    status(value) {
      return status.includes(value);
    }
  },

  computed: {
    ...mapGetters("auth", ["currentUser", "isManager"])
  },

  methods: {
    handleCreate(payload) {
      const additionalFields = {
        authorId: this.currentUser.id
      };
      return this.$axios.post("/news", { ...payload, ...additionalFields });
    },

    handleUpdate(id, payload) {
      const additionalFields = {
        editedById: this.currentUser.id
      };
      return this.$axios.put("/news/" + id, {
        ...payload,
        ...additionalFields
      });
    },

    handleDelete(id) {
      return this.$axios.delete("/news/" + id);
    }
  }
};
</script>

<style></style>
