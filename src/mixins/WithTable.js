const WithTable = endpoint => {
  return {
    data() {
      return {
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
      async loadItems(page) {
        const { data: pagination } = await this.$axios.get(
          `/${endpoint}?page=${page}`
        );

        this.items = pagination.data;
        this.page = +pagination.page;
        this.lastPage = +pagination.lastPage;
        this.total = +pagination.total;
        this.perPage = +pagination.perPage;
      },

      onCreated() {
        this.loadItems(this.lastPage);
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
    }
  };
};

export default WithTable;
