import { createBrowserRouter } from "react-router-dom";
import IndexPage from "./features";
import AuthPage from "./features/auth";
import ContactsPage from "./features/contacts";
import ContactPage from "./features/contacts/modules/contact";

const router = createBrowserRouter([
  {
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
            path: ":id",
            element: <ContactPage />,
          },
          {
            path: ":id/edit",
            element: <>contact edit</>,
          },
          {
            path: "new",
            element: <>new</>,
          },
        ],
      },
    ],
  },
]);

export default router;
