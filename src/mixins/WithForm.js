function defaultDirtyForForm(form) {
  return Object.keys(form).reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {});
}

const WithForm = defaultForm => {
  const fields = Object.keys(defaultForm());

  return {
    defaultForm,

    props: {
      entity: {
        type: [Boolean, Object]
      }
    },

    data() {
      const form = this.$options.defaultForm();
      return {
        form,
        isDirty: defaultDirtyForForm(form),
        formServerValidations: {}
      };
    },

    computed: {
      isEditing() {
        return !!this.entity;
      },

      isNew() {
        return !this.isEditing;
      },

      formDirty() {
        return Object.values(this.isDirty).some(value => value);
      },

      formValid() {
        return Object.keys(this.form).every(
          field => this[`${field}Validation`].state !== false
        );
      },

      ...fields.reduce((acc, field) => {
        acc[`${field}Validation`] = function validation() {
          if (!this.isDirty[field]) {
            return { state: null, messages: [] };
          }
          const serverData = this.formServerValidations[field];
          const messages =
            serverData != null
              ? this.formServerValidations[field].map(err => err.message)
              : [];
          let state = !messages.length;

          const validator =
            this.$options.validateForm && this.$options.validateForm[field];

          const invalid = validator && !validator(this.form.slug);
          if (invalid) {
            state = false;
            messages.push("Inválido");
          }

          return { state, messages };
        };

        return acc;
      }, {})
    },

    methods: {
      resetForm() {
        const form = this.$options.defaultForm();
        const isDirty = defaultDirtyForForm(this.form);

        if (this.entity) {
          const cloned = JSON.parse(JSON.stringify(this.entity));
          for (let key of Object.keys(this.form)) {
            form[key] = cloned[key];
          }
        }

        this.$set(this, "form", form);
        this.$set(this, "isDirty", isDirty);
        this.$set(this, "formServerValidations", {});
      },

      dirty(key) {
        this.isDirty[key] = true;
        this.formServerValidations[key] = undefined;
      },

      stopEditing() {
        this.$emit("stopEditing");
      },

      submit() {
        if (!this.formValid) {
          return this.$swal("Epa!", "Formulário inválido!", "error");
        }

        const handleSubmit = this.isNew ? this.handleCreate : this.handleUpdate;
        if (!handleSubmit) {
          return;
        }

        const predicate = ([field]) =>
          this.isNew ? true : this.isDirty[field];
        const dirtyFields = Object.entries(this.form)
          .filter(predicate)
          .reduce((acc, [field, value]) => {
            acc[field] = value;
            return acc;
          }, {});

        const successHandler = this.isNew ? this.onCreated : this.onUpdate;
        const errorHandler = this.isNew
          ? this.onCreateError
          : this.onUpdateError;
        const args = this.isNew ? [dirtyFields] : [this.entity.id, dirtyFields];

        handleSubmit(...args)
          .then(successHandler || (() => {}))
          .catch(err => {
            if (err?.response?.data?._validation) {
              this.formServerValidations = err?.response?.data;
              return;
            }

            if (errorHandler) {
              errorHandler(err);
            }
          });
      }
    },

    watch: {
      entity: {
        deep: true,
        handler() {
          this.resetForm();
        }
      }
    }
  };
};

export default WithForm;
