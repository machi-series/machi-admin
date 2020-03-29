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
  name: "ReleaseStatusInput",

  props: ["value"],

  options: [
    { value: "tba", text: "Aviso de estréia" },
    { value: "airing", text: "Em lançamento" },
    { value: "complete", text: "Completo" },
    { value: "onhold", text: "Hiato" },
    { value: "canceled", text: "Cancelado" }
  ]
};
</script>
