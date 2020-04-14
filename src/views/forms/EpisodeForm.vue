<template>
  <div class="row">
    <div class="col-lg-6 grid-margin">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">
            {{ isEditing ? "Editando Episódio" : "Criando Episódio" }}
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

            <b-form-group label="Mostrar lançamento" class="mt-2">
              <b-form-checkbox
                v-model="form.ignoreIndex"
                @input="dirty('ignoreIndex')"
                :value="false"
                :unchecked-value="true"
              >
                <div class="pt-1">
                  Este episódio <b>aparecerá</b> na página inicial
                </div>
              </b-form-checkbox>

              <b-form-invalid-feedback>
                {{ ignoreIndexValidation.messages.join(", ") }}
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

            <b-form-group label="Número">
              <b-form-input
                v-model="form.number"
                @input="dirty('number')"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Tipo">
              <EpisodeTypeInput v-model="form.type" @input="dirty('type')" />

              <b-form-invalid-feedback>
                {{ typeValidation.messages.join(", ") }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Qualidade">
              <EpisodeQualityInput
                v-model="form.quality"
                @input="dirty('quality')"
              />

              <b-form-invalid-feedback>
                {{ qualityValidation.messages.join(", ") }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Fonte">
              <b-form-input
                v-model="form.source"
                @input="dirty('source')"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ sourceValidation.messages.join(", ") }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Prioridade de ordenação especial">
              <b-form-input
                type="number"
                v-model="form.priority"
                @input="dirty('priority')"
                :state="priorityValidation.state"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ priorityValidation.messages.join("\n") }}
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

    <div class="col-lg-6 gird-margin">
      <ImageInput
        v-model="form.coverId"
        @input="dirty('coverId')"
        :image="entity.cover"
        :allowAllSizes="true"
        :params="{ width: 330, height: 180 }"
        noCircle
      />

      <div
        v-if="coverIdValidation.messages.length"
        class="invalid-feedback mb-2"
        style="display: block"
      >
        {{ coverIdValidation.messages.join(", ") }}
      </div>

      <div class="card mt-4">
        <div class="card-body">
          <LinksInput v-model="form.links" @input="dirty('links')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WithForm from "@/mixins/WithForm";
import StatusInput from "@/views/forms/inputs/StatusInput";
import ImageInput from "@/views/forms/inputs/ImageInput";
import LinksInput from "@/views/forms/inputs/LinksInput";
import EpisodeQualityInput from "@/views/forms/inputs/EpisodeQualityInput";
import EpisodeTypeInput from "@/views/forms/inputs/EpisodeTypeInput";
import { mapGetters } from "vuex";
import slugify from "slugify";

const status = ["draft", "published", "deleted", "revision"];
const episodeTypes = ["episode", "ova", "movie", "special"];
const episodeQualities = ["bluray", "hdtv", "dvd"];

export default {
  name: "EpisodeForm",

  slugify,

  mixins: [
    WithForm(function defaultForm() {
      return {
        coverId: null,
        title: "",
        slug: "",
        status: "draft",
        ignoreIndex: false,
        number: "",
        source: "",
        priority: 0,
        links: {
          low: [],
          medium: [],
          high: [],
          online: []
        },
        type: "episode",
        quality: "hdtv"
      };
    })
  ],

  components: {
    StatusInput,
    ImageInput,
    LinksInput,
    EpisodeQualityInput,
    EpisodeTypeInput
  },

  createdAlertTitle: "Episódio criado",
  updatedAlertTitle: "Episódio editado",

  validateForm: {
    slug(value) {
      return /^([a-z]|-|\d)+$/.test(value);
    },

    status(value) {
      return status.includes(value);
    },

    type(value) {
      return episodeTypes.includes(value);
    },

    quality(value) {
      return episodeQualities.includes(value);
    }
  },

  props: {
    series: Object
  },

  computed: {
    ...mapGetters("auth", ["currentUser", "isManager"])
  },

  methods: {
    handleCreate(payload) {
      const additionalFields = {
        authorId: this.currentUser.id,
        seriesId: this.series.id
      };
      return this.$axios.post("/episodes", { ...payload, ...additionalFields });
    },

    handleUpdate(id, payload) {
      const additionalFields = {
        editedById: this.currentUser.id
      };
      return this.$axios.put("/episodes/" + id, {
        ...payload,
        ...additionalFields
      });
    },

    handleDelete(id) {
      return this.$axios.delete("/episodes/" + id);
    }
  }
};
</script>
