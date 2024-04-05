const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "heroes",
        name: "heroes",
        component: () => import("pages/HeroesPage.vue"),
      },
      {
        path: "villains",
        name: "villains",
        component: () => import("pages/VillainsPage.vue"),
      },
      {
        path: "/hero/:id",
        name: "hero-detail",
        component: () => import("pages/HeroDetail.vue"),
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
