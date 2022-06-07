import axios from "axios";

export const isUsernameRegistered = async (username: string) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/v1/user?username=${username}`
    );
    const user = res.data.data;

    return !!user;
  } catch (error) {
    console.log(error);
  }
};

export const isEmailRegistered = async (email: string) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/v1/user?email=${email}`
    );
    const user = res.data.data;

    return !!user;
  } catch (error) {
    console.log(error);
  }
};
