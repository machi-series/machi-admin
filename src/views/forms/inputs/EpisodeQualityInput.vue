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
  name: "EpisodeQualityInput",

  props: ["value"],

  statusOptions: [
    { value: "hdtv", text: "HDTV" },
    { value: "bluray", text: "Bluray" },
    { value: "dvd", text: "DVD" }
  ]
};
</script>
