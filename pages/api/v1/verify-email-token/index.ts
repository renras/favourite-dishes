import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../db";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../../../../types/jwt";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const token =
        typeof req.query.token === "string"
          ? req.query.token
          : req.query.token[0];

      if (!token) {
        res
          .status(404)
          .send({ status: "FAILED", data: { error: "Token is invalid." } });
        return;
      }

      jwt.verify(token, `${process.env.JWT_SECRET}`, async (err, decoded) => {
        if (err) {
          res
            .status(400)
            .send({ status: "FAILED", data: { error: "Token is invalid." } });
          return;
        }

        res.status(200).send({ status: "OK", data: decoded });
      });
    } catch (error) {
      res
        .status(500)
        .send({ status: "FAILED", data: { error: "Internal server error." } });
    }
  }
};

export default handle;

// const decodedToken = decoded as JwtPayload;
// const user = await prisma.user.update({
//   where: {
//     id: decodedToken.id,
//   },
//   data: {
//     emailVerified: new Date().toISOString(),
//   },
// });
//
// res.status(200).send({ status: "OK", data: user });
// return;
