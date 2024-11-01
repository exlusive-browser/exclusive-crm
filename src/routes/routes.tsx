import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "../common-pages/NotFound";
import { ClientListPage } from "../features/client/pages/ClientList/ClientListPage";
import { ClienDetailPage } from "../features/client/pages/ClientDetail/ClienDetailPage";
import { ClientUpdatePage } from "../features/client/pages/ClientUpdate/ClientUpdatePage";
import { ClienCreatePage } from "../features/client/pages/ClientCreate/ClienCreatePage";
import { HomePage } from "../features/home/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/clients",
    element: <ClientListPage />,
  },
  {
    path: "/clients/create",
    element: <ClienCreatePage />,
  },
  {
    path: "/clients/update/:id",
    element: <ClientUpdatePage />,
  },
  {
    path: "/clients/:id",
    element: <ClienDetailPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
