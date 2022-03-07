import React, { useEffect } from "react";
import ReactDom from "react-dom";

import styles from "./Modal.module.css";
import ModalContent from "../ModalContent/ModalContent";

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  useEffect(() => {
    document.documentElement.style.setProperty("--overflow", "hidden");
  }, []);

  if (typeof window === "object") {
    return ReactDom.createPortal(
      <ModalContent styles={styles.modal}>{children}</ModalContent>,
      document.getElementById("portal") as HTMLElement
    );
  }

  return null;
};

export default Modal;
