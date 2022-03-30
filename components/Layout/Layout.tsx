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
import AppContext from "../../context/AppContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { state } = useContext(AppContext);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container maxWidth="xl" disableGutters>
            <Toolbar>
              <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
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
                    sx={{
                      backgroundColor: "#fff",
                      color: "rgba(0, 0, 0, 0.87)",
                    }}
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
