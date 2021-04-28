const nodemailer = require('nodemailer');

exports.getHome = (req, res) => {
    res.render("index", {title:"Home"});
}
exports.getRegistration = (req, res) => {
    res.render("registration", {title:"Registration"});
}

exports.sendEmail = (req, res) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'scrapingproject5ainf@gmail.com',
            pass: 'project2k21'
        }
    });
    let mailOptions = {
        from: 'scrapingproject5ainf@gmail.com',
        to: req.body["email"],
        subject: 'Sending Email using Node.js',
        html: 'That was easy!'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    console.log(req.body);
    res.redirect("/");
}