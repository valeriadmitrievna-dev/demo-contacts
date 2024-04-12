import { FC } from "react";
import s from "./index.module.css";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const Error: FC = () => {
  const error = useRouteError();

  return (
    <div className={s.wrapper}>
      <p>Что-то пошло не так :(</p>
      {isRouteErrorResponse(error) && (
        <p>
          Статус: <span className={s.status}>{error.status}</span>
        </p>
      )}
    </div>
  );
};

export default Error;
