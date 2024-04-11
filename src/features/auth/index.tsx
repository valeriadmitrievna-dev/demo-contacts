import { ChangeEvent, FC, useState } from "react";
import s from "./index.module.css";
import Field from "../../components/field";
import Title from "../../components/title";
import Button from "../../components/button";
import TextInput from "../../components/text-input";
import { useSignInMutation } from "./services/auth.api";

const AuthPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, { isLoading, error }] = useSignInMutation();

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmit = async () => {
    signIn({ email, password });
  };

  return (
    <div className={s.wrapper}>
      <Title centered>Авторизация</Title>
      <div className={s.fields}>
        <Field title='Email'>
          <TextInput value={email} onChange={handleChangeEmail} />
        </Field>
        <Field title='Пароль'>
          <TextInput
            type='password'
            value={password}
            onChange={handleChangePassword}
          />
        </Field>
      </div>
      <Button onClick={onSubmit} className={s.button} loading={isLoading}>
        Войти
      </Button>
      {!!error && "data" in error && (
        <p className={s.error}>{JSON.stringify(error.data)}</p>
      )}
    </div>
  );
};

export default AuthPage;
