import { useContext, useEffect } from "react";
import type { NextPage } from "next";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import AppContext from "../context/AppContext";

import Darkmode from "darkmode-js";
import favouriteDishes from "../dishes-favourite";
import Dishes from "../components/Dishes/Dishes";
import Modal from "../components/Modal/Modal";
import Form from "../components/Form/Form";
import GoBackButton from "../components/GoBackButton/GoBackButton";
import Options from "../components/Options/Options";

interface Dish {
  name: string;
  image: string;
  description: string;
  rating: number;
  id: number;
  placeholder?: string;
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
      <Options />
      <Dishes
        dishes={
          state.filteredDishes.length > 0 ? state.filteredDishes : state.dishes
        }
      />
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
