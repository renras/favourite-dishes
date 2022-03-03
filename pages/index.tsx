import { useContext, useEffect } from "react";
import type { NextPage } from "next";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import AppContext from "../context/AppContext";

import Darkmode from "darkmode-js";
import favouriteDishes from "../dishes-favourite";
import Search from "../components/Search/Search";
import Filter from "../components/Filter/Filter";
import Dishes from "../components/Dishes/Dishes";
import Modal from "../components/Modal/Modal";
import Form from "../components/Form/Form";
import GoBackButton from "../components/GoBackButton/GoBackButton";

interface Dish {
  name: string;
  image: string;
  description: string;
  rating: number;
  id: number;
  placeholder: string;
}

const Home: NextPage = ({
  favouriteDishes,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const darkmode = new Darkmode();
    darkmode.showWidget();

    const setDishes = (dishes: Dish[]) => {
      dispatch({ type: "SET_DISHES", payload: dishes });
    };

    setDishes(favouriteDishes);
  }, [dispatch, favouriteDishes]);

  const inputHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_INPUT_TEXT", payload: e.target.value });

    if (e.target.value === "") {
      dispatch({ type: "SET_DISHES", payload: favouriteDishes });
      return;
    }

    const newDishes = favouriteDishes.filter((dish: Dish) =>
      dish.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch({ type: "SET_DISHES", payload: newDishes });
  };

  const filterHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "Ascending") {
      const newDish = state.dishes.sort(
        (a: Dish, b: Dish) => a.rating - b.rating
      );
      dispatch({ type: "SET_DISHES", payload: newDish });
    }

    if (e.target.value === "Descending") {
      const newDish = state.dishes.sort(
        (a: Dish, b: Dish) => b.rating - a.rating
      );
      dispatch({ type: "SET_DISHES", payload: newDish });
    }
  };

  const toggleModal = () => {
    dispatch({ type: "TOGGLE_MODAL", payload: !state.showModal });
    document.documentElement.style.setProperty("--overflow", "auto");
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
      <Search onChange={(e) => inputHandleChange(e)} value={state.inputText} />
      <Filter
        onChange={(e) => filterHandleChange(e)}
        options={["Ascending", "Descending"]}
      />
      <button onClick={toggleModal}>Add Food</button>
      <Dishes dishes={state.dishes} />
      {state.showModal && (
        <Modal>
          <GoBackButton clickHandler={toggleModal} />
          <Form />
        </Modal>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      favouriteDishes,
    },
  };
};

export default Home;
