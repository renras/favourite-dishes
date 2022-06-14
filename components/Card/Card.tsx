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
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

interface Props {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  authorId: string;
  currentUserId?: string;
  onDelete: (id: string) => void;
}

const Card = ({
  id,
  name,
  image,
  description,
  rating,
  authorId,
  currentUserId,
  onDelete,
}: Props) => {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
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

  const handleOpenEditForm = () => {
    setIsModalOpen(false);
    setIsEditFormOpen(true);
    document.documentElement.style.setProperty("--overflow", "hidden");
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
    document.documentElement.style.setProperty("--overflow", "auto");
  };

  const handleOpenDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(true);
    setIsModalOpen(false);
    document.documentElement.style.setProperty("--overflow", "hidden");
  };

  const handleCancel = () => {
    setIsDeleteConfirmationOpen(false);
    document.documentElement.style.setProperty("--overflow", "auto");
  };

  return (
    <>
      <MuiCard sx={{ maxWidth: 345, position: "relative" }}>
        <CardHeader
          title={name}
          action={
            <>
              {authorId === currentUserId && (
                <IconButton onClick={() => setIsModalOpen(!isModalOpen)}>
                  <MoreHorizIcon sx={{ transform: "rotate(90deg)" }} />
                </IconButton>
              )}
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
                <MenuItem onClick={handleOpenEditForm}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" sx={{ color: "#b2ff59" }} />
                  </ListItemIcon>
                  <Typography variant="body2" component="p">
                    Edit Item
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleOpenDeleteConfirmation}>
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
          <EditForm
            closeEditFormHandler={handleCloseEditForm}
            id={id}
            name={name}
            image={image}
            description={description}
            rating={rating}
          />
        </Modal>
      )}
      {isDeleteConfirmationOpen && (
        <Modal>
          <Paper>
            <Container
              sx={{
                width: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "25px",
                padding: "35px",
              }}
            >
              <Typography
                variant="h6"
                component="h3"
                sx={{ textAlign: "center" }}
              >
                Are you sure you want to delete this item?
              </Typography>
              <Box sx={{ display: "flex", gap: "20px" }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => onDelete(id)}
                >
                  Yes
                </Button>
              </Box>
            </Container>
          </Paper>
        </Modal>
      )}
    </>
  );
};

export default Card;
