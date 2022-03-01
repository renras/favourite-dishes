import React from "react";

import Card from "../Card/Card";
import styles from "./Dishes.module.css";

interface Dish {
  name: string;
  image: string;
  description: string;
  rating: number;
  id: number;
}

interface Props {
  dishes: Dish[];
}

const Dishes = ({ dishes }: Props) => {
  return (
    <div className={styles.dishes}>
      {dishes.map((dish: Dish) => (
        <Card
          key={dish.id}
          name={dish.name}
          image={dish.image}
          description={dish.description}
          rating={dish.rating}
        />
      ))}
    </div>
  );
};

export default Dishes;
