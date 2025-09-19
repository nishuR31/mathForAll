// import nodemailer from "nodemailer";
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.MAIL, // Gmail address
//     pass: process.env.PASS, // Gmail App Password
//   },
// });

// export const mail = async ({ to, subject, html, text }) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `Mathematics for All - ${process.env.MAIL}`, // keep this consistent
//       to,
//       subject,
//       text,
//       html,
//     });

//     console.log("Email sent: %s", info.messageId);
//     return info;
//   } catch (err) {
//     console.error("Error sending email:", err);
//     throw err;
//   }
// };

// // export const send = (info, time) => {
// //   setInterval(async () => {
// //     try {
// //       await mail(info);
// //     } catch (err) {
// //       console.error("Scheduled mail failed:", err);
// //     }
// //   }, time);
// // };

// // await mail({
// //     "name": "nishu",
// //     "email": "nishu@gmail.com",
// //     "subject": "Qwertyui12345678@",
// //     "message":"l"
// // })
// mail.js

import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASS,
      },
    });
  }
  return transporter;
}

export const mail = async ({ to, subject, html, text }) => {
  try {
    const info = await getTransporter().sendMail({
      from: `Mathematics for All - ${process.env.MAIL}`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};
// await mail({
//   name: "nishu",
//   email: "nishu@gmail.com",
//   subject: "Qwertyui12345678@",
//   message: "l",
// });
