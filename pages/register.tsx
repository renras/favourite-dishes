import React, { useContext } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../lib/firebase-config";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";

import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Box from "@mui/material/Link";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Form = () => {
  const { dispatch } = useContext(AppContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (data.password !== data.confirmPassword) {
      return;
    }

    const register = () => {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (cred) => {
          const userRef = doc(db, "users", cred.user.uid);

          return await setDoc(userRef, {
            username: data.username,
            role: "Viewer",
          }).catch((err) => {
            console.log(err.message);
            return;
          });
        })
        .then(() => {
          const auth = getAuth();
          if (auth.currentUser) {
            sendEmailVerification(auth.currentUser).then(() => {
              router.push("/").then(() => {
                onAuthStateChanged(auth, async (user) => {
                  if (user) {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                      dispatch({
                        type: "SET_ROLE",
                        payload: docSnap.data().role,
                      });
                      dispatch({
                        type: "SET_USERNAME",
                        payload: docSnap.data().username,
                      });
                      dispatch({ type: "SET_IS_LOGGED_IN", payload: true });
                    }
                  } else {
                    console.log("No user logged in");
                  }
                });

                const notify = () => {
                  toast.success("Registration Successful!", {
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

                return;
              });
            });
          }
        });
    };

    register();
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
            rules={{ required: true }}
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
          <Controller
            name="email"
            defaultValue=""
            control={control}
            rules={{ required: true }}
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
