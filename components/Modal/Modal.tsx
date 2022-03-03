import React from "react";
import ReactDom from "react-dom";

const Modal = ({ children }: { children: React.ReactNode }) => {
  if (typeof window === "object") {
    return ReactDom.createPortal(
      <div>{children}</div>,
      document.getElementById("portal") as HTMLElement
    );
  }

  return null;
};

export default Modal;
