import { lazy, StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import CommonLoader from "./components/CommonLoader";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/landing/Login";

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Planets = lazy(() => import("./pages/planets/Planets"));
const PlanetsView = lazy(() => import("./pages/planets/PlanetsView"));
const FilmsList = lazy(() => import("./pages/films/FilmsList"));
const FilmsView = lazy(() => import("./pages/films/FilmsView"));
const Residents = lazy(() => import("./pages/residents/Residents"));

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/planets",
        element: (
          <PrivateRoute>
            <Planets />
          </PrivateRoute>
        ),
      },
      {
        path: "/planets/:id",
        element: (
          <PrivateRoute>
            <PlanetsView />
          </PrivateRoute>
        ),
      },
      {
        path: "/films",
        element: (
          <PrivateRoute>
            <FilmsList />
          </PrivateRoute>
        ),
      },
      {
        path: "/films/:id",
        element: (
          <PrivateRoute>
            <FilmsView />
          </PrivateRoute>
        ),
      },
      {
        path: "/people",
        element: (
          <PrivateRoute>
            <Residents />
          </PrivateRoute>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

const rootElement = document.getElementById("root") as HTMLElement;
let root: ReactDOM.Root;

if (rootElement) {
  root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}
