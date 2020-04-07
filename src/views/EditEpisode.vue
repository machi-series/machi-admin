<template lang="html">
  <section class="tables">
    <SeriesShortCard v-if="series" :series="series" :hide-new="isNew" />

    <div class="row">
      <div class="col-lg-12 grid-margin">
        <b-progress
          v-if="loading"
          :value="100"
          variant="info"
          :striped="true"
          class="mt-2 mb-2"
        ></b-progress>

        <EpisodeForm
          v-show="!loading"
          :series="series"
          :entity="editingEntity"
          @stopEditing="editingEntity = false"
          @created="onCreated"
          @updated="onUpdated"
          @delete="onDeleted"
        />
      </div>
    </div>
  </section>
</template>

<script>
import EpisodeForm from "@/views/forms/EpisodeForm.vue";
import SeriesShortCard from "@/components/SeriesShortCard";

export default {
  name: "EditEpisode",

  components: {
    EpisodeForm,
    SeriesShortCard
  },

  data() {
    return {
      loading: true,
      isNew: true,
      editingEntity: false,
      series: false
    };
  },

  async created() {
    try {
      const { seriesId } = this.$route.params;
      const { data: series } = await this.$axios.get(`/series/${seriesId}`);
      this.series = series;
    } catch (err) {
      return this.$router.replace({ name: "error-404" });
    }

    if (this.$route.params.id !== "new") {
      this.isNew = false;
      return this.$axios
        .get(`/episodes/${this.$route.params.id}`)
        .then(({ data }) => {
          this.editingEntity = data;
        })
        .catch(() => this.$router.push({ name: "error-404" }))
        .finally(() => (this.loading = false));
    }

    this.loading = false;
  },

  methods: {
    onCreated(item) {
      return this.$router.push(`/series/${this.series.id}/episodes/${item.id}`);
    },

    onUpdated(item) {
      this.editingEntity = item;
    },

    onDeleted() {
      return this.$router.push(`/series/${this.series.id}/episodes/`);
    }
  }
};
</script>
