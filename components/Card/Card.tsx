import Image from "next/image";

import styles from "./Card.module.css";

interface Props {
  name: string;
  image: string;
  description: string;
  rating: number;
}

const Card = ({ name, image, description, rating }: Props) => {
  return (
    <div>
      <Image src={image} alt={name} width={200} height={200} />
      <h2 className={styles.title}>{name}</h2>
      <div className={styles.text}>
        <p>{description}</p>
        <p>Rating: {rating}</p>
      </div>
    </div>
  );
};

export default Card;
