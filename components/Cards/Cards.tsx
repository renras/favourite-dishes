import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";

import styles from "./Cards.module.css";
import Card from "../Card/Card";
import { Dish } from "../../context/AppContext";
import { Movie } from "../../context/AppContext";

const Cards = () => {
  const { state } = useContext(AppContext);
  useEffect(() => {
    if (state.favoriteMovies) console.log(state.favoriteMovies);
  }, [state.favoriteMovies]);

  if (state.showFavoriteDishes) {
    return (
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
      </div>
    );
  }

  return (
    <div className={styles.dishes}>
      {state.favoriteMovies &&
        state.favoriteMovies.map((movie: Movie) => {
          return (
            <Card
              key={movie.id}
              name={movie.title as string}
              image={
                "https://images.pexels.com/photos/5662857/pexels-photo-5662857.png?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200"
              }
              description={movie.overview as string}
              rating={Math.floor((movie.vote_average as number) / 2)}
            />
          );
        })}
      {!state.favoriteMovies && <p>No favorite movies</p>}
    </div>
  );
};

export default Cards;
