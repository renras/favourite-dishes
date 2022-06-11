import nodemailer from "nodemailer";
import type { NextApiResponse } from "next";

export const sendVerificationEmail = async (
  res: NextApiResponse,
  token: string
) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.ETHEREAL_USERNAME, // generated ethereal user
        pass: process.env.ETHEREAL_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"MyFavourites" <myfavourites@gmail.com>', // sender address
      to: process.env.ETHEREAL_USERNAME, // list of receivers
      subject: "Email Verification", // Subject line
      html: `<h1>Please verify your email.</h1> <a href="http://localhost:3000/verify?token=${token}">Click this link to verify email.</a>`, // html body
    });

    res.status(200).send({ status: "OK", data: info });
  } catch (error) {
    res
      .status(500)
      .send({ status: "Failed", data: { error: "Internal server error." } });
  }
};
