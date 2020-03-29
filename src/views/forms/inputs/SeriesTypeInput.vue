<template functional>
  <b-form-select
    v-bind="attrs"
    v-on="listeners"
    :value="props.value"
    :options="$options.options"
  ></b-form-select>
</template>

<script>
export default {
  name: "SeriesTypeInput",

  props: ["value"],

  options: [
    { value: "series", text: "Série" },
    { value: "ova", text: "OVA" },
    { value: "movie", text: "Filme" },
    { value: "special", text: "Especial" }
  ]
};
</script>
