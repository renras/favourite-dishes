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
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: user, error: userError } = useSWR(
    session ? "/api/v1/user" : null,
    fetcher
  );

  if (userError) return <Error />;
  if (status === "loading" || (status === "authenticated" && !user))
    return <Loading />;

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
      <main style={{ paddingBottom: "50px" }}>
        {user &&
        !user.emailVerified &&
        !router.pathname.includes("verify-email") ? (
          <Container maxWidth="sm" sx={{ marginTop: "10rem" }}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "3rem 2rem",
              }}
            >
              <MarkEmailUnreadOutlinedIcon
                color="success"
                sx={{ fontSize: "10rem" }}
              />
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ marginTop: "1rem", textAlign: "center" }}
              >
                Please verify your email before continuing.
              </Typography>
              <Link href="/login" passHref>
                <Button
                  variant="text"
                  sx={{
                    marginTop: "2rem",
                    textDecoration: "underline",
                    textUnderlineOffset: "2px",
                  }}
                >
                  Click here to resend email.
                </Button>
              </Link>
            </Paper>
          </Container>
        ) : (
          <>{children}</>
        )}
      </main>
      <ToastContainer />
    </>
  );
};

export default Layout;
