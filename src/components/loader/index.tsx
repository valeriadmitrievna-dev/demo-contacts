import { FC } from "react";
import s from "./index.module.css";
import cn from "classnames";

interface Props {
  className?: string;
}

const Loader: FC<Props> = ({ className }) => {
  return <span className={cn(s.loader, className)}></span>;
};

export default Loader;
