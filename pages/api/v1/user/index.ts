import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../db";
import { getSession } from "next-auth/react";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });
      const { username } = req.query;

      if (typeof username === "string") {
        const user = await prisma.user.findUnique({
          where: {
            username: username,
          },
        });

        return res.status(200).send({ status: "OK", data: user });
      }

      if (!session?.user?.email) {
        res
          .status(401)
          .send({ status: "FAILED", data: { error: "Unauthenticated" } });
        return;
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session?.user?.email,
        },
      });
      res.status(200).send({ status: "OK", data: user });
    } catch (error) {
      res
        .status(500)
        .send({ status: "Failed", data: { error: "Internal server error." } });
    }
  }
};

export default handle;
