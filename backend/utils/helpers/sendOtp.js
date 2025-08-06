
import nodemailer from "nodemailer";

export const sendEmail = async (to, subject,html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use others like SendGrid
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your app password
    },
  //    port: 587,
  // secure: false,
  });

  await transporter.sendMail({
    from: `"Tech Thapar" <${process.env.EMAIL_USER}>`, 
    to,
    subject,
    html,
  });
};