import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../db";
import { getSession } from "next-auth/react";

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

  if (req.method === "POST") {
    try {
      const session = await getSession({ req });

      if (!session) {
        res
          .status(401)
          .send({ status: "FAILED", data: { error: "Unauthenticated." } });
        return;
      }

      const { name, image, description, rating } = req.body;

      if (!name || !description || !rating || !image) {
        res
          .status(400)
          .send({ status: "Failed", data: "Missing required fields." });
        return;
      }

      const dish = await prisma.dish.create({
        data: {
          ...req.body,
          authorId: session.user.id,
        },
      });
      res.status(201).send({ status: "OK", data: dish });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ status: "Failed", data: "Internal server error." });
    }
  }
};

export default handle;
