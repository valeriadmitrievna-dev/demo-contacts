import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import s from "./index.module.css";
import Wrapper from "../wrapper";
import Title from "../../../../components/title";
import Button from "../../../../components/button";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
} from "../../services/contacts.api";
import Field from "../../../../components/field";
import TextInput from "../../../../components/text-input";
import PlusIcon from "../../../../icons/plus.svg?react";
import MinusIcon from "../../../../icons/minus.svg?react";
import Loader from "../../../../components/loader";
import TextArea from "../../../../components/text-area";

enum Action {
  edit = "edit",
  create = "create",
}

interface Props {
  action: keyof typeof Action;
}

const ContactForm: FC<Props> = ({ action }) => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: contact = null, isLoading } = useGetContactQuery(id, {
    skip: !id || action === "create",
  });

  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();
  const [createContact, { isLoading: isCreating }] = useCreateContactMutation();

  const [role, setRole] = useState(contact?.role || "");
  const [name, setName] = useState(contact?.name || "");
  const [phones, setPhones] = useState(contact?.phones || [""]);
  const [emails, setEmails] = useState(contact?.emails || [""]);
  const [bio, setBio] = useState(contact?.bio || "");

  const [error, setError] = useState<string | null>(null);
  const [isModified, setModified] = useState(false);

  const handleChangeRole = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setRole(event.target.value);
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setName(event.target.value);
  };

  const handleChangePhone = (value: string, editId: number) => {
    setError(null);
    setPhones((curr) =>
      curr.map((phone, id) => {
        if (id === editId) return value;
        else return phone;
      })
    );
  };

  const addPhone = () => {
    setError(null);
    setPhones((curr) => [...curr, ""]);
  };

  const removePhone = (removeId: number) => {
    setError(null);
    setPhones((curr) => curr.filter((_, id) => id !== removeId));
  };

  const handleChangeEmail = (value: string, editId: number) => {
    setError(null);
    setEmails((curr) =>
      curr.map((phone, id) => {
        if (id === editId) return value;
        else return phone;
      })
    );
  };

  const addEmail = () => {
    setError(null);
    setEmails((curr) => [...curr, ""]);
  };

  const removeEmail = (removeId: number) => {
    setError(null);
    setEmails((curr) => curr.filter((_, id) => id !== removeId));
  };

  const handleChangeBio = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setError(null);
    setBio(event.target.value);
  };

  const onCancel = () => {
    if (action === "edit" && !!id) {
      navigate(`/contacts/${id}`);
    }

    if (action === "create") {
      navigate("/contacts");
    }
  };

  const onSubmit = () => {
    setError(null);

    if (timeout && timeout.current) {
      clearTimeout(timeout.current);
      setModified(false);
    }

    if (!role) {
      setError("Role is required");
      return;
    }

    if (!name) {
      setError("Name is required");
      return;
    }

    const clearPhones = phones.filter((v) => !!v);
    const clearEmails = emails.filter((v) => !!v);

    if (clearPhones.length) {
      setPhones(clearPhones);
    } else {
      setError("At least 1 phone is required");
      setPhones([""]);
      return;
    }

    if (clearEmails.length) {
      setEmails(clearEmails);
    } else {
      setError("At least 1 email is required");
      setEmails([""]);
      return;
    }

    if (action === "edit" && !!contact) {
      const body = {
        ...contact,
        role,
        name,
        phones: clearPhones.length ? clearPhones : [""],
        emails: emails.filter((v) => !!v),
        bio,
      };

      if (
        JSON.stringify(contact) ===
        JSON.stringify({ ...body, _id: contact?._id })
      ) {
        setError("Nothing changed");
        return;
      }

      updateContact({ ...body, _id: contact._id }).then(() => {
        setModified(true);
        timeout.current = setTimeout(() => {
          setModified(false);
        }, 1000);
      });
    }

    if (action === "create") {
      const body = {
        role,
        name,
        phones: clearPhones.length ? clearPhones : [""],
        emails: emails.filter((v) => !!v),
        bio,
      };

      createContact(body).then((res) => {
        if ("data" in res) {
          navigate(`/contacts/${res.data._id}`);
        }
      });
    }
  };

  useEffect(() => {
    if (contact) {
      setRole(contact.role);
      setName(contact.name);
      setPhones(contact.phones);
      setEmails(contact.emails);
      setBio(contact.bio);
    }
  }, [contact]);

  if (action === "edit" && (isLoading || !contact || id !== contact._id)) {
    return <Loader page />;
  }

  return (
    <Wrapper>
      <header className={s.header}>
        <Title>Данные контакта:</Title>
        <div className={s.actions}>
          <Button color='default' onClick={onCancel}>
            Отменить
          </Button>
          <Button onClick={onSubmit} loading={isUpdating || isCreating}>
            {isModified ? "Сохранено" : "Сохранить"}
          </Button>
        </div>
      </header>
      <div className={s.data}>
        <Field title='Роль'>
          <TextInput
            value={role}
            onChange={handleChangeRole}
            className={s.input}
          />
        </Field>
        <Field title='Имя'>
          <TextInput
            value={name}
            onChange={handleChangeName}
            className={s.input}
          />
        </Field>
        <Field title='Номера телефона'>
          <div className={s.list}>
            {phones.map((phone, id) => (
              <div key={id} className={s.value}>
                <TextInput
                  value={phone}
                  onChange={(event) =>
                    handleChangePhone(event.target.value, id)
                  }
                  className={s.input}
                />
                <div className={s.actions}>
                  {phones.length > 1 && (
                    <Button
                      className={s.button}
                      onClick={() => removePhone(id)}
                    >
                      <MinusIcon className={s.icon} />
                    </Button>
                  )}
                  {id === phones.length - 1 && (
                    <Button className={s.button} onClick={addPhone}>
                      <PlusIcon className={s.icon} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Field>
        <Field title='Emails'>
          <div className={s.list}>
            {emails.map((email, id) => (
              <div key={id} className={s.value}>
                <TextInput
                  value={email}
                  onChange={(event) =>
                    handleChangeEmail(event.target.value, id)
                  }
                  className={s.input}
                />
                <div className={s.actions}>
                  {emails.length > 1 && (
                    <Button
                      className={s.button}
                      onClick={() => removeEmail(id)}
                    >
                      <MinusIcon className={s.icon} />
                    </Button>
                  )}
                  {id === emails.length - 1 && (
                    <Button className={s.button} onClick={addEmail}>
                      <PlusIcon className={s.icon} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Field>
        <Field title='Биография'>
          <TextArea
            value={bio}
            onChange={handleChangeBio}
            className={s.input}
          />
        </Field>
      </div>
      {error && <p className={s.error}>{error}</p>}
    </Wrapper>
  );
};

export default ContactForm;
