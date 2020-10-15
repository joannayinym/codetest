import Home from "./Pages/Home";
import SearchResult from "./Pages/SearchResult";

const routes = [
  {
    path: "/",
    exact: true,
    name: "home",
    component: Home,
  },
  {
    path: "/search/:name",
    exact: true,
    name: "search",
    component: SearchResult,
  },
];

export default routes;
