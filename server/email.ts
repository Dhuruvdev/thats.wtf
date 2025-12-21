import nodemailer from "nodemailer";

// Email service for sending verification emails
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true" || false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(email: string, token: string, username: string) {
  const verificationUrl = `${process.env.APP_URL || "http://localhost:5000"}/verify-email?token=${token}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background: #000; color: #fff; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .content { background: rgba(124, 58, 237, 0.1); border: 1px solid rgba(124, 58, 237, 0.3); border-radius: 12px; padding: 30px; }
        .button { background: #7c3aed; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; display: inline-block; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to guns.lol!</h1>
        </div>
        <div class="content">
          <p>Hi <strong>${username}</strong>,</p>
          <p>Thanks for signing up! Please verify your email address to get started.</p>
          <a href="${verificationUrl}" class="button">Verify Email</a>
          <p style="color: #aaa; font-size: 14px;">Or copy this link:</p>
          <p style="word-break: break-all; color: #888; font-size: 12px;">${verificationUrl}</p>
          <p style="margin-top: 20px; color: #aaa;">This link expires in 24 hours.</p>
        </div>
        <div class="footer">
          <p>guns.lol - Your profile, your way</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@guns.lol",
      to: email,
      subject: "Verify your guns.lol account",
      html: htmlContent,
    });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

export async function testEmailConnection() {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error("Email service not configured:", error);
    return false;
  }
}
