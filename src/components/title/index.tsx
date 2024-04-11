import { FC } from "react";
import s from "./index.module.css";
import cn from "classnames";

interface Props {
  children: string;
  centered?: boolean;
  className?: string;
}

const Title: FC<Props> = ({ children, centered = false, className }) => {
  return (
    <p className={cn(s.title, { [s.centered]: centered }, className)}>
      {children}
    </p>
  );
};

export default Title;
