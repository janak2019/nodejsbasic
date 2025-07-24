const nodemailer = require("nodemailer")
const sendEmail = async(options)=>{
    var transporter = nodemailer.createTransport({
        service : 'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    const mailOptions = {
        from:"Janak Acharya <withjanak@gmail.com>",
        to: options.email,
        subject : options.subjects,
        text: options.message,
    }
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail