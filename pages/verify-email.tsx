import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../utils/fetcher";

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const { data: verificationToken, error: verificationTokenError } = useSWR(
    token ? `/api/v1/verificationToken?token=${token}` : null,
    fetcher
  );
  const { data: verifyToken, error: verifyTokenError } = useSWR(
    verificationToken
      ? `/api/v1/verify-email-token?token=${verificationToken.token}`
      : null,
    fetcher
  );

  if (!token) return <div>No token provided.</div>;
  if (verificationTokenError || verifyTokenError) return <div>Error...</div>;
  if (!verificationToken || verifyToken) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm" sx={{ marginTop: "10rem" }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem 1rem",
        }}
      >
        <MarkEmailReadOutlinedIcon color="success" sx={{ fontSize: "10rem" }} />
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ marginTop: "1rem" }}
        >
          Email Verification Successful!
        </Typography>
        <Link href="/" passHref>
          <Button variant="contained" size="large" sx={{ marginTop: "2rem" }}>
            Go Back to Home
          </Button>
        </Link>
      </Paper>
    </Container>
  );
};

export default VerifyEmail;
