<template>
  <div>
    <b-form-group label="Tags">
      <b-form-tags no-outer-focus class="mb-2">
        <template>
          <ul
            v-if="selectedTags.length > 0"
            class="list-inline d-inline-block mb-2"
          >
            <li
              v-for="tag in selectedTags"
              :key="tag.id"
              class="list-inline-item"
            >
              <b-form-tag
                @remove="removeTag(tag)"
                :title="tag.name"
                variant="info"
              >
                {{ tag.name }}
              </b-form-tag>
            </li>
          </ul>

          <b-dropdown
            size="sm"
            variant="outline-secondary"
            block
            menu-class="w-100"
          >
            <template v-slot:button-content>
              Escolha as tags
            </template>

            <b-dropdown-form @submit.stop.prevent="() => {}">
              <b-form-group
                label-for="tag-search-input"
                label="Search tags"
                label-cols-md="auto"
                class="mb-0"
                label-size="sm"
                :description="searchDesc"
              >
                <b-form-input
                  v-model="query"
                  id="tag-search-input"
                  type="search"
                  size="sm"
                  autocomplete="off"
                ></b-form-input>
              </b-form-group>
            </b-dropdown-form>

            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item-button
              v-for="tag in loadedTags"
              :key="tag.id"
              @click.prevent="addTag(tag)"
            >
              {{ tag.name }}
            </b-dropdown-item-button>

            <b-dropdown-text v-if="loadedTags.length === 0">
              Nada encontrado
            </b-dropdown-text>
          </b-dropdown>
        </template>
      </b-form-tags>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "TagsInput",

  props: ["value", "tags"],

  data() {
    return {
      query: "",
      selectedTags: [],
      loadedTags: []
    };
  },

  computed: {
    availableOptions() {
      return this.loadedTags.map(t => t.name);
    },

    searchDesc() {
      if (this.query && !this.availableOptions.length) {
        return "Nenhum resultado";
      }

      return "";
    }
  },

  methods: {
    searchTags() {
      this.$axios
        .get("/tags", {
          params: { search: this.query }
        })
        .then(({ data: pagination }) => {
          this.loadedTags = pagination.data.filter(
            tag => !this.selectedTags.includes(tag.id)
          );
        });
    },

    addTag(tag) {
      this.query = "";
      this.selectedTags.push(tag);
      this._emit();
    },

    removeTag(tag) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
      this._emit();
    },

    _emit() {
      this.$emit(
        "input",
        this.selectedTags.map(t => t.id)
      );
    }
  },

  watch: {
    value: {
      deep: true,
      handler(nextValue) {
        const changed =
          nextValue.length !== this.selectedTags.length ||
          this.selectedTags.some((t, i) => t.id !== nextValue[i]);

        if (changed) {
          this.selectedTags = this.tags.slice();
        }
      }
    },

    query() {
      this.searchTags();
    }
  }
};
</script>

<style></style>
