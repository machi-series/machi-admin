<script>
import MyUpload from "vue-image-crop-upload";

export default Object.assign(MyUpload, {
  props: Object.assign(MyUpload.props, {
    allowAllSizes: {
      type: Boolean,
      default: false
    }
  }),

  methods: Object.assign(MyUpload.methods, {
    setStep(no) {
      setTimeout(() => {
        if (no === 2 && this.allowAllSizes) {
          this.createImgUrl = this.sourceImgUrl;
          this.prepareUpload();
          return;
        }
        this.step = no;
      }, 200);
    }
  })
});
</script>
