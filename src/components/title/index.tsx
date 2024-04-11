import { FC } from "react";
import s from "./index.module.css";
import cn from "classnames";

interface Props {
  children: string;
  centered?: boolean;
}

const Title: FC<Props> = ({ children, centered = false }) => {
  return <p className={cn(s.title, { [s.centered]: centered })}>{children}</p>;
};

export default Title;
