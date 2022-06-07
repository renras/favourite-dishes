import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  getProviders,
  signIn,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { GetServerSideProps } from "next";
import axios from "axios";
import { errorToast } from "../utils/toast";

// import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";

interface IFormInput {
  username: string;
  password: string;
}

const Form = ({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/user?username=${data.username}`
      );
      const user = res.data.data;

      if (data.password !== user.password) {
        errorToast("Invalid Password.");
        return;
      }

      await signIn("credentials", {
        username: data.username,
        password: data.password,
      });
    } catch (error) {
      errorToast("Sign in failed.");
    }
  };

  const isUsernameRegistered = async (username: string) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/user?username=${username}`
      );
      const user = res.data.data;

      return !!user;
    } catch (error) {
      console.log(error);
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
            defaultValue=""
            name="username"
            control={control}
            rules={{
              required: true,
              validate: {
                isRegistered: (v) => isUsernameRegistered(v),
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
          {errors.username?.type === "isRegistered" && (
            <Typography
              variant="caption"
              component="p"
              sx={{ marginLeft: "5px", color: "#e57373" }}
            >
              Invalid username.
            </Typography>
          )}
          <Controller
            defaultValue=""
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
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <Button type="submit" variant="contained">
              Login
            </Button>
            <Button variant="outlined" sx={{ textDecoration: "none" }}>
              <Link href="/register" passHref>
                <Typography>Register</Typography>
              </Link>
            </Button>
          </Box>
          <Typography
            component="p"
            sx={{ textAlign: "center", marginTop: "40px" }}
          >
            Or Log In Using
          </Typography>
          <Box
            sx={{
              display: "flex",
              marginTop: "10px",
              justifyContent: "center",
            }}
          >
            <IconButton>
              <FacebookIcon fontSize="large" sx={{ color: "#4267B2" }} />
            </IconButton>
            <IconButton>
              <TwitterIcon fontSize="large" sx={{ color: "#1da1f2" }} />
            </IconButton>
            {providers &&
              Object.values(providers).map((provider) => {
                if (provider.name === "Google") {
                  return (
                    <IconButton
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                    >
                      <GoogleIcon fontSize="large" sx={{ color: "#DB4437" }} />
                    </IconButton>
                  );
                }
              })}
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Form;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
