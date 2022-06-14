import { useState } from "react";
import Head from "next/head";
import { Dish } from "../types/dish";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";
import { startCase, toLower } from "lodash";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MuiButton from "@mui/material/Button";
import Modal from "../components/Modal/Modal";
import Form from "../components/Form/Form";
import styles from "../styles/index.module.css";
import Card from "../components/Card/Card";
import Search from "../components/ui/Search/Search";
import Select from "../components/ui/Select/Select";
import Error from "../components/Error/Error";
import Loading from "../components/Loading/Loading";
import axios from "axios";
import { successToast } from "../utils/toast";

const Home = () => {
  const { mutate } = useSWRConfig();
  const { data: session } = useSession();
  const { data: dishes, error: dishesError } = useSWR<Dish[]>(
    "/api/v1/dish",
    fetcher
  );
  const [isAddingDish, setIsAddingDish] = useState(false);
  const [currentActiveTab, setCurrentActiveTab] = useState<"DISHES" | "MOVIES">(
    "DISHES"
  );

  if (dishesError) return <Error />;
  if (!dishes) return <Loading />;

  const handleInputChange = () => {
    console.log("input changed");
  };

  const handleSelectChange = () => {
    console.log("select changed");
  };

  const handleDeleteCard = async (id: string) => {
    try {
      await axios.delete(`/api/v1/dish?id=${id}`);
      await mutate("/api/v1/dish");
      successToast("Dish deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>{`Favorite ${startCase(toLower(currentActiveTab))}`}</title>
        <meta
          name="description"
          content="A list of my favourite dishes in the Philippinies which includes chicharon bulakak, pork sisig, lumpia, pork barbecue, chicken inasal and crispy pata."
        />
      </Head>
      <Container
        maxWidth="xl"
        sx={{
          marginTop: "50px",
        }}
      >
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            display: "flex",
            gap: "20px",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <MuiButton
            variant="text"
            size="large"
            onClick={() => setCurrentActiveTab("DISHES")}
            sx={{
              borderBottom:
                currentActiveTab === "DISHES" ? "2px solid #1976d2" : "",
              borderRadius: "0px",
              color: currentActiveTab === "DISHES" ? "#1976d2" : "#90caf9",
            }}
          >
            Dishes
          </MuiButton>
          <MuiButton
            variant="text"
            size="large"
            onClick={() => setCurrentActiveTab("MOVIES")}
            sx={{
              borderBottom:
                currentActiveTab === "MOVIES" ? "2px solid #1976d2" : "",
              borderRadius: "0px",
              color: currentActiveTab === "DISHES" ? "#1976d2" : "#90caf9",
            }}
          >
            Movies
          </MuiButton>
        </Container>
      </Container>
      <Container
        maxWidth="xl"
        sx={{
          paddingTop: "25px",
        }}
      >
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Search onChange={handleInputChange} />
          <Select
            onChange={handleSelectChange}
            options={["Ascending", "Descending"]}
          />
          {session && (
            <MuiButton
              onClick={() => setIsAddingDish(true)}
              variant="contained"
              sx={{ marginLeft: "auto" }}
            >
              Add Dish
            </MuiButton>
          )}
        </Box>
        <Container
          disableGutters
          maxWidth={false}
          className={styles.dishes}
          sx={{ marginTop: "50px" }}
        >
          {currentActiveTab === "DISHES" &&
            dishes.map((dish: Dish) => (
              <Card
                key={dish.id}
                id={dish.id}
                name={dish.name}
                image={dish.image}
                description={dish.description}
                rating={dish.rating}
                authorId={dish.authorId}
                currentUserId={session?.user?.id}
                onDelete={handleDeleteCard}
              />
            ))}
          {/* TODO: MOVIES */}
          {/*{!state.showFavoriteDishes &&*/}
          {/*  state.favoriteMovies?.map((movie: Movie) => (*/}
          {/*    <Card*/}
          {/*      key={movie.id}*/}
          {/*      id={movie.id}*/}
          {/*      name={movie.title as string}*/}
          {/*      image={*/}
          {/*        "https://images.pexels.com/photos/5662857/pexels-photo-5662857.png?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200"*/}
          {/*      }*/}
          {/*      description={movie.overview as string}*/}
          {/*      rating={Math.floor((movie.vote_average as number) / 2)}*/}
          {/*    />*/}
          {/*  ))}*/}
        </Container>
      </Container>
      {isAddingDish && (
        <Modal>
          <Form onClose={setIsAddingDish} />
        </Modal>
      )}
    </>
  );
};

export default Home;
