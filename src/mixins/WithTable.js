const WithTable = endpoint => {
  return {
    data() {
      const search = this.$route.query.search || "";
      const page = Number(this.$route.query.page) || 1;

      return {
        search,
        page,
        lastPage: 10000000000 / 20,
        total: 10000000000,
        perPage: 20,
        items: [],

        editingEntity: false
      };
    },

    computed: {},

    methods: {
      async loadItems(page = this.page) {
        this.page = page;

        const params = {
          search: this.search,
          page,
          direction: "desc",
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

        this.$router.replace({
          query: { page: this.page, search: this.search }
        });
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
        this.loadItems();
      }
    },

    created() {
      this.loadItems();
    },

    watch: {
      customLoadParams() {
        this.loadItems();
      },

      search() {
        this.loadItems();
      },

      page() {
        this.loadItems();
      }
    }
  };
};

export default WithTable;
