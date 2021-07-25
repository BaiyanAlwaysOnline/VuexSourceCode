import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Detail from "./components/Detail.vue";
import Detaila from "./components/Detaila.vue";
import Detailc from "./components/Detailc.vue";

Vue.use(Router);

const router = new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/detail",
      component: Detail,
      children: [
        {
          path: "a",
          component: Detaila,
        },
        {
          path: "c",
          component: Detailc,
        },
      ],
    },
  ],
});

const newRoute = [
  {
    path: "/auth",
    component: {
      template: (h) => h("h2", {}, "auth"),
    },
  },
  {
    path: "/detail",
    component: Detail,
    children: [
      {
        path: "c",
        component: {
          template: (h) => h("h1", {}, "detail c"),
        },
      },
      {
        path: "d",
        component: {
          render: (h) => h("h1", {}, "detail d"),
        },
      },
    ],
  },
];

// router.matcher.addRoute(newRoute);
// router.beforeEach((from, to, next) => {
//   setTimeout(() => {
//     next();
//   }, 1500)
// })

// router.beforeEach((from, to, next) => {
//   setTimeout(() => {
//     next();
//   }, 1500)
// })
export default router;
