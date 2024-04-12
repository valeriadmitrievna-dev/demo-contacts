import React, { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ReactPortalProps {
  children: React.ReactNode;
  wrapperId?: string;
  className?: string;
}

const createWrapperAndAppendToBody = (wrapperId: string, className: string) => {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  wrapperElement.classList.add(className);
  document.body.appendChild(wrapperElement);

  return wrapperElement;
};

const ReactPortal = ({
  children,
  wrapperId = "react-portal-wrapper",
  className = "portal",
}: ReactPortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId, className);
    }
    setWrapperElement(element);

    return () => {
      if (element && systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId, className]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};
export default ReactPortal;
