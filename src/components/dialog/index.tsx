import { ComponentProps, FC, useRef } from "react";
import s from "./index.module.css";
import cn from "classnames";
import ReactPortal from "../portal";
import useDelayUnmount from "../../hooks/useDelayUnmount";
import Button from "../button";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const DELAY = 200;

interface OptionProps extends Omit<ComponentProps<typeof Button>, "children"> {
  title?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  onCancel?: () => void;
  onSubmit?: () => void;
  className?: string;
  options?: {
    cancel?: OptionProps;
    submit?: OptionProps;
  };
}

const Dialog: FC<Props> = ({
  isOpen,
  onClose,
  text,
  onCancel,
  onSubmit,
  className,
  options,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const mounted = useDelayUnmount(isOpen, DELAY);

  useOnClickOutside(ref, onClose);

  if (!mounted) return null;
  return (
    <ReactPortal>
      <div
        style={{ animationDuration: DELAY + "ms" }}
        className={cn(s.overlay, { [s.unmounting]: !isOpen })}
      >
        <div ref={ref} className={cn(s.dialog, className)}>
          <p>{text}</p>
          <div className={s.actions}>
            {!!onCancel && (
              <Button
                color={options?.cancel?.color || "default"}
                onClick={onCancel}
              >
                {options?.cancel?.title || "Отменить"}
              </Button>
            )}
            {!!onSubmit && (
              <Button
                color={options?.submit?.color || "accent"}
                onClick={onSubmit}
              >
                {options?.submit?.title || "Подтвердить"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default Dialog;
