import { FC, ReactNode } from "react";
import s from "./index.module.css";
import cn from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
}

const Wrapper: FC<Props> = ({ children, className }) => {
  return (
    <div className={cn(s.wrapper, className)}>
      <div className='container'>{children}</div>
    </div>
  );
};

export default Wrapper;
