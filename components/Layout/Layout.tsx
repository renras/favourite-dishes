import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl" disableGutters sx={{ padding: "10px 0" }}>
          <Typography variant="h4" component="h1">
            MYFAVORITES
          </Typography>
        </Container>
      </AppBar>
      <main style={{ paddingBottom: "50px" }}>{children}</main>
    </>
  );
};

export default Layout;
