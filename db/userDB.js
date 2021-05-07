const sqlite = require("sqlite3");
const db = require("./db/connectionDB");

module.exports = {
    create() {
        db.init()
        console.log("creating");
        var fName = document.reg.fName.value;
        var lName = document.reg.lName.value;
        var email = document.reg.email.value;
        var day = document.reg.dd.value;
        var month = document.reg.mm.value;
        var year = document.reg.yyyy.value;
        var birth = day + "/" + month + "/" + year;
        var pwd = document.reg.pwd.value;
        
        db.run(`INSERT INTO User(id, fName, lName, email, dd, mm, yyyy, pwd) VALUES(?, ?, ?, ?, ?, ?),`, [], function (err) {
            if (err) {
                return console.log(err.message);
            }
        })
    }
}