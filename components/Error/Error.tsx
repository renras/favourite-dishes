import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Error = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: "100px" }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Failed to load page.
      </Typography>
    </Container>
  );
};

export default Error;
