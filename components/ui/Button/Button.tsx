import React from "react";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

const Button = ({ onClick, children }: Props) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
