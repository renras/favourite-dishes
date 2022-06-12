import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../db";
import { getSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../controllers/sendVerificationEmail";
import { createVerificationToken } from "../controllers/createVerificationToken";

export interface ReqBody {
  id?: string;
  email?: string;
}

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });
      const email =
        req.query.email === "string" ? req.query.email : req.query.email[0];
      const username =
        req.query.username === "string"
          ? req.query.username
          : req.query.username[0];

      if (username) {
        const user = await prisma.user.findUnique({
          where: {
            username: username,
          },
        });

        res.status(200).send({ status: "OK", data: user });
        return;
      }

      if (email) {
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        res.status(200).send({ status: "OK", data: user });
        return;
      }

      if (!session) {
        res
          .status(401)
          .send({ status: "FAILED", data: { error: "Unauthenticated" } });
        return;
      }

      const user = await prisma.user.findUnique({
        where: {
          id: session?.user?.id,
        },
      });

      res.status(200).send({ status: "OK", data: user });
    } catch (error) {
      res
        .status(500)
        .send({ status: "Failed", data: { error: "Internal server error." } });
    }
  }

  if (req.method === "POST") {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        res.status(400).send({
          status: "OK",
          data: {
            error:
              "One of the following keys is missing in request body: 'username', 'email', 'password'",
          },
        });
        return;
      }

      const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: password,
        },
      });

      jwt.sign(
        { id: user.id },
        `${process.env.JWT_SECRET}`,
        { expiresIn: "30d" },
        (err, token) => {
          if (token) {
            createVerificationToken(res, token);
            sendVerificationEmail(res, token);
            return;
          }

          res.status(500).send({
            status: "Failed",
            data: { error: "Internal Server Error." },
          });
        }
      );
    } catch (error) {
      res
        .status(500)
        .send({ status: "Failed", data: { error: "Internal server error." } });
    }
  }

  if (req.method === "PATCH") {
    try {
      const { id, emailVerified } = req.body;

      if (!id) {
        res
          .status(400)
          .send({ status: "FAILED", data: { error: "No id was provided." } });
        return;
      }

      const updateUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          emailVerified,
        },
      });

      if (!updateUser) {
        res
          .status(404)
          .send({ status: "FAILED", data: { error: "ID is invalid." } });
      }

      res.status(201).send({ status: "OK", data: updateUser });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ status: "Failed", data: { error: "Internal server error." } });
    }
  }
};

export default handle;
