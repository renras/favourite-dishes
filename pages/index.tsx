import { useContext, useEffect } from "react";
import Head from "next/head";
import AppContext from "../context/AppContext";
import { NextPage } from "next";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Darkmode from "darkmode-js";
import MuiButton from "@mui/material/Button";

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

interface Props {
  favoriteMovies: Movie[];
}

const Home: NextPage<Props> = ({ favoriteMovies }) => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const darkmode = new Darkmode();
    darkmode.showWidget();

    const setFavoriteMovies = async () => {
      dispatch({
        type: "SET_FAVORITE_MOVIES",
        payload: favoriteMovies,
      });
    };

    setFavoriteMovies();
  }, [dispatch, favoriteMovies]);

  const toggleModal = () => {
    dispatch({ type: "TOGGLE_MODAL", payload: !state.showModal });
    document.documentElement.style.setProperty("--overflow", "auto");
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_INPUT_TEXT", payload: e.target.value });
    dispatch({ type: "FILTER_DISHES" });
  };

  const selectChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "Ascending") {
      dispatch({ type: "SET_SORT", payload: "ASCENDING" });
      console.log("Ascending");
    }

    if (e.target.value === "Descending") {
      dispatch({ type: "SET_SORT", payload: "DESCENDING" });
      console.log("Descending");
    }

    dispatch({ type: "FILTER_DISHES" });
  };

  const showFavoriteDishes = () => {
    dispatch({
      type: "SET_SHOW_FAVORITE_DISHES",
      payload: true,
    });
  };

  const hideFavoriteDishes = () => {
    dispatch({
      type: "SET_SHOW_FAVORITE_DISHES",
      payload: false,
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
      <Container
        maxWidth="xl"
        disableGutters
        sx={{ display: "flex", gap: "20px" }}
      >
        <MuiButton
          variant="text"
          size="large"
          onClick={showFavoriteDishes}
          sx={{
            borderBottom: state.showFavoriteDishes ? "2px solid #1976d2" : "",
            borderRadius: "0px",
            color: state.showFavoriteDishes ? "#1976d2" : "#90caf9",
          }}
        >
          Dishes
        </MuiButton>
        <MuiButton
          variant="text"
          size="large"
          onClick={hideFavoriteDishes}
          sx={{
            borderBottom: !state.showFavoriteDishes ? "2px solid #1976d2" : "",
            borderRadius: "0px",
            color: !state.showFavoriteDishes ? "#1976d2" : "#90caf9",
          }}
        >
          Movies
        </MuiButton>
      </Container>
      <Container
        maxWidth="xl"
        sx={{
          paddingTop: "25px",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <div className={styles.options}>
          <Search onChange={(e) => inputChangeHandler(e)} />
          <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Typography component="p">Sort List By Rating:</Typography>
            <Select
              onChange={(e) => selectChangeHandler(e)}
              options={["Ascending", "Descending"]}
            />
          </Box>
          <Button onClick={toggleModal}>Add Food</Button>
        </div>
        <Container
          maxWidth={false}
          disableGutters
          className={styles.dishes}
          sx={{ marginTop: "50px" }}
        >
          {state.showFavoriteDishes &&
            state.filteredDishes.map((dish: Dish) => (
              <Card
                key={dish.id}
                name={dish.name}
                image={dish.image}
                description={dish.description}
                rating={dish.rating}
                placeholder={dish.placeholder || ""}
                phone={dish.phone || ""}
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
        </Container>
      </Container>
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

export async function getStaticProps() {
  const favoriteMovies = await getFavoriteMovies(
    process.env.TMDB_API_KEY as string,
    process.env.TMDB_USERNAME as string,
    process.env.TMDB_PASSWORD as string
  );

  return {
    props: {
      favoriteMovies,
    },
  };
}
