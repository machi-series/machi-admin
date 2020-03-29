import Vue from "vue";
import Router from "vue-router";
import store from "../store";

// Dashboard Components
import dashboard from "../views/dashboard";
import Users from "../views/Users";
import Tags from "../views/Tags";
import Series from "../views/Series";
import SeriesEpisodes from "../views/SeriesEpisodes";
import Profile from "../views/Profile";

// Widgets
import widgets from "../views/widgets";

// UI Components
import alerts from "../views/ui-components/alerts";
import badges from "../views/ui-components/badges";
import breadcrumbs from "../views/ui-components/breadcrumbs";
import buttons from "../views/ui-components/buttons";
import carousel from "../views/ui-components/carousel";
import dropdowns from "../views/ui-components/dropdowns";
import icons from "../views/ui-components/icons";
import modals from "../views/ui-components/modals";
import paginations from "../views/ui-components/paginations";
import progress from "../views/ui-components/progress";
import tables from "../views/ui-components/tables";
import typography from "../views/ui-components/typography";
import tabs from "../views/ui-components/tabs";
import tooltips from "../views/ui-components/tooltips";

// Form Components
import forms from "../views/forms/forms";

// Sample Pages
import error404 from "../views/sample-pages/error-404";
import error500 from "../views/sample-pages/error-500";
import login from "../views/sample-pages/login";
import register from "../views/sample-pages/register";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },

  routes: [
    {
      path: "/",
      name: "dashboard",
      component: dashboard
    },
    {
      path: "/users",
      name: "users",
      component: Users
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/tags",
      name: "tags",
      component: Tags
    },
    {
      path: "/series",
      name: "series",
      component: Series
    },
    {
      path: "/series/:seriesId/episodes",
      name: "seriesEpisodes",
      component: SeriesEpisodes
    },
    {
      path: "/widgets",
      name: "widgets",
      component: widgets
    },
    {
      path: "/404",
      name: "error-404",
      component: error404,
      meta: { ignoreRouterRule: true }
    },
    {
      path: "/500",
      name: "error-500",
      component: error500,
      meta: { ignoreRouterRules: true }
    },
    {
      path: "/login",
      name: "login",
      component: login,
      meta: { isGuestRoute: true }
    },
    {
      path: "/register",
      name: "register",
      component: register
    },
    {
      path: "/alerts",
      name: "alerts",
      component: alerts
    },
    {
      path: "/badges",
      name: "badges",
      component: badges
    },
    {
      path: "/breadcrumbs",
      name: "breadcrumbs",
      component: breadcrumbs
    },
    {
      path: "/buttons",
      name: "buttons",
      component: buttons
    },
    {
      path: "/carousel",
      name: "carousel",
      component: carousel
    },
    {
      path: "/dropdowns",
      name: "dropdowns",
      component: dropdowns
    },
    {
      path: "/icons",
      name: "icons",
      component: icons
    },
    {
      path: "/modals",
      name: "modals",
      component: modals
    },
    {
      path: "/paginations",
      name: "paginations",
      component: paginations
    },
    {
      path: "/progress",
      name: "progress",
      component: progress
    },
    {
      path: "/tables",
      name: "tables",
      component: tables
    },
    {
      path: "/typography",
      name: "typography",
      component: typography
    },
    {
      path: "/tabs",
      name: "tabs",
      component: tabs
    },
    {
      path: "/tooltips",
      name: "tooltips",
      component: tooltips
    },
    {
      path: "/forms",
      name: "forms",
      component: forms
    }
    // {
    //   path: "/",
    //   name: "Home",
    //   component: Home
    // },
    // {
    //   path: "/about",
    //   name: "About",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "../views/About.vue")
    // }
  ]
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters["auth/isLoggedIn"];
  const isAdmin = store.getters["auth/isAdmin"];
  const {
    ignoreRouterRules = false,
    isGuestRoute = false,
    isAdminRoute = false
  } = to.meta;

  if (ignoreRouterRules) {
    return next();
  }

  if (isGuestRoute && isLoggedIn) {
    return next({ name: "dashboard" });
  }
  if (isAdminRoute && !isAdmin) {
    return next({ name: "dashboard" });
  }
  if (!isLoggedIn && to.name !== "login") {
    return next({ name: "login" });
  }

  return next();
});

export default router;
