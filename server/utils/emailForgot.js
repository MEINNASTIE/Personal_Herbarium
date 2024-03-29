import nodemailer from "nodemailer";

import process from "process";
import { client_app_url } from "../lib/env-vars.js";


export default async function sendEmailForgotPass(token, email) {
  console.log("🚀 ~ token:", token);
  console.log("🚀 ~ process.env:", process.env);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  console.log("utils:", process.env)
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <baggyhally@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Instruvtions to change your password om=n social app ✔", // Subject line
    text: "Instruvtions to change your password om=n social app", // plain text body
    html: `
        <h3>Forgot your password?</h3>
        <p>To change your password please click on the following link:</p>
        <a href="${client_app_url}/changePassword/${token}">Change password</a>`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}