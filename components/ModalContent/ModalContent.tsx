import React from "react";

interface Props {
  children: React.ReactNode;
  styles?: string;
}

const ModalContent = ({ children, styles }: Props) => {
  return <div className={styles}>{children}</div>;
};

export default ModalContent;
