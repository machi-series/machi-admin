<template>
  <b-badge :variant="variant">{{ label }}</b-badge>
</template>

<script>
export default {
  name: "StatusBadge",

  props: {
    status: String
  },

  computed: {
    label() {
      return {
        draft: "Rascunho",
        published: "Publicado",
        deleted: "Deletado",
        revision: "Revisão"
      }[this.status];
    },

    variant() {
      return {
        draft: "secondary",
        published: "success",
        deleted: "danger",
        revision: "info"
      }[this.status];
    }
  }
};
</script>

<style></style>
