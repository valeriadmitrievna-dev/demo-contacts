import { ChangeEvent, FC, InputHTMLAttributes } from "react";
import s from "./index.module.css";
import cn from "classnames";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: FC<Props> = ({ className, ...props }) => {
  return <input {...props} className={cn(s.input, className)} />;
};

export default TextInput;
