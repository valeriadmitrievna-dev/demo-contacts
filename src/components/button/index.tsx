import { ButtonHTMLAttributes, FC } from "react";
import s from "./index.module.css";
import cn from "classnames";
import Loader from "../loader";

enum Colors {
  default = "default",
  accent = "accent",
  error = "error",
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  color?: keyof typeof Colors;
  loading?: boolean;
}

const Button: FC<Props> = ({
  children,
  color = "accent",
  loading = false,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(s.wrapper, s[color], { [s.loading]: loading }, className)}
    >
      {children}
      {loading && <Loader className={s.loader} />}
    </button>
  );
};

export default Button;
