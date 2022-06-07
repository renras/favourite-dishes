import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../db";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      if (typeof id === "string") {
        const userRoles = await prisma.userRole.findMany({
          where: {
            userId: id,
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
      }
    } catch (error) {
      res
        .status(500)
        .send({ status: "Failed", data: "Internal server error." });
    }
  }
};

export default handle;