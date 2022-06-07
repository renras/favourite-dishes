import { ComponentType } from "react";
import useSWR from "swr";
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
    const { data: userRoles, error: userRolesError } = useSWR<Role[]>(
      `/api/v1/role`,
      fetcher
    );
    const roles = userRoles?.map((role) => role.title);
    const isAdmin = roles?.includes(RoleType.ADMIN);

    if (userRolesError) return <Error />;
    if (!userRoles) return <Loading />;

    if (!isAdmin) {
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
