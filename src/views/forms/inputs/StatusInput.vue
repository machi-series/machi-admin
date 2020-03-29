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
  name: "StatusInput",

  props: ["value"],

  statusOptions: [
    { value: "draft", text: "Rascunho" },
    { value: "published", text: "Publicado" },
    { value: "deleted", text: "Deletado" }
  ]
};
</script>
