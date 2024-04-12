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
import { isEmailValid } from "../../../../utils/helpers";

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

  const [errors, setErrors] = useState<string[]>([]);
  const [isModified, setModified] = useState(false);

  const handleChangeRole = (event: ChangeEvent<HTMLInputElement>) => {
    setErrors([]);
    setRole(event.target.value);
  };

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setErrors([]);
    setName(event.target.value);
  };

  const handleChangePhone = (value: string, editId: number) => {
    setErrors([]);

    setPhones((curr) =>
      curr.map((phone, id) => {
        if (id === editId)
          return value
            .replace(/\D/g, "")
            .replace(/^(\d)/, "($1")
            .replace(/^(\(\d{3})(\d)/, "$1) $2")
            .replace(/(\d{3})(\d{1,4})/, "$1-$2")
            .replace(/(-\d{4})\d+?$/, "$1");
        else return phone;
      })
    );
  };

  const addPhone = () => {
    setErrors([]);
    setPhones((curr) => [...curr, ""]);
  };

  const removePhone = (removeId: number) => {
    setErrors([]);
    setPhones((curr) => curr.filter((_, id) => id !== removeId));
  };

  const handleChangeEmail = (value: string, editId: number) => {
    setErrors([]);
    setEmails((curr) =>
      curr.map((phone, id) => {
        if (id === editId) return value;
        else return phone;
      })
    );
  };

  const addEmail = () => {
    setErrors([]);
    setEmails((curr) => [...curr, ""]);
  };

  const removeEmail = (removeId: number) => {
    setErrors([]);
    setEmails((curr) => curr.filter((_, id) => id !== removeId));
  };

  const handleChangeBio = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setErrors([]);
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
    setErrors([]);
    const errors = [];

    if (timeout && timeout.current) {
      clearTimeout(timeout.current);
      setModified(false);
    }

    if (!role) {
      errors.push("Role is required");
    }

    if (!name) {
      errors.push("Name is required");
    }

    const clearPhones = phones.filter((v) => !!v);
    const clearEmails = emails.filter((v) => !!v);

    if (clearPhones.length) {
      setPhones(clearPhones);

      clearPhones.forEach((phone, id) => {
        if (phone.replace(/\D/g, "").length !== 10) {
          errors.push(`Phone #${id + 1} isn't valid`);
        }
      });
    } else {
      errors.push("At least 1 phone is required");
      setPhones([""]);
    }

    if (clearEmails.length) {
      setEmails(clearEmails);

      clearEmails.forEach((email, id) => {
        if (!isEmailValid(email)) {
          errors.push(`Email #${id + 1} isn't valid`);
        }
      });
    } else {
      errors.push("At least 1 email is required");
      setEmails([""]);
    }

    if (errors.length) {
      setErrors(errors);
      return;
    }

    if (action === "edit" && !!contact) {
      const body = {
        ...contact,
        role,
        name,
        phones: clearPhones,
        emails: clearEmails,
        bio,
      };

      if (
        JSON.stringify(contact) ===
        JSON.stringify({ ...body, _id: contact?._id })
      ) {
        setErrors(["Nothing changed"]);
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
        phones: clearPhones,
        emails: clearEmails,
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
    setErrors([]);

    if (contact && action === "edit") {
      setRole(contact.role);
      setName(contact.name);
      setPhones(contact.phones);
      setEmails(contact.emails);
      setBio(contact.bio);
    }

    if (action === "create") {
      setRole("");
      setName("");
      setPhones([""]);
      setEmails([""]);
      setBio("");
    }
  }, [contact, action]);

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
      {!!errors.length && (
        <div className={s.errors}>
          {errors.map((error, errorId) => (
            <p key={"error" + errorId}>{error}</p>
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default ContactForm;
