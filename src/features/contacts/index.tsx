import { FC, useEffect } from "react";
import s from "./index.module.css";
import Sidebar from "./modules/sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGetContactsQuery } from "./services/contacts.api";
import Loader from "../../components/loader";

const ContactsPage: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data: contacts = [], isLoading } = useGetContactsQuery();

  useEffect(() => {
    if (
      (pathname.endsWith("contacts") || pathname.endsWith("contacts/")) &&
      !!contacts.length
    ) {
      navigate(`/contacts/${contacts[0]._id}`, { replace: true });
    }
  }, [pathname, contacts]);

  if (isLoading) {
    return <Loader page />;
  }

  return (
    <div className={s.wrapper}>
      <Sidebar contacts={contacts} />
      <Outlet />
    </div>
  );
};

export default ContactsPage;
