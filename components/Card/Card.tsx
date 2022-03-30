import { useState } from "react";
import Image from "next/image";

import styles from "./Card.module.css";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Modal from "../Modal/Modal";
import EditForm from "../EditForm/EditForm";

interface Props {
  name: string;
  image: string;
  description: string;
  rating: number;
  placeholder?: string;
  phone?: string;
}

const Card = ({ name, image, description, rating, phone }: Props) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const editDishHandler = () => {
    setIsModalOpen(false);
    setIsEditFormOpen(true);
    document.documentElement.style.setProperty("--overflow", "hidden");
    document.documentElement.style.setProperty("--padding-right", "15px");
  };

  const closeEditFormHandler = () => {
    setIsEditFormOpen(false);
    document.documentElement.style.setProperty("--overflow", "auto");
    document.documentElement.style.setProperty("--padding-right", "0");
  };

  return (
    <>
      <MuiCard sx={{ maxWidth: 345, position: "relative" }}>
        <CardHeader
          title={name}
          action={
            <>
              <IconButton onClick={() => setIsModalOpen(!isModalOpen)}>
                <MoreHorizIcon sx={{ transform: "rotate(90deg)" }} />
              </IconButton>
            </>
          }
        />
        <Image
          className={styles.image}
          src={image}
          alt={name}
          width={345}
          height={140}
          objectFit="cover"
          objectPosition="center"
        />
        <CardContent>
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
        {isModalOpen && (
          <>
            <Paper
              sx={{
                position: "absolute",
                top: "30px",
                right: "30px",
                zIndex: "1",
              }}
            >
              <MenuList>
                <MenuItem onClick={editDishHandler}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" sx={{ color: "#b2ff59" }} />
                  </ListItemIcon>
                  <Typography variant="body2" component="p">
                    Edit Item
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" sx={{ color: "#ff5252" }} />
                  </ListItemIcon>
                  <Typography variant="body2" component="p">
                    Delete Item
                  </Typography>
                </MenuItem>
              </MenuList>
            </Paper>
            <Box
              sx={{ position: "fixed", top: 0, right: 0, left: 0, bottom: 0 }}
              onClick={() => setIsModalOpen(false)}
            ></Box>
          </>
        )}
      </MuiCard>
      {isEditFormOpen && (
        <Modal>
          <EditForm closeEditFormHandler={closeEditFormHandler} />
        </Modal>
      )}
    </>
  );
};

export default Card;
