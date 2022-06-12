import type { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import createVerificationToken from "./createVerificationToken";
import sendVerificationEmail from "./sendVerificationEmail";

const signUserJWT = (res: NextApiResponse, id: string) => {
  try {
    jwt.sign(
      { id: id },
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

export default signUserJWT;
