"use strict";
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createTransport, SendMailOptions } from "nodemailer";
// import ApiError from "../errors/Apierror";
// import httpStatus from "http-status";
// class SendMail {
//   constructor(email: string, subject: string, name: string) {
//     const transport = createTransport({
//       service: "gmail",
//       auth: {
//         user: "nurmdopu428@gmail.com",
//         password: "mainsend password",
//       },
//     });
//     const mailOptions: SendMailOptions = {
//       from: "nurmdopu428@gmail.com",
//       to: email,
//       subject: subject,
//       html: `
//       <div>Hello here is you link to verify</div>
//       `,
//     };
//     transport.sendMail(mailOptions, (error: any, info: any) => {
//       if (error) {
//         throw new ApiError(httpStatus.BAD_REQUEST, "email not send");
//       }
//       console.log(`main send successfully ${info.messageId}`);
//     });
//   }
// }
