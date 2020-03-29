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
  name: "ClassificationInput",

  props: ["value"],

  options: [
    { value: "open", text: "Livre" },
    { value: "10", text: "10 anos" },
    { value: "12", text: "12 anos" },
    { value: "14", text: "14 anos" },
    { value: "16", text: "16 anos" },
    { value: "18", text: "+18 anos" }
  ]
};
</script>
