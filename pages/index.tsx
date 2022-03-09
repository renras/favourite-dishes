import { useContext, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import AppContext from "../context/AppContext";

import Darkmode from "darkmode-js";
import Modal from "../components/Modal/Modal";
import Form from "../components/Form/Form";
import styles from "../styles/index.module.css";
import Card from "../components/Card/Card";
import Search from "../components/ui/Search/Search";
import Select from "../components/ui/Select/Select";
import Button from "../components/ui/Button/Button";
import { getFavoriteMovies } from "../lib/tmdb-api";
import { Dish } from "../context/AppContext";
import { Movie } from "../context/AppContext";

const Home: NextPage = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const darkmode = new Darkmode();
    darkmode.showWidget();

    const setFavoriteMovies = async () => {
      dispatch({
        type: "SET_FAVORITE_MOVIES",
        payload: (await getFavoriteMovies()) as Movie[],
      });
    };

    setFavoriteMovies();
  }, [dispatch]);

  const toggleModal = () => {
    dispatch({ type: "TOGGLE_MODAL", payload: !state.showModal });
    document.documentElement.style.setProperty("--overflow", "auto");
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_INPUT_TEXT", payload: e.target.value });
    dispatch({ type: "FILTER_DISHES" });
  };

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "Ascending") {
      dispatch({ type: "SET_SORT", payload: "ASCENDING" });
    }

    if (e.target.value === "Descending") {
      dispatch({ type: "SET_SORT", payload: "DESCENDING" });
    }

    dispatch({ type: "FILTER_DISHES" });
  };

  const showFavoriteDishes = () => {
    dispatch({
      type: "SET_SHOW_FAVORITE_DISHES",
      payload: !state.showFavoriteDishes,
    });
  };

  return (
    <>
      <Head>
        <title>
          {state.showFavoriteDishes ? "Favorite Dishes" : "Favorite Movies"}
        </title>
        <meta
          name="description"
          content="A list of my favourite dishes in the Philippinies which includes chicharon bulakak, pork sisig, lumpia, pork barbecue, chicken inasal and crispy pata."
        />
      </Head>
      <div className={styles.buttonGroup}>
        <Button onClick={showFavoriteDishes}>Show Favorite Dishes</Button>
      </div>
      <div className={styles.options}>
        <Search onChange={(e) => inputChangeHandler(e)} />
        <div>
          <label htmlFor="rating">Sort list by rating:</label>
          <Select
            onChange={(e) => selectChangeHandler(e)}
            name="rating"
            options={["ASCENDING, DESCENDING"]}
          />
        </div>
        <Button onClick={toggleModal}>Add Food</Button>
      </div>
      <div className={styles.dishes}>
        {state.showFavoriteDishes &&
          state.filteredDishes.map((dish: Dish) => (
            <Card
              key={dish.id}
              name={dish.name}
              image={dish.image}
              description={dish.description}
              rating={dish.rating}
              placeholder={dish.placeholder || ""}
            />
          ))}
        {!state.showFavoriteDishes &&
          state.favoriteMovies?.map((movie: Movie) => (
            <Card
              key={movie.id}
              name={movie.title as string}
              image={
                "https://images.pexels.com/photos/5662857/pexels-photo-5662857.png?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200"
              }
              description={movie.overview as string}
              rating={Math.floor((movie.vote_average as number) / 2)}
            />
          ))}
      </div>
      {state.showModal && (
        <Modal>
          <button className={styles.animate} onClick={toggleModal}>
            Go Back
          </button>
          <Form />
        </Modal>
      )}
    </>
  );
};

export default Home;
