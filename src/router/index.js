import { createWebHashHistory, createRouter } from "vue-router";

const viewComponents = import.meta.glob("../views/*/index.vue");


const routes = Object.entries(viewComponents).map(([path, component]) => {
  const name = /views\/(.*)\/index\.vue/.exec(path)[1];
  return {
    path: `/${name}`,
    name,
    component: component,
  };
});
if (!routes.length) {
  console.error("No views found. Please check your views directory.");
}
routes.push({ path: "/", redirect: routes[0].path });

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
