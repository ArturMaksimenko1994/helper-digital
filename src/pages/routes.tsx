
import PageHome from "./PageHome/PageHome";

import PageProfile from "./PageProfile/PageProfile";

import PageLogin from "./(aut)/PageLogin/PageLogin";
import PageResetPassword from "./(aut)/PageResetPassword/PageResetPassword";
import PageForgotPassword from "./(aut)/PageForgotPassword/PageForgotPassword";

import PageNotFound from "./PageNotFound/PageNotFound";

const routes = [
  {
    path: "/",
    element: <PageHome />,
  },
  {
    path: "/profile",
    element: <PageProfile />,
  },
  {
    path: "/login",
    element: <PageLogin />,
  },
  {
    path: "/reset-password",
    element: <PageResetPassword />,
  },
  {
    path: "/forgot-password",
    element: <PageForgotPassword />,
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
];

export default routes;
