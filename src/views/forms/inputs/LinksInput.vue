<template>
  <div>
    <b-form-group
      v-for="({ key, label }, i) in $options.qualities"
      :key="i"
      label-cols-lg="3"
      label-size="lg"
      label-class="pt-0"
      class="mb-4 mt-4"
      :label="label"
    >
      <b-input-group
        v-for="(link, i) in links[key]"
        :key="i"
        class="mb-2"
        style="width: 100%"
      >
        <b-form-input
          :value="link"
          @input="setLink(key, i, $event)"
          placeholder="URL"
        ></b-form-input>
        <b-input-group-append>
          <b-button
            @click.prevent="removeLink(key, i)"
            variant="outline-danger"
          >
            Remover
          </b-button>
        </b-input-group-append>
      </b-input-group>

      <b-button @click="addLink(key)" variant="outline-primary">
        Adicionar
      </b-button>
    </b-form-group>
  </div>
</template>

<script>
const defaultLinks = () => ({
  low: [],
  medium: [],
  high: [],
  online: []
});

export default {
  name: "LinksInput",

  props: ["value"],

  qualities: [
    { key: "low", label: "Links de baixa qualidade" },
    { key: "medium", label: "Links de média qualidade" },
    { key: "high", label: "Links de alta qualidade" },
    { key: "online", label: "Links online" }
  ],

  data() {
    return {
      links: defaultLinks()
    };
  },

  methods: {
    setLink(key, i, value) {
      this.links[key][i] = value;
      this._emit();
    },

    addLink(key) {
      this.links[key].push("");
      this._emit();
    },

    removeLink(key, i) {
      this.links[key].splice(i, 1);
      this._emit();
    },

    _emit() {
      this.$emit("input", JSON.parse(JSON.stringify(this.links)));
    }
  },

  watch: {
    value(nextValue) {
      const valid =
        typeof nextValue === "object" &&
        Array.isArray(nextValue.low) &&
        Array.isArray(nextValue.medium) &&
        Array.isArray(nextValue.high) &&
        Array.isArray(nextValue.online);

      if (!valid) {
        this.links = defaultLinks();
        return;
      }

      if (!same(this.links, nextValue)) {
        this.links = JSON.parse(JSON.stringify(nextValue));
      }
    }
  }
};

function same(left, right) {
  return [
    [left.low, right.low],
    [left.medium, right.medium],
    [left.high, right.high],
    [left.online, right.online]
  ].every(
    ([x = [], y = []]) =>
      x.length === y.length && x.every((value, i) => y[i] === value)
  );
}
</script>

<style></style>
