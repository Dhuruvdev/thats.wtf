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
  const verificationUrl = `https://${process.env.REPLIT_DEV_DOMAIN || "thats.wtf"}/verify-email?token=${token}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          background-color: #050505; 
          color: #ffffff; 
          margin: 0; 
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }
        .wrapper {
          width: 100%;
          table-layout: fixed;
          background-color: #050505;
          padding-bottom: 40px;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 40px 20px; 
        }
        .card { 
          background: #0f0f0f; 
          border: 1px solid rgba(255, 255, 255, 0.05); 
          border-radius: 24px; 
          padding: 40px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .logo {
          width: 64px;
          height: 64px;
          margin-bottom: 24px;
        }
        h1 { 
          font-size: 28px; 
          font-weight: 800; 
          margin: 0 0 16px; 
          letter-spacing: -0.02em;
        }
        p { 
          font-size: 16px; 
          line-height: 1.6; 
          color: #a1a1aa; 
          margin: 0 0 32px;
        }
        .button { 
          background: #7c3aed; 
          color: #ffffff !important; 
          padding: 16px 32px; 
          border-radius: 12px; 
          text-decoration: none; 
          display: inline-block; 
          font-weight: 700;
          font-size: 16px;
          transition: transform 0.2s ease;
        }
        .footer { 
          margin-top: 32px; 
          color: #52525b; 
          font-size: 14px; 
          font-weight: 500;
        }
        .link-alt {
          margin-top: 24px;
          font-size: 12px;
          color: #3f3f46;
          word-break: break-all;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="card">
            <img src="https://${process.env.REPLIT_DEV_DOMAIN || "thats.wtf"}/icon.png" alt="thats.wtf" class="logo">
            <h1>Verify your identity</h1>
            <p>Welcome to <strong>thats.wtf</strong>, ${username}.<br>Confirm your email to unlock your high-fidelity profile.</p>
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
            <div class="footer">
              thats.wtf &copy; 2025
            </div>
            <div class="link-alt">
              ${verificationUrl}
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"thats.wtf" <noreply@thats.wtf>',
      to: email,
      subject: "Verify your thats.wtf account",
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
