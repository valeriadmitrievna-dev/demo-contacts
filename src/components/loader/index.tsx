import { FC } from "react";
import s from "./index.module.css";
import cn from "classnames";

interface Props {
  page?: boolean;
  className?: string;
}

const Loader: FC<Props> = ({ page = false, className }) => {
  return <span className={cn(s.loader, { [s.full]: page }, className)}></span>;
};

export default Loader;
