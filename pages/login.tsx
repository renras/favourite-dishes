import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Form = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { dispatch } = useContext(AppContext);

  const onSubmit: SubmitHandler<IFormInput> = () => {
    document.body.style.cursor = "wait";

    const notify = () => {
      toast.success("Dish Added!", {
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
    dispatch({ type: "TOGGLE_MODAL", payload: false });

    document.documentElement.style.setProperty("--overflow", "auto");
    location.reload();
  };

  return (
    <Container
      component="form"
      maxWidth="sm"
      onSubmit={handleSubmit(onSubmit)}
      data-testid="form"
      sx={{ marginInline: "auto", marginTop: "100px" }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "75px 50px 50px 50px",
          position: "relative",
        }}
      >
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField {...field} label="Email" variant="outlined" fullWidth />
          )}
        />
        {errors.username?.type === "required" && (
          <Typography
            variant="caption"
            component="p"
            sx={{ marginLeft: "5px", color: "#e57373" }}
          >
            Email is required.
          </Typography>
        )}
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              sx={{ marginTop: "25px" }}
            />
          )}
        />
        {errors.password?.type === "required" && (
          <Typography
            variant="caption"
            component="p"
            sx={{ marginLeft: "5px", color: "#e57373" }}
          >
            Password is required.
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{ alignSelf: "center", marginTop: "50px" }}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Form;
