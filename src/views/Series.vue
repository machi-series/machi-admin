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
            <b-table
              striped
              hover
              responsive
              :items="items"
              :fields="$options.fields"
            >
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
import WithTable from "@/mixins/WithTable";
import SeriesForm from "@/views/forms/SeriesForm.vue";

export default {
  name: "Series",

  mixins: [WithTable("series")],

  components: {
    SeriesForm
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
  ]
};
</script>
