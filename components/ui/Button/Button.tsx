import React from "react";
import MuiButton from "@mui/material/Button";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

const Button = ({ onClick, children }: Props) => {
  return (
    <MuiButton variant="contained" onClick={onClick}>
      {children}
    </MuiButton>
  );
};

export default Button;
