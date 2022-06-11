import type { NextApiResponse } from "next";
import { prisma } from "../../../../db";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../../../../types/jwt";

export const createVerificationToken = async (
  res: NextApiResponse,
  token: string
) => {
  try {
    jwt.verify(token, `${process.env.JWT_SECRET}`, async (err, decoded) => {
      const decodedToken = decoded as JwtPayload;

      if (err) {
        res
          .status(400)
          .send({ status: "FAILED", data: { error: "Invalid token." } });
        return;
      }

      const verificationToken = await prisma.verificationToken.create({
        data: {
          identifier: "EMAIL_VERIFICATION",
          token: token,
          expires: new Date((decodedToken.exp as number) * 1000),
        },
      });

      res.status(201).send({ status: "OK", data: verificationToken });
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "Failed", data: { error: "Internal server error." } });
  }
};
