import { ButtonHTMLAttributes, FC, MouseEvent } from "react";
import s from "./index.module.css";
import cn from "classnames";
import Loader from "../loader";
import { useNavigate } from "react-router-dom";

enum ButtonColors {
  default = "default",
  accent = "accent",
  error = "error",
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | JSX.Element;
  color?: keyof typeof ButtonColors;
  loading?: boolean;
  to?: string;
}

const Button: FC<Props> = ({
  children,
  color = "accent",
  loading = false,
  className,
  to,
  ...props
}) => {
  const navigate = useNavigate();

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (to) navigate(to);
    else props.onClick?.(event);
  };

  return (
    <button
      {...props}
      className={cn(s.wrapper, s[color], { [s.loading]: loading }, className)}
      onClick={onClick}
    >
      {children}
      {loading && <Loader className={s.loader} />}
    </button>
  );
};

export default Button;
