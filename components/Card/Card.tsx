import Image from "next/image";
import styles from "./Card.module.css";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

interface Props {
  name: string;
  image: string;
  description: string;
  rating: number;
  placeholder?: string;
  phone?: string;
}

const Card = ({
  name,
  image,
  description,
  rating,
  placeholder,
  phone,
}: Props) => {
  return (
    <>
      <MuiCard sx={{ maxWidth: 345 }}>
        <Image
          className={styles.image}
          src={image}
          alt={name}
          width={345}
          height={140}
          placeholder={placeholder ? "blur" : "empty"}
          blurDataURL={placeholder}
          objectFit="cover"
          objectPosition="center"
        />
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body2" component="p">
            {description}
          </Typography>
          {phone && <p>Phone: {phone}</p>}
        </CardContent>
        <CardActions sx={{ padding: "16px" }}>
          <Typography component="p">Rating: {rating}</Typography>
        </CardActions>
      </MuiCard>
    </>
  );
};

export default Card;
