import React, { useEffect } from "react";
import ReactDom from "react-dom";

import styles from "./Modal.module.css";

interface Props {
  children: React.ReactNode;
  showModal: boolean;
}

const Modal = ({ children, showModal }: Props) => {
  useEffect(() => {
    if (showModal) {
      document.documentElement.style.setProperty("--overflow", "hidden");
    }

    if (!showModal) {
      document.documentElement.style.setProperty("--overflow", "auto");
    }
  }, [showModal]);

  if (typeof window === "object") {
    return ReactDom.createPortal(
      <div className={styles.background}>{children}</div>,
      document.getElementById("portal") as HTMLElement
    );
  }

  return null;
};

export default Modal;
