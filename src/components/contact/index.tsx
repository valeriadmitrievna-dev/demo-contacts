import { FC } from "react";
import { ContactInterface } from "../../features/contacts/services/contacts.types";
import s from "./index.module.css";
import cn from "classnames";
import { NavLink } from "react-router-dom";

interface Props extends ContactInterface {
  className?: string;
}

const Contact: FC<Props> = ({ _id, name, phones, className }) => {
  return (
    <NavLink
      to={`/contacts/${_id}`}
      className={({ isActive }) =>
        cn(s.wrapper, { [s.active]: isActive }, className)
      }
    >
      <div className={s.main}>
        <p className={s.name}>{name}</p>
        <span className={s.id}>#{_id}</span>
      </div>
      <div className={s.phones}>
        <p className={s.phone}>{phones[0]}</p>
        {phones.length > 1 && (
          <span className={s.extra}>and {phones.slice(1).length} more</span>
        )}
      </div>
    </NavLink>
  );
};

export default Contact;
