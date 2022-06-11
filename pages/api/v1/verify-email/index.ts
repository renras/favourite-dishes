import type { NextApiRequest, NextApiResponse } from "next";

const handle = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
    } catch (error) {
      res
        .status(500)
        .send({ status: "FAILED", data: { error: "Internal server error." } });
    }
  }
};

export default handle;
