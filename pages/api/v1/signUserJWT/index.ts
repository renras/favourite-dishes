import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import signUserJWT from "../controllers/signUserJWT";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const session = await getSession({ req });

      if (!session) {
        res.status(401).send({ status: "FAILED", data: "Unauthenticated." });
        return;
      }

      signUserJWT(res, session.user.id);
    } catch (error) {
      res
        .status(500)
        .send({ status: "FAILED", data: { error: "Internal server error." } });
    }
  }
};

export default handle;
