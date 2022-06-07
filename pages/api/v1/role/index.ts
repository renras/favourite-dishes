import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../db";
import { getSession } from "next-auth/react";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });

      if (!session)
        return res
          .status(401)
          .send({ status: "FAILED", data: "Unauthenticated." });

      const userRoles = await prisma.userRole.findMany({
        where: {
          userId: session.user.id,
        },
      });
      const roles = [];
      for (const userRole of userRoles) {
        const role = await prisma.role.findUnique({
          where: {
            id: userRole.roleId,
          },
        });
        roles.push(role);
      }
      res.status(200).send({ status: "OK", data: roles });
    } catch (error) {
      res
        .status(500)
        .send({ status: "Failed", data: "Internal server error." });
    }
  }
};

export default handle;
