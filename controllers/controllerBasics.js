const nodemailer = require('nodemailer');
const db = require('better-sqlite3')('Events.db');
const { encrypt, decrypt } = require('../public/js/db/crypto');


let { PythonShell } = require('python-shell')

exports.getHome = (req, res) => {
    console.log("home")
    res.render("index", { title: "Home" });
}

exports.getRegistration = (req, res) => {
    console.log("reg")

    res.render("registration", { title: "Registration", exist: "" });
}

exports.getLogin = (req, res) => {
    console.log("log")

    let nameT = req.body.nameT;
    let locationT = req.body.locationT;
    let statusT = req.body.statusT;
    let sitT = req.body.sitT;
    let priceT = req.body.priceT;

    res.render("login", { title: "Login", exist: "", name: nameT, location: locationT, status: statusT, sit: sitT, price: priceT })
}

exports.getConstruction = (req, res) => {
    console.log("und")

    res.render("under-construction", { title: "OOPS!!" });
}

exports.getTicket = (req, res) => {
    console.log("tic")

    let email = req.body.logEmail;
    let pwd = req.body.logPwd;

    let nameT = req.body.nameT;
    let locationT = req.body.locationT;
    let sitT = req.body.sitT;
    let priceT = req.body.priceT;


    const row = db.prepare(`SELECT * FROM User WHERE email = ?`).get(email);


    if (row == undefined) {
        console.log("no user found")
        res.render("login", { title: "Login", exist: "User not found, make Sing in", name: nameT, location: locationT, sit: sitT, price: priceT, email: email })
    } else if (row.email == email) {
        let pwddb = row.password;
        let decrypted = decrypt(pwddb);
        console.log("user found");
        if (decrypted == pwd) {
            console.log("password correct");
            res.render("ticket", { title: nameT, name: nameT, location: locationT, sit: sitT, price: priceT, email: email })
        } else {
            console.log("password incorrect")
            res.render("login", { title: "Login", exist: "Password incorrect", name: nameT, location: locationT, sit: sitT, price: priceT, email: email })
        }
    }
}

exports.getWelcome = (req, res) => {
    console.log("wel")

    let fName = req.body.fName;
    let lName = req.body.lName;
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
        let decrypted = decrypt(crypted);
        console.log(decrypted);
        let id = Date.now().toString();
        const stmt = db.prepare(`INSERT INTO User(id, fName, lName, email, date, password) VALUES(?, ?, ?, ?, ?, ?)`);
        const info = stmt.run(id, fName, lName, email, date, crypted);
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
                html: '<h1> Thanks ' + `${fName} ${lName}` + '! ' + '</h1> <br> <h2> Now you are part of the community </h2> <br>' +
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
        res.render("registration", { title: "Registration", exist: "User already exist" });
    } else if (row.email != email) {
        console.log(row.email);
        console.log("new user")
        let crypted = encrypt(pwd);
        console.log(crypted);
        let decrypted = decrypt(crypted);
        console.log(decrypted);
        let id = Date.now().toString();
        const stmt = db.prepare(`INSERT INTO User(id, fName, lName, email, date, password) VALUES(?, ?, ?, ?, ?, ?)`);
        const info = stmt.run(id, fName, lName, email, date, crypted);
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
                html: '<h1> Thanks ' + `${fName}  ${lName}` + '! ' + '</h1> <br> <h2> Now you are part of the community </h2> <br>' +
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
    console.log("events")

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

exports.getEvent = (req, res) => {
    console.log("event")

    let name = req.body.name;
    let location = req.body.location;
    let status = req.body.status;
    let sit = req.body.sit;
    let price = req.body.price;
    res.render("event", { title: name, name: name, location: location, status: status, sit: sit, price: price });
}

// 
exports.getPersonal = (req, res) => {
//     let email = req.body.email;

//     const row = db.prepare(`SELECT * FROM Event WHERE email = ?`).get(email);
//     console.log(row)



//     if (row == undefined) {
//         console.log("no user found")
//         res.render("personal", { title: "personal" })
//     } else if (row.email == email) {
//         let pwddb = row.password;
//         let decrypted = decrypt(pwddb);
//         console.log("user found");
//         if (decrypted == pwd) {
//             console.log("password correct");
//             res.render("personal", { title: "personal" })
//         } else {
//             console.log("password incorrect")
//             res.render("personal", { title: "personal" })
//         }
//     }

}

exports.getAddEvent = (req, res) => {
    console.log("add")

    let email = req.body.email;
    let name = req.body.name;
    let location = req.body.location;
    let sit = req.body.sit;
    let price = req.body.price;

    let id = Date.now().toString();
    const stmt = db.prepare(`INSERT INTO Event(id, name, location, sit, email, price) VALUES(?, ?, ?, ?, ?, ?)`);
    const info = stmt.run(id, name, location, sit, email, price);
    console.log(info.lastInsertRowid);
    res.render("personal", { title: "Prsonal area" })
}

