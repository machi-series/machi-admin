<template>
  <div class="row">
    <div class="col-lg-6 grid-margin">
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
                {{ statusValidation.messages.join("\n") }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Tipo">
              <SeriesTypeInput v-model="form.type" @input="dirty('type')" />

              <b-form-invalid-feedback>
                {{ typeValidation.messages.join("\n") }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Título">
              <b-form-input
                v-model="form.title"
                @input="dirty('title')"
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

            <b-form-group label="Sinópse">
              <b-form-textarea
                id="textarea"
                v-model="form.synopsis"
                @input="dirty('synopsis')"
                :rows="3"
                :max-rows="10"
              ></b-form-textarea>

              <b-form-invalid-feedback>
                {{ slugValidation.messages.join("\n") }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Episódios">
              <b-form-input
                type="number"
                v-model="form.episodeCount"
                @input="dirty('episodeCount')"
                :state="episodeCountValidation.state"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ episodeCountValidation.messages.join("\n") }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Ano">
              <b-form-input
                type="number"
                v-model="form.year"
                @input="dirty('year')"
                :state="yearValidation.state"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ yearValidation.messages.join("\n") }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Data de lançamento">
              <b-form-input
                v-model="form.releaseDate"
                @input="dirty('releaseDate')"
                :state="releaseDateValidation.state"
                placeholder="dd/mm/AAAA"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ releaseDateValidation.messages.join("\n") }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Trailer">
              <b-form-input
                v-model="form.trailer"
                @input="dirty('trailer')"
                :state="trailerValidation.state"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ trailerValidation.messages.join("\n") }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Produtor">
              <b-form-input
                v-model="form.producer"
                @input="dirty('producer')"
                :state="producerValidation.state"
              ></b-form-input>

              <b-form-invalid-feedback>
                {{ producerValidation.messages.join("\n") }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Classificação">
              <ClassificationInput
                v-model="form.classification"
                @input="dirty('classification')"
              />

              <b-form-invalid-feedback>
                {{ classificationValidation.messages.join("\n") }}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Status de lançamento">
              <ReleaseStatusInput
                v-model="form.releaseStatus"
                @input="dirty('releaseStatus')"
              />

              <b-form-invalid-feedback>
                {{ releaseStatusValidation.messages.join("\n") }}
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
    <div class="col-lg-6 grid-margin pt-0">
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
        {{ coverIdValidation.messages.join("\n") }}
      </div>

      <div class="card mt-4">
        <div class="card-body">
          <TagsInput
            v-model="form.tags"
            :tags="entity ? entity.tags : []"
            @input="dirty('tags')"
          />
        </div>
        <div
          v-if="tagsValidation.messages.length"
          class="invalid-feedback mb-4 ml-4"
          style="display: block"
        >
          {{ tagsValidation.messages.join("\n") }}
        </div>
      </div>

      <b-card title="Relacionamentos" class="mt-4 mb-4">
        <RelationsInput
          v-model="form.relatedSeries"
          @input="dirty('relatedSeries')"
        />

        <b-form-invalid-feedback>
          {{ relatedSeriesValidation.messages.join("\n") }}
        </b-form-invalid-feedback>
      </b-card>

      <b-card title="Transmissão" class="mt-4 mb-4">
        <b-form-group label="Hora de lançamento">
          <b-form-input
            v-model="form.releaseTime"
            @input="dirty('releaseTime')"
            :state="releaseTimeValidation.state"
            placeholder="hh:mm"
          ></b-form-input>

          <b-form-invalid-feedback>
            {{ releaseTimeValidation.messages.join("\n") }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Dia da semana de lançamento">
          <b-form-select
            v-model="form.weekDay"
            :options="$options.weekDayOptions"
            @input="dirty('weekDay')"
            :state="weekDayValidation.state"
          ></b-form-select>

          <b-form-invalid-feedback>
            {{ weekDayValidation.messages.join("\n") }}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group label="Duração de um episódio">
          <b-form-input
            type="number"
            v-model="form.episodeDuration"
            @input="dirty('episodeDuration')"
            :state="episodeDurationValidation.state"
          ></b-form-input>

          <b-form-invalid-feedback>
            {{ episodeDurationValidation.messages.join("\n") }}
          </b-form-invalid-feedback>
        </b-form-group>
      </b-card>

      <slot name="after-sidebar"></slot>
    </div>
  </div>
</template>

<script>
import WithForm from "@/mixins/WithForm";
import StatusInput from "@/views/forms/inputs/StatusInput";
import ImageInput from "@/views/forms/inputs/ImageInput";
import TagsInput from "@/views/forms/inputs/TagsInput";
import SeriesTypeInput from "@/views/forms/inputs/SeriesTypeInput";
import ReleaseStatusInput from "@/views/forms/inputs/ReleaseStatusInput";
import ClassificationInput from "@/views/forms/inputs/ClassificationInput";
import RelationsInput from "@/views/forms/inputs/RelationsInput";
import { mapGetters } from "vuex";

const status = ["draft", "published", "deleted", "revision"];
export default {
  name: "SeriesForm",

  mixins: [
    WithForm(function defaultForm(entity = {}) {
      const defaults = {
        coverId: null,
        title: "",
        slug: "",
        synopsis: "",
        status: "draft",
        type: "series",

        episodeCount: null,
        weekDay: null,
        year: new Date().getFullYear(),
        releaseDate: "",
        releaseTime: "",
        episodeDuration: 30,
        trailer: "",
        producer: "",
        classification: "open",
        releaseStatus: "tba",
        relatedSeries: {}
      };

      return Object.assign(defaults, {
        tags: entity.tags ? entity.tags.map(t => t.id) : []
      });
    })
  ],

  weekDayOptions: [
    { value: null, text: "Não especificado" },
    { value: 0, text: "Domingo" },
    { value: 1, text: "Segunda" },
    { value: 2, text: "Terça" },
    { value: 3, text: "Quarta" },
    { value: 4, text: "Quinta" },
    { value: 5, text: "Sexta" },
    { value: 6, text: "Sábado" }
  ],

  components: {
    StatusInput,
    ImageInput,
    TagsInput,
    SeriesTypeInput,
    ReleaseStatusInput,
    ClassificationInput,
    RelationsInput
  },

  createdAlertTitle: "Série criada",
  updatedAlertTitle: "Série editada",

  validateForm: {
    slug(value) {
      return /^([a-z]|-|\d)+$/.test(value);
    },

    status(value) {
      return status.includes(value);
    },

    releaseDate(value) {
      const re = /^\d{2}\/\d{2}\/\d{4}$/;
      return re.test(value) && Number(value.slice(-4)) > 1900;
    },

    releaseTime(value) {
      const re = /^\d{2}:\d{2}$/;
      if (!re.test(value)) {
        return false;
      }
      const hours = Number(value.slice(0, 2));
      const minutes = Number(value.slice(-2));
      return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
    },

    episodeDuration(value) {
      const n = Number(value);
      return (
        /^([0-9])+$/.test(value) &&
        Number.isFinite(n) &&
        n > 0 &&
        Math.ceil(n) === n
      );
    },

    trailer(value) {
      return value.includes("http");
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
    },

    handleDelete(id) {
      return this.$axios.delete("/series/" + id);
    }
  }
};
</script>

<style></style>
