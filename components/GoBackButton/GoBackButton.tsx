import React from "react";

import styles from "./GoBackButton.module.css";

interface Props {
  animate?: boolean;
  clickHandler: () => void;
  style?: string;
}

const GoBackButton = ({ animate = false, clickHandler, style }: Props) => {
  return (
    <div>
      <button
        className={`${animate && styles.animate} ${style}`}
        onClick={clickHandler}
      >
        Go Back
      </button>
    </div>
  );
};

export default GoBackButton;
