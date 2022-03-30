import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import isURL from "validator/lib/isURL";
import { isValidPhoneNumber } from "libphonenumber-js";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase-config";
import Box from "@mui/material/Box";

interface IFormInput {
  title: string;
  imgUrl: string;
  description: string;
  rating: number;
  phone?: string;
}

interface Props {
  closeEditFormHandler: () => void;
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  phone?: string;
}

interface Data {
  title: string;
  imgUrl: string;
  description: string;
  rating: number;
  phone?: string | undefined;
}

const EditForm = ({
  closeEditFormHandler,
  id,
  name,
  image,
  description,
  rating,
  phone,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { dispatch } = useContext(AppContext);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const update = async (data: Data) => {
      const collectionDoc = doc(db, "favorite-dishes", id);
      const newFields = {
        name: data.title,
        image: data.imgUrl,
        description: data.description,
        rating: data.rating,
        phone: data.phone,
      };
      await updateDoc(collectionDoc, newFields);
    };

    update(data);

    document.body.style.cursor = "wait";

    const notify = () => {
      toast.success("Dish Edited!", {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

    notify();

    dispatch({ type: "SET_INPUT_TEXT", payload: "" });
    dispatch({ type: "FILTER_DISHES" });
    closeEditFormHandler();

    document.documentElement.style.setProperty("--overflow", "auto");
    location.reload();
  };

  return (
    <Container
      component="form"
      maxWidth="sm"
      onSubmit={handleSubmit(onSubmit)}
      data-testid="form"
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "75px 50px 50px 50px",
          position: "relative",
        }}
      >
        <CloseIcon
          sx={{
            position: "absolute",
            top: "15px",
            right: "15px",
            color: "#bdbdbd",
            cursor: "pointer",
          }}
          onClick={closeEditFormHandler}
        />
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          defaultValue={name}
          render={({ field }) => (
            <TextField {...field} label="Title" variant="outlined" fullWidth />
          )}
        />
        {errors.title?.type === "required" && (
          <Typography
            variant="caption"
            component="p"
            sx={{ marginLeft: "5px", color: "#e57373" }}
          >
            Title is required.
          </Typography>
        )}
        <Controller
          name="imgUrl"
          defaultValue={image}
          control={control}
          rules={{ required: true, validate: (value) => isURL(value) }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Url of image"
              variant="outlined"
              fullWidth
              sx={{ marginTop: "25px" }}
            />
          )}
        />
        {errors.imgUrl?.type === "required" && (
          <Typography
            variant="caption"
            component="p"
            sx={{ marginLeft: "5px", color: "#e57373" }}
          >
            Title is required.
          </Typography>
        )}
        {errors.imgUrl?.type === "validate" && (
          <Typography
            variant="caption"
            component="p"
            sx={{ marginLeft: "5px", color: "#e57373" }}
          >
            Title is required.
          </Typography>
        )}
        <Controller
          name="description"
          control={control}
          defaultValue={description}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              variant="outlined"
              fullWidth
              sx={{ marginTop: "25px" }}
            />
          )}
        />
        {errors.description?.type === "required" && (
          <Typography
            variant="caption"
            component="p"
            sx={{ marginLeft: "5px", color: "#e57373" }}
          >
            Description is required.
          </Typography>
        )}
        <Controller
          name="rating"
          control={control}
          defaultValue={rating}
          rules={{ required: true, min: 1, max: 5 }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Rating"
              variant="outlined"
              fullWidth
              sx={{ marginTop: "25px" }}
            />
          )}
        />
        {errors.rating?.type === "required" && (
          <Typography
            variant="caption"
            component="p"
            sx={{ marginLeft: "5px", color: "#e57373" }}
          >
            Rating is required.
          </Typography>
        )}
        {errors.rating?.type === ("min" || "max") && (
          <Typography
            variant="caption"
            component="p"
            sx={{ marginLeft: "5px", color: "#e57373" }}
          >
            Pick a number from 1 to 5.
          </Typography>
        )}
        <Controller
          name="phone"
          control={control}
          defaultValue={phone}
          rules={{
            required: false,
            validate: {
              isValidPhoneNumber: (value) =>
                value !== "" ? isValidPhoneNumber(value as string, "PH") : true,
            },
          }}
          render={({ field }) => (
            <TextField
              type="tel"
              {...field}
              label="Phone"
              variant="outlined"
              fullWidth
              sx={{ marginTop: "25px" }}
            />
          )}
        />
        {errors.phone?.type === "isValidPhoneNumber" && (
          <Typography
            variant="caption"
            component="p"
            sx={{ marginLeft: "5px", color: "#e57373" }}
          >
            Enter a valid phone number.
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            marginTop: "50px",

            justifyContent: "center",
          }}
        >
          <Button type="submit" variant="contained">
            Update
          </Button>
          <Button onClick={closeEditFormHandler} variant="outlined">
            Cancel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditForm;
