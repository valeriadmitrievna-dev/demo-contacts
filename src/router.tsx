import { createBrowserRouter } from "react-router-dom";
import IndexPage from "./features";
import AuthPage from "./features/auth";
import ContactsPage from "./features/contacts";
import ContactPage from "./features/contacts/modules/contact";
import ContactForm from "./features/contacts/modules/form";

const router = createBrowserRouter(
  [
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
              element: <ContactForm action='edit' />,
            },
            {
              path: "new",
              element: <ContactForm action='create' />,
            },
          ],
        },
      ],
    },
  ],
  { basename: "/demo-contacts/" }
);

export default router;
