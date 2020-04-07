<template>
  <div v-if="series" class="mb-4">
    <b-card :title="series.title">
      <b-card-text v-if="series.synopsis">
        {{ series.synopsis }}
      </b-card-text>

      <template>
        <b-button
          v-if="useGoBack"
          @click.prevent="$router.back()"
          href="#"
          variant="primary"
        >
          Voltar
        </b-button>

        <b-button v-else :to="`/series/${series.id}`" variant="primary">
          Ver
        </b-button>
      </template>

      <b-button
        v-if="!hideNew"
        :to="`/series/${series.id}/episodes/new`"
        variant="success"
        class="ml-2"
      >
        Novo episódio
      </b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "SeriesShortCard",

  props: {
    series: {
      type: Object,
      required: true
    },

    useGoBack: {
      type: Boolean,
      default: false
    },

    hideNew: {
      type: Boolean,
      default: false
    }
  }
};
</script>
