import { Router, Route, RootRoute } from "@tanstack/react-router";
import { RootLayout } from "@/shared/ui/RootLayout";
import { HomePage } from "@/pages/HomePage";
import { ModelPage } from "@/pages/ModelPage";

const rootRoute = new RootRoute({
  component: RootLayout,
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const modelRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/model/$modelId",
  component: ModelPage,
});

const routeTree = rootRoute.addChildren([homeRoute, modelRoute]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
