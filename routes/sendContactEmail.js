require('dotenv').config();
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST /api/send-contact
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill all required fields" });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // App password, NOT regular password
      },
    });

    // Verify transporter connection
    transporter.verify(function (error, success) {
      if (error) {
        console.error("SMTP Connection Error:", error);
      } else {
        console.log("SMTP Server is ready to send messages");
      }
    });

    // Mail options
    const mailOptions = {
      from: email, // Sender is the user filling form
      to: process.env.EMAIL_USER, // Your Gmail
      subject: subject || `Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    console.log(`Message sent from ${email} successfully!`);

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Error sending message. Check backend logs." });
  }
});

module.exports = router;
