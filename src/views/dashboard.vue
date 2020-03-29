<template lang="html">
  <section class="dashboard">
    <div class="row">
      <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
        <div class="card card-statistics">
          <div class="card-body">
            <div class="d-flex justify-content-between flex-wrap">
              <div>
                <i class="mdi mdi-cube text-danger icon-lg"></i>
              </div>
              <div>
                <p class="card-text text-right">Séries</p>
                <div class="fluid-container">
                  <h3 class="card-title font-weight-bold text-right mb-0">
                    {{ count.series }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
        <div class="card card-statistics">
          <div class="card-body">
            <div class="d-flex justify-content-between flex-wrap">
              <div>
                <i class="mdi mdi-receipt text-warning icon-lg"></i>
              </div>
              <div>
                <p class="card-text text-right">Tags</p>
                <div class="fluid-container">
                  <h3 class="card-title font-weight-bold text-right mb-0">
                    {{ count.tags }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
        <div class="card card-statistics">
          <div class="card-body">
            <div class="d-flex justify-content-between flex-wrap">
              <div>
                <i class="mdi mdi-poll-box text-teal icon-lg"></i>
              </div>
              <div>
                <p class="card-text text-right">Episódios</p>
                <div class="fluid-container">
                  <h3 class="card-title font-weight-bold text-right mb-0">
                    {{ count.episodes }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6 grid-margin stretch-card">
        <div class="card card-statistics">
          <div class="card-body">
            <div class="d-flex justify-content-between flex-wrap">
              <div>
                <i class="mdi mdi-account-location text-info icon-lg"></i>
              </div>
              <div>
                <p class="card-text text-right">Usuários</p>
                <div class="fluid-container">
                  <h3 class="card-title font-weight-bold text-right mb-0">
                    {{ count.users }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="false" class="row">
      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Orders</h5>
            <div class="table-responsive">
              <table class="table center-aligned-table">
                <thead>
                  <tr>
                    <th class="border-bottom-0">Order No</th>
                    <th class="border-bottom-0">Product Name</th>
                    <th class="border-bottom-0">Purchased On</th>
                    <th class="border-bottom-0">Shipping Status</th>
                    <th class="border-bottom-0">Payment Method</th>
                    <th class="border-bottom-0">Payment Status</th>
                    <th class="border-bottom-0"></th>
                    <th class="border-bottom-0"></th>
                    <th class="border-bottom-0"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>034</td>
                    <td>Iphone 7</td>
                    <td>12 May 2017</td>
                    <td>Dispatched</td>
                    <td>Credit card</td>
                    <td><label class="badge badge-teal">Approved</label></td>
                    <td>
                      <a href="#" class="btn btn-outline-success btn-sm"
                        >View Order</a
                      >
                    </td>
                    <td>
                      <a href="#" class="btn btn-outline-danger btn-sm"
                        >Cancel</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>035</td>
                    <td>Galaxy S8</td>
                    <td>15 May 2017</td>
                    <td>Dispatched</td>
                    <td>Internet banking</td>
                    <td><label class="badge badge-warning">Pending</label></td>
                    <td>
                      <a href="#" class="btn btn-outline-success btn-sm"
                        >View Order</a
                      >
                    </td>
                    <td>
                      <a href="#" class="btn btn-outline-danger btn-sm"
                        >Cancel</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>036</td>
                    <td>Amazon Echo</td>
                    <td>17 May 2017</td>
                    <td>Dispatched</td>
                    <td>Credit card</td>
                    <td><label class="badge badge-teal">Approved</label></td>
                    <td>
                      <a href="#" class="btn btn-outline-success btn-sm"
                        >View Order</a
                      >
                    </td>
                    <td>
                      <a href="#" class="btn btn-outline-danger btn-sm"
                        >Cancel</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>037</td>
                    <td>Google Pixel</td>
                    <td>17 May 2017</td>
                    <td>Dispatched</td>
                    <td>Cash on delivery</td>
                    <td><label class="badge badge-danger">Rejected</label></td>
                    <td>
                      <a href="#" class="btn btn-outline-success btn-sm"
                        >View Order</a
                      >
                    </td>
                    <td>
                      <a href="#" class="btn btn-outline-danger btn-sm"
                        >Cancel</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>038</td>
                    <td>Mac Mini</td>
                    <td>19 May 2017</td>
                    <td>Dispatched</td>
                    <td>Debit card</td>
                    <td><label class="badge badge-teal">Approved</label></td>
                    <td>
                      <a href="#" class="btn btn-outline-success btn-sm"
                        >View Order</a
                      >
                    </td>
                    <td>
                      <a href="#" class="btn btn-outline-danger btn-sm"
                        >Cancel</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Atividade</h5>
            <div class="fluid-container">
              <div
                v-for="(activity, i) in activities"
                :key="i"
                class="row ticket-card mt-3 pb-2 border-bottom"
              >
                <div class="col-md-1">
                  <img
                    v-if="activity.user"
                    class="img-sm rounded-circle mb-2 mb-md-0"
                    :src="activity.user.email | gravatar({ s: 68 })"
                    alt="profile image"
                  />
                </div>
                <div class="ticket-details col-md-11">
                  <div class="d-flex">
                    <p class="text-primary font-weight-bold mr-2 mb-0 no-wrap">
                      <label
                        data-v-19c9d02c=""
                        :class="`badge badge-${activity.badge}`"
                        >{{ activity.type }}</label
                      >
                    </p>
                    <p class="font-weight-bold mb-0 ellipsis">
                      {{ activity.title }}
                    </p>
                  </div>
                  <div class="row text-muted d-flex mb-2 mb-md-0">
                    <div class="col-xl-4 d-sm-flex">
                      <p class="mb-0 mr-2">
                        Edição {{ activity.updatedTimeAgo }}
                      </p>
                    </div>
                    <div class="col-xl-4 d-sm-flex">
                      <p class="mb-0 mr-2">
                        Criação {{ activity.createdTimeAgo }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import moment from "moment";

export default {
  name: "Dashboard",

  data() {
    return {
      now: new Date(),

      count: {
        series: null,
        episodes: null,
        tags: null,
        users: null
      },

      latest: {
        series: [],
        episodes: [],
        tags: [],
        users: []
      }
    };
  },

  computed: {
    activities() {
      const series = this.latest.series.map(s => ({
        ...s,
        badge: "primary",
        type: "Série",
        user: s.editedBy || s.author,
        title: s.title
      }));

      const episodes = this.latest.episodes.map(e => ({
        ...e,
        badge: "info",
        type: "Episódio",
        user: e.editedBy || e.author,
        title: e.title
      }));

      const tags = this.latest.tags.map(t => ({
        ...t,
        badge: "success",
        type: "Tag",
        user: false,
        title: t.name
      }));

      const users = this.latest.users.map(u => ({
        ...u,
        badge: "teal",
        type: "Usuário",
        user: u,
        title: u.username
      }));

      const now = this.$moment(this.now);

      return []
        .concat(series, episodes, tags, users)
        .sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )
        .map(i => ({
          ...i,
          updatedTimeAgo: this.$moment.utc(i.updated_at).from(now),
          createdTimeAgo: this.$moment.utc(i.created_at).from(now)
        }));
    }
  },

  async created() {
    await Promise.all(
      ["series", "episodes", "tags", "users"].map(key =>
        this.$axios
          .get(`/${key}`, {
            params: {
              order: "updated_at",
              direction: "desc"
            }
          })
          .then(({ data: pagination }) => {
            this.count[key] = +pagination.total;
            this.latest[key] = pagination.data;
          })
      )
    );
  }
};
</script>

<style scoped lang="scss"></style>
