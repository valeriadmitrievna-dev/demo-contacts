import { FC, ReactNode } from "react";
import s from "./index.module.css";
import cn from "classnames";

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
}

const Field: FC<Props> = ({ title, children, className }) => {
  return (
    <div className={cn(s.wrapper, className)}>
      <div className={s.title}>{title}</div>
      {children}
    </div>
  );
};

export default Field;
