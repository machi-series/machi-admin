<template lang="html">
  <section class="tables">
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
              <template v-slot:cell(status)="data">
                <StatusBadge :status="data.item.status" />
              </template>

              <template v-slot:cell(actions)="data">
                <b-button-group size="sm">
                  <b-button :to="`/series/${data.item.id}`" variant="primary">
                    Editar
                  </b-button>
                  <b-button
                    @click.prevent="
                      $router.push(`/series/${data.item.id}/episodes`)
                    "
                    variant="secondary"
                  >
                    Episódios
                  </b-button>
                </b-button-group>
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
import WithTable from "@/mixins/WithTable";
import StatusBadge from "@/components/StatusBadge";

export default {
  name: "Series",

  components: { StatusBadge },

  mixins: [WithTable("series")],

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
      key: "status",
      label: "Status"
    },
    {
      key: "actions",
      label: "Ações"
    }
  ]
};
</script>
