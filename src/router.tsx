import { createBrowserRouter } from "react-router-dom";
import IndexPage from "./features";
import AuthPage from "./features/auth";
import ContactsPage from "./features/contacts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
    children: [
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "contacts",
        element: <ContactsPage />,
        children: [
          {
            index: true,
            element: <>all</>,
          },
          {
            path: ':id',
            element: <>contact</>,
          },
          {
            path: 'new',
            element: <>new</>,
          },
        ],
      },
    ],
  },
]);

export default router;
