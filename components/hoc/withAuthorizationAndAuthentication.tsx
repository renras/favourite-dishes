import { ComponentType } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { User } from "../../types/user";
import { Role, RoleType } from "../../types/role";
import fetcher from "../../utils/fetcher";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

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

    if (userError || userRolesError) return <Error />;

    if (status === "loading" || !userData || !userRoles) return <Loading />;

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
