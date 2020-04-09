<template>
  <div>
    <b-input-group
      v-for="(relation, i) in relations"
      :key="relation.id"
      class="mb-2"
    >
      <b-input-group-prepend>
        <b-form-input
          :disabled="true"
          v-model="relation.id"
          style="max-width: 75px;"
        ></b-form-input>
      </b-input-group-prepend>
      <b-input-group-prepend>
        <b-form-input
          :disabled="true"
          v-model="relation.seriesName"
          placeholder="Carregando..."
        ></b-form-input>
      </b-input-group-prepend>

      <b-form-input
        v-model="relation.title"
        debounce="500"
        @change="_emit"
        placeholder="Nome do relacionamento"
      ></b-form-input>

      <b-input-group-append>
        <b-button @click="remove(i)" variant="outline-danger">
          Deletar
        </b-button>
      </b-input-group-append>
    </b-input-group>

    <b-form-input
      list="my-auto-complete-animes"
      v-model="search"
      debounce="500"
      placeholder="Pesquisar"
      @update="value => onSearch(value)"
      @change.native="onChange"
    ></b-form-input>

    <datalist id="my-auto-complete-animes">
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.title }}
      </option>
    </datalist>
  </div>
</template>

<script>
const defaultValue = () => [];

export default {
  name: "RelationsInput",

  props: ["value"],

  data() {
    return {
      relations: defaultValue(),
      search: "",
      options: [],
      namesCache: {}
    };
  },

  methods: {
    onSearch(value) {
      const params = { search: value };
      this.$axios.get("/series", { params }).then(({ data: pagination }) => {
        this.options = pagination.data;
      });
    },

    onChange(event) {
      const value = Number(this.search);
      if (!Number.isFinite(value) || value <= 0) {
        return;
      }

      this.search = "";

      this.relations.push({
        id: +value,
        seriesName: this.options.find(o => o.id === +value).title,
        title: ""
      });

      this._emit();

      try {
        event.target.blur();
      } catch (err) {
        // ...
      }
    },

    remove(i) {
      this.relations.splice(i, 1);
      this._emit();
    },

    _emit() {
      this.$emit(
        "input",
        this.relations.reduce((acc, relation) => {
          acc[relation.id] = relation.title;
          return acc;
        }, {})
      );
    }
  },

  watch: {
    value: {
      deep: true,
      handler(nextValue) {
        const valid = Object.entries(nextValue).every(
          ([id, value]) =>
            Number.isFinite(Number(id)) &&
            Number(id) > -1 &&
            typeof value === "string"
        );

        if (!valid) {
          this.relations = defaultValue();
          return;
        }

        const entries = Object.entries(nextValue);
        const isSame =
          entries.length === this.relations.length &&
          entries.every(([id, title]) => {
            const found = this.relations.find(r => r.id === +id);
            return found && found.title === title;
          });

        if (isSame) {
          return;
        }

        this.relations = Object.entries(nextValue).map(([id, title]) => ({
          id: +id,
          seriesName: this.namesCache[+id],
          title
        }));

        for (let relation of this.relations) {
          if (!relation.seriesName) {
            this.$axios
              .get(`/series/${relation.id}`)
              .then(({ data: series }) => {
                relation.seriesName = series.title;
              });
          }
        }
      }
    }
  }
};
</script>

<style></style>
