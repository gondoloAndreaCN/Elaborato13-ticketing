const nodemailer = require('nodemailer');
const db = require('better-sqlite3')('Events.db');
// const bcrypt = require('bcrypt');
const { encrypt, decrypt } = require('../public/js/db/crypto');


let { PythonShell } = require('python-shell')

exports.getHome = (req, res) => {
    res.render("index", { title: "Home" });
}

exports.getRegistration = (req, res) => {
    res.render("registration", { title: "Registration", exist: "" });
}

exports.getLogin = (req, res) => [
    res.render("login", { title: "Login", exist:"" })
]

exports.getConstruction = (req, res) => {
    res.render("under-construction", { title: "OOPS!!" });
}

exports.getWelcomeBack = (req, res) => {
    let email = req.body.logEmail;
    let pwd = req.body.logPwd;
    console.log(pwd)

    console.log(email)
    const row = db.prepare(`SELECT * FROM User WHERE email = ?`).get(email);
    console.log(row)

    let pwddb = row.password;
    console.log(pwddb)

    let decrypted = decrypt(pwddb);
    console.log(decrypted);


    if(row == undefined){
        console.log("no user found")
        res.render("login", {title:"Login", exist:"User not found, make Sing in"})
    }else if(row.email == email && decrypted == pwd){
        console.log("user found");
        res.render("welcomeBack", {title:"Welcome back"})
    }

}

exports.getWelcome = (req, res) => {

    let fName = req.body.fName;
    let lNane = req.body.lName;
    let email = req.body.email;
    let date = req.body.date;
    let pwd = req.body.pwd;
    let pwd1 = req.body.pwd1;

    const row = db.prepare(`SELECT * FROM User WHERE email = ?`).get(email);
    console.log(row)

    if (row == undefined) {
        console.log("new user")
        let crypted = encrypt(pwd);
        console.log(crypted);
        // crypted = "iv: " + crypted.iv + ", content: " + crypted.content; 
        // console.log(crypted);
        let decrypted = decrypt(crypted);
        console.log(decrypted);
        const stmt = db.prepare(`INSERT INTO User(id, fName, lName, email, date, password) VALUES(null, ?, ?, ?, ?, ?)`);
        const info = stmt.run(fName, lNane, email, date, crypted)
        console.log(info.lastInsertRowid);

        if (pwd != pwd1) {
            res.render("registration", { title: "Registration", exist: "" });
        } else if (pwd == pwd1) {
            res.render("welcome", { title: "Welcome" });
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
                html: '<h1> Thanks ' + `${fName} ${lNane}` + '! ' +  '</h1> <br> <h2> Now you are part of the community </h2> <br>' +
                    '<img style="width: 80vw" src="cid:unique@kreata.ee" alt="Photo">',
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

        }
    } else if (row.email == email) {
        console.log("email already exist");
        console.log(email);
        console.log(row.email);
        res.render("registration", { title: "Registration", exist: "User already exist, Log in" });
    } else if (row.email != email) {
        console.log(row.email);
        console.log("new user")
        let crypted = encrypt(pwd);
        console.log(crypted);
        // crypted = "iv: " + crypted.iv + ", content: " + crypted.content; 
        // console.log(crypted);
        let decrypted = decrypt(crypted);
        console.log(decrypted);
        const stmt = db.prepare(`INSERT INTO User(id, fName, lName, email, date, password) VALUES(null, ?, ?, ?, ?, ?)`);
        const info = stmt.run(fName, lNane, email, date, crypted)
        console.log(info.lastInsertRowid);

        if (pwd != pwd1) {
            res.render("registration", { title: "Registration", exist: "" });
        } else if (pwd == pwd1) {
            res.render("welcome", { title: "Welcome" });
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
                html: '<h1> Thanks ' + `${fName}  ${lNane}` + '! ' +  '</h1> <br> <h2> Now you are part of the community </h2> <br>' +
                    '<img style="width: 80vw" src="cid:unique@kreata.ee" alt="Photo">',
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
        }
    }

}


exports.getEvents = (req, res) => {
    let finish = 0;
    PythonShell.run('./scraping-event.py', null, function (err) {
        if (err) throw err;
        console.log('scraping ended');
        finish = 1;
        if (finish == 1) {
            const events = require("../events.json");
            res.render("events", { title: "Events", events });
        }
    });
}