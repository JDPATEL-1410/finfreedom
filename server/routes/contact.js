const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/submit', async (req, res) => {
    const { fullName, email, phone, subject, message } = req.body;

    console.log('Contact form submission received:', { fullName, email, phone, subject });

    // In a real production environment, you would use nodemailer to send an email
    // Example configuration (commented out for now):
    /*
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  
    try {
      await transporter.sendMail({
        from: `"FinFreedom Website" <${process.env.SMTP_USER}>`,
        to: "nitin@finfreedom33.com",
        subject: `New Inquiry: ${subject}`,
        text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
        html: `<h3>New Contact Form Submission</h3>
               <p><b>Name:</b> ${fullName}</p>
               <p><b>Email:</b> ${email}</p>
               <p><b>Phone:</b> ${phone}</p>
               <p><b>Subject:</b> ${subject}</p>
               <p><b>Message:</b> ${message}</p>`,
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
    */

    // For now, just simulate success
    res.json({ success: true, message: 'Your inquiry has been received. We will contact you soon.' });
});

module.exports = router;
