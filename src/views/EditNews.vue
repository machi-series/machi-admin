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

        <NewsForm
          v-show="!loading"
          :entity="editingEntity"
          @stopEditing="editingEntity = false"
          @created="onCreated"
          @updated="onUpdated"
          @delete="onDeleted"
        ></NewsForm>
      </div>
    </div>
  </section>
</template>

<script>
import NewsForm from "@/views/forms/NewsForm.vue";

const data = () => ({
  loading: true,
  isNew: true,
  editingEntity: false
});

export default {
  name: "EditNews",

  components: {
    NewsForm
  },

  data,

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      Object.assign(this, data());

      if (this.$route.params.id !== "new") {
        this.isNew = false;
        return this.$axios
          .get(`/news/${this.$route.params.id}`)
          .then(({ data }) => {
            this.editingEntity = data;
          })
          .catch(() => this.$router.push({ name: "error-404" }))
          .finally(() => (this.loading = false));
      }

      this.loading = false;
    },

    onCreated(item) {
      return this.$router.push(`/news/${item.id}`);
    },

    onUpdated(item) {
      this.editingEntity = item;
    },

    onDeleted() {
      return this.$router.push("/news/");
    }
  },

  watch: {
    "$route.params.id"() {
      this.initialize();
    }
  }
};
</script>
