<template lang="html">
  <section class="tables">
    <div class="row">
      <div class="col-lg-6 grid-margin">
        <TagForm
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
            <b-table striped hover responsive :items="items" :fields="fields">
              <template v-slot:cell(actions)="data">
                <b-button
                  @click="editingEntity = data.item"
                  variant="outline-primary"
                >
                  Editar
                </b-button>
              </template>
            </b-table>

            <b-pagination
              class="flat pagination-success"
              @change="value => loadTags(value)"
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
import TagForm from "@/views/forms/TagForm.vue";

export default {
  name: "Tags",

  components: {
    TagForm
  },

  data() {
    return {
      page: 1,
      lastPage: 1,
      total: 0,
      perPage: 20,
      items: [],

      editingEntity: false,

      fields: [
        {
          key: "id",
          label: "ID"
        },
        {
          key: "name",
          label: "Nome"
        },
        {
          key: "slug",
          label: "Slug"
        },
        {
          key: "actions",
          label: "Ações"
        }
      ]
    };
  },

  created() {
    this.loadTags(1);
  },

  methods: {
    async loadTags(page) {
      const { data: pagination } = await this.$axios.get("/tags?page=" + page);

      this.items = pagination.data;
      this.page = +pagination.page;
      this.lastPage = +pagination.lastPage;
      this.total = +pagination.total;
      this.perPage = +pagination.perPage;
    },

    onCreated() {
      this.loadTags(this.lastPage);
    },

    onUpdated(item) {
      this.editingEntity = item;

      const found = this.items.find(i => i.id === item.id);
      if (!found) {
        return;
      }
      Object.assign(found, item);
    },

    onDeleted() {
      this.loadTags(this.page);
    }
  }
};
</script>

<style scoped lang="scss">
.tables {
}
</style>
