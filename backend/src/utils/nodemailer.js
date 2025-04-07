import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import Mailgen from "mailgen";

// Looking to send emails in production? Check out our Email API/SMTP product!
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_SMTP_HOST,
  port: process.env.MAILTRAP_SMTP_PORT,
  auth: {
    user: process.env.MAILTRAP_SMTP_USER,
    pass: process.env.MAILTRAP_SMTP_PASS,
  },
});

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Cohort Mega Project",
      link: process.env.FRONTEND_BASE_URL,
    },
  });

  // Generate an HTML email with the provided contents
  const emailBody = mailGenerator.generate(options.mailgenContent);

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  const emailText = mailGenerator.generatePlaintext(options.mailgenContent);

  const mailOptions = {
    from: "mega-project.com", // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: emailText, // plain text body
    html: emailBody, // html body
  };

  try {
    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    console.log("Email send: ", info.messageId);
  } catch (error) {
    console.log("Error - sending email ", error);
  }
};

// sendMail({
//   email: "ankitbharatwaaj@gmail.com",
//   subject: "Verify your email",
//   mailgenContent: verificationEmailTemplate("sakib", "http....."),
// });

export { sendMail };
