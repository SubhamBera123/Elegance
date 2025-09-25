import nunjucks from "nunjucks/browser/nunjucks";
import { products } from "./data/products";
import { hydrateRoute } from "./runtime";

type Route = {
  path: RegExp;
  template: string;
  getContext?: (params: Record<string, string>) => any | Promise<any>;
};

const routes: Route[] = [
  { path: /^\/$/, template: "pages/index.njk" },
  { path: /^\/products(?:$|\?.*)/, template: "pages/products.njk" },
  { path: /^\/product\/([^/]+)$/, template: "pages/product-detail.njk", getContext: (params) => {
    const id = params["0"];
    const product = products.find(p => p.id === id);
    return { product };
  } },
  { path: /^\/cart$/, template: "pages/cart.njk" },
  { path: /^\/checkout$/, template: "pages/checkout.njk" },
  { path: /^\/account$/, template: "pages/account.njk" },
  { path: /^.*$/, template: "pages/not-found.njk" },
];

let env: nunjucks.Environment;

function createEnv(): nunjucks.Environment {
  const loader = new nunjucks.WebLoader("/src/templates", { useCache: false, async: false });
  const environment = new nunjucks.Environment(loader, { autoescape: true });
  return environment;
}

function matchRoute(pathname: string): { route: Route; params: Record<string, string> } {
  for (const route of routes) {
    const match = pathname.match(route.path);
    if (match) {
      const params: Record<string, string> = {} as any;
      match.slice(1).forEach((v, i) => (params[String(i)] = v));
      return { route, params };
    }
  }
  return { route: routes[routes.length - 1], params: {} };
}

function render(template: string, context: any = {}) {
  const root = document.getElementById("root");
  if (!root) return;
  const html = env.render(template, context);
  root.innerHTML = html;
  bindSpaLinks(root);
  hydrateRoute(template, context);
}

function navigate(path: string) {
  if (location.pathname === path) return;
  history.pushState({}, "", path);
  handleLocation();
}

function bindSpaLinks(root: HTMLElement | Document = document) {
  const anchors = root.querySelectorAll("a[href^=\"/\"]") as NodeListOf<HTMLAnchorElement>;
  anchors.forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    a.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const isModified = e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0;
      if (isModified || target.target === "_blank") return;
      e.preventDefault();
      navigate(href);
    });
  });
}

async function handleLocation() {
  const { route, params } = matchRoute(location.pathname);
  const context = route.getContext ? await route.getContext(params) : {};
  render(route.template, context);
}

export function initApp() {
  env = createEnv();
  window.addEventListener("popstate", handleLocation);
  document.addEventListener("DOMContentLoaded", () => {
    bindSpaLinks();
    handleLocation();
  });
}


