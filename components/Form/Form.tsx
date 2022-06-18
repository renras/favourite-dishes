import { Dispatch, SetStateAction, ChangeEvent, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/client";
import { errorToast, successToast } from "../../utils/toast";
import { v4 as uuidv4 } from "uuid";
import { useSWRConfig } from "swr";

import {
  InputLabel,
  TextField,
  Container,
  Paper,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

interface IFormInput {
  name: string;
  description: string;
  rating: number;
}

const Form = ({ onClose }: { onClose: Dispatch<SetStateAction<boolean>> }) => {
  const [image, setImage] = useState<File | null>(null);
  const { mutate } = useSWRConfig();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      description: "",
      rating: 5,
    },
  });

  const uploadFile = async (file: File) => {
    try {
      const imageRef = ref(storage, `/images/${uuidv4()}-${file.name}`);
      const uploadTask = await uploadBytes(imageRef, file);

      if (uploadTask) {
        const downloadUrl = await getDownloadURL(imageRef);
        return downloadUrl;
      }

      return null;
    } catch (error) {
      throw new Error();
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!image) {
      errorToast("Please upload an image");
      return;
    }
    try {
      const downloadUrl = await uploadFile(image);
      await axios.post("/api/v1/dish", {
        ...data,
        image: downloadUrl,
      });
      await mutate("/api/v1/dish");
      successToast("Dish added successfully");
      setImage(null);
      onClose(false);
    } catch (error) {
      errorToast("Failed to submit form");
    }
  };

  const handleClose = () => {
    document.documentElement.style.setProperty("--overflow", "auto");
    onClose(false);
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
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
          onClick={handleClose}
        />
        <InputLabel htmlFor="name">Title</InputLabel>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={
                (errors.name?.type === "required" && "Title is required.") || ""
              }
              margin="dense"
            />
          )}
        />
        <InputLabel htmlFor="image" sx={{ marginTop: "1rem" }}>
          Image
        </InputLabel>
        <TextField
          type="file"
          fullWidth
          margin="dense"
          onChange={handleImageChange}
        />
        <InputLabel htmlFor="description" sx={{ marginTop: "1rem" }}>
          Description
        </InputLabel>
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              error={!!errors.description}
              helperText={
                (errors.description?.type === "required" &&
                  "Description is required") ||
                ""
              }
              margin="dense"
            />
          )}
        />
        <InputLabel htmlFor="rating" sx={{ marginTop: "1rem" }}>
          Rating
        </InputLabel>
        <Controller
          name="rating"
          control={control}
          rules={{ required: true, min: 1, max: 5 }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              variant="outlined"
              fullWidth
              error={!!errors.rating}
              helperText={
                (errors.rating?.type === "required" && "Rating is required") ||
                ((errors.rating?.type === "min" ||
                  errors.rating?.type === "max") &&
                  "Please pick a number from 1 to 5") ||
                ""
              }
              margin="dense"
            />
          )}
        />
        <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Button
            type="button"
            variant="outlined"
            sx={{ alignSelf: "center", marginTop: "50px" }}
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ alignSelf: "center", marginTop: "50px" }}
          >
            Add Dish
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Form;
