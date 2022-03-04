import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

import Search from "../../components/Search/Search";
import Filter from "../../components/Filter/Filter";
import styles from "./Options.module.css";

interface Dish {
  name: string;
  image: string;
  description: string;
  rating: number;
  id: number;
  placeholder?: string;
}

const Options = () => {
  const { state, dispatch } = useContext(AppContext);

  const inputHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_INPUT_TEXT", payload: e.target.value });

    if (e.target.value === "") {
      dispatch({ type: "FILTER_DISHES", payload: state.dishes });
      return;
    }

    const newDishes = state.dishes.filter((dish: Dish) =>
      dish.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch({ type: "SET_DISHES", payload: newDishes });
  };

  const toggleModal = () => {
    dispatch({ type: "TOGGLE_MODAL", payload: !state.showModal });
    dispatch({ type: "TOGGLE_DARK_MODE", payload: false });
    document.documentElement.style.setProperty("--overflow", "auto");
  };

  const filterHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "Ascending") {
      const newDish = state.dishes.sort(
        (a: Dish, b: Dish) => a.rating - b.rating
      );
      dispatch({ type: "FILTER_DISHES", payload: newDish });
    }

    if (e.target.value === "Descending") {
      const newDish = state.dishes.sort(
        (a: Dish, b: Dish) => b.rating - a.rating
      );
      dispatch({ type: "FILTER_DISHES", payload: newDish });
    }
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
