import { withAuthorizationAndAuthentication } from "../components/hoc/withAuthorizationAndAuthentication";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Secret = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: "100px" }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Protected Page
      </Typography>
      <Typography variant="subtitle1" component="h2">
        You can view this page because you are authenticated and authorized.
      </Typography>
    </Container>
  );
};

export default withAuthorizationAndAuthentication(Secret);
