<template lang="html">
  <section class="tables">
    <SeriesShortCard
      v-if="$route.params.seriesId && series"
      :series="series"
      :use-go-back="true"
    />

    <div class="row">
      <div class="col-sm-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <b-form-group label="Pesquisa">
              <b-form-input v-model="search" type="text"></b-form-input>
            </b-form-group>

            <b-table
              striped
              hover
              responsive
              :items="items"
              :fields="$options.fields"
            >
              <template v-slot:cell(actions)="data">
                <b-button
                  variant="outline-primary"
                  :to="`/series/${data.item.seriesId}/episodes/${data.item.id}`"
                >
                  Editar
                </b-button>
              </template>
            </b-table>

            <b-pagination
              class="flat pagination-success"
              :total-rows="Math.max(page + 1, total)"
              v-model="page"
              :per-page="perPage"
            ></b-pagination>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SeriesShortCard from "@/components/SeriesShortCard.vue";
import WithTable from "@/mixins/WithTable";

export default {
  name: "SeriesEpisodes",

  components: {
    SeriesShortCard
  },

  mixins: [WithTable("episodes")],

  fields: [
    {
      key: "id",
      label: "ID"
    },
    {
      key: "title",
      label: "Título"
    },
    {
      key: "slug",
      label: "Slug"
    },
    {
      key: "actions",
      label: "Ações"
    }
  ],

  data() {
    return { series: null };
  },

  computed: {
    customLoadParams() {
      return { seriesId: Number(this.$route.params.seriesId) || undefined };
    }
  },

  async created() {
    try {
      const { seriesId } = this.$route.params;
      if (!seriesId) {
        return;
      }
      const { data: series } = await this.$axios.get(`/series/${seriesId}`);
      this.series = series;
    } catch (err) {
      // ...
    }
  }
};
</script>
