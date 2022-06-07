import { ComponentType } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { User } from "../../types/user";
import { Role, RoleType } from "../../types/role";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data.data;
};

export const withAuthorizationAndAuthentication =
  <T,>(Component: ComponentType<T>) =>
  // eslint-disable-next-line react/display-name
  (props: T) => {
    const { status } = useSession();
    const { data: userData, error: userError } = useSWR<User>(
      "/api/v1/user",
      fetcher
    );
    const { data: userRoles, error: userRolesError } = useSWR<Role[]>(
      userData ? `/api/v1/role/${userData.id}` : null,
      fetcher
    );
    const roles = userRoles?.map((role) => role.title);
    const isAdmin = roles?.includes(RoleType.ADMIN);

    if (userError || userRolesError) {
      return (
        <Container
          maxWidth="sm"
          sx={{ textAlign: "center", marginTop: "100px" }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Failed to load page.
          </Typography>
        </Container>
      );
    }

    if (status === "loading" || !userData || !userRoles) {
      return (
        <Container
          maxWidth="sm"
          sx={{ textAlign: "center", marginTop: "100px" }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Loading...
          </Typography>
        </Container>
      );
    }

    if (status === "unauthenticated" || !isAdmin) {
      return (
        <Container
          maxWidth="sm"
          sx={{ textAlign: "center", marginTop: "100px" }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Access denied.
          </Typography>
        </Container>
      );
    }

    return <Component {...props} />;
  };
