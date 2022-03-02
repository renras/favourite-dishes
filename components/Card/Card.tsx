import Image from "next/image";

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
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Rating: {rating}</p>
    </div>
  );
};

export default Card;
