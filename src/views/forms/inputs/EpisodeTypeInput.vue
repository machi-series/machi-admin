<template functional>
  <b-form-select
    v-bind="attrs"
    v-on="listeners"
    :value="props.value"
    :options="$options.statusOptions"
  ></b-form-select>
</template>

<script>
export default {
  name: "EpisodeTypeInput",

  props: ["value"],

  statusOptions: [
    { value: "episode", text: "Episódio" },
    { value: "ova", text: "OVA" },
    { value: "movie", text: "Filme" },
    { value: "special", text: "Especial" }
  ]
};
</script>
