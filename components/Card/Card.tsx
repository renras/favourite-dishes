import { useState } from "react";
import Image from "next/image";
import styles from "./Card.module.css";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

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
  const starIconCount = rating;
  const starBorderIconCount = 5 - rating;
  const [isDescriptionLong, setIsDescriptionLong] = useState(
    description.length > 150
  );

  const starIcons = [];
  const starBorderIcons = [];
  for (let i = 0; i < starIconCount; i++) {
    starIcons.push(<StarIcon key={i} sx={{ color: "#fbc02d" }} />);
  }
  for (let i = 0; i < starBorderIconCount; i++) {
    starBorderIcons.push(<StarBorderIcon key={i} sx={{ color: "#fbc02d" }} />);
  }

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

          <Typography variant="body2" component="p" gutterBottom>
            {isDescriptionLong ? (
              <>
                {description.substring(0, 100)}...
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ marginLeft: ".5rem", cursor: "pointer" }}
                  className={styles.readMore}
                  color="primary"
                  onClick={() => setIsDescriptionLong(false)}
                >
                  Read More
                </Typography>
              </>
            ) : (
              description
            )}
          </Typography>
          {phone && <p>Phone: {phone}</p>}
        </CardContent>
        <CardActions sx={{ padding: "16px" }}>
          <Typography
            component="p"
            sx={{ marginRight: "1rem", fontWeight: "medium" }}
          >
            Rating:
          </Typography>
          {starIcons}
          {starBorderIcons}
        </CardActions>
      </MuiCard>
    </>
  );
};

export default Card;
