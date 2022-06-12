import { ComponentType } from "react";
import { useSession } from "next-auth/react";
import Loading from "../Loading/Loading";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import BlockIcon from "@mui/icons-material/Block";

const withAuthentication =
  <T,>(Component: ComponentType<T>) =>
  // eslint-disable-next-line react/display-name
  (props: T) => {
    const { status } = useSession();

    if (status === "loading") return <Loading />;
    if (status === "unauthenticated") {
      return (
        <Container maxWidth="sm" sx={{ marginTop: "10rem" }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "3rem 2rem",
            }}
          >
            <BlockIcon color="error" sx={{ fontSize: "10rem" }} />
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ marginTop: "1rem", textAlign: "center" }}
            >
              You must be logged-in to access this page.
            </Typography>
            <Link href="/login" passHref>
              <Button
                variant="contained"
                size="large"
                sx={{ marginTop: "2rem" }}
              >
                Login
              </Button>
            </Link>
          </Paper>
        </Container>
      );
    }

    return <Component {...props} />;
  };

export default withAuthentication;
