<template>
  <div>
    <b-container fluid class="p-4 bg-dark">
      <b-row>
        <b-col
          style="text-align: center; cursor: pointer"
          @click.prevent="show = true"
        >
          <b-img
            v-if="displayImage"
            thumbnail
            fluid
            :src="
              (displayImage.thumbnailName || displayImage.originalName) | image
            "
          ></b-img>

          <b-button v-else variant="light">
            <i class="mdi mdi-camera" style="margin-right: 0"></i>
          </b-button>
        </b-col>
      </b-row>
    </b-container>

    <UploadImage
      v-if="show"
      v-bind="$attrs"
      v-on="{ ...$listeners, input: () => {} }"
      v-model="show"
      @crop-success="onCropSuccess"
      @crop-upload-success="onCropUploadSuccess"
      @crop-upload-fail="onCropUploadFail"
      field="image"
      :url="url"
      langType="pt-br"
    ></UploadImage>
  </div>
</template>

<script>
import UploadImage from "@/components/UploadImage";

export default {
  name: "ImageInput",

  components: { UploadImage },

  props: {
    value: [Number, Object, Boolean],
    image: [Boolean, Object],
    params: [Boolean, Object]
  },

  data() {
    return {
      show: false,
      temporaryImage: null
    };
  },

  computed: {
    url() {
      const { width, height } = this.params || {};
      const params = { width, height };
      const queryString = Object.entries(params)
        .filter(([, value]) => value != null)
        .map(([key, value]) => key + "=" + value)
        .join("&");
      return `${process.env.VUE_APP_BASE_URL}/upload?${queryString}`;
    },

    displayImage() {
      return this.temporaryImage || this.image;
    }
  },

  methods: {
    onCropSuccess() {
      this.$swal({
        title: "🚚 Salvando",
        text: "Por favor, seja paciente",
        closeOnClickOutside: false,
        closeOnEsc: false,
        showCancelButton: false,
        showConfirmButton: false
      });
    },

    onCropUploadSuccess(image) {
      if (!image.id) {
        return;
      }
      this.temporaryImage = image;
      this.show = false;
      this.$swal(
        "💪 Sucesso",
        "Imagem upada. Não se esqueça de salvar!",
        "success"
      );
      setTimeout(() => {
        this.$swal.close();
      }, 1500);
      this.$emit("input", image.id);
    },

    onCropUploadFail() {
      this.show = false;
      this.$swal("😔", "Algo deu errado", "error");
    }
  },

  watch: {
    value(nextId) {
      this.show = false;
      if (this.temporaryImage && this.temporaryImage.id !== nextId) {
        this.temporaryImage = null;
      }
    }
  }
};
</script>
