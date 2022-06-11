import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../db";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const token =
        typeof req.query.token === "string"
          ? req.query.token
          : req.query.token[0];

      if (!token) {
        res
          .status(400)
          .send({ status: "FAILED", data: { error: "No token provided." } });
        return;
      }

      const verificationToken = await prisma.verificationToken.findUnique({
        where: {
          identifier_token: {
            identifier: "EMAIL_VERIFICATION",
            token: token,
          },
        },
      });

      res.status(200).send({ status: "OK", data: verificationToken });
    } catch (error) {
      res
        .status(500)
        .send({ status: "FAILED", data: { error: "Internal server error." } });
    }
  }
};

export default handle;
