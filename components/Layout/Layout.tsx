import { useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../../context/AppContext";
import { signOut } from "firebase/auth";
import { db } from "../../lib/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { dispatch, state } = useContext(AppContext);
  const auth = getAuth();
  const router = useRouter();

  const signOutHandler = () => {
    signOut(auth);
    dispatch({
      type: "SET_USERNAME",
      payload: "",
    });
    dispatch({
      type: "SET_IS_LOGGED_IN",
      payload: false,
    });
    dispatch({ type: "SET_IS_EMAIL_VERIFIED", payload: false });
  };

  useEffect(() => {
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
  }, [dispatch, auth]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Container maxWidth="xl" disableGutters>
            <Toolbar>
              <Typography
                variant="h4"
                component="h1"
                sx={{ flexGrow: 1, cursor: "pointer" }}
                onClick={() => router.push("/")}
              >
                MYFAVORITES
              </Typography>
              {state.isLoggedIn ? (
                <Box
                  sx={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  <Typography>{state.username}</Typography>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={signOutHandler}
                  >
                    Sign Out
                  </Button>
                </Box>
              ) : (
                <Link href="/login" passHref>
                  <Button color="inherit">Login</Button>
                </Link>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <main style={{ paddingBottom: "50px" }}>{children}</main>
      <ToastContainer />
    </>
  );
};

export default Layout;
