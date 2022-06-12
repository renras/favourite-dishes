import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import createVerificationToken from "../controllers/createVerificationToken";
import sendVerificationEmail from "../controllers/sendVerificationEmail";
import { getSession } from "next-auth/react";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).send({ status: "FAILED", data: "Unauthenticated." });
      return;
    }

    jwt.sign(
      { id: session.user.id },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "30d" },
      async (err, token) => {
        if (err) {
          res.status(400).send({
            status: "Failed",
            data: { error: "Error signing token." },
          });
          return;
        }

        if (!token) {
          res.status(400).send({
            status: "Failed",
            data: { error: "Token is undefined." },
          });
          return;
        }

        await createVerificationToken(res, token);
        await sendVerificationEmail(res, token);
      }
    );
  } catch (error) {
    res
      .status(500)
      .send({ status: "FAILED", data: { error: "Internal server error." } });
  }
};

export default handle;
