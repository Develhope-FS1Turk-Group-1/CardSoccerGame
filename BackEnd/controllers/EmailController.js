const nodemailer = require('nodemailer');
const { Pool } = require('pg');
const connectionString = process.env.CONNECTION_URL;
const pool = new Pool({ connectionString });

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

async function sendRegistrationEmail(user) {
  let isValidEmailAddress = await isValidEmail(user.mail);
  if (isValidEmailAddress) {
    try {
      // Send email
      let tokenInfo = `http://localhost:3050/activate/${user.activation_token}`;
      const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: user.mail,
        subject: "This is the subject",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>Registration Confirmation</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"/><style>body{font-family:'Arial',sans-serif;background-color:#f4f4f4;margin:0;padding:0;}.container{max-width:600px;margin:0 auto;text-align:center;padding:20px;background-color:#ffffff;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.1);}h1{color:#333333;}p{color:#666666;}.cta-button{display:inline-block;padding:10px 20px;background-color:#007bff;color:#ffffff;text-decoration:none;border-radius:3px;}.linkPart{margin: auto;text-align: center;}.cta-button{color: white !important;}.headerImage{background-image: url('../../FrontEnd/images/mail_background.jpeg')}</style></head><body><div class="container"><div class="headerImage"></div><h1>Welcome to Our Platform, ${user.username}!</h1><p>Thank you for registering with us. To activate your account, please click the button below:</p><div class="linkPart"><a href="${tokenInfo}" class="cta-button">Activate Your Account</a></div><p>If the button above does not work, you can also use the following link:</p><a href="${tokenInfo}" style="color: black;">${tokenInfo}</a><p>If you didn't register on our platform, you can ignore this email.</p></div></body></html>`
      });
      console.log("Email sent: ", info);
    } catch (error) {
      console.error("Error sending email: ", error);
    }
  } else {
    return null;
  }
}


async function sendResetPassword(userMail) {
  try {
    const resetToken = generateResetToken();
    await saveResetToken(userMail, resetToken);
    let resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: userMail,
      subject: "Password Reset",
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <title>Password Reset</title>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              text-align: center;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333333;
            }
            p {
              color: #666666;
            }
            .cta-button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #ffffff;
              text-decoration: none;
              border-radius: 3px;
            }
            .linkPart {
              margin: auto;
              text-align: center;
            }
            .cta-button {
              color: white !important;
            }
            .headerImage {
              background-image: url('../../FrontEnd/images/mail_background.jpeg');
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="headerImage"></div>
            <h1>Password Reset</h1>
            <p>You have requested to reset your password. To reset your password, please click the button below:</p>
            <div class="linkPart">
              <a href="${resetLink}" class="cta-button">Reset Your Password</a>
            </div>
            <p>If the button above does not work, you can also use the following link:</p>
            <a href="${resetLink}" style="color: black;">${resetLink}</a>
            <p>If you didn't request a password reset, you can ignore this email.</p>
          </div>
        </body>
        </html>
      `
    });
    console.log("Password reset email sent: ", info);
  } catch (error) {
    console.error("Error sending password reset email: ", error);
  }
}

function generateResetToken() {
  const uuid = require('uuid');
  return uuid.v4();
}

async function saveResetToken(userMail, resetToken) {
  try {
    await pool.query('UPDATE users SET reset_token = $1 WHERE mail = $2', [resetToken, userMail]);
    console.log(`Reset token saved for user with ID ${userMail}`);
  } catch (error) {
    console.error('Error saving reset token:', error);
    throw error;
  }
}


async function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

module.exports = {
  sendRegistrationEmail,
  sendResetPassword
};