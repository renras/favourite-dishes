import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import { useRouter } from "next/router";
import { isUsernameRegistered, isEmailRegistered } from "../lib/validation";

import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import Box from "@mui/material/Link";
import { successToast, errorToast } from "../utils/toast";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Form = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (data.password !== data.confirmPassword) {
      errorToast("Please make sure your passwords match.");
      return;
    }

    try {
      await axios.post("/api/v1/user", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      successToast("Registration successful!");
      await router.push("/login");
    } catch (error) {
      console.log(error);
      errorToast("Registration failed.");
    }
  };

  return (
    <>
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
            name="username"
            defaultValue=""
            control={control}
            rules={{
              required: true,
              validate: {
                isUsernameRegistered: async (v) =>
                  !(await isUsernameRegistered(v)),
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                variant="outlined"
                fullWidth
              />
            )}
          />
          {errors.username?.type === "required" && (
            <Typography
              variant="caption"
              component="p"
              sx={{ marginLeft: "5px", color: "#e57373" }}
            >
              Username is required.
            </Typography>
          )}
          {errors.username?.type === "isUsernameRegistered" && (
            <Typography
              variant="caption"
              component="p"
              sx={{ marginLeft: "5px", color: "#e57373" }}
            >
              Username is already taken.
            </Typography>
          )}
          <Controller
            name="email"
            defaultValue=""
            control={control}
            rules={{
              required: true,
              validate: {
                isEmail: (v) => isEmail(v),
                isEmailRegistered: async (v) => !(await isEmailRegistered(v)),
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                sx={{ marginTop: "25px" }}
                fullWidth
              />
            )}
          />
          {errors.email?.type === "required" && (
            <Typography
              variant="caption"
              component="p"
              sx={{ marginLeft: "5px", color: "#e57373" }}
            >
              Email is required.
            </Typography>
          )}
          {errors.email?.type === "isEmailRegistered" && (
            <Typography
              variant="caption"
              component="p"
              sx={{ marginLeft: "5px", color: "#e57373" }}
            >
              Email is already taken.
            </Typography>
          )}
          {errors.email?.type === "isEmail" && (
            <Typography
              variant="caption"
              component="p"
              sx={{ marginLeft: "5px", color: "#e57373" }}
            >
              Please enter a valid e-mail.
            </Typography>
          )}
          <Controller
            name="password"
            defaultValue=""
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
          <Controller
            name="confirmPassword"
            defaultValue=""
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                sx={{ marginTop: "25px" }}
              />
            )}
          />
          {errors.confirmPassword?.type === "required" && (
            <Typography
              variant="caption"
              component="p"
              sx={{ marginLeft: "5px", color: "#e57373" }}
            >
              Please re-type password.
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "50px",
            }}
          >
            <Button type="submit" variant="contained">
              Register
            </Button>
            <Button color="inherit" sx={{ textTransform: "none" }}>
              <Link href="/login" passHref>
                <Typography variant="subtitle1" component="p">
                  Already have an account?
                </Typography>
              </Link>
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Form;
