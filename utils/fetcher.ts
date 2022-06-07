import axios from "axios";

const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data.data;
};

export default fetcher;
