import type { NextPage } from "next";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import useFetch from "../lib/Pages/HomeLogic";
import favouriteDishes from "../dishes-favourite";
import Search from "../components/Search/Search";
import Filter from "../components/Filter/Filter";
import Dishes from "../components/Dishes/Dishes";

const Home: NextPage = ({
  favouriteDishes,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { inputHandleChange, filterHandleChange, dishes, text } = useFetch({
    favouriteDishes,
  });

  return (
    <>
      <Search onChange={(e) => inputHandleChange(e)} value={text} />
      <Filter
        onChange={(e) => filterHandleChange(e)}
        options={["Ascending", "Descending"]}
      />
      <Dishes dishes={dishes} />
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
