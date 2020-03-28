<template lang="html">
  <section class="tables">
    <div class="row">
      <div class="col-lg-6 grid-margin">
        <SeriesForm
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
import SeriesForm from "@/views/forms/SeriesForm.vue";

export default {
  name: "Series",

  components: {
    SeriesForm
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
      ]
    };
  },

  created() {
    this.loadItems(1);
  },

  methods: {
    async loadItems(page) {
      const { data: pagination } = await this.$axios.get(
        "/series?page=" + page
      );

      this.items = pagination.data;
      this.page = +pagination.page;
      this.lastPage = +pagination.lastPage;
      this.total = +pagination.total;
      this.perPage = +pagination.perPage;
    },

    onCreated() {
      this.loadItems(this.lastPage);
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
      this.loadItems(this.page);
    }
  }
};
</script>

<style scoped lang="scss">
.tables {
}
</style>
