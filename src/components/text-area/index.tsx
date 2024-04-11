import { ChangeEvent, FC, TextareaHTMLAttributes } from "react";
import s from "./index.module.css";
import cn from "classnames";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: FC<Props> = ({ className, ...props }) => {
  return <textarea {...props} className={cn(s.textarea, className)} />;
};

export default TextArea;
