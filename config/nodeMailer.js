import nodemailer from "nodemailer";

const username = process.env.NODEMAILER_USERNAME;
const password = process.env.NODEMAILER_PASSWORD;

export const transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: username,
    pass: password,
  },
});
