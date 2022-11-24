// "use strict";
import nodemailer from "nodemailer";
import * as express from "express";
// async..await is not allowed in global scope, must use a wrapper
// async function main() {
const sendEmail = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log("email checking: ", req.body.email);
  try {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      //   service: "gmail",
      auth: {
        user: "dogfoot.info@gmail.com", // generated ethereal user
        pass: "vjlixxgnouqbywtx", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Chair Coach" <dogfoot.info@gmail.com>', // sender address
      to: req.body.email, // "bar@example.com, baz@example.com", // list of receivers
      subject: "ChairCoach에서 메일 확인을 위해 보내드립니다. ✔", // Subject line
      //   text: "Hello world?", // plain text body
      html: `<b>Hello world?</b>
            <h1>0000</h1> 
            <h3>위의 번호를 입력해주세요.</h3>
      `, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (err) {
    // main().catch(console.error);
    const result_err = {
      result: false,
      cause: "mail",
      message: "mail 발송에 실패했습니다.",
    };
    console.log(result_err);
    return res.status(499).json(result_err);
  }
};

export = sendEmail;
