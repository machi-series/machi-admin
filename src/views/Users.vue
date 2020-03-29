<template lang="html">
  <section class="tables">
    <div class="row">
      <div class="col-lg-6 grid-margin">
        <UserForm
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
import UserForm from "@/views/forms/UserForm.vue";

export default {
  name: "Users",

  mixins: [WithTable("users")],

  components: {
    UserForm
  },

  fields: [
    {
      key: "id",
      label: "ID"
    },
    {
      key: "username",
      label: "Nome"
    },
    {
      key: "email",
      label: "Email"
    },
    {
      key: "actions",
      label: "Ações"
    }
  ]
};
</script>
