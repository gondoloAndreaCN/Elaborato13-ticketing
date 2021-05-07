const nodemailer = require('nodemailer');

exports.getHome = (req, res) => {
    res.render("index", { title: "Home" });
}
exports.getRegistration = (req, res) => {
    res.render("registration", { title: "Registration" });
}

exports.getConstruction = (req, res) => {
    res.render("under-construction", { title: "OOPS!!" });
}

exports.sendEmailReg = (req, res) => {

    // let name = req.body.Fname;
    // let surname = req.body.Lname;

<<<<<<< HEAD
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ticket.radar@gmail.com',
            pass: 'Ticket4251'
        }
    });

    let mailOptions = {
        from: 'ticket.radar@gmail.com',
        to: req.body["email"],
        subject: 'Avvenuta registrazione',
        attachDataUrls: true,
        html: '<h1> Thanks ' + `${name}  ${surname}` + '</h1> <br> <h2> Now you are part of the community </h2> <br>' +
            '<img style="width: 600px" src="cid:unique@kreata.ee" alt="Photo">',
        attachments: [
            {
                filename: 'event1.jpg',
                path: 'public/img/event1.jpg',
                cid: 'unique@kreata.ee'
            }],
    };
=======
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'scrapingproject5ainf@gmail.com',
    //         pass: 'project2k21'
    //     }
    // });

    // let mailOptions = {
    //     from: 'scrapingproject5ainf@gmail.com',
    //     to: req.body["email"],
    //     subject: 'Avvenuta registrazione',
    //     attachDataUrls: true,
    //     html: '<h1> Thanks ' + `${name}  ${surname}` + '</h1> <br> <h2> Now you are part of the community </h2> <br>' +
    //         '<img style="width: 600px" src="cid:unique@kreata.ee" alt="Photo">',
    //     attachments: [
    //         {
    //             filename: 'event1.jpg',
    //             path: 'public/img/event1.jpg',
    //             cid: 'unique@kreata.ee'
    //         }],
    // };
>>>>>>> 5810fd041e854a6aad6f9e1bae90fd61efd7730c

    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });

    // console.log(req.body);
    res.redirect("/registration");
}