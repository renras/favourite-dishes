import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Loading = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: "100px" }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Loading...
      </Typography>
    </Container>
  );
};

export default Loading;
