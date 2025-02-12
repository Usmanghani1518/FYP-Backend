import { Resend } from "resend";

const resend = new Resend("re_TnSoPHAA_7doXAfKeMjPowMvpRqXikxUD");

export async function sendVerificationEmail(email: string, otp: string) {
    try {
        const response = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Verify Your Email - EduConnect",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 20px; text-align: center; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #6e11b0;">🔒 Verify Your Email</h2>
                    <p style="font-size: 16px; color: #333;">Use the OTP below to verify your email address:</p>
                    <p style="font-size: 24px; font-weight: bold; color: #6e11b0; background: #f3e7ff; padding: 10px; border-radius: 5px; display: inline-block;">
                        ${otp}
                    </p>
                    <p style="color: #555;">This OTP is valid for 10 minutes.</p>
                    <p style="font-size: 14px; color: #888;">If you didn’t request this, please ignore this email.</p>
                </div>
            `,
        });

        console.log("✅ Email sent:", response);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
}
