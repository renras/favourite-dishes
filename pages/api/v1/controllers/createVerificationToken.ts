import type { NextApiResponse } from "next";
import { prisma } from "../../../../db";
import { createExpiryDate } from "../../../../utils/date";

export const createVerificationToken = async (
  res: NextApiResponse,
  id: string,
  token: string
) => {
  try {
    const verificationToken = await prisma.verificationToken.create({
      data: {
        identifier: id,
        token: token,
        expires: createExpiryDate(30),
      },
    });

    res.status(201).send({ status: "OK", data: verificationToken });
  } catch (error) {
    res
      .status(500)
      .send({ status: "Failed", data: { error: "Internal server error." } });
  }
};
