import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";

import PageHome from "./PageHome/PageHome";
import PageProfile from "./PageProfile/PageProfile";

import PageNotFound from "./PageNotFound/PageNotFound";
import PageDomains from "./PageDomains/PageDomains";
import PageServices from "./PageServices/PageServices";

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        < PageHome />
      </ProtectedRoute>)
  },
  {
    path: "/domains",
    element: (
      <ProtectedRoute>
        < PageDomains />
      </ProtectedRoute>)
  },
  {
    path: "/services",
    element: (
      <ProtectedRoute>
        < PageServices />
      </ProtectedRoute>)
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <PageProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default routes;
