import { withAuthorizationAndAuthentication } from "../components/hoc/withAuthorizationAndAuthentication";

const Secret = () => {
  return (
    <>
      <h1>Protected Page</h1>
      <p>
        You can view this page because you are authenticated and authorized.
      </p>
    </>
  );
};

export default withAuthorizationAndAuthentication(Secret);
