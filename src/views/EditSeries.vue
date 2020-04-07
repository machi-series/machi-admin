<template lang="html">
  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <b-progress
          v-if="loading"
          :value="100"
          variant="info"
          :striped="true"
          class="mt-2 mb-2"
        ></b-progress>

        <SeriesForm
          v-show="!loading"
          :entity="editingEntity"
          @stopEditing="editingEntity = false"
          @created="onCreated"
          @updated="onUpdated"
          @delete="onDeleted"
        >
          <b-button
            v-if="!isNew && editingEntity"
            :to="`/series/${editingEntity.id}/episodes`"
            variant="primary"
            slot="after-sidebar"
            class="mt-2"
            block
          >
            Ver episódios
          </b-button>
        </SeriesForm>
      </div>
    </div>
  </section>
</template>

<script>
import SeriesForm from "@/views/forms/SeriesForm.vue";

export default {
  name: "EditSeries",

  components: {
    SeriesForm
  },

  data() {
    return {
      loading: true,
      isNew: true,
      editingEntity: false
    };
  },

  created() {
    if (this.$route.params.id !== "new") {
      this.isNew = false;
      return this.$axios
        .get(`/series/${this.$route.params.id}`)
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
      return this.$router.push(`/series/${item.id}`);
    },

    onUpdated(item) {
      this.editingEntity = item;
    },

    onDeleted() {
      return this.$router.push("/series/");
    }
  }
};
</script>
