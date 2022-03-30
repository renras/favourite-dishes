import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container maxWidth="xl" disableGutters>
            <Toolbar>
              <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
                MYFAVORITES
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <main style={{ paddingBottom: "50px" }}>{children}</main>
    </>
  );
};

export default Layout;
