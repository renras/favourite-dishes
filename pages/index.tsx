import { useContext, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import AppContext from "../context/AppContext";

import Darkmode from "darkmode-js";
import Dishes from "../components/Dishes/Dishes";
import Modal from "../components/Modal/Modal";
import Form from "../components/Form/Form";
import GoBackButton from "../components/GoBackButton/GoBackButton";
import Options from "../components/Options/Options";

const Home: NextPage = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const darkmode = new Darkmode();
    darkmode.showWidget();
  });

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
      <Dishes dishes={state.filteredDishes} />
      {state.showModal && (
        <Modal>
          <GoBackButton clickHandler={toggleModal} />
          <Form />
        </Modal>
      )}
    </>
  );
};

export default Home;
