import { useState } from "react";
import type { NextPage } from "next";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";

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
  const [dishes, setDishes] = useState<Dish[]>(favouriteDishes);
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const inputHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    if (e.target.value === "") {
      setDishes(favouriteDishes);
      return;
    }

    const newDishes = dishes.filter((dish: Dish) =>
      dish.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDishes(newDishes);
  };

  const filterHandleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "Ascending") {
      const newDish = favouriteDishes.sort(
        (a: Dish, b: Dish) => a.rating - b.rating
      );
      setDishes([...newDish]);
    }

    if (e.target.value === "Descending") {
      const newDish = favouriteDishes.sort(
        (a: Dish, b: Dish) => b.rating - a.rating
      );
      setDishes([...newDish]);
    }
  };

  new Darkmode().showWidget();

  const toggleModal = () => {
    setShowModal(!showModal);
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
      <Search onChange={(e) => inputHandleChange(e)} value={text} />
      <Filter
        onChange={(e) => filterHandleChange(e)}
        options={["Ascending", "Descending"]}
      />
      <button onClick={toggleModal}>Add Food</button>
      <Dishes dishes={dishes} />
      {showModal && (
        <Modal showModal={showModal}>
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
