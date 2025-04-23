import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = async (to, ApplicantName) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          h1, h2 {
              color: #0044cc;
          }
          .content {
              font-size: 16px;
              line-height: 1.8;
          }
          .highlight {
              font-weight: bold;
              color: #0044cc;
          }
          .details {
              background-color: #f9f9f9;
              padding: 10px;
              border-radius: 8px;
              margin-top: 20px;
          }
          .details p {
              margin: 0;
              padding: 5px 0;
          }
          .footer {
              font-size: 14px;
              text-align: center;
              color: #666;
              margin-top: 30px;
          }
          .footer a {
              color: #0044cc;
              text-decoration: none;
          }
          .contact-info {
              margin-top: 20px;
          }
          .contact-info p {
              margin: 5px 0;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <p class="content">Dear <span class="highlight">${[
            ApplicantName,
          ]}</span>,</p>
          <p class="content">Greetings from the <span class="highlight">School of Design Thinking</span>!!</p>
          <p class="content">Thank you for your interest in the two-day immersive workshop on <span class="highlight">Design Thinking for Faculty</span>. We appreciate the time and thought you’ve invested in completing the application questionnaire.</p>
          <p class="content">Your responses are currently being reviewed by the School of Design Thinking (SoDT) team. They not only help us understand your journey but also guide us in curating a more focused and meaningful experience for every participant.</p>
  
          <div class="details">
              <h2>Program Details:</h2>
              <p><strong>📍 Venue:</strong> 8012 FinTech Design Center™, Siruseri</p>
              <p><strong>📅 Dates:</strong> 22ⁿᵈ & 23ʳᵈ May 2025</p>
              <p><strong>🏡 Mode:</strong> Two-day immersive residential program</p>
          </div>
  
          <p class="content">Within the next 24 hours, a member of our team will reach out to you to guide you through the final steps of completing the application.</p>
  
          <p class="content">If your institution is a part of the SoDT Academia NxT™ Partner Network, we encourage you to connect with your college management to complete the nomination process smoothly.</p>
          <p class="content">Check if your institution is part of our network here: <a href="https://d-thinking.com/academia-nxt/" target="_blank">https://d-thinking.com/academia-nxt/</a></p>
  
          <div class="contact-info">
              <p class="content">In the meantime, if you have any questions, feel free to reach out to:</p>
              <p><strong>Anand Babu Pushparaj</strong><br>
              Program Manager, School of Design Thinking<br>
              📧 <a href="mailto:anand.pushparaj@d-thinking.com">anand.pushparaj@d-thinking.com</a><br>
              📞 +91 96000 05429</p>
          </div>
  
          <div class="footer">
              <p>Regards,</p>
              <p><strong>SoDT</strong></p>
          </div>
      </div>
  </body>
  </html>
  `;

  const mailOptions = {
    to: to,
    subject: "Your Design Thinking Shift Begins Now.",
    html: html,
    cc:  process.env.CC,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};


export default sendEmail;
