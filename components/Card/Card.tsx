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
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <Image src={image} alt={name} height={200} width={200} />
      </div>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Rating: {rating}</p>
    </div>
  );
};

export default Card;
