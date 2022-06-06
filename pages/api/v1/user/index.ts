import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../db";
import { getSession } from "next-auth/react";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });

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
      res.send({ status: "OK", data: user });
    } catch (error) {
      res
        .status(500)
        .send({ status: "Failed", data: "Internal server error." });
    }
  }
};

export default handle;
