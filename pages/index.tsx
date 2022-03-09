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

interface Dish {
  name: string;
  image: string;
  description: string;
  rating: number;
  id: number;
  placeholder?: string;
}

interface Movie {
  id?: number;
  title?: string;
  overview?: string;
  rating?: number;
}

const Home: NextPage = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const darkmode = new Darkmode();
    darkmode.showWidget();

    const getRequestToken = () => {
      const requestToken = fetch(
        "https://api.themoviedb.org/3/authentication/token/new?api_key=c992102db9c5fe7f53262e1c9ac7f3cf",
        {
          method: "GET",
          redirect: "follow",
        }
      )
        .then((response) => response.text())
        .then((result) => JSON.parse(result).request_token)
        .catch((error) => console.log("error", error));

      return new Promise((resolve) => {
        if (requestToken) resolve(requestToken);
      });
    };

    const validateRequestToken = (requestToken: string) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        username: "renzovisperas07",
        password: "Ili563RSPioCB",
        request_token: requestToken,
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const isValidateSuccess = fetch(
        "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=c992102db9c5fe7f53262e1c9ac7f3cf",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          if (JSON.parse(result).success) {
            return JSON.parse(result).request_token;
          }
        })
        .catch((error) => console.log("error", error));

      return new Promise((resolve) => {
        if (isValidateSuccess) resolve(isValidateSuccess);
      });
    };

    const getSessionId = (requestToken: string) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        request_token: requestToken,
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const sessionId = fetch(
        "https://api.themoviedb.org/3/authentication/session/new?api_key=c992102db9c5fe7f53262e1c9ac7f3cf",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          if (JSON.parse(result).success === true)
            return JSON.parse(result).session_id;
        })
        .catch((error) => console.log("error", error));

      return new Promise((resolve) => {
        if (sessionId) {
          resolve(sessionId);
        }
      });
    };

    const fetchFavoriteMoviesApi = (sessionId: string) => {
      const favoriteMoviesApi = fetch(
        `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?session_id=${sessionId}&api_key=c992102db9c5fe7f53262e1c9ac7f3cf`,
        {
          method: "GET",
          redirect: "follow",
        }
      )
        .then((response) => response.text())
        .then((result) => JSON.parse(result).results)
        .catch((error) => console.log("error", error));

      return new Promise((resolve) => {
        if (favoriteMoviesApi) resolve(favoriteMoviesApi);
      });
    };

    const getFavoriteMovies = async () => {
      const requestToken = await getRequestToken();
      const isValidateSuccess = await validateRequestToken(
        requestToken as string
      );
      const validatedRequestToken = await isValidateSuccess;
      const sessionId = await getSessionId(validatedRequestToken as string);
      const favoriteMovies = await fetchFavoriteMoviesApi(sessionId as string);
      dispatch({
        type: "SET_FAVORITE_MOVIES",
        payload: (await favoriteMovies) as Movie[],
      });
    };

    getFavoriteMovies();
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

  return (
    <>
      <Head>
        <title>My Favourite Dishes</title>
        <meta
          name="description"
          content="A list of my favourite dishes in the Philippinies which includes chicharon bulakak, pork sisig, lumpia, pork barbecue, chicken inasal and crispy pata."
        />
      </Head>
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
        {state.filteredDishes.map((dish: Dish) => (
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
