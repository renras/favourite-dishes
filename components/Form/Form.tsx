import { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import {
  InputLabel,
  TextField,
  Container,
  Paper,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IFormInput {
  title: string;
  image: string;
  description: string;
  rating: number;
  phone?: string;
}

const Form = ({ onClose }: { onClose: Dispatch<SetStateAction<boolean>> }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const handleClose = () => {
    document.documentElement.style.setProperty("--overflow", "auto");
    onClose(false);
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
        <InputLabel htmlFor="title">Title</InputLabel>
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              error={!!errors.title}
              helperText={
                (errors.title?.type === "required" && "Title is required.") ||
                ""
              }
              margin="dense"
            />
          )}
        />
        <InputLabel htmlFor="image" sx={{ marginTop: "1rem" }}>
          Image
        </InputLabel>
        <Controller
          name="image"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              type="file"
              fullWidth
              error={!!errors.image}
              helperText={
                (errors.image?.type === "required" &&
                  "Image src is required.") ||
                ""
              }
              margin="dense"
            />
          )}
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
