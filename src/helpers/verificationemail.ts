import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

  service: "gmail",
//   host:'smtp.gmail.com',
//   port:587,
//   secure:false,
  auth: {
    user: "twxvchinto@gmail.com",
    pass: "bamd nxam lalt igik",
  },
});

export async function sendVerificationEmail(email: string, otp: string) {
  try {
    const mailOptions = {
      from: `"EduConnect" <your-email@gmail.com>`, 
      to: email,
      subject: "Verify Your Email - EduConnect",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 20px; text-align: center; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #6e11b0;">🔒 Verify Your Email</h2>
          <p style="font-size: 16px; color: #333;">Use the OTP below to verify your email address:</p>
          <p style="font-size: 24px; font-weight: bold; color: #6e11b0; background: #f3e7ff; padding: 10px; border-radius: 5px; display: inline-block;">
            ${otp}
          </p>
          <p style="color: #555;">This OTP is valid for 30 minutes.</p>
          <p style="font-size: 14px; color: #888;">If you didn’t request this, please ignore this email.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}
