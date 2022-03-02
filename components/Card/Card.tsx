import React, { useState } from "react";

import Image from "next/image";
import styles from "./Card.module.css";

interface Props {
  name: string;
  image: string;
  description: string;
  rating: number;
}

const Card = ({ name, image, description, rating }: Props) => {
  const [isImageHidden, setIsImageHidden] = useState(true);

  const imgClickHandler = () => {
    setIsImageHidden(!isImageHidden);
  };

  return (
    <div>
      <div
        className={`${styles.imageWrapper_1} ${
          !isImageHidden && styles.hidden
        }`}
        onClick={imgClickHandler}
      >
        <button>NSFW Click to view image</button>
      </div>
      <div
        className={`${styles.imageWrapper_2} ${isImageHidden && styles.hidden}`}
        onClick={imgClickHandler}
      >
        <Image src={image} alt={name} width={200} height={200} />
      </div>
      <h2 className={styles.title}>{name}</h2>
      <div className={styles.text}>
        <p>{description}</p>
        <p>Rating: {rating}</p>
      </div>
    </div>
  );
};

export default Card;
