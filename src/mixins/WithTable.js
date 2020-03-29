const WithTable = endpoint => {
  return {
    data() {
      return {
        search: "",
        page: 1,
        lastPage: 1,
        total: 0,
        perPage: 20,
        items: [],

        editingEntity: false
      };
    },

    computed: {},

    methods: {
      async loadItems(page = this.page) {
        const params = {
          search: this.search,
          page,
          ...(this.customLoadParams || {})
        };
        const { data: pagination } = await this.$axios.get(`/${endpoint}`, {
          params
        });

        this.items = pagination.data;
        this.page = +pagination.page;
        this.lastPage = +pagination.lastPage;
        this.total = +pagination.total;
        this.perPage = +pagination.perPage;
      },

      editEntity(item) {
        this.editingEntity = item;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },

      onCreated() {
        this.loadItems(Math.max(1, +this.lastPage));
      },

      onUpdated(item) {
        this.editingEntity = item;

        const found = this.items.find(i => i.id === item.id);
        if (!found) {
          return;
        }
        Object.assign(found, item);
      },

      onDeleted() {
        this.loadItems(this.page);
      }
    },

    created() {
      this.loadItems(1);
    },

    watch: {
      customLoadParams() {
        this.loadItems();
      },

      search() {
        this.loadItems();
      }
    }
  };
};

export default WithTable;
