import * as nodemailer from 'nodemailer';

export default async function sendEmail(
  emailAddress: string,
  subject: string,
  text: string,
  ccAddress?: string,
): Promise<boolean> {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`, // Use App Password if you are using 2FA
      },
    });
    // console.log(transporter);

    const mailOptions = {
      from: `${process.env.EMAIL_ADDRESS}`,
      to: emailAddress,
      cc: ccAddress,
      subject: subject,
      html: text,
    };
    // console.log(mailOptions);

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
