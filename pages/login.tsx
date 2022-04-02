import React, { useContext } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase-config";
import { getDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";

import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import Link from "next/link";

interface IFormInput {
  email: string;
  password: string;
}

const Form = () => {
  const { dispatch } = useContext(AppContext);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((cred) => {
        const userRef = doc(db, "users", cred.user.uid);

        getDoc(userRef).then((doc) => {
          router.push("/").then(() => {
            dispatch({ type: "SET_IS_LOGGED_IN", payload: true });
            dispatch({ type: "SET_USERNAME", payload: doc.data()?.username });
            dispatch({ type: "SET_ROLE", payload: doc.data()?.role });
          });
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
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
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
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
        </Paper>
      </Container>
    </>
  );
};

export default Form;
