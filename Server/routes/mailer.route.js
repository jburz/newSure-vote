// import necessary modules and packages
const express = require("express");
const router = express.Router();
var nodemailer = require('nodemailer');
require('dotenv').config();

// set up transport schema
const transport = {
  host: 'smtp.zoho.com', // Don’t forget to replace with the SMTP host of your provider
  port: 465,
  secure: true,
  auth: {
    user: process.env.CREDENTIAL_USER,
    pass: process.env.CREDENTIAL_PASS
  }
}

// create new tranport schema
const transporter = nodemailer.createTransport(transport)

// verify that transporter
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
})

router.post('/send', (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const message = req.body.message
  const content = `name: ${name} \n email: ${email} \n message: ${message} `

  const mail = {
    from: process.env.CREDENTIAL_USER,
    to: process.env.CREDENTIAL_USER,  // Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content
  }

  const mail2 = {
    from: process.env.CREDENTIAL_USER,
    to: email,
    subject: 'A message from the team',
    text: `Thank you for contacting us!\n\nForm details:\n\nName: ${name}\n Email: ${email}\n Message: ${message}`
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
      console.log("mail", err);
    } else {
      res.json({
        status: 'success'
      })
    }
  })

  transporter.sendMail(mail2, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
      console.log("mail2", err);
    } else {
      res.json({
        status: 'success'
      })
    }
  })

});

// export router from mailer.route.js
module.exports = router;