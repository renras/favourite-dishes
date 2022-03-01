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
  const [isImageBlurred, setIsImageBlurred] = useState(true);

  const imgClickHandler = () => {
    setIsImageBlurred(false);
  };

  return (
    <div>
      <div
        className={`${styles.imageWrapper} ${
          isImageBlurred ? styles.blur : styles.showImage
        }`}
        onClick={imgClickHandler}
      >
        <Image src={image} alt={name} width={200} height={200} />
        <button
          onClick={imgClickHandler}
          className={(!isImageBlurred && styles.hidden) || ""}
        >
          NSFW Click to view image
        </button>
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
