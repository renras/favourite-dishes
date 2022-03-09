export const getRequestToken = (apiKey: string) => {
  const requestToken = fetch(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    {
      method: "GET",
      redirect: "follow",
    }
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result).request_token)
    .catch((error) => console.log("error", error));

  return new Promise((resolve) => {
    if (requestToken) resolve(requestToken);
  });
};

export const validateRequestToken = (
  requestToken: string,
  username: string,
  password: string,
  apiKey: string
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    username: username,
    password: password,
    request_token: requestToken,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const isValidateSuccess = fetch(
    `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      if (JSON.parse(result).success) {
        return JSON.parse(result).request_token;
      }
    })
    .catch((error) => console.log("error", error));

  return new Promise((resolve) => {
    if (isValidateSuccess) resolve(isValidateSuccess);
  });
};

export const getSessionId = (requestToken: string, apiKey: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    request_token: requestToken,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const sessionId = fetch(
    `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      if (JSON.parse(result).success === true)
        return JSON.parse(result).session_id;
    })
    .catch((error) => console.log("error", error));

  return new Promise((resolve) => {
    if (sessionId) {
      resolve(sessionId);
    }
  });
};

export const fetchFavoriteMoviesApi = (sessionId: string, apiKey: string) => {
  const favoriteMoviesApi = fetch(
    `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?session_id=${sessionId}&api_key=${apiKey}`,
    {
      method: "GET",
      redirect: "follow",
    }
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result).results)
    .catch((error) => console.log("error", error));

  return new Promise((resolve) => {
    if (favoriteMoviesApi) resolve(favoriteMoviesApi);
  });
};

export const getFavoriteMovies = async (
  apiKey: string,
  username: string,
  password: string
) => {
  const requestToken = await getRequestToken(apiKey);
  const isValidateSuccess = await validateRequestToken(
    requestToken as string,
    username,
    password,
    apiKey
  );
  const validatedRequestToken = await isValidateSuccess;
  const sessionId = await getSessionId(validatedRequestToken as string, apiKey);
  const favoriteMovies = await fetchFavoriteMoviesApi(
    sessionId as string,
    apiKey
  );

  return await favoriteMovies;
};
