import { ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data: session } = useSession();

  console.log(session);

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

              {!session && (
                <Button color="inherit" onClick={() => signIn()}>
                  Login
                </Button>
              )}

              {session && (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Typography>{session.user?.email}</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Button>
                </Box>
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
