import React from "react";

import styles from "./GoBackButton.module.css";

interface Props {
  animate?: boolean;
  clickHandler: () => void;
}

const GoBackButton = ({ animate = false, clickHandler }: Props) => {
  return (
    <div>
      <button
        className={`${styles.goBack} ${animate && styles.animate}`}
        onClick={clickHandler}
      >
        Go Back
      </button>
    </div>
  );
};

export default GoBackButton;
