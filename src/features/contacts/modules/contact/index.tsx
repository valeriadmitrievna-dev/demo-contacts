import { FC } from "react";
import s from "./index.module.css";
import { useParams } from "react-router-dom";
import { useGetContactQuery } from "../../services/contacts.api";
import Wrapper from "../wrapper";
import Title from "../../../../components/title";
import Button from "../../../../components/button";
import Loader from "../../../../components/loader";
import Field from "../../../../components/field";

const ContactPage: FC = () => {
  const { id = "" } = useParams();
  const { data: contact = null, isLoading } = useGetContactQuery(id, {
    skip: !id,
  });

  if (isLoading || !contact || id !== contact._id) {
    return <Loader page />;
  }

  console.log(contact);

  return (
    <Wrapper>
      <header className={s.header}>
        <Title>Данные контакта:</Title>
        <div className={s.actions}>
          <Button>Изменить</Button>
          <Button color='error'>Удалить</Button>
        </div>
      </header>
      <div className={s.data}>
        <Field title='Роль' className={s.field}>
          {contact.role}
        </Field>
        <Field title='Имя' className={s.field}>
          {contact.name}
        </Field>
        <Field title='Номера телефона' className={s.field}>
          <div className={s.list}>
            {contact.phones.map((value) => (
              <p key={value}>{value}</p>
            ))}
          </div>
        </Field>
        <Field title='Emails' className={s.field}>
          <div className={s.list}>
            {contact.emails.map((value) => (
              <p key={value}>{value}</p>
            ))}
          </div>
        </Field>
        <Field title='Биография' className={s.field}>
          {contact.bio}
        </Field>
      </div>
    </Wrapper>
  );
};

export default ContactPage;
