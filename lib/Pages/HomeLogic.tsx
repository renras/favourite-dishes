import { useState } from "react";

interface Dish {
  name: string;
  image: string;
  description: string;
  rating: number;
  id: number;
  placeholder: string;
}

const useFetch = ({ favouriteDishes }: { favouriteDishes: Dish[] }) => {
  const [dishes, setDishes] = useState<Dish[]>(favouriteDishes);
  const [text, setText] = useState("");

  const inputHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    if (e.target.value === "") {
      setDishes(favouriteDishes);
      return;
    }

    const newDishes = dishes.filter((dish) =>
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

  return {
    inputHandleChange,
    filterHandleChange,
    dishes,
    text,
  };
};

export default useFetch;
