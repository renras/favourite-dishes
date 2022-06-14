import React, { useEffect } from "react";
import ReactDom from "react-dom";

import styles from "./Modal.module.css";

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", "hidden");

    return () => {
      document.documentElement.style.setProperty("--overflow", "auto");
    };
  }, []);

  if (typeof window === "object") {
    return ReactDom.createPortal(
      <div className={styles.modal}>{children}</div>,
      document.getElementById("portal") as HTMLElement
    );
  }

  return null;
};

export default Modal;
