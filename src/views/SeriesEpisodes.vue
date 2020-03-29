<template lang="html">
  <section class="tables">
    <div v-if="series" class="mb-4">
      <b-card :title="series.title">
        <b-card-text v-if="series.synopsis">
          {{ series.synopsis }}
        </b-card-text>

        <b-button @click.prevent="$router.back()" href="#" variant="primary">
          Voltar
        </b-button>
      </b-card>
    </div>

    <div class="row">
      <div class="col-lg-6 grid-margin">
        <EpisodeForm
          :series="series"
          :entity="editingEntity"
          @stopEditing="editingEntity = false"
          @created="onCreated"
          @updated="onUpdated"
          @delete="onDeleted"
        />
      </div>

      <div class="col-lg-6 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <b-table
              striped
              hover
              responsive
              :items="items"
              :fields="$options.fields"
            >
              <template v-slot:cell(actions)="data">
                <b-button
                  @click="editEntity(data.item)"
                  variant="outline-primary"
                >
                  Editar
                </b-button>
              </template>
            </b-table>

            <b-pagination
              class="flat pagination-success"
              @change="value => loadItems(value)"
              :total-rows="total"
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
import WithTable from "@/mixins/WithTable";
import EpisodeForm from "@/views/forms/EpisodeForm.vue";

export default {
  name: "SeriesEpisodes",

  mixins: [WithTable("episodes")],

  components: {
    EpisodeForm
  },

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
      return { seriesId: Number(this.$route.params.seriesId) };
    }
  },

  async created() {
    try {
      const { seriesId } = this.$route.params;
      const { data: series } = await this.$axios.get(`/series/${seriesId}`);
      this.series = series;
    } catch (err) {
      this.$router.push("/404");
    }
  }
};
</script>
