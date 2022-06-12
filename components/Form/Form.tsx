import { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import isURL from "validator/lib/isURL";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

interface IFormInput {
  title: string;
  imgUrl: string;
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
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              variant="outlined"
              fullWidth
              error={!!errors.title}
              helperText={
                (errors.title?.type === "required" && "Title is required.") ||
                ""
              }
            />
          )}
        />
        <Controller
          name="imgUrl"
          control={control}
          rules={{ required: true, validate: (value) => isURL(value) }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Url of image"
              variant="outlined"
              fullWidth
              sx={{ marginTop: "25px" }}
              error={!!errors.imgUrl}
              helperText={
                (errors.imgUrl?.type === "required" &&
                  "Image src is required.") ||
                (errors.imgUrl?.type === "validate" &&
                  "Please enter a valid url.") ||
                ""
              }
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              variant="outlined"
              fullWidth
              sx={{ marginTop: "25px" }}
              error={!!errors.description}
              helperText={
                (errors.description?.type === "required" &&
                  "Description is required") ||
                ""
              }
            />
          )}
        />
        <Controller
          name="rating"
          control={control}
          rules={{ required: true, min: 1, max: 5 }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Rating"
              variant="outlined"
              fullWidth
              sx={{ marginTop: "25px" }}
              error={!!errors.rating}
              helperText={
                (errors.rating?.type === "required" && "Rating is required") ||
                ((errors.rating?.type === "min" ||
                  errors.rating?.type === "max") &&
                  "Please pick a number from 1 to 5") ||
                ""
              }
            />
          )}
        />
        <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Button
            type="submit"
            variant="outlined"
            sx={{ alignSelf: "center", marginTop: "50px" }}
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
