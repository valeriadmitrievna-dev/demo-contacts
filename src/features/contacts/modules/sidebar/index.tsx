import { FC } from "react";
import s from "./index.module.css";
import Title from "../../../../components/title";
import { useAppSelector } from "../../../../app/store";
import { selectUserData } from "../../../auth/services/auth.selectors";
import { ContactInterface } from "../../services/contacts.types";
import Contact from "../../../../components/contact";
import Button from "../../../../components/button";

interface Props {
  contacts: ContactInterface[];
}

const Sidebar: FC<Props> = ({ contacts }) => {
  const user = useAppSelector(selectUserData);

  return (
    <aside className={s.wrapper}>
      <header className={s.header}>
        <Title>Контакты:</Title>
        <Button to='/contacts/new'>Создать контакт</Button>
      </header>
      <div className={s.list}>
        {contacts.map((contact) => (
          <Contact key={contact._id} {...contact} />
        ))}
      </div>
      <div className={s.user}>
        <span className={s.name}>{user.name}</span>
        <span className={s.email}>{user.email}</span>
      </div>
    </aside>
  );
};

export default Sidebar;
