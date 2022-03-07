import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

import Search from "../../components/Search/Search";
import Filter from "../Filter/Select";
import styles from "./Options.module.css";

const Options = () => {
  const { state, dispatch } = useContext(AppContext);

  const inputHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_INPUT_TEXT", payload: e.target.value });
    dispatch({ type: "FILTER_DISHES" });
  };

  const toggleModal = () => {
    dispatch({ type: "TOGGLE_MODAL", payload: !state.showModal });
    document.documentElement.style.setProperty("--overflow", "auto");
  };

  const filterHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "Ascending") {
      dispatch({ type: "SET_SORT", payload: "ASCENDING" });
    }

    if (e.target.value === "Descending") {
      dispatch({ type: "SET_SORT", payload: "DESCENDING" });
    }

    dispatch({ type: "FILTER_DISHES" });
  };

  return (
    <div className={styles.options}>
      <Search onChange={(e) => inputHandleChange(e)} value={state.inputText} />
      <Filter
        onChange={(e) => filterHandleChange(e)}
        options={["Ascending", "Descending"]}
      />
      <button onClick={toggleModal}>Add Food</button>
    </div>
  );
};

export default Options;
