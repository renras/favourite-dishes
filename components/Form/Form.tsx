import { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import isURL from "validator/lib/isURL";
import { isValidPhoneNumber } from "libphonenumber-js";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
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
