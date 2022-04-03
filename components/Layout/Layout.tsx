import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import AuthContext from "../../context/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuth();
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const signOutHandler = () => {
    signOut(auth);
  };

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
              {user ? (
                <Box
                  sx={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  <Typography>{user.email}</Typography>
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
