import { FC, useState } from "react";
import s from "./index.module.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../../services/contacts.api";
import Wrapper from "../wrapper";
import Title from "../../../../components/title";
import Button from "../../../../components/button";
import Loader from "../../../../components/loader";
import Field from "../../../../components/field";
import Dialog from "../../../../components/dialog";

const ContactPage: FC = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const { data: contact = null, isLoading } = useGetContactQuery(id, {
    skip: !id,
  });

  const [isDeletingOpen, setDeletingOpen] = useState(false);

  const onOpenDeletion = () => setDeletingOpen(true);
  const onCloseDeletion = () => {
    if (!isDeleting) {
      setDeletingOpen(false);
    }
  };

  const onDelete = () => {
    if (id && contact && id === contact._id) {
      deleteContact(id).then(() => {
        setDeletingOpen(false);
        navigate("/contacts");
      });
    }
  };

  if (isLoading || !contact || id !== contact._id) {
    return <Loader page />;
  }

  return (
    <>
      <Wrapper>
        <header className={s.header}>
          <Title>Данные контакта:</Title>
          <div className={s.actions}>
            <Button to={`/contacts/${contact._id}/edit`}>Изменить</Button>
            <Button color='error' onClick={onOpenDeletion}>
              Удалить
            </Button>
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
          {!!contact.bio && (
            <Field title='Биография' className={s.field}>
              {contact.bio}
            </Field>
          )}
        </div>
      </Wrapper>
      <Dialog
        isOpen={isDeletingOpen}
        onClose={onCloseDeletion}
        text='Вы действительно хотите удалить контакт?'
        options={{
          cancel: {
            color: "accent",
            disabled: isDeleting,
          },
          submit: {
            title: "Удалить",
            color: "error",
            loading: isDeleting,
          },
        }}
        onCancel={onCloseDeletion}
        onSubmit={onDelete}
      />
    </>
  );
};

export default ContactPage;
