import type { NextApiResponse } from "next";
import { prisma } from "../../../../db";
import jwt from "jsonwebtoken";

export const createVerificationToken = async (
  res: NextApiResponse,
  email: string,
  token: string
) => {
  try {
    jwt.verify(
      token,
      `${process.env.JWT_SECRET} ${email}`,
      async (err, decoded) => {
        if (decoded && typeof decoded !== "string") {
          const verificationToken = await prisma.verificationToken.create({
            data: {
              identifier: "EMAIL_VERIFICATION",
              token: token,
              expires: new Date((decoded.exp as number) * 1000),
            },
          });

          res.status(201).send({ status: "OK", data: verificationToken });
        }

        res
          .status(400)
          .send({ status: "FAILED", data: { error: "Invalid token." } });
      }
    );
  } catch (error) {
    res
      .status(500)
      .send({ status: "Failed", data: { error: "Internal server error." } });
  }
};
