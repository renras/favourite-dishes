import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../db";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const dishes = await prisma.dish.findMany();
      res.status(200).send({ status: "OK", data: dishes });
    } catch (error) {
      res
        .status(500)
        .send({ status: "Failed", data: "Internal server error." });
    }
  }
};

export default handle;
