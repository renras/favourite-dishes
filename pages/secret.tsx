import { useSession } from "next-auth/react";
import useSWR from "swr";
import { User } from "../types/user";
import { Role, RoleType } from "../types/role";
import axios from "axios";

const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data.data;
};

const Secret = () => {
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
    return <p>Failed to load page.</p>;
  }

  if (status === "loading" || !userData || !userRoles) {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !isAdmin) {
    return <p>Access Denied</p>;
  }

  return (
    <>
      <h1>Protected Page</h1>
      <p>
        You can view this page because you are authenticated and authorized.
      </p>
    </>
  );
};

export default Secret;
