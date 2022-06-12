import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../db";
import { getSession } from "next-auth/react";
import signUserJWT from "../controllers/signUserJWT";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });
      const username = Array.isArray(req.query.username)
        ? req.query.username[0]
        : req.query.username;
      const email = Array.isArray(req.query.email)
        ? req.query.email[0]
        : req.query.email;

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
      console.log(error);
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

      await signUserJWT(res, user.id);
    } catch (error) {
      res
        .status(500)
        .send({ status: "Failed", data: { error: "Internal server error." } });
    }
  }

  if (req.method === "PATCH") {
    try {
      const session = await getSession({ req });
      const { emailVerified } = req.body;

      if (!session) {
        res
          .status(401)
          .send({ status: "FAILED", data: { error: "Unauthenticated." } });
      }

      const updateUser = await prisma.user.update({
        where: {
          id: session?.user.id,
        },
        data: {
          emailVerified,
        },
      });

      res.status(201).send({ status: "OK", data: updateUser });
    } catch (error) {
      res
        .status(500)
        .send({ status: "Failed", data: { error: "Internal server error." } });
    }
  }
};

export default handle;
