const nodemailer = require('nodemailer');
const sqlite = require("sqlite3");
let {PythonShell} = require('python-shell')

let finish = 1

exports.getHome = (req, res) => {
    res.render("index", { title: "Home" });

    PythonShell.run('./scraping-event.py', null, function (err) {
        if (err) throw err;
        console.log('scraping ended');
        finish = 0;
      });
}

exports.getRegistration = (req, res) => {
    res.render("registration", { title: "Registration" });
}

exports.getConstruction = (req, res) => {
    res.render("under-construction", { title: "OOPS!!" });
}

exports.getWelcome = (req, res) => {
    res.render("welcome", { title: "Welcome" });
    let fName = req.body.fName;
    let lNane = req.body.lName;
    let email = req.body.email;
    let date = req.body.date;
    let pwd = req.body.pwd;

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
        html: '<h1> Thanks ' + `${fName}  ${lNane}` + '</h1> <br> <h2> Now you are part of the community </h2> <br>' +
            '<img style="width: 70vw" src="cid:unique@kreata.ee" alt="Photo">',
        attachments: [
            {
                filename: 'event1.jpg',
                path: 'public/img/event1.jpg',
                cid: 'unique@kreata.ee'
            }],
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    console.log(req.body);


    let db = new sqlite.Database("Events.db")

    db.run(`INSERT INTO User(id, fName, lName, email, date, password) VALUES(null, ?, ?, ?, ?, ?)`, [fName, lNane, email, date, pwd], function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    db.close();
}